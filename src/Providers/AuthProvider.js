"use client";

import Loader from "@/components/tempelates/Loader";
import { useGetUserInfo } from "@/hooks/queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthProvider({ children }) {
  const router = useRouter();

  const { data, isPending } = useGetUserInfo();

  useEffect(() => {
    if (!isPending && !data) router.push("/");
  }, [isPending, data, router]);

  // Hold the page back until there is a user, so it never flashes before the redirect.
  if (!data) return <Loader />;

  return <div>{children}</div>;
}

export default AuthProvider;
