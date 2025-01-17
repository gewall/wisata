import React from "react";
import SectionLayout from "../../_components/SectionLayout";
import FormObjekWisata from "./_sections/FormObjekWisata";

type Props = {};

const page = (props: Props) => {
  return (
    <SectionLayout>
      <div className="flex">
        <h5 className="font-bold">Tambah Objek Wisata</h5>
      </div>
      <div className="">
        <FormObjekWisata />
      </div>
    </SectionLayout>
  );
};

export default page;
