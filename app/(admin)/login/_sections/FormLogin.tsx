"use client";
import React from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  username: z
    .string({ message: "Username harus diisi!" })
    .min(2, { message: "Minimal 2 huruf!" })
    .max(50),
  password: z.string({ message: "Password harus diisi!" }),
});

const FormLogin = () => {
  const router = useRouter();
  const query = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    signIn("credentials", { ...values, redirectTo: "/dashboard" });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan username anda." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Masukkan password anda."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex py-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>

        {query.get("error") && (
          <Alert variant={"destructive"}>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Gagal Login!</AlertTitle>
            <AlertDescription>
              Username atau Password anda salah!
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
};

export default FormLogin;
