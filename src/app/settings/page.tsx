"use client"

import { Settings, settings } from "@/utils/settings";
import { Button } from "@nextui-org/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'nextjs-toploader/app';
import { useState } from "react";

export default function SettingsPage() {
  const [selected, setSelected] = useState<Settings>(settings[0]);
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen p-16">
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
      <div className="flex flex-col items-center gap-16 w-full h-full py-8 relative">
        <div className="flex w-full absolute top-2 left-2">
          <Button onClick={() => router.push("/")}>
            <ArrowLeft size={24} />
          </Button>
        </div>
        <div className="border-[#ff7f00] border-2 px-64 rounded-full py-2">
          <p className="font-bold text-3xl">Configurações</p>
        </div>
        <div className="flex flex-row gap-2 w-4/12 justify-center">
          <div className="flex flex-col items-center gap-4 w-4/12">
            {settings.map((setting) => (
              <button
                key={setting.name}
                onClick={() => setSelected(setting)}
                className={`px-8 py-4 rounded-3xl w-full ${selected.name === setting.name ? "bg-[#ff7f00] text-white" : "bg-white text-[#ff7f00] border-[#ff7f00] border-2"}`}
              >
                {setting.name}
              </button>
            ))}
          </div>
          <div className="h-full w-[1px] bg-black"></div>
          <div className="flex flex-col items-center gap-4 w-8/12">
            {selected.settings.map((setting) => (
              <div className="w-full" key={setting.label}>
                {setting.component()}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
    </div>
  )
}