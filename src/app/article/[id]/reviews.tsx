import { ReviewWithRelations } from "@/types/review"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { deleteAnswer, deleteReview, getReviews, upsertAnswer } from "./actions"
import { Avatar, Button, Textarea } from "@nextui-org/react"
import { siteConfig } from "@/config/site"
import { Rating } from "@mui/material"
import { Loader } from "@/components/loader"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useState } from "react"
import { Review, ReviewAnswer } from "@prisma/client"
import { Reply, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnswerSchema } from "@/schemas/answer"
import { z } from "zod"

type Props = {
  articleId: string
  userId: string | undefined
}

export const Reviews = ({ articleId, userId }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isOpenAnswer, onOpen: onOpenAnswer, onOpenChange: onOpenChangeAnswer, onClose: onCloseAnswer } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeletingAnswer, setIsDeletingAnswer] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<ReviewAnswer | null>(null)
  const [isReplying, setIsReplying] = useState<string | false>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { data: session } = useSession()

  const { data, status, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviews(articleId, userId),
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    if (!isReplying) return
    setIsSubmitting(true)
    try {
      await upsertAnswer(undefined, isReplying, session?.user.id || "", values)

      toast({
        title: "Sucesso!",
        description: "Resposta enviada.",
        variant: "destructive",
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      onClose()
      setIsSubmitting(false)
      setIsReplying(false)
    }
  }

  const onDelete = async () => {
    if (!selectedReview) return
    setIsDeleting(true)
    try {
      await deleteReview(selectedReview?.id)

      toast({
        title: "Sucesso!",
        description: "Avaliação excluída.",
        variant: "destructive",
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      onClose()
      setIsDeleting(false)
    }
  }

  const onDeleteAnswer = async () => {
    if (!selectedAnswer) return
    setIsDeletingAnswer(true)
    try {
      await deleteAnswer(selectedAnswer?.id)

      toast({
        title: "Sucesso!",
        description: "Resposta excluída.",
        variant: "destructive",
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      onCloseAnswer()
      setIsDeletingAnswer(false)
    }
  }

  if (status === "pending") return <Loader />
  if (status === "error") return <p>Artigo não encontrado</p>

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Excluir avaliação</ModalHeader>
              <ModalBody>
                <p>Tem certeza que deseja excluir essa avaliação?</p>
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

      <Modal isOpen={isOpenAnswer} onOpenChange={onOpenChangeAnswer}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Excluir resposta</ModalHeader>
              <ModalBody>
                <p>Tem certeza que deseja excluir essa resposta?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="danger" onPress={() => onDeleteAnswer()}>
                  {isDeletingAnswer ? <Loader /> : "Excluir"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex flex-col gap-8">
        {
          data?.map((review, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-4">
                <Avatar src={review.user.image || undefined} className="w-14 h-14" />
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-row items-center gap-2">
                    <p className={`font-bold text-xl`}>{review?.user.name}</p>
                    {
                      session?.user.role === "Admin" && (
                        <Button
                          isIconOnly
                          onClick={() => {
                            onOpen()
                            setSelectedReview(review)
                          }}
                        >
                          <Trash />
                        </Button>
                      )
                    }
                    <Button
                      isIconOnly
                      className={`${isReplying === review.id ? "bg-[#ff7f00]" : ""}`}
                      onClick={() => {
                        if (isReplying === review.id) {
                          setIsReplying(false)
                        } else {
                          setIsReplying(review.id)
                        }
                      }}
                    >
                      <Reply />
                    </Button>
                  </div>
                  <Rating
                    precision={0.5}
                    value={review.rating}
                    readOnly
                    sx={{
                      fontSize: "1.3rem",
                    }}
                  />
                  {
                    review.content && (
                      <Textarea
                        value={review.content}
                        readOnly
                      />
                    )
                  }
                </div>
              </div>
              <div className="flex flex-col gap-4 pl-16">
                {review.ReviewAnswer.map((answer, index) => (
                  <div key={index} className="flex flex-row items-center gap-4">
                    <Avatar src={answer.user.image || undefined} className="w-14 h-14" />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row items-center gap-2">
                        <p className={`font-bold text-xl`}>{answer.user.name}</p>
                        {
                          (session?.user.role === "Admin" || session?.user.id === answer.userId) && (
                            <Button
                              isIconOnly
                              onClick={() => {
                                onOpenAnswer()
                                setSelectedAnswer(answer)
                              }}
                            >
                              <Trash />
                            </Button>
                          )
                        }
                      </div>
                      {
                        answer.content && (
                          <Textarea
                            value={answer.content}
                            readOnly
                          />
                        )
                      }
                    </div>
                  </div>
                ))}
                {
                  isReplying === review.id && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col items-end gap-2">
                        <Textarea
                          placeholder="Escreva sua resposta"
                          {...register("content")}
                        />
                        <Button type="submit" className="bg-[#ff7f00] text-white">
                          {isSubmitting ? <Loader /> : "Responder"}
                        </Button>
                      </div>
                    </form>
                  )
                }
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}