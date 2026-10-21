"use client";
import Find from "../modules/Find";
import Tours from "../modules/Tours";
import Call from "../modules/Call";
import Whytorino from "../modules/Whytorino";
import Last from "../modules/Last";
import { useEffect, useRef, useState } from "react";
import { api } from "@/configs/config";
import { useSearchParams } from "next/navigation";
import Airplan from "@/atoms/Airplan";

function HomePage({ initialTours, allTours}) {
  const clientSearchParams = useSearchParams();
  const [filteredTours, setFilteredTours] = useState(initialTours || []);
  const [isLoading, setIsLoading] = useState(false);
  // The server already rendered tours for the initial URL; refetching on mount
  // only swapped them for a loader and shifted the page.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchTours = async () => {
      setIsLoading(true); // شروع لودینگ
      const query = clientSearchParams.toString();

      try {
        let res;
        if (!query) {
          res = await api.get("/tour");
        } else {
          const destinationId = clientSearchParams.get("destinationId");
          const originId = clientSearchParams.get("originId");
          const startDate = clientSearchParams.get("startDate");
          const endDate = clientSearchParams.get("endDate");

          res = await api.get("/tour", {
            params: { destinationId, originId, startDate, endDate },
          });
        }
        setFilteredTours(res);
      } catch (err) {
        console.error(err);
        setFilteredTours([]);
      } finally {
        setIsLoading(false);
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
      <Find onSearch={handleSearch} data={allTours} />
      <Tours data={filteredTours} isLoading={isLoading} />
      <Call />
      <Whytorino />
      <Last />
    </>
  );
}

export default HomePage;
