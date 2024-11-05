import { Image, Link } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { getArticle } from "./actions"
import Rating from '@mui/material/Rating';
import { siteConfig } from "@/config/site";
import { Loader } from "@/components/loader";

type Props = {
  articleId: string
}

export const Article = ({ articleId }: Props) => {
  const { data, status } = useQuery({
    queryKey: ["article"],
    queryFn: () => getArticle(articleId),
  })

  const reviews = data?.reviews

  const media = reviews?.length ? (reviews?.reduce((acc, review) => acc + review.rating, 0) || 1) / (reviews?.length || 1) : 0

  if (status === "pending") return <Loader />
  if (status === "error") return <p>Artigo não encontrado</p>

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center gap-2 w-[20%]">
        <Image src={data?.image || siteConfig.emptyImage} alt="Foto" height={300} />
        <Rating
          precision={0.25}
          value={media}
          readOnly
          sx={{
            fontSize: "3rem",
          }}
        />
        <Link href={`https://scholar.google.com.br/scholar?hl=pt-BR&q=${data?.title}`} target="_blank" isBlock showAnchorIcon color="primary">
          Google Acadêmico
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row items-end gap-2">
          <p className="font-bold text-3xl">{data?.title}</p>
          <p className="text-gray-500">{data?.year}</p>
          <p className="text-gray-500">{data?.author.name}</p>
        </div>
        <p>{data?.resume}</p>
      </div>
    </div>
  )
}