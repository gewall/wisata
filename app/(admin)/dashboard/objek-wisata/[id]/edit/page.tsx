"use client";

import React from "react";
import SectionLayout from "../../../_components/SectionLayout";
import FormObjekWisata from "./_sections/FormObjekWisata";
import { useParams } from "next/navigation";

const EditObjekWisata = () => {
  const { id } = useParams();
  return (
    <SectionLayout>
      <div className="flex">
        <h5 className="font-bold">Edit Objek Wisata</h5>
      </div>
      <div className="">
        <FormObjekWisata id={id as string} />
      </div>
    </SectionLayout>
  );
};

export default EditObjekWisata;
