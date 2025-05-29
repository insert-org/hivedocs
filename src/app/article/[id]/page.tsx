"use client"

import { useParams } from "next/navigation"
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
    <div className="flex flex-col gap-8 w-full h-full py-8">
      <Article articleId={id} />
      <UserReview articleId={id} />
      <Reviews articleId={id} userId={session?.user?.id} />
    </div>
  )
}