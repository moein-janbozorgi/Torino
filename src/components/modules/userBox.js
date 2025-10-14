"useclient";
import { toPersianNumber } from "@/utils/helper";
import { useLogout } from "@/hooks/mutations";
import styles from "@/styles/Userbox.module.css";
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
    <div className={styles.container}>
      <div className={styles.phone}>
        <div className={styles.circle}></div>
        <Image
          src="/images/profilegray.png"
          alt="prof"
          width={16}
          height={16}
        />
        <p>{toPersianNumber(data?.mobile)}</p>
      </div>
      <div className={styles.info}>
        <Image
          src="/images/profileblack.png"
          alt="prof"
          width={16}
          height={16}
        />
        <button onClick={routeHandler}>اطلاعات حساب کاربری</button>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.logout} onClick={handleLogout}>
        <Image src="/images/logout.png" alt="logout" width={16} height={16} />
        <p>خروج از حساب کاربری</p>
      </div>
    </div>
  );
}

export default Userbox;
