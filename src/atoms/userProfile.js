import { toPersianNumber } from "@/helper/helper";
import Image from "next/image";
import styles from "@/styles/userProfile.module.css"

function UserProfile({data}) {
  return (
    <div className={styles.profile}>
      <Image src="/images/profile.png" width={14} height={14} alt="profile" />
      <p>{toPersianNumber(data?.mobile)}</p>
      <Image src="/images/arrowdown.png" width={16} height={16} alt="arrow" />
    </div>
  );
}

export default UserProfile;

