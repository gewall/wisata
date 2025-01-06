import React from "react";
import PageLayout from "../_components/PageLayout";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sistem Rekomendasi Objek Wisata",
  description: "Sistem Rekomendasi Objek Wisata",
};
const page = () => {
  return (
    <PageLayout>
      <div className="container p-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Tentang Kami
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Menyediakan informasi komprehensif tentang berbagai destinasi menarik
          yang layak untuk dikunjungi. Menyajikan daftar objek wisata yang
          menarik, termasuk tempat-tempat populer seperti Kebun Teh Cipasung,
          Terasering Panyaweuyan, dan berbagai curug memukau. Setiap lokasi
          dilengkapi dengan deskripsi mendetail, alamat, serta informasi
          mengenai aksesibilitasnya. Menawarkan pesona alam Majalengka, yang
          memiliki beragam pilihan menarik seperti danau, kebun teh, dan
          pegunungan. Kami hadir dengan tujuan meningkatkan kesadaran akan
          potensi pariwisata di Majalengka serta menarik lebih banyak pengunjung
          untuk menikmati keindahan alam dan kekayaan budaya lokal. Dengan
          menyediakan informasi yang lengkap dan mudah diakses, para pengunjung
          dapat merencanakan liburan mereka dengan lebih efisien.
        </p>
      </div>
    </PageLayout>
  );
};

export default page;
