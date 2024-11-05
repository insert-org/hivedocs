"use client"

import { Header } from "@/components/header"
import { Button } from "@nextui-org/button"
import { Avatar, Image, Link } from "@nextui-org/react"
import { ArrowRight, List, Loader2, Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getArticles } from "./actions"
import { useEffect, useState } from "react"
import { ArticleWithRelations } from "@/types/article"
import { siteConfig } from "@/config/site"

export default function Index() {
  const [selectedArticle, setSelectedArticle] = useState<Omit<ArticleWithRelations, "reviews"> | null>(null)

  const { data, status, error, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(),
  })

  useEffect(() => {
    if (status === "success") {
      setSelectedArticle(data[0])
    }
  }, [status])

  if (error) return <p>{error.message}</p>

  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen p-16">
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
      <div className="flex flex-col items-center gap-8 w-full h-full py-8">
        <Header />
        {
          isLoading ? (
            <Loader2 className="animate-spin" size={64} />
          ) : (

            <div className="flex flex-row gap-4 h-full">
              <div id="articles" className="flex flex-col gap-2 p-4 rounded-3xl border-[#ff7f00] border-2 w-[25%] h-full overflow-scroll">
                <div className="flex flex-row justify-between rounded-full border-[#ff7f00] border-2 p-1">
                  <Search />
                  <div className="flex flex-row items-center gap-2">
                    <p>Visto recentemente</p>
                    <List />
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <Button
                    className="uppercase bg-white border-[#ff7f00] border-2 w-full"
                  >
                    Artigos Científicos
                  </Button>
                  <Button
                    className="uppercase bg-white border-[#ff7f00] border-2 w-full"
                  >
                    Pesquisas
                  </Button>
                  <Button
                    className="uppercase bg-white border-[#ff7f00] border-2 w-full"
                  >
                    Discussões
                  </Button>
                </div>

                {
                  data?.map((article, index) => {
                    const isSelected = selectedArticle?.id === article.id

                    return (
                      <Button
                        key={index}
                        className={`flex flex-row justify-start items-center ${isSelected ? 'bg-[#ff7f00]' : 'bg-white'} gap-4 border-[#ff7f00] border-2 rounded-xl px-4 py-12`}
                        onClick={() => setSelectedArticle(article)}
                      >
                        <div>
                          <Avatar className="transition-transform w-16 h-16" src={article.image || siteConfig.emptyImage} />
                        </div>
                        <div className="flex flex-col items-start gap-2">
                          <p className="font-bold">
                            {article.title}
                          </p>
                          <p className="text-sm">
                            {article.author.name}
                          </p>
                        </div>
                      </Button>
                    )
                  })
                }
              </div>

              <div
                className="flex flex-col gap-8 p-4 rounded-3xl border-[#ff7f00] border-2 w-[50%] bg-opacity-60"
                style={{
                  backgroundImage: `url(${(selectedArticle?.image && selectedArticle?.image) || ""})`
                }}
              >
                <div className="flex flex-col justify-center items-center p-4 rounded-xl gap-2 bg-gray-500/25">
                  <p className="font-bold text-3xl text-center">{selectedArticle?.title}</p>
                  <p className="font-bold text-2xl">{selectedArticle?.author.name}</p>
                </div>
                <div id="articles" className="flex flex-row p-4 rounded-xl gap-2 h-full bg-gray-500/25">
                  <div className="w-11/12">
                    <p className="font-bold text-2xl">
                      {selectedArticle?.resume}
                    </p>
                  </div>
                  <div className="w-1/12">
                    <Link
                      href={`/article/${selectedArticle?.id}`}
                      className="flex flex-row justify-center items-center rounded-3xl p-4 text-black bg-white border-[#ff7f00] border-2 w-full"
                    >
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>

              <div id="articles" className="flex flex-col gap-2 p-4 rounded-3xl border-[#ff7f00] border-2 w-[25%]">
                <p className="font-bold text-3xl left-2 top-2 z-10">Sobre o autor</p>
                {
                  selectedArticle?.author.image && (
                    <Image
                      src={selectedArticle?.author.image}
                      alt="Professor"
                      classNames={{
                        img: "object-fill w-[50vw] h-[30vh]"
                      }}
                    />
                  )
                }
                <p>
                  {selectedArticle?.author.resume}
                </p>
              </div>
            </div>
          )
        }
      </div>
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
    </div>
  )
}
