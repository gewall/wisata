import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative h-96">
      <div className="h-full  flex items-center justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl max-w-80 md:max-w-full text-center text-white">
          SIROTA <br />
          (Sistem Rekomedasi Objek Wisata)
        </h1>
      </div>
      <div className="absolute w-full h-96 top-0 -z-10">
        <Image
          src={
            "https://drive.google.com/uc?export=view&id=1GJDB9zDRmggBtByBBw_7MTP_sJzMGMOG"
          }
          alt="Hero Image"
          fill
          objectFit="cover"
          className="brightness-50 blu"
        />
      </div>
    </div>
  );
};

export default Hero;
