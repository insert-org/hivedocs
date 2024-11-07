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
import { Loader } from "@/components/loader";

type Props = {
  articleId: string
}

export const UserReview = ({ articleId }: Props) => {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const { data, refetch, isLoading } = useQuery({
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
    setIsSubmitting(true)
    try {
      await upsertReview(data?.id, articleId, userId, values)
    } catch (error) {
      console.error(error)
    } finally {
      setIsEditing(false)
      refetch()
      setIsSubmitting(false)
    }
  }

  const onDelete = async () => {
    if (!data) return
    setIsDeleting(true)
    try {
      await deleteReview(data?.id)
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      reset()
      onClose()
      setIsDeleting(false)
    }
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

  if (isLoading) return <Loader />

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
                <Button color="danger" onPress={() => onDelete()}>
                  {isDeleting ? <Loader /> : "Excluir"}
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
                  <Avatar src={session?.user?.image || undefined} className="w-14 h-14" />
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
                <div className="flex flex-col gap-2 w-full">
                  <Textarea
                    label="Avaliação (Opcional)"
                    placeholder="Escreva sua avaliação"
                    {...register("content")}
                  />
                  {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                {isEditing && (
                  <Button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setData()
                    }}
                    className="bg-[#ff7f00] text-white">
                    Descartar
                  </Button>
                )}
                <Button type="submit" className="bg-[#ff7f00] text-white">
                  {isSubmitting ? <Loader /> : "Salvar"}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-2 bg-gray-300 p-4 rounded-2xl">
            <p className="font-bold text-xl">Sua avaliação</p>
            <div className="w-full">
              <div className="flex flex-row items-center gap-4">
                <Avatar src={data.user.image || undefined} className="w-14 h-14" />
                <div className="flex flex-col gap-2 w-full">
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
                  <Textarea
                    value={data.content}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}