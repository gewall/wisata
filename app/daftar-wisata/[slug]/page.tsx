"use client";

import PageLayout from "@/app/_components/PageLayout";
import Rating from "@/app/_components/Rating";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import Komentar from "./_sections/Komentar";
import { CldImage } from "next-cloudinary";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

// export async function generateStaticParams() {
//   const posts = await fetch(process.env.BASE_URL + "/api/excel").then((res) =>
//     res.json()
//   );
//   console.log(posts);

//   return posts.data.map((post: any) => ({
//     slug: post["SLUG"],
//   }));
// }

const Wisata = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>({});

  useEffect(() => {
    async function getPost() {
      try {
        const res = await fetch(`/api/wisata/${slug}`);
        const post = await res.json();

        setPost(post.data);
      } catch (error: any) {
        console.log(error?.message);
      }
    }

    getPost();
  }, []);

  console.log(post);

  return (
    <PageLayout>
      <div className="container p-8">
        <div className="relative w-full h-96 top-0 -z-10">
          {/* <Image
            src={`https://drive.google.com/uc?export=view&id=${post["SAMPUL"]}`}
            alt="Hero Image"
            fill
            objectFit="cover"
          /> */}
          {post?.sampul && (
            <CldImage
              src={post?.sampul as string | "cld-sample-5"} // Use this sample image or upload your own via the Media Explorer
              fill
              crop={{
                type: "auto",
                source: true,
              }}
              alt="Wisata"
            />
          )}
        </div>
        <div className="py-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
            {post?.nama}
          </h2>
          <p className="leading-7 text-justify">{post?.deskripsi}</p>

          <table className="w-full border-none">
            <tbody>
              <tr className="m-0  p-0 ">
                <td className=" w-16 font-bold py-2 text-left">Lokasi</td>
                <td className=" w-1">:</td>
                <td className="py-2 text-left">{post?.alamat}</td>
              </tr>
              <tr className="m-0  p-0 ">
                <td className="w-16 font-bold  py-2 text-left">Telepon</td>
                <td className=" w-1">:</td>
                <td className="  py-2 text-left"> {post?.telepon}</td>
              </tr>
              <tr className="m-0  p-0 ">
                <td className="w-16 font-bold  py-2 text-left">Kunjungan</td>
                <td className=" w-1">:</td>
                <td className="  py-2 text-left"> {post?.kunjungan}</td>
              </tr>
              {/* <tr className="m-0  p-0 ">
                <td className="w-16 font-bold  py-2 text-left">Jam</td>
                <td className=" w-1">:</td>
                <td className="  py-2 text-left">07:00 - 17:00</td>
              </tr> */}
              <tr className="m-0  p-0 ">
                <td className="w-16 font-bold  py-2 text-left">Rating</td>
                <td className=" w-1">:</td>
                <td className="py-2 text-left flex gap-2">
                  <Rating rating={parseFloat(post?.rating || "0")} />
                  <span>/ {post?.komentarCount} Review</span>
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
            {post?.galeri &&
              post?.galeri?.split(",").map((_: any, i: any) => (
                <Fragment key={i}>
                  <CldImage
                    src={_ as string} // Use this sample image or upload your own via the Media Explorer
                    width={250}
                    height={250}
                    crop={{
                      type: "auto",
                      source: true,
                    }}
                    alt="Wisata"
                  />
                </Fragment>
              ))}
          </div>
        </div>
        <div className="">
          <Komentar wisataId={post?.id} />
        </div>
        <div className="my-4 border-2 p-4">
          {post?.komentars?.slice(0, 5).map((_: any, i: any) => (
            <div className="" key={i}>
              <h5 className="font-bold">{_.nama}</h5>
              <p>{_.text}</p>
              <Rating rating={parseFloat(_.rating[0]?.rating || "0")} />
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Wisata;
