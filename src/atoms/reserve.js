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
      router.push("/?login=true");
      return;
    }
    try {
      await mutateAsync(id);
      router.push("/checkout");
    } catch (error) {
      throw new Error("error:", error.message);
    }
  };

  return (
    <button
      onClick={sendHandler}
      className="h-[42px] w-[154px] rounded-[10px] border-none bg-[#28a745] text-center text-xl font-normal text-white transition-all duration-200 ease-in hover:bg-[#6eff9e]"
    >
      رزرو و خرید
    </button>
  );
}

export default Reserve;
