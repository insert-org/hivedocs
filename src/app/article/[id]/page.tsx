"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Article } from "./article"
import { Reviews } from "./reviews"
import { UserReview } from "./userReview"
import { useSession } from "next-auth/react"
import { Loader } from "@/components/loader"

export default function () {
  const { id }: { id: string } = useParams()
  const { data: session, status } = useSession()

  if (status === "loading") return <Loader />

  return (
    <div className="flex flex-col items-center min-h-screen w-screen p-16">
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
      <div className="flex flex-col gap-8 w-full h-full py-8">
        <Header />
        <Article articleId={id} />
        <UserReview articleId={id} />
        <Reviews articleId={id} userId={session?.user?.id} />
      </div>
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
    </div>
  )
}