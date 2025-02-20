"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

export interface iNavbarItem {
  url: string;
  name: string;
}

const Navbar = ({ links }: { links?: iNavbarItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const val = event.target.cari.value;
    router.push("/daftar-wisata?cari=" + val);
  };
  return (
    <Fragment>
      <nav className="flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <div className="text-xl font-bold">SIROTA</div>
        <form
          method="POST"
          className="relative w-44 md:w-96"
          onSubmit={handleSubmit}
        >
          <Input name="cari" type="text" />
          <Button
            type="submit"
            className="absolute right-0 top-0"
            variant={"ghost"}
          >
            <Search size={8} />
          </Button>
        </form>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {links?.map((_, i) => (
            <li key={i}>
              <Link href={_.url} className="hover:text-gray-600">
                {_.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Buttons
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline">Login</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <a href="#profile">Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#settings">Settings</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#logout">Logout</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <ul className="flex flex-col space-y-4 p-4">
            {links?.map((_, i) => (
              <li key={i}>
                <Link
                  href={_.url}
                  className="block text-gray-600 hover:text-gray-800"
                >
                  {_.name}
                </Link>
              </li>
            ))}

            {/* <li>
              <Button className="w-full" variant="outline">
                Login
              </Button>
            </li> */}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;
