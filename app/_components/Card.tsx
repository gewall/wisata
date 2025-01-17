import Image from "next/image";
import React from "react";
import Rating from "./Rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CldImage } from "next-cloudinary";

export interface iWisata {
  nama?: string;
  alamat?: string;
  slug?: string;
  kunjungan?: number;
  cover?: string;
  rating?: number;
}

const Card = ({ alamat, kunjungan, slug, nama, cover, rating }: iWisata) => {
  return (
    <div className="border-2 border-slate-200 rounded-lg max-w-full md:max-w-80  flex flex-col">
      <div className="relative w-full h-48 overflow-hidden">
        {/* <Image
          src={`https://drive.google.com/uc?export=view&id=${cover}`}
          alt="Wisata"
          fill
          objectFit="cover"
        /> */}
        <CldImage
          src={cover as string} // Use this sample image or upload your own via the Media Explorer
          fill
          crop={{
            type: "auto",
            source: true,
          }}
          alt="Wisata"
        />
      </div>
      <div className="p-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {nama}
        </h4>
        <p className="py-2">{alamat}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex gap-2 items-center">
              <Rating rating={rating || 0} />
            </TooltipTrigger>
            <TooltipContent>
              <p> Berdasarkan pengalaman pengunjung</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
