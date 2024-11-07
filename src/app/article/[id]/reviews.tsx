import { ReviewWithRelations } from "@/types/review"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { deleteReview, getReviews } from "./actions"
import { Avatar, Button, Textarea } from "@nextui-org/react"
import { siteConfig } from "@/config/site"
import { Rating } from "@mui/material"
import { Loader } from "@/components/loader"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useState } from "react"
import { Review } from "@prisma/client"
import { Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Props = {
  articleId: string
  userId: string | undefined
}

export const Reviews = ({ articleId, userId }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const { toast } = useToast()
  const { data: session } = useSession()

  const { data, status, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviews(articleId, userId),
  })

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
      <div className="flex flex-col gap-8">
        {
          data?.map((review, index) => (
            <div key={index} className="flex flex-row items-center gap-4">
              <Avatar src={review.user.image || undefined} className="w-14 h-14" />
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row items-center gap-2">
                  <p className={`font-bold text-xl`}>{review?.user.name}</p>
                  <Rating
                    precision={0.5}
                    value={review.rating}
                    readOnly
                    sx={{
                      fontSize: "1.3rem",
                    }}
                  />
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
                </div>
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
          ))
        }
      </div>
    </>
  )
}