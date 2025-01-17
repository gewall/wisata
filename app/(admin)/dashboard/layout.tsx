import { SidebarProvider } from "@/components/ui/sidebar";
import React, { CSSProperties, ReactNode } from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "14rem",
          "--sidebar-width-mobile": "14rem",
        } as CSSProperties
      }
    >
      <DashboardSidebar />
      <section className="bg-gray-100 w-screen">
        <Header />
        {children}
      </section>
      <Toaster />
    </SidebarProvider>
  );
};

export default Layout;
