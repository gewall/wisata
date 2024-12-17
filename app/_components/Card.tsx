import Image from "next/image";
import React from "react";
import Rating from "./Rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const Card = (props: Props) => {
  return (
    <div className="border-2 border-slate-200 rounded-lg max-w-full md:max-w-80  flex flex-col">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src="https://placehold.co/600x400"
          alt="Wisata"
          fill
          objectFit="cover"
        />
      </div>
      <div className="p-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Panyaweuyan
        </h4>
        <p className="py-2">
          Sukasari Kidul, Kec. Argapura, Kabupaten Majalengka
        </p>
        <Rating rating={4} />
      </div>
      <div className="p-2">
        <Button asChild>
          <Link href={"/daftar-wisata/panyaweuyan"}>Lihat</Link>
        </Button>
      </div>
    </div>
  );
};

export default Card;
