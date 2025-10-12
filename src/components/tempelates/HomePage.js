"use client";
import Find from "../modules/Find";
import Tours from "../modules/Tours";
import Call from "../modules/Call";
import Whytorino from "../modules/Whytorino";
import Last from "../modules/Last";
import { useEffect, useState } from "react";
import { api } from "@/configs/config";
import { useSearchParams } from "next/navigation";
import Airplan from "@/atoms/Airplan";

function HomePage({ initialTours }) {
  const clientSearchParams = useSearchParams();
  const [filteredTours, setFilteredTours] = useState(initialTours || []);

  useEffect(() => {
    const fetchTours = async () => {
      const query = clientSearchParams.toString();
      if (!query) {
        const res = await api.get("/tour");
        setFilteredTours(res);
        return;
      }

      const destinationId = clientSearchParams.get("destinationId");
      const originId = clientSearchParams.get("originId");
      const startDate = clientSearchParams.get("startDate");
      const endDate = clientSearchParams.get("endDate");

      if (destinationId && originId && startDate && endDate) {
        const res = await api.get("/tour", {
          params: { destinationId, originId, startDate, endDate },
        });
        setFilteredTours(res);
      }
    };

    fetchTours();
  }, [clientSearchParams]);

  const handleSearch = (tours, query) => {
    setFilteredTours(tours);
    window.history.pushState(null, "", `/?${query}`);
  };

  return (
    <>
      <Airplan />
      <Find onSearch={handleSearch} />
      <Tours data={filteredTours} />
      <Call />
      <Whytorino />
      <Last />
    </>
  );
}

export default HomePage;
