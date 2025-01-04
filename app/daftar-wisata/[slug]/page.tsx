import PageLayout from "@/app/_components/PageLayout";
import Rating from "@/app/_components/Rating";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Sistem Informasi Rekomendasi Wisata",
  description: "Sistem Informasi Rekomendasi Wisata",
};
// export async function generateStaticParams() {
//   const posts = await fetch(process.env.BASE_URL + "/api/excel").then((res) =>
//     res.json()
//   );
//   console.log(posts);

//   return posts.data.map((post: any) => ({
//     slug: post["SLUG"],
//   }));
// }

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getPost(slug);

  async function getPost(slug: string) {
    const res = await fetch(process.env.BASE_URL + "/api/excel");
    const post = await res.json();
    const result = post.data.find((e: any) => e["SLUG"] === slug);
    return result;
  }

  console.log(post);

  return (
    <PageLayout>
      <div className="container p-8">
        <div className="relative w-full h-96 top-0 -z-10">
          <Image
            src={`https://drive.google.com/uc?export=view&id=${post["SAMPUL"]}`}
            alt="Hero Image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="py-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
            {post["NAMA OBYEK DAYA TARIK WISATA"]}
          </h2>
          <p className="leading-7 text-justify">{post["DESKRIPSI"]}</p>

          <table className="w-full border-none">
            <tbody>
              <tr className="m-0  p-0 ">
                <td className=" w-16 font-bold py-2 text-left">Lokasi</td>
                <td className=" w-1">:</td>
                <td className="py-2 text-left">{post["ALAMAT"]}</td>
              </tr>
              <tr className="m-0  p-0 ">
                <td className="w-16 font-bold  py-2 text-left">Telepon</td>
                <td className=" w-1">:</td>
                <td className="  py-2 text-left"> {post["TELP"]}</td>
              </tr>
              <tr className="m-0  p-0 ">
                <td className="w-16 font-bold  py-2 text-left">Kunjungan</td>
                <td className=" w-1">:</td>
                <td className="  py-2 text-left">
                  {" "}
                  {post["JUMLAH KUNJUNGAN"]}
                </td>
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
                  <Rating rating={parseFloat(post["RATING"])} />
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
            {post["GALERI"] &&
              post["GALERI"]
                ?.split(",")
                .map((_: any, i: any) => (
                  <Image
                    key={i}
                    src={`https://drive.google.com/uc?export=view&id=${_}`}
                    alt="Image "
                    width={400}
                    height={400}
                  />
                ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default page;
