"use client"

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

export const AccountDropdown = () => {
  const { data: session } = useSession();

  const logout = async () => {
    await signOut();
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar isBordered as="button" className="transition-transform" src={session?.user?.image || ""} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile">
          <p className="font-semibold">
            {session?.user?.email || session?.user?.name}
          </p>
        </DropdownItem>
        <DropdownItem
          key="settings"
        >
          Configurações
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => logout()}>
          Sair
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}