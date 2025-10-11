"use client";
import { useGetAllTour } from "@/hooks/queries";
import Find from "../modules/Find";
import Tours from "../modules/Tours";
import Call from "../modules/Call";
import Whytorino from "../modules/Whytorino";
import Last from "../modules/Last";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/configs/config";

function HomePage() {
  const { data: allTours, isLoading } = useGetAllTour();
  const [filteredTours, setFilteredTours] = useState([]);

  const handleSearch = async (searchResult) => {
    setFilteredTours(searchResult);
  };

  // const searchParams = useSearchParams();
  // const originId = searchParams.get("originId");
  // const destinationId = searchParams.get("destinationId");
  // const startDate = searchParams.get("startDate");
  // const endDate = searchParams.get("endDate");

  // useEffect(() => {
  //   if (originId && destinationId) {
  //     const fetchFilteredTours = async () => {
  //       const { data } = await api.get("/tour", {
  //         params: {
  //           destinationId,
  //           originId,
  //           startDate: `${startDate}T00:00:00:00.000Z`,
  //           endDate: `${endDate}T23:59:59.999Z`,
  //         },
  //       });
  //       setFilteredTours(data);
  //     };
  //     fetchFilteredTours();
  //   }
  // }, [destinationId, originId, startDate, endDate]);

  return (
    <>
      <Find onSearch={handleSearch} />
      <Tours
        data={filteredTours.length ? filteredTours : allTours}
        isLoading={isLoading}
      />
      <Call />
      <Whytorino />
      <Last />
    </>
  );
}

export default HomePage;
