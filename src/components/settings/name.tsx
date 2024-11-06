import { NameSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { changeName } from "./actions";
import { z } from "zod";
import { Loader } from "../loader";
import { useRouter } from "nextjs-toploader/app";

export const Name = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, update } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: "",
    }
  });

  useEffect(() => {
    if (session) {
      setValue("name", session?.user?.name || "");
    }
  }, [session]);

  const onSubmit = async (data: z.infer<typeof NameSchema>, onClose: () => void) => {
    if (!session) return;
    setIsSubmitting(true);
    try {
      await changeName(data.name, session?.user.id)
      update({ name: data.name })
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Button className="w-full" onPress={onOpen}>Mudar nome de exibição</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit((values) => onSubmit(values, onClose))}>
              <ModalHeader className="flex flex-col gap-1">Mudar nome de exibição</ModalHeader>
              <ModalBody>
                <Input
                  {...register("name")}
                  label="Nome de exibição"
                  errorMessage={errors.name ? errors.name.message : ""}
                />
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
    </>
  )
}