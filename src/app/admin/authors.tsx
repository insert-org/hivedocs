import { useQuery } from "@tanstack/react-query"
import { getAuthors, updateAuthor } from "./actions"
import { useState } from "react"
import { Input } from "@nextui-org/input"
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Loader } from "@/components/loader";

export const Authors = () => {
  const [query, setQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState<string | false>(false)

  const { data, refetch } = useQuery({
    queryKey: ["authors", query],
    queryFn: () => getAuthors(query),
  })

  const onChange = async (id: string, approved: boolean) => {
    setIsSubmitting(id)
    try {
      await updateAuthor(id, approved)
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Input placeholder="Pesquisar autor" onChange={(e) => setQuery(e.target.value)} />
      {data?.map((author) => {
        const isLoading = isSubmitting === author.id

        return (
          <div key={author.id} className="flex flex-col justify-center border-2 border-gray-300 rounded-xl px-2 py-3">
            <div className="flex flex-row justify-between items-center">
              <p className="font-bold">{author.name}</p>
              <Select
                aria-label="Aprovar autor"
                className="w-[25%]"
                defaultSelectedKeys={[author.approved ? "true" : "false"]}
                color={author.approved ? "success" : "warning"}
                onChange={(value) => onChange(author.id, value.target.value === "true")}
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