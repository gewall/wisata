"use client"
import { optional, z } from "zod"

export const formSchema = z.object({
    id: z.string().optional(),
    slug: z.string({message:"Masukkan minimal 2 huruf"}),
    nama: z.string({message:"Masukkan minimal 2 huruf"}),
    alamat: z.string({message:"Masukkan minimal 2 huruf"}),
    kunjungan: z.coerce.number({message:"Masukkan no"}),
    telepon: z.coerce.number({message:"Masukkan no"}),
    deskripsi: z.string({message:"Masukkan minimal 2 huruf"}),
    sampul: z.unknown().transform((value) => {
      return value as File;
    }).optional(),
    galeri: z.unknown({message:"Masukkan minimal 1 foto"}).transform((value) => {
        return value as FileList;
      }).optional(),
})
