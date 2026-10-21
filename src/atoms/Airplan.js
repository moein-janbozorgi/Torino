function Airplan() {
  return (
    <div className="relative right-1/2 left-1/2 -mx-[50vw] w-screen overflow-hidden">
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
        className="block h-[119px] w-screen md:h-[200px] lg:h-[350px]"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}

export default Airplan;
