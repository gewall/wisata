"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { formSchema } from "../_libs/komentar.type";
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
import { RatingInput } from "@/app/_components/Rating";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Komentar = ({ wisataId }: { wisataId: string }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const resp = await fetch("/api/komentar/add", {
        method: "POST",
        body: JSON.stringify({ ...values, wisataId }),
      });
      const res = await resp.json();
      toast({
        title: "Berhasil!",
        description: "Komentar anda berhasil disimpan",
      });
      console.log(res);
    } catch (error: any) {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "Gagal!",
        description: "Komentar anda gagal disimpan",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="space-y-2">
      <div className="scroll-m-20 text-xl font-semibold tracking-tight">
        <h4>Komentar</h4>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Masukkan nama anda." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="komentar"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Masukkkan komentar anda"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Mohon untuk mengunakan bahasa yang sopan.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RatingInput
                    max={5}
                    onChange={(e) => field.onChange(e || null)}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-2">
            <Button type="submit" className="bg-sky-400 hover:bg-sky-600 ">
              {loading && <Loader2 className="animate-spin" />}Kirim
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Komentar;
