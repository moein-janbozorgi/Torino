"use client";
import { useSendTourInfo } from "@/hooks/mutations";
import { useGetUserInfo } from "@/hooks/queries";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Reserve({ id }) {
  const { data } = useGetUserInfo();
  const { mutateAsync } = useSendTourInfo();
  const router = useRouter();

  const sendHandler = async () => {
    if (!data) {
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      router.push("/");
      return;
    }
    try {
      await mutateAsync(id);
      router.push("/checkout");
    } catch (error) {
      throw new Error("error:", error.message);
    }
  };

  return <button onClick={sendHandler}>رزرو و خرید</button>;
}

export default Reserve;
