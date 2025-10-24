import styles from "@/styles/Airplan.module.css";

function Airplan() {
  return (
    <div className={styles.heroWrapper}>
      {/* {eslint-disable-next-line @next/next/no-img-element} */}
      <img
        src="/images/airplan.webp"
        alt="airplan"
        srcSet="/images/airplan.webp 412w,
          /images/airplan.webp 824w,
          /images/airplan.webp 1439w"
        sizes="(max-width: 768px) 412px,
         (max-width: 1200px) 824px,
         1439px"
        className={styles.img}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}

export default Airplan;
