import Image from "next/image";
import React from "react";
import Rating from "./Rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface iWisata {
  nama?: string;
  alamat?: string;
  slug?: string;
  kunjungan?: number;
}

const Card = ({ alamat, kunjungan, slug, nama }: iWisata) => {
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
          {nama}
        </h4>
        <p className="py-2">{alamat}</p>
        <Rating rating={4} />
      </div>
      <div className="p-2">
        <Button asChild>
          <Link href={`/daftar-wisata/${slug}`}>Lihat</Link>
        </Button>
      </div>
    </div>
  );
};

export default Card;
