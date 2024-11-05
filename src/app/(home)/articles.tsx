"use client"

import { Avatar, Image } from "@nextui-org/react"
import { ArticleWithRelations } from "@/types/article"
import { useQuery } from "@tanstack/react-query"
import { getArticles } from "./actions"
import { Loader } from "@/components/loader"

export const Articles = () => {
  const { data, status, error } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(),
  })

  if (status === "pending") return <Loader />
  if (error) return <p>{error.message}</p>

  return (
    <>
      {
        data.map((article, index) => (
          <div key={index} className="flex flex-row justify-center items-center gap-4 border-[#ff7f00] border-2 rounded-xl p-4">
            <Avatar className="transition-transform w-16 h-16" src="https://github.com/lzbguts.png" />
            <div className="flex flex-col gap-2">
              <p className="font-bold">
                {article.title}
              </p>
              <p className="text-sm">
                {article.author.name}
              </p>
            </div>
          </div>
        ))
      }
    </>
  )
}