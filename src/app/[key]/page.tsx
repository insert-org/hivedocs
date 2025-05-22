"use client"

import { useParams } from "next/navigation"
import { Loader } from "@/components/loader"
import { Image } from "@nextui-org/react"

export default function () {
  const { key }: { key: string } = useParams()

  if (status === "loading") return <Loader />

  return (
    <div className="flex flex-col items-center gap-8 w-full h-full py-8">
      <Image src={`https://ik.imagekit.io/hivedocs/${key}`} />
    </div>
  )
}