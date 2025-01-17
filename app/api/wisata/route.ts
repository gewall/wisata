import { prisma } from "@/prisma";


export const GET = async() => {
    try {
        const readAll = await prisma.wisata.findMany({
            include:{
                komentars:{
                    include:{
                        rating: true,
                        _count:true
                    }
                }
            }
        });

        if(!readAll) {
            return new Response(JSON.stringify({message: 'Data objek wisata kosong'}), { status: 201 });
        }

        let rating = null

        if (readAll) {
            const totalRatings = readAll.reduce((acc, item) => acc + item.komentars.reduce((sum, komentar) => sum + komentar.rating.reduce((rSum, r) => rSum + r.rating, 0), 0), 0);
            const totalKomentars = readAll.reduce((acc, item) => acc + item.komentars.length, 0);
            const averageRating = totalRatings ? totalRatings / totalKomentars : 0;
            const roundedRating = Math.round(averageRating * 2) / 2; // Round to nearest 0.5

            rating = roundedRating;
        }

       const data = readAll.map(_ => ({
        ..._,rating:rating
       }))
   


        return new Response(JSON.stringify({message: 'Berhasil mengambil data',data:data}), { status: 201 });
    } catch (error:any) {
        if(error)
        return new Response(JSON.stringify({message: error?.message}), { status: 500 });
    }
}