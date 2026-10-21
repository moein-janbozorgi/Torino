---
name: refactor
description: Refactor code in the Torino Next.js app - restructuring components, hooks, state or shared utilities without changing behavior. Use when asked to refactor, clean up, simplify, split, or de-duplicate code in this repo. Covers the project's conventions, its recurring problem patterns, and the verification loop that proves a refactor was behavior-preserving.
---

# Refactoring Torino

A refactor here is **behavior-preserving by definition**. If the UI, the
network calls, or the rendered output change, that is a feature change —
say so explicitly rather than smuggling it into a "cleanup".

## Establish a baseline first

Never refactor on top of unknown breakage. Before touching anything:

```bash
npx eslint          # must be 0 errors (warnings are tolerated, see below)
npm run build       # must succeed
git status --short  # know what was already dirty
```

Record the lint warning count. A refactor must not increase it.

## Stack and conventions

- **Next.js 16 App Router + React 19, plain JavaScript** — no TypeScript,
  so there is no typechecker to catch you. Lint and the build are the net.
- Turbopack is the default bundler; `npm run dev` / `npm run build` take
  no `--turbopack` flag.
- `@/*` maps to `src/*` (see `jsconfig.json`). Always use it, never `../../`.
- **One CSS module per component** in `src/styles/`, imported as `styles`.
  A new component gets a new module; do not reach into another's styles.
- **RTL/Persian throughout.** `<html dir="rtl">` and user-facing strings are
  Persian. Keep them in the component; there is no i18n layer to move them to.
  Never "fix" the direction of a layout you did not measure.
- Component layering: `src/atoms/` (leaf UI) -> `src/components/modules/`
  (composed features) -> `src/components/tempelates/` (page-level).
  **`tempelates` is misspelled in the repo** — match it, don't silently rename
  it; that is its own commit.

## Where shared logic belongs

Before writing a helper, check whether one exists:

- `src/utils/helper.js` — formatting and conversion (`toPersianNumber`,
  `formatJalaliText`, `convertCity`, `convertVehicle`, `convertToRial`,
  `searchTours`).
- `src/utils/validations.js` — yup schemas. Form validation goes here.
- `src/utils/cookieHelper.js` — cookie access.
- `src/hooks/queries.js` / `src/hooks/mutations.js` — all TanStack Query
  hooks. A component should not call `api` directly; add a hook.
- `src/configs/config.js` — the single axios instance, with the auth-token
  request interceptor and the 401/403 refresh-token retry.
- `src/hooks/HttpsReq.js` — `serverFetch`, for Server Components only.

## Recurring problem patterns in this codebase

These are the issues that actually recur here. Fix them when you are already
in the file; do not go hunting across the repo in an unrelated change.

### Derived state copied into state

The most common defect in this repo. If a value is computable from props,
another state value, or the URL, compute it during render:

```js
// avoid: an effect that only mirrors a prop into state
useEffect(() => { setCities(buildCities(data)); }, [data]);

// prefer
const cities = useMemo(() => buildCities(data), [data]);
```

`react-hooks/set-state-in-effect` flags these as **errors**. Fix the cause;
never silence the rule.

### State that mirrors a react-hook-form field

Reading the form is not the same as duplicating it. Use `useWatch({ control,
name })` instead of a `useState` kept in sync by hand in every handler.

Note `watch()` from `useForm()` trips `react-hooks/incompatible-library` —
prefer `useWatch` in new code.

### Bidirectional state that cannot be derived

When something is written by both a user interaction and an external input
(for example the date range in `Find.js`, written by the DatePicker *and* by
the URL), derivation is impossible. Use React's render-phase adjustment with a
previous-value key rather than an effect:

```js
const key = searchParams.toString();
const [prevKey, setPrevKey] = useState(key);
if (key !== prevKey) {
  setPrevKey(key);
  const next = fromParams(searchParams);
  if (next !== undefined) setRange(next);
}
```

Syncing into react-hook-form's store with `setValue` *is* a legitimate effect —
that store is external to React state.

### API responses are not shape-guaranteed

`serverFetch` returns `false` on failure and the query hooks return `{}`,
`null` or `[]` on error. **Never assume an array.** A plain `data ?? []`
is not enough, because `false` and `{}` survive `??`:

```js
(Array.isArray(data) ? data : []).map(...)
```

This exact mistake 500'd the homepage during the Next 16 upgrade.

### Unguarded error.response

`src/configs/config.js:36` reads `error.response.status` without checking that
`error.response` exists. On a network-level failure (backend down) there is no
response object, so the real ECONNREFUSED is replaced by a confusing
`TypeError: Cannot read properties of undefined`. Guard it with `error?.response`
if you are refactoring that interceptor.

### Debug logging

There are ~15 `console.log` calls left in `src/`, including one that logs the
whole user object on every Header render. Remove them from files you touch;
mention the removal, since it is technically out of scope for a pure refactor.

## Verifying the refactor

Behavior-preserving has to be demonstrated, not asserted.

```bash
npx eslint                       # 0 errors, warnings not increased
npm run build                    # must succeed
npm run dev                      # Turbopack, ready in ~0.4s on :3000
```

Then smoke-test the routes your change can reach:

```bash
for p in "/" "/?login=true" "/checkout" "/profile" "/profile/tours"; do
  curl -s -o /dev/null -w "$p -> %{http_code}\n" --max-time 25 "http://localhost:3000$p"
done
```

All should be 200.

**The backend must be running on port 6500** (`.env` points at
`http://localhost:6500`). If it is not, every page logs ECONNREFUSED and tours
render empty — that is the environment, not your refactor. Confirm the backend
state before blaming a change for it.

A green build alone proves very little in a repo with no types. If the refactor
touched a form, a modal, or URL-driven state, exercise it in the browser.

## Scope discipline

- Keep behavior changes and refactors in **separate commits**.
- Do not reformat whole files; the diff should show intent, not whitespace.
- Do not rename across module boundaries as a side effect of another change.
- Do not add dependencies to make a refactor tidier.
- If you find a real bug mid-refactor, say so and fix it as its own change
  rather than folding it in silently.

## Related

`/simplify` and `/code-review` are the built-in, general-purpose passes. This
skill is the project-specific layer: prefer it for Torino, and use the built-ins
for broad sweeps or bug-hunting.
