import Image from "next/image";
import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="relative h-96">
      <div className="h-full  flex items-center justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl max-w-80 md:max-w-full text-center">
          Rekomedasi Tempat Wisata
        </h1>
      </div>
      <div className="absolute w-full h-96 top-0 -z-10">
        <Image
          src={"https://placehold.co/1080x720"}
          alt="Hero Image"
          fill
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Hero;