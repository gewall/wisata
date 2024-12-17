import { Metadata } from "next";
import React from "react";
import PageLayout from "../_components/PageLayout";
import Lists from "./_sections/lists";

export const metadata: Metadata = {
  title: "Sistem Informasi Rekomendasi Wisata",
  description: "Sistem Informasi Rekomendasi Wisata",
};

const page = () => {
  return (
    <PageLayout>
      <div className="container p-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Daftar Wisata di Majalengka
        </h3>
        <div className="py-4">
          <Lists />
        </div>
      </div>
    </PageLayout>
  );
};

export default page;
