"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryFn = () => api.get("/tour");
  const queryKey = ["all-tour"];
  return useQuery({ queryFn, queryKey });
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
