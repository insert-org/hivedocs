"use client"

import { getNotifications } from "@/app/admin/actions"
import { auth } from "@/auth"
import { AccountDropdown } from "@/components/account-dropdown"
import { Button } from "@nextui-org/button"
import { Image, Input, Link } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { Bell, Home, Plus, Search } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from 'nextjs-toploader/app';
import { NotificationsDropdown } from "./notifications-dropdown"

export const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <Image src="/logo2.png" alt="logo" className="h-16 cursor-pointer" onClick={() => router.push("/")} />
      <div className="flex flex-row gap-4 w-[50%]">
        <Button
          className="rounded-full bg-black"
          isIconOnly
          onClick={() => router.push("/home")}
        >
          <Home size={24} color="white" />
        </Button>
        <Input
          className="rounded-full border-[#ff7f00] border-2"
          classNames={{
            inputWrapper: "rounded-full"
          }}
          placeholder="O que você está procurando?"
          startContent={<Search size={24} />}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Button
          className="rounded-full bg-black"
          isIconOnly
          onClick={() => router.push("/article/new")}
        >
          <Plus size={24} color="white" />
        </Button>
        <NotificationsDropdown />
        {
          session?.user ? (
            <AccountDropdown />
          ) : (
            <Button
              as={Link}
              href="/login"
            >
              Entrar
            </Button>
          )
        }
      </div>
    </div>
  )
}