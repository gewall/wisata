import PageLayout from "@/app/_components/PageLayout";
import Rating from "@/app/_components/Rating";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <PageLayout>
      <div className="container p-8">
        <div className="relative w-full h-96 top-0 -z-10">
          <Image
            src={"https://placehold.co/1080x720"}
            alt="Hero Image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="py-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
            Panyaweuyan
          </h2>
          <p className="leading-7 text-justify">
            Pos pengamatan puncak bukit yang menghadap sawah terasering, bukit
            berhutan, dan Gunung Berapi Cereme.
          </p>

          <table className="w-full border-none">
            <tbody>
              <tr className="m-0  p-0 ">
                <td className=" w-16 font-bold py-2 text-left">Lokasi</td>
                <td className=" w-1">:</td>
                <td className="py-2 text-left">
                  Sukasari Kidul, Kec. Argapura, Kabupaten Majalengka
                </td>
              </tr>
              <tr className="m-0  p-0 ">
                <td className="w-16 font-bold  py-2 text-left">Telepon</td>
                <td className=" w-1">:</td>
                <td className="  py-2 text-left">0823-1771-3377</td>
              </tr>
              <tr className="m-0  p-0 ">
                <td className="w-16 font-bold  py-2 text-left">Jam</td>
                <td className=" w-1">:</td>
                <td className="  py-2 text-left">07:00 - 17:00</td>
              </tr>
              <tr className="m-0  p-0 ">
                <td className="w-16 font-bold  py-2 text-left">Rating</td>
                <td className=" w-1">:</td>
                <td className="  py-2 text-left">
                  <Rating rating={4} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex gap-2">
            <Badge className="bg-sky-300 hover:bg-sky-600">Populer</Badge>
            <Badge className="bg-green-300 hover:bg-green-600">
              Rekomendasi
            </Badge>
          </div>
        </div>
        <div className="py-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Galeri
          </h4>
          <div className="grid grid-cols-4 gap-4 py-4">
            <Image
              src={"https://placehold.co/600x400"}
              alt="Image "
              width={400}
              height={400}
            />
            <Image
              src={"https://placehold.co/600x400"}
              alt="Image "
              width={400}
              height={400}
            />
            <Image
              src={"https://placehold.co/600x400"}
              alt="Image "
              width={400}
              height={400}
            />
            <Image
              src={"https://placehold.co/600x400"}
              alt="Image "
              width={400}
              height={400}
            />
            <Image
              src={"https://placehold.co/600x400"}
              alt="Image "
              width={400}
              height={400}
            />
            <Image
              src={"https://placehold.co/600x400"}
              alt="Image "
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default page;
