"use client"
import { z } from "zod"

export const formSchema = z.object({
    id: z.string().optional(),
    komentar: z.string({message:"Masukkan komentar"}),
    rating: z.coerce.number(),
    nama: z.string({message:"Masukkan nama anada"}),

})
