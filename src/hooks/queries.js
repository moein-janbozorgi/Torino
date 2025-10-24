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

export const useGetTourById = (idtour) => {
  return useQuery({
    queryKey: ["tour", idtour],
    queryFn: () => fetchTourById(idtour),
    staleTime: 1000 * 60,
  });
};

export const useGetBasket = () => {
  return useQuery({
    queryKey: ["basket"],
    queryFn: async () => {
      try {
        const response = await api.get("/basket");
        return response ?? {};
      } catch (error) {
        return {};
      }
    },
    staleTime: 1000 * 60,
  });
};

export const useGetUserTours = () => {
  return useQuery({
    queryKey: ["user-tours"],
    queryFn: async () => {
      try {
        const response = await api.get("/user/tours");
        return response ?? null;
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 2,
  });
};

export const useGetUseTransactions = () => {
  return useQuery({
    queryKey: ["user-transactions"],
    queryFn: async () => {
      try {
        const response = await api.get("/user/transactions");
        return response ?? null;
      } catch (error) {
        console.log(error.message);
      }
    },
    staleTime: 1000 * 60 * 2,
  });
};

export const useGetAllTour = () => {
  return useQuery({
    queryKey: ["all-tour"],
    queryFn: fetchAllTour,
    staleTime: 1000 * 60,
  });
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      try {
        const res = await api.get("/user/profile");
        console.log(res);
        return res || null;
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};
