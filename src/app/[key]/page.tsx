"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { useSession } from "next-auth/react"
import { Loader } from "@/components/loader"
import { Image } from "@nextui-org/react"

export default function () {
  const { key }: { key: string } = useParams()

  if (status === "loading") return <Loader />

  return (
    <div className="flex flex-col items-center min-h-screen w-screen max-w-[100vw] p-16">
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
      <div className="flex flex-col items-center gap-8 w-full h-full py-8">
        <Header />
        <Image src={`https://ik.imagekit.io/hivedocs/${key}`} />
      </div>
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
    </div>
  )
}