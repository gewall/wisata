

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/prisma";
import { randomUUID } from "crypto";
import { NextRequest } from "next/server";



export const POST = async(request:NextRequest)=> {
    try {
    const body = await request.json();
   

     const data = {
        wisataId: body.wisataId,
        text: body.komentar,
        nama: body.nama,
   
     }

  
        
    const createKomentar = await prisma.komentar.create({
        data:data
    })  
    console.log(createKomentar);

    if(!createKomentar){
        return new Response(JSON.stringify({message: 'Gagal menambahkan komentar'}), { status: 500 });
    }

    const ratingData = {
        rating: body.rating,
        komentarId: createKomentar.id
    }

    const createRating = await prisma.rating.create({
        data: ratingData
    })

    if(!createRating){
        return new Response(JSON.stringify({message: 'Gagal menambahkan komentar'}), { status: 500 });
    }

    // if(!create) {
    //     return new Response(JSON.stringify({message: 'Gagal menambahkan wisata'}), { status: 500 });
    // }

    return new Response(JSON.stringify({message:"Berhasil menambah wisata"}));
    // return new Response(JSON.stringify({message:"Berhasil menambah wisata",data: create}));
    } catch (error:any) {
        if(error)
            return new Response(JSON.stringify({message:"Error",error:error.message}),{ status: 500 });
    }

   

    
}