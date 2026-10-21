"useclient";
import { toPersianNumber } from "@/utils/helper";
import { useLogout } from "@/hooks/mutations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Userbox({ data, setOpen }) {
  const handleLogout = useLogout();
  const router = useRouter();

  const routeHandler = () => {
    router.push("/profile");
    setOpen((s) => !s);
  };

  return (
    <div className="absolute top-[50px] -left-2.5 z-[1001] flex w-40 flex-col rounded-[11px] bg-white">
      <div className="flex cursor-pointer items-center gap-2.5 pr-3">
        <div className="size-7 rounded-full bg-[#d9d9d9]"></div>
        <Image
          src="/images/profilegray.png"
          alt="prof"
          width={16}
          height={16}
          className="absolute top-[18px] right-[18px]"
        />
        <p className="relative top-0.5 text-sm font-medium text-[#10411b]">{toPersianNumber(data?.mobile)}</p>
      </div>
      <div className="flex items-center pr-3.5">
        <Image
          src="/images/profileblack.png"
          alt="prof"
          width={16}
          height={16}
        />
        <button
          onClick={routeHandler}
          className="border-none bg-white text-xs font-normal text-[#282828]"
        >اطلاعات حساب کاربری</button>
      </div>
      <div className="mt-2.5 border border-[#0000001f]"></div>
      <div
        className="flex cursor-pointer items-center gap-2.5 pr-3"
        onClick={handleLogout}
      >
        <Image src="/images/logout.png" alt="logout" width={16} height={16} />
        <p className="text-xs font-normal text-[#d40000]">خروج از حساب کاربری</p>
      </div>
    </div>
  );
}

export default Userbox;
