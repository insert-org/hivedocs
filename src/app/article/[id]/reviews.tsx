import { ReviewWithRelations } from "@/types/review"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { getReviews } from "./actions"
import { Avatar } from "@nextui-org/react"
import { siteConfig } from "@/config/site"
import { Rating } from "@mui/material"
import { Loader } from "@/components/loader"

type Props = {
  articleId: string
  userId: string | undefined
}

export const Reviews = ({ articleId, userId }: Props) => {
  const { data, status } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviews(articleId, userId),
  })

  if (status === "pending") return <Loader />
  if (status === "error") return <p>Artigo não encontrado</p>

  return (
    <div className="flex flex-col gap-8">
      {
        data?.map((review, index) => (
          <div key={index} className="flex flex-row items-center gap-2">
            <Avatar src={review.user.image || undefined} className="w-14 h-14" />
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <p className={`font-bold text-xl`}>{review?.user.name}</p>
                <Rating
                  precision={0.25}
                  value={review.rating}
                  readOnly
                  sx={{
                    fontSize: "1.3rem",
                  }}
                />
              </div>
              <p>{review.content}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}