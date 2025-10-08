export const dynamic = "force-dynamic";

import HomePage from "@/components/tempelates/HomePage";
import { fetchAllTour } from "@/hooks/queries";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-tour"],
    queryFn: fetchAllTour,
  });

  const dehydratedState = dehydrate(queryClient);

  return <HomePage dehydratedState={dehydratedState} />;
}
