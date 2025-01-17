"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { z } from "zod";
import { formSchema } from "./objekwisata.type";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsWisata: ColumnDef<z.infer<typeof formSchema>>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    accessorKey: "kunjungan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kunjungan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "telepon",
    header: "Telepon",
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;
      const { toast } = useToast();
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu aksi</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/objek-wisata/${data.slug}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const resp = await fetch(`/api/wisata/delete/${data.id}`, {
                    method: "DELETE",
                  });
                  const res = await resp.json();

                  toast({
                    title: "Berhasil menghapus data!",
                    description: res.message,
                  });
                } catch (error: any) {
                  toast({
                    title: "Gagal menghapus data!",
                    description: error.message,
                  });
                }
              }}
            >
              <span className="text-red-500 hover:text-red-500">Hapus</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
