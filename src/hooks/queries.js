"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/configs/config";

const MINUTE = 1000 * 60;

// Query keys are shared with the mutations that invalidate them, so they live
// in one place rather than being retyped as string literals at each call site.
export const queryKeys = {
  allTours: ["all-tour"],
  basket: ["basket"],
  userTours: ["user-tours"],
  userTransactions: ["user-transactions"],
  userInfo: ["user-data"],
};

// Every endpoint degrades to a safe empty value instead of throwing, so each
// consumer can render straight from `data` without its own error branch.
// Note the fallback must never be undefined: React Query rejects that.
const safeGet = async (path, fallback) => {
  try {
    const response = await api.get(path);
    return response ?? fallback;
  } catch {
    return fallback;
  }
};

export const fetchAllTour = async () => {
  const result = await safeGet("/tour", []);
  return Array.isArray(result) ? result : (result?.data ?? []);
};

export const useGetAllTour = () =>
  useQuery({
    queryKey: queryKeys.allTours,
    queryFn: fetchAllTour,
    staleTime: MINUTE,
  });

export const useGetBasket = () =>
  useQuery({
    queryKey: queryKeys.basket,
    queryFn: () => safeGet("/basket", {}),
    staleTime: MINUTE,
  });

export const useGetUserTours = () =>
  useQuery({
    queryKey: queryKeys.userTours,
    queryFn: () => safeGet("/user/tours", null),
    staleTime: 2 * MINUTE,
  });

export const useGetUseTransactions = () =>
  useQuery({
    queryKey: queryKeys.userTransactions,
    queryFn: () => safeGet("/user/transactions", null),
    staleTime: 2 * MINUTE,
  });

export const useGetUserInfo = () =>
  useQuery({
    queryKey: queryKeys.userInfo,
    queryFn: () => safeGet("/user/profile", null),
    staleTime: 5 * MINUTE,
  });
