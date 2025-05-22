import { useQuery } from "@tanstack/react-query"
import { createNotification, deleteNotification, getNotifications } from "./actions"
import { useState } from "react"
import { Input } from "@nextui-org/input"
import { Loader } from "@/components/loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { NotificationSchema } from "@/schemas/notification";
import { Plus, Trash } from "lucide-react";
import { Notification } from "@prisma/client";

export const Notifications = () => {
  const [query, setQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete, onClose: onCloseDelete } = useDisclosure();
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NotificationSchema),
    defaultValues: {
      title: "",
      content: ""
    }
  });

  const { data, refetch } = useQuery({
    queryKey: ["notifications", query],
    queryFn: () => getNotifications(query),
  })

  const onSubmit = async (data: z.infer<typeof NotificationSchema>) => {
    setIsSubmitting(true)
    try {
      await createNotification(data)

      toast({
        title: "Sucesso!",
        description: "Notificação criada.",
        variant: "destructive",
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      setIsSubmitting(false)
      onClose()
    }
  }

  const onDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteNotification(selectedNotification?.id as string)

      toast({
        title: "Sucesso!",
        description: "Notificação deletada.",
        variant: "destructive",
        className: "bg-red-500 text-white",
      })
    } catch (error) {
      console.error(error)
    } finally {
      refetch()
      setIsDeleting(false)
      onCloseDelete()
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Criar notificação</ModalHeader>
              <ModalBody>
                <Input
                  label="Título"
                  {...register("title")}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                <Input
                  label="Mensagem"
                  {...register("content")}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
              </ModalBody>
              <ModalFooter>
                <Button type="button" color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button type="submit" color="primary">
                  {isSubmitting ? <Loader /> : "Salvar"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={(e) => { e.preventDefault(); onDelete() }}>
              <ModalHeader className="flex flex-col gap-1">Deletar notificação</ModalHeader>
              <ModalFooter>
                <Button type="button" color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button type="submit" color="danger">
                  {isDeleting ? <Loader /> : "Deletar"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <div id="notifications" className="flex flex-col gap-2 w-full h-[70vh] overflow-scroll">
        <div className="flex flex-row justify-between items-center">
          <Input placeholder="Pesquisar notificação" onChange={(e) => setQuery(e.target.value)} />
          <Button isIconOnly onPress={onOpen} className="bg-[#ff7f00] text-white">
            <Plus size={20} />
          </Button>
        </div>
        {data?.map((notification) => {
          return (
            <div key={notification.id} className="flex flex-col justify-center border-2 border-gray-300 rounded-xl px-2 py-3">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-bold">{notification.title}</p>
                  <p>{notification.content}</p>
                </div>
                <Button isIconOnly onPress={() => { setSelectedNotification(notification); onOpenDelete() }} className="bg-[#b21f1a] text-white">
                  <Trash size={20} />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}