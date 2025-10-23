"use client";
import { useSendTourInfo } from "@/hooks/mutations";

function Reserve({ id }) {
  const { mutateAsync } = useSendTourInfo();

  const sendHandler = async () => {
    try {
      await mutateAsync(id); 
      window.location.href = "/checkout";
    } catch (error) {
      console.error("Reserve failed:", error);
    }
  };

  return <button onClick={sendHandler}>رزرو و خرید</button>;
}

export default Reserve;
