import HomePage from "@/components/tempelates/HomePage";
import { serverFetch } from "@/hooks/HttpsReq";

export default async function Home({ searchParams }) {
  const { destinationId, originId, startDate, endDate } = await searchParams;

  try {
    const query = {};

    if (destinationId) query.destinationId = destinationId;
    if (originId) query.originId = originId;
    if (startDate) query.startDate = startDate;
    if (endDate) query.endDate = endDate;

    const allTours = await serverFetch("/tour", {}, { cache: "no-store" });

    const initialTours =
      Object.keys(query).length > 0
        ? await serverFetch("/tour", query, { cache: "no-store" })
        : allTours;

    return <HomePage initialTours={initialTours} allTours={allTours} />;
  } catch (err) {
    console.error("Error fetching tours:", err);

    return <HomePage initialTours={[]} allTours={[]} />;
  }
}
