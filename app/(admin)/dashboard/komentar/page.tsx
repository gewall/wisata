"use client";

import React from "react";

import { DataTable } from "../_components/Datatable";
import { columnsKomentar } from "./_libs/columns";
import { Button } from "@/components/ui/button";
import SectionLayout from "../_components/SectionLayout";
import { Link, PlusCircle } from "lucide-react";

const Komentar = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch("/api/komentar");
        const res = await resp.json();

        const _data = res.data.map((_: any) => ({
          ..._,
          ratingWisata: _.rating[0].rating,
          namaWisata: _.wisata.nama,
        }));

        setData(_data);
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
          <h5 className="font-bold">List Komentar</h5>
        </div>
        <DataTable columns={columnsKomentar} data={data} filter="namaWisata" />
      </div>
    </SectionLayout>
  );
};

export default Komentar;
