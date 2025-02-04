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


       const data = readAll.map(_ => {
        
        let rating = null

        if (_) {
            const totalRatings = _.komentars.reduce((sum, komentar) => sum + komentar.rating.reduce((rSum, r) => rSum + r.rating, 0), 0);
            const totalKomentars = _.komentars.length;
            const averageRating = totalRatings ? totalRatings / totalKomentars : 0;
            const roundedRating = Math.round(averageRating * 2) / 2; // Round to nearest 0.5

            rating = roundedRating;
        }
        return {
        ..._,rating:rating
       }})
   


        return new Response(JSON.stringify({message: 'Berhasil mengambil data',data:data},(_, v) =>
            typeof v === "bigint" ? v.toString() : v,), { status: 201 });
    } catch (error:any) {
        if(error)
            console.log(error.message);
            
        return new Response(JSON.stringify({message: error?.message}), { status: 500 });
    }
}

