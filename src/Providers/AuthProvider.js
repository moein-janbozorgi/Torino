"use client";

import { useGetUserInfo } from "@/hooks/queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthProvider({ children }) {
  const router = useRouter();

  const { data, isPending } = useGetUserInfo();

  useEffect(() => {
    if (!isPending && !data?.data) router.push("/");
  }, [isPending]);

  if (isPending) return <p>Loading</p>;

  return <div>{children}</div>;
}

export default AuthProvider;
