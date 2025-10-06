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
  const queryFn = () => api.get("/tour");
  const queryKey = ["all-tour"];
  return useQuery({ queryFn, queryKey });
};

export const useGetUserInfo = () => {
  const queryFn = () => api.get("/user/profile");
  const queryKey = ["user-data"];
  return useQuery({ queryFn, queryKey });
};
