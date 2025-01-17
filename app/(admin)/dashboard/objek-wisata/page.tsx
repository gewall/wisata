"use client";

import React from "react";
import SectionLayout from "../_components/SectionLayout";
import { DataTable } from "../_components/Datatable";
import { columnsWisata } from "./_libs/columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const ObjekWisata = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch("/api/wisata");
        const res = await resp.json();

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  console.log(data);

  return (
    <SectionLayout>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h5 className="font-bold">List Objek Wisata</h5>
          <Button asChild className="bg-sky-400 hover:bg-sky-600">
            <Link href={"/dashboard/objek-wisata/tambah"}>
              <PlusCircle /> Tambah
            </Link>
          </Button>
        </div>
        <DataTable columns={columnsWisata} data={data} filter="nama" />
      </div>
    </SectionLayout>
  );
};

export default ObjekWisata;
