import { Articles } from "@/app/admin/articles";
import { Authors } from "@/app/admin/authors";
import { Report } from "@/app/admin/report";

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
  },
  {
    name: "Relatório",
    component: Report
  }
]