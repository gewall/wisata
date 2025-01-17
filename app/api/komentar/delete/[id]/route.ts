
import { prisma } from "@/prisma";


export const DELETE = async(req:Request,{ params }: { params: Promise<{ id: string }> }) => {
    try {
        const {id} = await params
        
        const deleteById = await prisma.komentar.delete({
            where:{
                id
            }
        });

        if(!deleteById) {
            return new Response(JSON.stringify({message: 'Gagal menghapus komentar'}), { status: 201 });
        }

        return new Response(JSON.stringify({message: 'Berhasil menghapus data'}), { status: 201 });
    } catch (error:any) {
        if(error)
            return new Response(JSON.stringify({message: error?.message}), { status: 500 });
    }
}