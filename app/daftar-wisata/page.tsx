import { Metadata } from "next";
import React, { Suspense } from "react";
import PageLayout from "../_components/PageLayout";
import Lists from "./_sections/lists";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Sistem Rekomendasi Objek Wisata",
  description: "Sistem Rekomendasi Objek Wisata",
};

const page = () => {
  return (
    <PageLayout>
      <div className="container p-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Daftar Wisata di Majalengka
        </h3>
        <div className="py-4">
          <Suspense
            fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
          >
            <Lists />
          </Suspense>
        </div>
      </div>
    </PageLayout>
  );
};

export default page;
