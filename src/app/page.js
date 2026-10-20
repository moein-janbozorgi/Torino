import HomePage from "@/components/tempelates/HomePage";
import { serverFetch } from "@/hooks/HttpsReq";

export default async function Home({ searchParams }) {
  const { destinationId, originId, startDate, endDate } = await searchParams;

  let allTours = [];
  let initialTours = [];

  // Only the data fetching belongs in the try: a try/catch around the JSX
  // return cannot catch render errors anyway (that needs an error boundary).
  try {
    const query = {};

    if (destinationId) query.destinationId = destinationId;
    if (originId) query.originId = originId;
    if (startDate) query.startDate = startDate;
    if (endDate) query.endDate = endDate;

    allTours = await serverFetch("/tour", {}, { cache: "no-store" });

    initialTours =
      Object.keys(query).length > 0
        ? await serverFetch("/tour", query, { cache: "no-store" })
        : allTours;
  } catch (err) {
    console.error("Error fetching tours:", err);
    allTours = [];
    initialTours = [];
  }

  return <HomePage initialTours={initialTours} allTours={allTours} />;
}
