function Airplan() {
  return (
    <div className="relative right-1/2 left-1/2 -mx-[50vw] w-screen overflow-hidden">
      {/* {eslint-disable-next-line @next/next/no-img-element} */}
      <img
        src="/images/airplan.webp"
        alt="airplan"
        className="block h-[119px] w-screen object-cover md:h-[200px] lg:h-[350px]"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}

export default Airplan;
