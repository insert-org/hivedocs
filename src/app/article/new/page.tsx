"use client"

import { Header } from "@/components/header"
import { NewArticleForm } from "./form"

export default function () {
  return (
    <div className="flex flex-col items-center min-h-screen w-screen p-16">
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
      <div className="flex flex-col items-center gap-8 w-full h-full py-8">
        <Header />
        <NewArticleForm />
      </div>
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
    </div>
  )
}