export const dynamic = "force-dynamic";

import HomePage from "@/components/tempelates/HomePage";

export default async function Home({ searchParams }) {
  const { destinationId, originId, startDate, endDate } = searchParams;

  let initialTours = [];

  try {
    let url = "http://localhost:6500/tour";

    if (destinationId && originId && startDate && endDate) {
      const query = new URLSearchParams({
        destinationId,
        originId,
        startDate,
        endDate,
      }).toString();
      url += `?${query}`;
    }

     const res = await fetch(url, { cache: "no-store" });
    initialTours = await res.json();
  } catch (err) {
    console.error("SSR fetch failed:", err);
  }

  return <HomePage initialTours={initialTours} searchParams={searchParams} />;
}
