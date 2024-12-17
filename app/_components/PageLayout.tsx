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
    <div>
      <Navbar links={links} />
      {children}
      <Footer links={links} />
    </div>
  );
};

export default PageLayout;
