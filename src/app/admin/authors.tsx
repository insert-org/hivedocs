import { useQuery } from "@tanstack/react-query"
import { getAuthors, updateAuthor } from "./actions"
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
import { Author } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

export const Authors = () => {
  const [query, setQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState<string | false>(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null)
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateAuthorSchema),
    defaultValues: {
      name: "",
      resume: "",
    }
  });

  useEffect(() => {
    if (selectedAuthor) {
      setValue("name", selectedAuthor.name)
      setValue("resume", selectedAuthor.resume)
    }
  }, [selectedAuthor])

  const { data, refetch } = useQuery({
    queryKey: ["authors", query],
    queryFn: () => getAuthors(query),
  })

  const onChangeStatus = async (id: string, approved: boolean) => {
    setIsSubmitting(id)
    try {
      await updateAuthor(id, { approved })

      toast({
        title: "Sucesso!",
        description: "As informações do autor foram editadas.",
        variant: "destructive",
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      setIsSubmitting(false)
    }
  }

  const onSubmit = async (data: z.infer<typeof UpdateAuthorSchema>) => {
    if (!selectedAuthor) return
    setIsSubmittingEdit(true)
    try {
      await updateAuthor(selectedAuthor.id, data)

      toast({
        title: "Sucesso!",
        description: "As informações do autor foram editadas.",
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

  const onError = (error: any) => {
    console.error("Error", error);

    toast({
      title: "Erro.",
      description: error.message,
      variant: "destructive",
      className: "bg-red-500 text-white",
    })
  };

  const onSuccess = async (res: IKUploadResponse) => {
    if (!selectedAuthor) return
    try {
      await updateAuthor(selectedAuthor.id, {
        image: res.url,
        imageId: res.fileId,
      });

      toast({
        title: "Sucesso!",
        description: "Foto de perfil atualizada.",
        variant: "destructive",
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Editar Autor</ModalHeader>
              <ModalBody>
                <IKUpload fileName="author_photo" onError={onError} onSuccess={onSuccess} />
                <Input
                  label="Nome"
                  {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                <Input
                  label="Resumo"
                  {...register("resume")}
                />
                {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
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
      <div className="flex flex-col gap-2 w-full">
        <Input placeholder="Pesquisar autor" onChange={(e) => setQuery(e.target.value)} />
        {data?.map((author) => {
          const isLoading = isSubmitting === author.id

          return (
            <div key={author.id} className="flex flex-col justify-center border-2 border-gray-300 rounded-xl px-2 py-3">
              <div className="flex flex-row justify-between items-center">
                <p className="font-bold">{author.name}</p>
                <div className="flex flex-row gap-2 w-[25%]">
                  <Button
                    isIconOnly
                    onPress={() => {
                      onOpen()
                      setSelectedAuthor(author)
                    }}
                  >
                    <Edit />
                  </Button>
                  <Select
                    aria-label="Aprovar autor"
                    defaultSelectedKeys={[author.approved ? "true" : "false"]}
                    color={author.approved ? "success" : "warning"}
                    onChange={(value) => onChangeStatus(author.id, value.target.value === "true")}
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