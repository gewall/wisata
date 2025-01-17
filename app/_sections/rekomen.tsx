"use client";

import React, { Fragment, useEffect, useState } from "react";
import Card from "../_components/Card";

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Indeks acak antara 0 dan i
    [array[i], array[j]] = [array[j], array[i]]; // Tukar elemen
  }
  return array;
}

const Rekomen = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/wisata");
        const result = await response.json();
        console.log(result);

        setData(result.data);
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
        shuffleArray(data)
          ?.slice(0, 4)
          .map((_: any, i) => (
            <Fragment key={i}>
              <Card
                nama={_?.nama}
                alamat={_?.alamat}
                slug={_?.slug}
                cover={_?.sampul}
                rating={_?.rating}
              />
            </Fragment>
          ))}
    </div>
  );
};

export default Rekomen;
