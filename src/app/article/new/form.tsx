import { ArticleSchema } from "@/schemas/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/input";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Creatable from 'react-select/creatable';
import { createArticle, getAuthors } from "./actions";
import { Button } from "@nextui-org/button";
import { z } from "zod";

const animatedComponents = makeAnimated();

export const NewArticleForm = () => {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      authorName: "",
      year: 0,
      resume: "",
    }
  });

  const values = watch()

  const { data, status } = useQuery({
    queryKey: ["authors"],
    queryFn: () => getAuthors(),
  })

  const options = data?.map((author) => ({
    value: author.id,
    label: author.name
  }))

  if (!session?.user) return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-500">Faça login para sugerir artigos</p>
    </div>
  )

  const onSubmit = async () => {
    const newArticle = await createArticle(values)

    if (!newArticle.author.approved) {
      alert("Artigo criado com sucesso, aguarde a aprovação do autor")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-4/12">
      <div className="flex flex-col gap-2">
        <Input type="text" label="Título" {...register("title")} />
        <Creatable
          options={options}
          components={animatedComponents}
          menuPortalTarget={document.body}
          placeholder="Selecione o autor"
          noOptionsMessage={() => "Nenhum autor encontrado"}
          formatCreateLabel={input => `Criar autor "${input}"`}
          onChange={(selectedOption: any) => {
            setValue("authorName", selectedOption?.label)
          }}
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            control: base => ({ ...base, backgroundColor: "#f4f4f5", border: "none" })
          }}
        />
        <Input type="number" label="Ano" {...register("year", { valueAsNumber: true })} />
        <Textarea
          label="Resumo"
          {...register("resume")}
        />
        <Button type="submit">Criar artigo</Button>
      </div>
    </form>
  )
}