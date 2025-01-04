"use client";

import React, { Fragment, useEffect, useState } from "react";
import Card from "../_components/Card";

const Populer = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/excel");
        const result = await response.json();
        console.log(result);

        if (response.ok) {
          setData(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {data != undefined &&
        data?.slice(0, 4).map((_, i) => (
          <Fragment key={i}>
            <Card
              nama={_["NAMA OBYEK DAYA TARIK WISATA"]}
              alamat={_["ALAMAT"]}
              slug={_["SLUG"]}
              cover={_["SAMPUL"]}
              rating={_["RATING"]}
            />
          </Fragment>
        ))}
    </div>
  );
};

export default Populer;
