"use client"

import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, RegisterSchema } from "@/schemas/login";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'nextjs-toploader/app';
import { z } from "zod";
import { createUser } from "./actions";
import { useState } from "react";
import { Loader } from "@/components/loader";
import { useToast } from "@/hooks/use-toast";

export default function () {
  const { status } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  if (status === "authenticated") router.push("/home")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setIsSubmitting(true)
    try {
      await createUser(data)

      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso.",
        variant: "destructive",
        className: "bg-green-500 text-white",
      })
    } catch (error: any) {
      console.error(error)

      toast({
        title: "Erro.",
        description: error.message,
        variant: "destructive",
        className: "bg-red-500 text-white",
      })
    } finally {
      setIsSubmitting(false)
      reset()
      router.push("/login")
    }
  }

  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen py-16">
      <div className="bg-[#ff7f00] w-[90%] h-[16px]"></div>
      <div className="flex flex-col gap-4 w-6/12">
        <div className="flex flex-col justify-center items-center gap-2">
          <Image src="/logo.png" alt="Logo" width="64" height="64" />
          <p className="text-[#ff7f00] text-lg font-extrabold">Se cadastre no HIVE PROJECT</p>
        </div>
        <div className="bg-[#272626] flex flex-col gap-4 rounded-[5rem] px-16 py-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <Input {...register("email")} type="email" label="Email" classNames={{ inputWrapper: "rounded-2xl" }} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              <Input {...register("password")} type="password" label="Senha" classNames={{ inputWrapper: "rounded-2xl" }} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              <Button
                type="submit"
                className="rounded-full bg-[#ff7f00] text-white font-bold"
              >
                {isSubmitting ? <Loader /> : "Cadastrar"}
              </Button>
              <Link href="/login" className="text-center text-white">
                Voltar
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-[#ff7f00] w-[90%] h-[16px]"></div>
    </div>
  )
}