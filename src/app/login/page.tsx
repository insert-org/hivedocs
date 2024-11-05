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

export default function Login() {
  const { status } = useSession()
  const router = useRouter()

  if (status === "authenticated") router.push("/")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (provider: string) => {
    await signIn(provider)
  }

  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen py-16">
      <div className="bg-[#ff7f00] w-[90%] h-[16px]"></div>
      <div className="flex flex-col gap-4">
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
          <form onSubmit={handleSubmit((d) => console.log(d))}>
            <div className="flex flex-col gap-4">
              <Input type="email" label="Email" classNames={{ inputWrapper: "rounded-full" }} />
              <Input type="password" label="Senha" classNames={{ inputWrapper: "rounded-full" }} />
              <Button
                type="submit"
                className="rounded-full bg-[#ff7f00] text-white font-bold"
              >
                Entrar
              </Button>
              <Link href="/register" className="text-center text-white">
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