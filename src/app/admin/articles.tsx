import { useQuery } from "@tanstack/react-query"
import { getArticles, getAuthors, updateArticle, updateAuthor } from "./actions"
import { useState } from "react"
import { Input } from "@nextui-org/input"
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Loader } from "@/components/loader";

export const Articles = () => {
  const [query, setQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState<string | false>(false)

  const { data, refetch } = useQuery({
    queryKey: ["articles", query],
    queryFn: () => getArticles(query),
  })

  const onChange = async (id: string, approved: boolean) => {
    setIsSubmitting(id)
    try {
      await updateArticle(id, approved)
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      setIsSubmitting(false)
    }
  }

  return (
    <div id="articles" className="flex flex-col gap-2 w-full h-[70vh] overflow-scroll">
      <Input placeholder="Pesquisar artigo" onChange={(e) => setQuery(e.target.value)} />
      {data?.map((article) => {
        const isLoading = isSubmitting === article.id

        return (
          <div key={article.id} className="flex flex-col justify-center border-2 border-gray-300 rounded-xl px-2 py-3">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 items-center">
                <p className="font-bold">{article.title}</p>
                <p>{article.author.name}</p>
              </div>
              <Select
                aria-label="Aprovar autor"
                className="w-[25%]"
                defaultSelectedKeys={[article.approved ? "true" : "false"]}
                color={article.approved ? "success" : "warning"}
                onChange={(value) => onChange(article.id, value.target.value === "true")}
                startContent={isLoading ? <Loader /> : null}
              >
                <SelectItem key="false" color="warning">
                  Pendente
                </SelectItem>
                <SelectItem key="true" color="success">
                  Aprovado
                </SelectItem>
              </Select>
            </div>
          </div>
        )
      })}
    </div>
  )
}