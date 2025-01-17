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

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { formSchema } from "./komentar.type";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsKomentar: ColumnDef<z.infer<typeof formSchema>>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "namaWisata",
    header: "Wisata",
  },
  {
    accessorKey: "text",
    header: "Komentar",
  },
  {
    accessorKey: "ratingWisata",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
              onClick={async () => {
                try {
                  const resp = await fetch(`/api/komentar/delete/${data.id}`, {
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
