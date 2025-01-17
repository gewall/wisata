import Komentar from "@/app/daftar-wisata/[slug]/_sections/Komentar";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/prisma";


export const GET = async(req:Request,{ params }: { params: Promise<{ id: string }> }) => {
    try {
        const {id} = await params

        const find = await prisma.wisata.findFirst({
            where:{
                slug:id
            },
            include:{
                komentars:{
                    include:{
                        rating: true,
                        _count:true
                    }
                }
            }
            
        })

        console.log(find);
        

        let rating = null

        if (find) {
            const totalRatings = find.komentars.reduce((acc, komentar) => acc + komentar.rating.reduce((sum, r) => sum + r.rating, 0), 0);
            const averageRating = totalRatings ? totalRatings / find.komentars.length : 0;
            const roundedRating = Math.round(averageRating * 2) / 2; // Round to nearest 0.5

            rating = roundedRating;
        }


    
        if(!find) {
            return new Response(JSON.stringify({message: 'Gagal mengambil objek wisata'}), { status: 201 });
        }

        return new Response(JSON.stringify({message: 'Berhasil mengambil data',data:{...find,rating, komentarCount: find.komentars.length}}), { status: 201 });
    } catch (error:any) {
        if(error)
            return new Response(JSON.stringify({message: error?.message}), { status: 500 });
    }
}