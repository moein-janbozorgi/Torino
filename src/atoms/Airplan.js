import Image from "next/image";

function Airplan() {
  return (
    // Full-bleed: break out of <main>'s max-width and padding to span the viewport.
    // Equal negative margins work the same in RTL; body's overflow-x:hidden clips the scrollbar's width.
    <div className="mx-[calc(50%-50vw)] overflow-hidden">
      <Image
        src="/images/airplan.webp"
        alt="airplan"
        width={1439}
        height={350}
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="block h-[119px] w-full object-cover md:h-[200px] lg:h-auto"
      />
    </div>
  );
}

export default Airplan;
