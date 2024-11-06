"use client"

import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "@/schemas/login";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'nextjs-toploader/app';
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/loader";

export default function () {
  const { status } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  if (status === "authenticated") router.push("/home")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleLogin = async (provider: string) => {
    await signIn(provider)
  }

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsSubmitting(true)

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (!res?.error) {
      toast({
        title: "Sucesso!",
        description: "Login realizado.",
        variant: "destructive",
        className: "bg-green-500 text-white",
      })

      router.push("/home")
    } else {
      toast({
        title: "Erro.",
        description: res.code,
        variant: "destructive",
        className: "bg-red-500 text-white",
      })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen py-16">
      <div className="bg-[#ff7f00] w-[90%] h-[16px]"></div>
      <div className="flex flex-col gap-4 w-2/12">
        <div className="flex flex-col justify-center items-center gap-2">
          <Image src="/logo.png" alt="Logo" width="64" height="64" />
          <p className="text-[#ff7f00] text-lg font-extrabold">Entrar no HIVE PROJECT</p>
        </div>
        <div className="bg-[#272626] flex flex-col gap-4 rounded-[5rem] px-16 py-12">
          <Button
            onClick={() => handleLogin("google")}
            className="flex flex-row gap-2"
          >
            <img src="/assets/google.svg" alt="Google" width="24" height="24" />
            <p>Continuar com Google</p>
          </Button>
          <Button
            onClick={() => handleLogin("osu")}
            className="flex flex-row gap-2"
          >
            <img src="/assets/osu.svg" alt="Google" width="24" height="24" />
            <p>Continuar com osu!</p>
          </Button>
          <div className="bg-[#ff7f00] w-full h-[2px]"></div>
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
                {isSubmitting ? <Loader /> : "Entrar"}
              </Button>
              <Link href="/login/register" className="text-center text-white">
                Criar conta
              </Link>
              <Link href="/forgot-password" className="text-center text-white">
                Esqueceu sua senha?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-[#ff7f00] w-[90%] h-[16px]"></div>
    </div>
  )
}