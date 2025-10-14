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

export const fetchTourById = async (idtour) => {
  try {
    const result = await api.get(`/tour/${idtour}`);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Fetch tour by ID failed:", error);
    return {};
  }
};

export const useGetBasket = () => {
  return useQuery({
    queryKey: ["basket"],
    queryFn: fetchBasket,
    staleTime: 1000 * 60,
  });
};

export const fetchBasket = async () => {
  try {
    const result = await api.get("/basket");
    console.log(result);
    return result;
  } catch (error) {
    return {};
  }
};

export const fetchUserTours = async () => {
  const response = await api.get("/user/tours");
  return response ?? null;
};

export const useGetUserTours = () => {
  return useQuery({
    queryKey: ["user-tours"],
    queryFn: fetchUserTours,
    staleTime: 1000 * 60 * 2,
  });
};

export const fetchTransactions = async () => {
  const response = await api.get("/user/transactions");
  return response ?? null;
};

export const useGetUseTransactions = () => {
  return useQuery({
    queryKey: ["user-transactions"],
    queryFn: fetchTransactions,
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

export const fetchUserInfo = async () => {
  const res = await api.get("/user/profile");
  return res ?? null;
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 5,
  });
};
