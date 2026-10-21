# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i              # install
npm run dev        # dev server (Next 15 + Turbopack)
npm run build      # production build (Turbopack)
npm start          # serve the production build
npm run lint       # eslint (flat config, next/core-web-vitals)
```

There is no test setup in this repo (no test runner, no test script).

The app is a frontend only; it needs the separate backend from
https://github.com/moein-janbozorgi/torino-back running (`npm start` there, port 6500) for
anything beyond static rendering. `NEXT_PUBLIC_API_URL` in `.env` points at it.

## Architecture

Next.js 15 App Router, plain JavaScript (no TypeScript), React 19. `@/*` maps to `src/*`.
Styling is Tailwind CSS v4 utility classes written inline in JSX. [src/app/globals.css](src/app/globals.css)
holds the theme (colors, the `xs` 391px / `md` 768px / `lg` 992px breakpoints, animations), the base styles,
and overrides for third-party widget internals. Preflight is deliberately not imported: the UI relies on
browser default margins and form-control styles. Repeated class strings live in constants at the top of the file.

Dark mode is a `.dark` class on `<html>`, set before paint by an inline script in `layout.js` (saved
`localStorage.theme`, else the OS preference) and flipped by `src/atoms/ThemeToggle.js`. Use the neutral
tokens from `globals.css` — `bg-surface`, `bg-surface-2`, `text-fg`, `text-text`, `text-muted`,
`border-line` / `bg-line` — instead of hex neutrals or `bg-white`/`text-black`, which won't switch.
Brand text/borders use the theme-aware `text-primary` / `border-primary` (#0f766e light, #2dd4bf dark, readable on both); filled buttons are `bg-[#0f766e]` hover `bg-[#115e59]`; other brand/blue shades stay as hex. Near-black monochrome icon PNGs need `dark:invert`.

Component layering (follow the existing placement when adding files):
`src/atoms/` single-purpose widgets → `src/components/modules/` feature blocks →
`src/components/tempelates/` page compositions (note: directory is misspelled "tempelates") →
`src/app/` routes, with `src/layout/` for Header/Footer and `src/Providers/` for context wrappers.

### Two separate HTTP paths

This is the most important distinction in the codebase:

- **Server components** use `serverFetch` from [src/hooks/HttpsReq.js](src/hooks/HttpsReq.js) — a thin
  `fetch` wrapper with `qs` query serialization. It sends **no auth header**, so it can only read public
  endpoints (`/tour`, `/tour/:id`).
- **Client components** use the axios instance `api` from [src/configs/config.js](src/configs/config.js).
  Its request interceptor attaches `Bearer <accessToken>` from cookies; its response interceptor
  **unwraps to `response.data`**, so callers receive the payload directly, never an axios response.
  On 401/403 it retries once after `POST /auth/refresh-token`.

Because of the unwrapping, never write `res.data` on an `api` call result, and never expect auth to work
through `serverFetch`.

### Data layer

All TanStack Query usage is centralized in [src/hooks/queries.js](src/hooks/queries.js) and
[src/hooks/mutations.js](src/hooks/mutations.js); add new endpoints there rather than calling `api`
inside components. Mutations own their own side effects — toast messages, cookie writes, cache
invalidation, and redirects — and take an optional `onSuccessCallback` for component-specific follow-up.
Query keys in use: `user-data`, `all-tour`, `tour`, `basket`, `user-tours`, `user-transactions`.

Note `ReactQueryProvider` constructs its `QueryClient` inside the render body, so the cache resets on
remount; it is also the only provider wrapping the whole tree in [src/app/layout.js](src/app/layout.js).

### Auth

Phone + OTP, entirely client-side and cookie-based:

1. `LoginModal` → `POST /auth/send-otp` (the dev backend returns the code, which is shown in a toast).
2. `OtpModal` → `POST /auth/check-otp` → `setCookie("accessToken", …, 30)` and
   `setCookie("refreshToken", …, 365)` written via raw `document.cookie` in
   [src/utils/cookieHelper.js](src/utils/cookieHelper.js), then `user-data` is invalidated.
3. `useGetUserInfo()` (`GET /user/profile`) is the session source of truth — `Header` and `Reserve`
   branch on its data, and `AuthProvider` redirects to `/` when it resolves empty.

There is **no middleware**: `/profile/*` is guarded only by `AuthProvider` on the client. Navigating to
`/?login=true` opens the login modal (used by logout and by `Reserve` when unauthenticated), and `Header`
strips that param with `history.replaceState` after opening.

### Booking flow

Home (`/`) server-renders tours, then `HomePage` re-fetches client-side on every `searchParams` change —
so search results exist in both places. `Find` builds the query (converting Jalali range dates to
Gregorian ISO) and pushes the URL via `history.pushState`. From there:
`/Details/[idtour]` → `Reserve` does `PUT /basket/:id` → `/checkout` reads `GET /basket` and
`POST /order`s the passenger form → `/profile/tours`.

### Persian / RTL conventions

The UI is Persian-only and RTL (`<html lang="fa" dir="rtl">`, the variable `Vazirmatn[wght].woff2` font preloaded in the root
layout). When rendering data:

- Wrap every number shown to users in `toPersianNumber()`.
- Prices from the API are dollars: `convertToRial(price)` (fixed rate 103, comma-grouped) then
  `toPersianNumber`.
- Dates: `formatJalaliText` (full Jalali date) or `formatPersianDate` (time + date), both in
  [src/utils/helper.js](src/utils/helper.js). Date pickers use `react-multi-date-picker` with the
  `persian` calendar and `persian_fa` locale, and values must be converted to Gregorian ISO before
  hitting the API.
- City and vehicle names arrive in English and pass through the hardcoded `cityMap` / `vehicleMap` in
  `helper.js` — new backend cities need an entry there or they render untranslated.

All yup schemas live in [src/utils/validations.js](src/utils/validations.js) with Persian error messages;
forms are react-hook-form + `yupResolver`.

### Things that break quietly

- `next.config.mjs` whitelists image hosts (`torino-back.onrender.com`, `localhost:6500`). Pointing
  `NEXT_PUBLIC_API_URL` at a new host without adding it there makes every `next/image` tour photo fail.
- In Next 15, `params` and `searchParams` are promises and are awaited in the existing server pages —
  keep doing that in new ones.
