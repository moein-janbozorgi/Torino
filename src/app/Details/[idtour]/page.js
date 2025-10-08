import Detailspage from "@/components/tempelates/Detailspage";
import { fetchTourById } from "@/hooks/queries";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const awaitedParams = await params;
  const idtour = awaitedParams.idtour;


  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tour", idtour],
    queryFn: () => fetchTourById(idtour),
  });

  const dehydratedState = dehydrate(queryClient);

  return <Detailspage idtour={idtour} dehydratedState={dehydratedState} />;
}
