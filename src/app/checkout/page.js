export const dynamic = "force-dynamic";

import CheckoutPage from "@/components/tempelates/CheckoutPage";
import { fetchBasket } from "@/hooks/queries";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["basket"],
    queryFn: fetchBasket,
  });

  const dehydratedState = dehydrate(queryClient);

  return <CheckoutPage dehydratedState={dehydratedState}/>;
}
