import { auth } from "@/auth"
import { AccountDropdown } from "@/components/account-dropdown"
import { Button } from "@nextui-org/button"
import { Input, Link } from "@nextui-org/react"
import { Bell, Home, Search } from "lucide-react"
import Image from "next/image"

export const Header = async () => {
  const session = await auth()

  return (
    <div className="flex flex-row justify-between">
      <Image src="/logo2.png" alt="logo" width={200} height={100} />
      <div className="flex flex-row gap-4 w-[50%]">
        <Button
          className="rounded-full bg-black"
          isIconOnly
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
        >
          <Bell size={24} color="white" />
        </Button>
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