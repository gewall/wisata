"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Delete, History, Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formSchema } from "../../../_libs/objekwisata.type";
import { CldImage } from "next-cloudinary";

const FormObjekWisata = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  console.log(id);

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch(`/api/wisata/${id}`);
        const res = await resp.json();

        form.reset({
          nama: res.data?.nama || "",
          slug: res.data?.slug || "",
          alamat: res.data?.alamat || "",
          kunjungan: res.data?.kunjungan || 0,
          telepon: res.data?.telepon || "",
          deskripsi: res.data?.deskripsi || "",
        });

        setData(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getData();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "galeri") {
          Array.from(values.galeri || []).forEach((file) => {
            formData.append("galeri", file);
          });
        } else {
          formData.append(key, values[key as keyof typeof values] as any);
        }
      });

      setLoading(true);
      const res = await fetch(`/api/wisata/edit/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const resp = await res.json();

      toast({
        title: "Berhasil Menambah Objek Wisata",
        description: resp.message,
      });
    } catch (error: any) {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "Gagal Menambah Objek Wisata",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  }

  const onError = (v: any) => {
    console.log(v);
  };
  return (
    <div className="my-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          encType="multipart/form-data"
        >
          <div className="gap-4 grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama wisata</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama wisata" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan slug contoh: terasering-panyaweuyan"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat wisata</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan alamat wisata"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi wisata</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan deskripsi wisata"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telepon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Telepon wisata</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan no. telepon wisata"
                      {...field}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kunjungan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Kunjungan wisata</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan jumlah kunjungan wisata"
                      {...field}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sampul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto Sampul wisata</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan foto sampul wisata"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] || null)
                      }
                      type="file"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="galeri"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Galeri wisata</FormLabel>
                  <FormControl>
                    <Input
                      multiple
                      placeholder="Masukkan galeri foto wsata"
                      onChange={(e) => field.onChange(e.target.files || null)}
                      type="file"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <CldImage
                src={data?.sampul} // Use this sample image or upload your own via the Media Explorer
                width={250}
                height={250}
                crop={{
                  type: "auto",
                  source: true,
                }}
                alt="Wisata"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {data.galeri &&
                data?.galeri?.split(",").map((_: any, i: number) => (
                  <CldImage
                    key={i}
                    src={_} // Use this sample image or upload your own via the Media Explorer
                    width={150}
                    height={150}
                    crop={{
                      type: "auto",
                      source: true,
                    }}
                    alt="Wisata"
                  />
                ))}
            </div>
          </div>
          <div className="flex justify-end my-4 gap-4">
            <Button type="reset" className="bg-red-400 hover:bg-red-600">
              <Delete />
              Reset
            </Button>
            <Button type="submit" className="bg-sky-400 hover:bg-sky-600">
              {loading ? <Loader2 className="animate-spin" /> : <Save />}
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormObjekWisata;
