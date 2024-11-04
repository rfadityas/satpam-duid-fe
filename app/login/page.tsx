"use client";
import React from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validations/loginSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/config/request";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(dataUser: z.infer<typeof loginSchema>) {
    try {
      const response = await axiosInstance.post("/auth/login", dataUser);

      if (response.data.success === true) {
        alert("Login berhasil");
        form.reset();
      }
    } catch (err: any) {
      alert(err.error);
      form.reset();
    }
  }

  //   eslint-disable-next-line
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        alert("Logout berhasil");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRedirect = async () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-14 font-[family-name:var(--font-geist-mono)]">
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email anda" {...field} />
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
                      placeholder="Password anda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        <div className="flex items-center gap-2 mt-4">
          <div className="h-[2px] flex-1 bg-black"></div>
          <h1>Atau</h1>
          <div className="h-[2px] flex-1 bg-black"></div>
        </div>
        <Button
          variant="neutral"
          onClick={handleRedirect}
          className="w-full mt-4 gap-1"
        >
          <FcGoogle />
          Login dengan Google
        </Button>
        <Button
          variant="reverse"
          onClick={handleLogout}
          className="w-full mt-4"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Login;
