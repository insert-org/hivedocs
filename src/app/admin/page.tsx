"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { useSession } from "next-auth/react"
import { Button } from "@nextui-org/button"
import { useState } from "react"
import { adminSettings, AdminSettingsType } from "@/utils/adminSettings"
import { Loader } from "@/components/loader"
import { useRouter } from 'nextjs-toploader/app';

export default function () {
  const { data: session, status } = useSession()
  const [selected, setSelected] = useState<AdminSettingsType>(adminSettings[0]);
  const router = useRouter()

  if (status !== "loading") {
    if (status === "unauthenticated" || (session?.user.role && session?.user.role !== "Admin")) {
      router.push("/")
    }
  }


  return (
    <div className="flex flex-col items-center min-h-screen h-screen w-screen p-16">
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
      <div className="flex flex-col items-center gap-8 w-full h-full py-8">
        <Header />
        {
          status === "loading" ? <Loader /> : (
            <>
              <div className="border-[#ff7f00] border-2 px-64 rounded-full py-2">
                <p className="font-bold text-3xl">Painel de Administração</p>
              </div>
              <div className="flex flex-row gap-2 w-10/12 justify-center">
                <div className="flex flex-col items-center gap-4 w-4/12">
                  {adminSettings.map((setting) => (
                    <Button
                      key={setting.name}
                      onClick={() => setSelected(setting)}
                      className={`px-8 py-4 rounded-3xl w-full ${selected.name === setting.name ? "bg-[#ff7f00] text-white" : "bg-white text-[#ff7f00] border-[#ff7f00] border-2"}`}
                    >
                      {setting.name}
                    </Button>
                  ))}
                </div>
                <div className="h-full w-[1px] bg-black"></div>
                <div className="flex flex-col items-center gap-4 w-full">
                  {<selected.component />}
                </div>
              </div>
            </>
          )
        }
      </div>
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
    </div>
  )
}