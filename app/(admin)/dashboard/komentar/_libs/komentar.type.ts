"use client"
import { optional, z } from "zod"

export const formSchema = z.object({
    id: z.string().optional(),
    namaWisata: z.string(),
    text: z.string(),
    ratingWisata: z.string(),
    ratring: z.string()
})
