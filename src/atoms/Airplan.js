import styles from "@/styles/Airplan.module.css";

function Airplan() {
  return (
    <div className={styles.heroWrapper}>
       {/* {eslint-disable-next-line @next/next/no-img-element} */}
      <img src="/images/airplan.png" alt="airplan" className={styles.img} />
    </div>
  );
}

export default Airplan;
