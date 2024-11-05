import { ReviewWithRelations } from "@/types/review"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { deleteReview, getReviews, getUserReview, upsertReview } from "./actions"
import { Textarea } from "@nextui-org/input";
import { Avatar, Button } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewSchema } from "@/schemas/review";
import { z } from "zod";
import { Edit, Trash } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";

type Props = {
  articleId: string
}

export const UserReview = ({ articleId }: Props) => {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const userId = session?.user?.id || ""

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      rating: 0,
      content: ""
    }
  });

  const values = watch()

  const { data, refetch } = useQuery({
    queryKey: ["review"],
    queryFn: () => getUserReview(articleId, userId),
    enabled: !!userId,
  })

  if (!userId) return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-500">Faça login para deixar sua avaliação</p>
    </div>
  )

  const onSubmit = async (values: z.infer<typeof ReviewSchema>) => {
    await upsertReview(data?.id, articleId, userId, values)
    setIsEditing(false)
    refetch()
  }

  const onDelete = async (onClose: () => void) => {
    if (!data) return
    await deleteReview(data?.id)
    refetch()
    reset()
    onClose()
  }

  const setData = () => {
    if (!data) {
      reset()
      return
    }
    setValue("rating", data.rating)
    setValue("content", data.content)
  }

  useEffect(() => {
    setData()
  }, [data])

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Excluir avaliação</ModalHeader>
              <ModalBody>
                <p>Tem certeza que deseja excluir sua avaliação?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="danger" onPress={() => onDelete(onClose)}>
                  Excluir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {
        !data || isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-end gap-2 bg-gray-300 p-4 rounded-2xl">
              <div className="flex flex-row items-center gap-2  w-full">
                <div className="flex flex-col items-center gap-2">
                  <Avatar src={session?.user?.image || siteConfig.emptyImage} className="w-14 h-14" />
                  <Rating
                    precision={0.5}
                    value={values.rating}
                    onChange={(_, newValue) => {
                      setValue("rating", newValue || 0);
                    }}
                    style={
                      errors.rating ? {
                        fontSize: "1.3rem",
                        border: "1px solid red",
                        borderRadius: "5px",
                      } : {
                        fontSize: "1.3rem",
                      }
                    }
                  />
                </div>
                <Textarea
                  label="Avaliação (Opcional)"
                  placeholder="Escreva sua avaliação"
                  {...register("content")}
                />
              </div>
              <div className="flex flex-row gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setData()
                  }}
                  className="bg-[#ff7f00] text-white">
                  Descartar
                </Button>
                <Button type="submit" className="bg-[#ff7f00] text-white">Salvar</Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-2 bg-gray-300 p-4 rounded-2xl">
            <p className="font-bold text-xl">Sua avaliação</p>
            <div className="w-full">
              <div className="flex flex-row items-center gap-2">
                <Avatar src={data.user.image || siteConfig.emptyImage} className="w-14 h-14" />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <p className={`font-bold text-xl`}>{data.user.name}</p>
                    <Rating
                      precision={0.25}
                      value={data.rating}
                      readOnly
                      sx={{
                        fontSize: "1.3rem",
                      }}
                    />
                    <Button isIconOnly onClick={() => setIsEditing(true)}>
                      <Edit />
                    </Button>
                    <Button isIconOnly onClick={onOpen}>
                      <Trash />
                    </Button>
                  </div>
                  <p>{data.content}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}