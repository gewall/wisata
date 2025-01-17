import { prisma } from "@/prisma";


export const GET = async() => {
    try {
        const readAll = await prisma.komentar.findMany({
            
            include:{
                rating: true,
                wisata: true
            }
        })

        if(!readAll) {
            return new Response(JSON.stringify({message: 'Data objek wisata kosong'}), { status: 201 });
        }

 

       const data = readAll.map(_ => ({
        ..._,rating:_.rating
       }))
   


        return new Response(JSON.stringify({message: 'Berhasil mengambil data',data:data}), { status: 201 });
    } catch (error:any) {
        if(error)
        return new Response(JSON.stringify({message: error?.message}), { status: 500 });
    }
}