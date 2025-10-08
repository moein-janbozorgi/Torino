import DetailPage from "@/components/tempelates/DetailPage";
import { fetchTourById } from "@/hooks/queries";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Providers from "@/app/providers";

export const dynamic = "force-dynamic";

async function Page({ params }) {
  const { idtour } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tour", idtour],
    queryFn: () => fetchTourById(idtour),
  });

  return <Detailspage />;
}

export default Page;
