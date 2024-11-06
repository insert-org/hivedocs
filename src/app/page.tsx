"use client"

import { Header } from "@/components/header"
import { Button } from "@nextui-org/button"
import { useRouter } from "nextjs-toploader/app"

export default function () {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen p-16">
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
      <div className="flex flex-col items-center gap-8 w-full h-full py-8">
        <Header />
        <div className="flex flex-col justify-center items-center h-full gap-16">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-3xl">Todo o conhecimento em um único lugar.</p>
            <p className="font-bold text-3xl">Armazene estudos que você goste.</p>
            <p className="font-bold text-3xl">Compartilhe com colegas com praticidade.</p>
          </div>
          <Button
            className="bg-[#ff7f00] p-8 rounded-full font-bold text-white text-3xl"
            onClick={() => router.push("/home")}
          >
            Entre gratuitamente!
          </Button>
        </div>
      </div>
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
    </div>
  )
}
