import React from "react";
import { iNavbarItem } from "./Navbar";
import Link from "next/link";

const Footer = ({ links }: { links?: iNavbarItem[] }) => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between ">
          {/* Logo dan Deskripsi */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-bold text-white">
              SIROTA <br />
              (Sistem Rekomedasi Objek Wisata)
            </h2>
            <p className="mt-2 text-sm">
              Membantu Anda menciptakan pengalaman terbaik.
            </p>
          </div>

          {/* Navigasi */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-2">Navigasi</h3>
            <ul>
              {links?.map((_, i) => (
                <li className="mb-1" key={i}>
                  <Link href={_.url} className="hover:text-yellow-400">
                    {_.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold text-white mb-2">
              Kontak Kami
            </h3>
            <ul>
              <li className="mb-1">Email: alfatarfattar@gmail.com</li>
              <li className="mb-1">Telepon: 082318018103</li>
              <li>Alamat: Majalengka, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Garis Pembatas */}
        <div className="border-t border-gray-700 mt-6"></div>

        {/* Hak Cipta */}
        <div className="mt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} SIROTA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
