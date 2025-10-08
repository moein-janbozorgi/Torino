"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/configs/config";

export const fetchAllTour = async () => {
  try {
    const result = await api.get("/tour");
    return Array.isArray(result) ? result : result?.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};


export const fetchTourById = async (idtour) => {
  try {
    const result = await api.get(`/tour/${idtour}`);
    return result ?? {}; 
  } catch (error) {
    console.error("Fetch tour by ID failed:", error);
    return {};
  }
};

export const useGetAllTour = () => {
  return useQuery({
    queryKey: ["all-tour"],
    queryFn: fetchAllTour,
    staleTime: 1000 * 60,
    retry: 1,
  });
};

export const useGetUserInfo = () => {
  const queryFn = async () => {
    try {
      const res = await api.get("/user/profile");
      return res;
    } catch {
      return null;
    }
  };
  return useQuery({
    queryKey: ["user-data"],
    queryFn,
    staleTime: 0,
    cachetime: 0,
    retry: false,
  });
};
