import { useQuery } from "@tanstack/react-query"
import { getArticles, getAuthors, updateArticle, updateAuthor } from "./actions"
import { useEffect, useState } from "react"
import { Input } from "@nextui-org/input"
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Loader } from "@/components/loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAuthorSchema } from "@/schemas/author";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Edit } from "lucide-react";
import { z } from "zod";
import { Article, Author } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { UpdateArticleSchema } from "@/schemas/article";

export const Articles = () => {
  const [query, setQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState<string | false>(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateArticleSchema),
    defaultValues: {
      title: "",
      resume: "",
      url: "",
    }
  });

  useEffect(() => {
    if (selectedArticle) {
      setValue("title", selectedArticle.title)
      setValue("resume", selectedArticle.resume)
      setValue("url", selectedArticle.url || "")
    }
  }, [selectedArticle])

  const { data, refetch } = useQuery({
    queryKey: ["articles", query],
    queryFn: () => getArticles(query),
  })

  const onChange = async (id: string, approved: boolean) => {
    setIsSubmitting(id)
    try {
      await updateArticle(id, { approved })
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      setIsSubmitting(false)
    }
  }

  const onSubmit = async (data: z.infer<typeof UpdateArticleSchema>) => {
    if (!selectedArticle) return
    setIsSubmittingEdit(true)
    try {
      await updateArticle(selectedArticle.id, data)

      toast({
        title: "Sucesso!",
        description: "As informações do artigo foram editadas.",
        variant: "destructive",
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      setIsSubmittingEdit(false)
      onClose()
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Editar Autor</ModalHeader>
              <ModalBody>
                <Input
                  label="Nome"
                  {...register("title")}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                <Input
                  label="Resumo"
                  {...register("resume")}
                />
                {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
                <Input
                  label="URL"
                  {...register("url")}
                />
                {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
              </ModalBody>
              <ModalFooter>
                <Button type="button" color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button type="submit" color="primary">
                  {isSubmittingEdit ? <Loader /> : "Salvar"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
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
                <div className="flex flex-row gap-2 w-[25%]">
                  <Button
                    isIconOnly
                    onPress={() => {
                      setSelectedArticle(article)
                      setValue("title", article.title)
                      setValue("resume", article.resume)
                      setValue("url", article.url || "")
                      onOpen()
                    }}
                  >
                    <Edit />
                  </Button>
                  <Select
                    aria-label="Aprovar autor"
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
            </div>
          )
        })}
      </div>
    </>
  )
}