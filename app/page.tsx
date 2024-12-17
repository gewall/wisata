import PageLayout from "./_components/PageLayout";
import Hero from "./_sections/hero";
import { Metadata } from "next";
import Populer from "./_sections/populer";
import Rekomen from "./_sections/rekomen";
export const metadata: Metadata = {
  title: "Sistem Informasi Rekomendasi Wisata",
  description: "Sistem Informasi Rekomendasi Wisata",
};
export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <div className="container p-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Tempat Wisata Terpopuler
        </h3>
        <div className="py-4">
          <Populer />
        </div>
      </div>
      <div className="container p-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Tempat Wisata Paling Direkomendasikan
        </h3>
        <div className="py-4">
          <Rekomen />
        </div>
      </div>
    </PageLayout>
  );
}
