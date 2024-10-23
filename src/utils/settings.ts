type Setting = {
  label: string
  href: string
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
        href: "/nome"
      },
      {
        label: "Email",
        href: "/email"
      },
      {
        label: "Foto de Perfil",
        href: "/foto"
      },
      {
        label: "Ativar notificações",
        href: "/notificacoes"
      },
      {
        label: "Frequência de notificações",
        href: "/frequencia"
      }
    ]
  },
  {
    name: "Preferências",
    settings: [
      {
        label: "Modo Claro/Dark",
        href: "/modo"
      },
      {
        label: "Idioma",
        href: "/idioma"
      }
    ]
  },
  {
    name: "Pesquisa",
    settings: [
      {
        label: "Categorias",
        href: "/categorias"
      },
      {
        label: "Faixa de ano",
        href: "/faixa"
      },
      {
        label: "Tipo de estudo",
        href: "/tipo"
      },
    ]
  },
  {
    name: "Feedback",
    settings: [
      {
        label: "Enviar feedback",
        href: "/feedback"
      },
      {
        label: "Avaliação do app",
        href: "/avaliacao"
      },
    ]
  },
  {
    name: "Privacidade",
    settings: [
      {
        label: "Ocultar meu perfil",
        href: "/ocultar"
      },
      {
        label: "Controlar quem pode ver minhas avaliações",
        href: "/controlar"
      },
      {
        label: "Gerenciar dados salvos",
        href: "/gerenciar"
      },
    ]
  },
  {
    name: "Ajuda",
    settings: [
      {
        label: "FAQ",
        href: "/faq"
      },
      {
        label: "Contato",
        href: "/contato"
      },
    ]
  },
  {
    name: "Sobre",
    settings: [
      {
        label: "Versão do app",
        href: "/versao"
      },
      {
        label: "Termos de Uso",
        href: "/termos"
      },
      {
        label: "Política de Privacidade",
        href: "/politica"
      },
    ]
  }
]