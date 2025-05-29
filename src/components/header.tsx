"use client"

import { AccountDropdown } from "@/components/account-dropdown"
import { Button } from "@nextui-org/button"
import { Image, Link } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { Home, Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from 'nextjs-toploader/app';
import { NotificationsDropdown } from "./notifications-dropdown"
import AsyncSelect from 'react-select/async';
import { getArticles } from "@/app/home/actions"

export const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const { data, status, error, isLoading } = useQuery({
    queryKey: ["articlesHeader"],
    queryFn: () => getArticles(),
  })

  const articles = data?.map((art) => {
    return {
      value: art.id,
      label: art.title,
    }
  }) || []

  const filter = (inputValue: string) => {
    return articles.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<{
      value: string;
      label: string;
    }[]>((resolve) => {
      setTimeout(() => {
        resolve(filter(inputValue));
      }, 1000);
    });

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
        <AsyncSelect
          cacheOptions
          loadOptions={promiseOptions}
          defaultOptions
          className="w-full"
          placeholder="Pesquisar"
          noOptionsMessage={() => "Pesquise por algum artigo."}
          loadingMessage={() => "Carregando..."}
          onChange={(option) => router.push(`/article/${option?.value}`)}
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            menu: provided => ({ ...provided, zIndex: 9999 }),
            control: (base) => ({ ...base, borderColor: "#ff7f00", borderWidth: "2px", borderRadius: "15px" }),
          }}
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