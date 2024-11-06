import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";
import { useSession } from "next-auth/react";
import { authorizeImageKit, changePhoto } from "./actions";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Avatar } from "@nextui-org/react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export const Photo = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: session, update } = useSession();
  const { toast } = useToast();

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
    if (!session) return;

    try {
      await changePhoto(session.user.id, res.url, res.fileId);
      update({ image: res.url })

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
      <Button className="w-full" onPress={onOpen}>Mudar foto de perfil</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Mudar foto de perfil</ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-center items-center gap-4">
                  <Avatar src={session?.user?.image || ""} />
                  <IKUpload fileName="profile_photo" onError={onError} onSuccess={onSuccess} />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}