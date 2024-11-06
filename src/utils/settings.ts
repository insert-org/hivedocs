import { Authors } from "@/app/admin/authors"
import { Name } from "@/components/settings/name";
import { Photo } from "@/components/settings/photo";
import { ReactNode } from "react"

type Setting = {
  label: string
  component: () => JSX.Element;
}

export type Settings = {
  name: string
  settings: Setting[]
}

export const settings: Settings[] = [
  {
    name: "Conta",
    settings: [
      {
        label: "Nome",
        component: Name
      },
      {
        label: "Foto",
        component: Photo
      }
    ]
  },
  {
    name: "Preferências",
    settings: [
    ]
  },
  {
    name: "Pesquisa",
    settings: [
    ]
  },
  {
    name: "Feedback",
    settings: [
    ]
  },
  {
    name: "Privacidade",
    settings: [
    ]
  },
  {
    name: "Ajuda",
    settings: [
    ]
  },
  {
    name: "Sobre",
    settings: [
    ]
  }
]