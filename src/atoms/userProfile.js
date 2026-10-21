import { toPersianNumber } from "@/utils/helper";
import Image from "next/image";
import { useState } from "react";
import Userbox from "@/components/modules/userBox";

function UserProfile({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-1">
      <Image
        src="/images/profile.png"
        width={14}
        height={14}
        alt="profile"
        className="mb-0.5"
      />
      <p className="text-sm font-medium text-[#28a745]">{toPersianNumber(data?.mobile)}</p>
      <Image
        src="/images/arrowdown.png"
        width={16}
        height={16}
        alt="arrow"
        className="mb-0.5"
        onClick={() => setOpen((s) => !s)}
      />
      {open ? <Userbox data={data} setOpen={setOpen} /> : null}
    </div>
  );
}

export default UserProfile;
