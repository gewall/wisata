import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/prisma";


export const DELETE = async(req:Request,{ params }: { params: Promise<{ id: string }> }) => {
    try {
        const {id} = await params

        const read = await prisma.wisata.findFirst({
            where:{
                id
            }
        })
        const images = read?.sampul+","+read?.galeri;

        images.split(",").forEach(async id => 

            await cloudinary.v2.uploader.destroy(id)
        )
        
        
        const deleteById = await prisma.wisata.delete({
            where:{
                id
            }
        });

        if(!deleteById) {
            return new Response(JSON.stringify({message: 'Gagal menghapus objek wisata'}), { status: 201 });
        }

        return new Response(JSON.stringify({message: 'Berhasil menghapus data'}), { status: 201 });
    } catch (error:any) {
        if(error)
            return new Response(JSON.stringify({message: error?.message}), { status: 500 });
    }
}