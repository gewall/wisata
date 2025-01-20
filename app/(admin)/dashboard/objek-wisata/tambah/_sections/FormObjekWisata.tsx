"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "../../_libs/objekwisata.type";
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

type Props = {};

const FormObjekWisata = (props: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

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
      const res = await fetch("/api/wisata/upload", {
        method: "POST",
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
      console.log(error);
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
