import { auth } from "@/auth"
import { AccountDropdown } from "@/components/account-dropdown"
import { Header } from "@/components/header"
import { Button } from "@nextui-org/button"
import { Avatar, Input, Link } from "@nextui-org/react"
import { Bell, Home, List, Search } from "lucide-react"
import Image from "next/image"

export default async function Index() {
  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen p-16">
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
      <div className="flex flex-col gap-8 w-full h-full py-8">
        <Header />
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2 p-4 rounded-3xl border-[#ff7f00] border-2 w-[20%]">
            <div className="flex flex-row justify-between rounded-full border-[#ff7f00] border-2 p-1">
              <Search />
              <div className="flex flex-row items-center gap-2">
                <p>Visto recentemente</p>
                <List />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                className="uppercase bg-white border-[#ff7f00] border-2 w-full"
              >
                Artigos Científicos
              </Button>
              <Button
                className="uppercase bg-white border-[#ff7f00] border-2 w-full"
              >
                Pesquisas
              </Button>
              <Button
                className="uppercase bg-white border-[#ff7f00] border-2 w-full"
              >
                Discussões
              </Button>
            </div>

            {
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-row justify-center items-center gap-4 border-[#ff7f00] border-2 rounded-xl p-4">
                  <Avatar className="transition-transform w-16 h-16" src="https://github.com/lzbguts.png" />
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">
                      Título do artigo
                    </p>
                    <p className="text-sm">
                      Descrição do artigo
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
    </div>
  )
}
