import HomePage from "@/components/tempelates/HomePage";
import { serverFetch } from "@/hooks/HttpsReq";

export default async function Home({ searchParams }) {
  const { destinationId, originId, startDate, endDate } = await searchParams;

  let initialTours = [];

  try {
    const query = {};
    if (destinationId) query.destinationId = destinationId;
    if (originId) query.originId = originId;
    if (startDate) query.startDate = startDate;
    if (endDate) query.endDate = endDate;

    const data = await serverFetch("/tour", query, { cache: "no-store" });

    initialTours = data ?? [];
  } catch (err) {
    console.error("Error fetching tours:", err);
    initialTours = [];
  }

  return <HomePage initialTours={initialTours} searchParams={searchParams} />;
}
