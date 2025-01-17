import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/prisma";
import { randomUUID } from "crypto";

export const PUT = async (req: Request) => {
    try {

        const formData = await req.formData();

        // Extract fields from formData
        const sampul = formData.get("sampul") as File | null;
        const nama = formData.get("nama") as string;
        const slug = formData.get("slug") as string;
        const deskripsi = formData.get("deskripsi") as string;
        const alamat = formData.get("alamat") as string;
        const kunjungan = parseInt(formData.get("kunjungan") as string) || 0;
        const telepon = parseInt(formData.get("telepon") as string) || 0;
        const galeri = formData.getAll("galeri") as File[];

        // Fetch existing data
        const existingData = await prisma.wisata.findFirst({
            where: { slug }
        });

        if (!existingData) {
            return new Response(JSON.stringify({ message: "Data tidak ditemukan" }), { status: 404 });
        }

        let newSampul = existingData.sampul;
        let newGaleri = existingData.galeri ? existingData.galeri.split(",") : [];

        // Handle sampul upload if a new sampul is provided
        console.log(sampul instanceof File);
        
        if (sampul instanceof File) {
            if (existingData.sampul) {
                await cloudinary.v2.uploader.destroy(existingData.sampul);
            }

            const sampulBuffer = Buffer.from(await sampul.arrayBuffer());
            const uploadSampul = await cloudinary.v2.uploader.upload(
                `data:${sampul.type};base64,${sampulBuffer.toString("base64")}`,
                { public_id: randomUUID() }
            );

            if (!uploadSampul) {
                return new Response(JSON.stringify({ message: "Gagal mengunggah sampul" }), { status: 500 });
            }

            newSampul = uploadSampul.public_id;
        }

        // Handle galeri upload if new galeri files are provided
        if (galeri.length > 0) {
            // Delete existing galeri images
            if (newGaleri.length > 0) {
                await Promise.all(newGaleri.map(id => cloudinary.v2.uploader.destroy(id)));
            }

            // Upload new galeri images
            const uploadedImages = await Promise.all(
                galeri.map(async image => {
                    const imageBuffer = Buffer.from(await image.arrayBuffer());
                    const uploadResult = await cloudinary.v2.uploader.upload(
                        `data:${image.type};base64,${imageBuffer.toString("base64")}`,
                        { public_id: randomUUID() }
                    );

                    return uploadResult.public_id;
                })
            );

            newGaleri = uploadedImages;
        }

        // Prepare data for update
        const updateData = {
            nama,
            slug,
            deskripsi,
            alamat,
            kunjungan,
            telepon,
            sampul: newSampul,
            galeri: newGaleri.join(",")
        };

        // Update data in database
        const updatedWisata = await prisma.wisata.update({
            where: { slug },
            data: updateData
        });

        if (!updatedWisata) {
            return new Response(JSON.stringify({ message: "Gagal mengedit data" }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: "Berhasil mengedit data", data: updatedWisata }), { status: 200 });
    } catch (error: any) {
        console.error("Error updating wisata:", error);
        return new Response(JSON.stringify({ message: error.message || "Terjadi kesalahan" }), { status: 500 });
    }
};
