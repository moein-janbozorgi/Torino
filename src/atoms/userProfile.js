import { toPersianNumber } from "@/utils/helper";
import Image from "next/image";
import styles from "@/styles/userProfile.module.css";
import { useState } from "react";
import Userbox from "@/components/modules/userBox";

function UserProfile({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.profile}>
      <Image src="/images/profile.png" width={14} height={14} alt="profile" />
      <p>{toPersianNumber(data?.mobile)}</p>
      <Image
        src="/images/arrowdown.png"
        width={16}
        height={16}
        alt="arrow"
        onClick={() => setOpen((s) => !s)}
      />
      {open ? <Userbox data={data} /> : null}
    </div>
  );
}

export default UserProfile;
