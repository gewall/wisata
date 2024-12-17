"use client";

import Card from "@/app/_components/Card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Fuse from "fuse.js";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

const fuseOptions = {
  keys: ["NAMA OBYEK DAYA TARIK WISATA", "ALAMAT", "SLUG"], // Kunci yang ingin dicari
  includeScore: true, // Menampilkan skor relevansi (opsional)
  threshold: 0.3, // Menentukan tingkat fuzzy matching
};

const Lists = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string>();
  const searchParams = useSearchParams();
  //   let index = parseInt(searchParams.get("i") as string) || 1;
  const pageArr = data.length / 8;
  const route = useRouter();

  const [index, setIndex] = useState(
    parseInt(searchParams.get("i") as string) | 1
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/excel");
        const result = await response.json();
        // console.log(result);

        if (response.ok) {
          const fuse = new Fuse(result.data, fuseOptions);

          if (searchParams.get("cari")) {
            const res = fuse.search(searchParams.get("cari") as string);
            console.log(res, "cari");
            const _res = res.map((_) => _.item) as [];

            setData(_res);
          } else {
            setData(result.data);
          }
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [searchParams.get("cari")]);
  console.log(searchParams.get("cari"));

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {data.slice(index * 8 - 8, 8 * index).map((_, i) => (
          <Fragment key={i}>
            <Card
              nama={_["NAMA OBYEK DAYA TARIK WISATA"]}
              alamat={_["ALAMAT"]}
              slug={_["SLUG"]}
            />
          </Fragment>
        ))}
      </div>
      <Pagination className="py-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                setIndex(index - 1);
                route.push(`/daftar-wisata?i=${index - 1}`);
              }}
              //   href={`/daftar-wisata?i=${
              //     (index as number) > 1 ? (index as number) - 1 : index
              //   }`}
            />
          </PaginationItem>
          <PaginationItem>
            {Array.from(
              { length: index >= 7 ? 7 : pageArr + index - 4 },
              (_, i) => (
                <Fragment key={i}>
                  <PaginationLink
                    onClick={(e) => {
                      setIndex(i + 1);
                      route.push(`/daftar-wisata?i=${i + 1}`);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </Fragment>
              )
            ).slice(index - 1, index + 1)}
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                setIndex(index + 1);
                route.push(`/daftar-wisata?i=${index + 1}`);
              }}
              //   href={`/daftar-wisata?i=${
              //     (index as number) >= 1 ? (index as number) + 1 : index
              //   }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Lists;
