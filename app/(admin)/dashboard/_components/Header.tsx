import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex justify-between px-6 py-4 rounded-md bg-white">
      <div className="">
        <SidebarTrigger />
      </div>
      <div className="">
        <h5 className="font-bold">Admin</h5>
      </div>
    </div>
  );
};

export default Header;
