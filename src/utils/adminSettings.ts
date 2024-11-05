import { Articles } from "@/app/admin/articles";
import { Authors } from "@/app/admin/authors";

export type AdminSettingsType = {
  name: string;
  component: () => JSX.Element;
}

export const adminSettings: AdminSettingsType[] = [
  {
    name: "Autores",
    component: Authors
  },
  {
    name: "Artigos",
    component: Articles
  }
]