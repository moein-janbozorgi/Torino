"use client";

import { useGetAllTour } from "@/hooks/queries";
import Find from "../modules/Find";
import Tours from "../modules/Tours";
import Call from "../modules/Call";
import Whytorino from "../modules/Whytorino";
import Last from "../modules/Last";
import {
  QueryClient,
  QueryClientProvider,
  hydrate,
} from "@tanstack/react-query";
import { useState } from "react";

function HomePage({ dehydratedState }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <hydrate state={dehydratedState}>
        <TourList />
      </hydrate>
    </QueryClientProvider>
  );
}

function TourList() {
  const { data, isLoading } = useGetAllTour();

  return (
    <>
      <Find />
      <Tours data={data} isLoading={isLoading} />
      <Call />
      <Whytorino />
      <Last />
    </>
  );
}

export default HomePage;
