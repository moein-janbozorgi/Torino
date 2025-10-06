"use client";

import { useGetAllTour } from "@/hooks/queries";
import Find from "../modules/Find";
import Tours from "../modules/Tours";
import Call from "../modules/Call";
import Whytorino from "../modules/Whytorino";
import Last from "../modules/Last";


function HomePage() {
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
