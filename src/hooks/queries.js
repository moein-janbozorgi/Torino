"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/configs/config";

export const fetchAllTour = async () => {
  try {
    const { data } = await api.get("/tour");
    return data;
  } catch (error) {
    throw new Error("data faild in fetching");
  }
};

export const useGetAllTour = () => {
  try {
    const queryFn = () => api.get("/tour");
    const queryKey = ["all-tour"];
    return useQuery({ queryFn, queryKey });
  } catch (error) {
    throw new Error("data faild in fetching");
  }
};


