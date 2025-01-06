import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const links = [
  { name: "Beranda", url: "/" },
  { name: "Daftar Wisata", url: "/daftar-wisata" },
  { name: "Tentang Kami", url: "/tentang-kami" },
];

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <Navbar links={links} />
      </div>
      <div className="flex-1">{children}</div>
      <div className="flex-none">
        <Footer links={links} />
      </div>
    </div>
  );
};

export default PageLayout;
