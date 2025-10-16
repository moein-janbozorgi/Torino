"use client";

import { useGetUserInfo } from "@/hooks/queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthProvider({ children }) {
  const router = useRouter();

  const { data, isPending } = useGetUserInfo();

  console.log(data)

  useEffect(() => {
    if (!isPending && !data) router.push("/");
  }, [isPending]);

  if (isPending) return <p>Loading</p>;

  return <div>{children}</div>;
}

export default AuthProvider;
