

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/prisma";
import { randomUUID } from "crypto";
import { NextRequest } from "next/server";



export const POST = async(request:NextRequest)=> {
    try {
    const file = await request.formData()
    
    const sampul = file.get("sampul") as File;
    const nama = file.get("nama") as string;
    const slug = file.get("slug") as string;
    const deskripsi = file.get("deskripsi") as string;
    const alamat = file.get("alamat") as string;
    const kunjungan = file.get("kunjungan") as string;
    const telepon = file.get("telepon") as string;
    const galeri = file.getAll("galeri") as File[];


    const filePath = randomUUID()
    const sampulBuffer = Buffer.from(await sampul.arrayBuffer());
    const uploadSampul = await cloudinary.v2.uploader.upload(`data:${sampul.type};base64,${sampulBuffer.toString('base64')}`, { public_id: filePath });


    if(!uploadSampul){
        return new Response(JSON.stringify({message: 'Gagal menambahkan wisata'}), { status: 500 });
    }


    const uploadGaleriArray = await Promise.all(
        Array.from(galeri).map(async (image) => {
            const  _filePath = randomUUID()
            const imageBuffer = Buffer.from(await image.arrayBuffer());
            const upload_images = await cloudinary.v2.uploader.upload(`data:${image.type};base64,${imageBuffer.toString('base64')}`, { public_id: _filePath });
            return _filePath; 
        })
    );
    const uploadGaleri = uploadGaleriArray.join(",");


    if(!uploadGaleriArray) {
        return new Response(JSON.stringify({message: 'Gagal menambahkan wisata'}), { status: 500 });
    }
   
    

    const data  = {
        nama,deskripsi,alamat,kunjungan:kunjungan,telepon:telepon,slug,sampul:filePath,galeri:uploadGaleri
    }
    
    const create = await prisma.wisata.create({
        data:data
    })

    if(!create) {
        return new Response(JSON.stringify({message: 'Gagal menambahkan wisata'}), { status: 500 });
    }

    return new Response(JSON.stringify({message:"Berhasil menambah wisata"}));
    // return new Response(JSON.stringify({message:"Berhasil menambah wisata",data: create}));
    } catch (error:any) {
        if(error)
            console.log(error.message);
            
            return new Response(JSON.stringify({message:"Gagal menambahkan wisata: "+error.message,error:error.message}));
    }

   

    
}