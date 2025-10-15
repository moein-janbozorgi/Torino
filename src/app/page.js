import HomePage from "@/components/tempelates/HomePage";

export const revalidate = 300;

export default async function Home({ searchParams }) {
  const { destinationId, originId, startDate, endDate } = await searchParams;

  let initialTours = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL("/tour", baseUrl);

    if (destinationId && originId && startDate && endDate) {
      url.search = new URLSearchParams({
        destinationId,
        originId,
        startDate,
        endDate,
      }).toString();
    }

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    initialTours = await res.json();
  } catch (err) {
    console.error(err);
    initialTours = []; 
  }

  return <HomePage initialTours={initialTours} searchParams={searchParams} />;
}
