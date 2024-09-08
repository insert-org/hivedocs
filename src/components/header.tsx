"use client"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, Button } from "@nextui-org/react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { SeparatorHorizontal } from "lucide-react";
import { signOut, useSession } from "next-auth/react"

export const Header = () => {
  const { data: session } = useSession()

  return (
    <div className="flex flex-row justify-between px-4 py-2">
      <h1>Header</h1>
      {
        session ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src={session.user?.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile">
                <p className="font-semibold">{session.user?.name}</p>
              </DropdownItem>
              <DropdownItem key="settings" href="/settings" showDivider>
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button>
            Sign In
          </Button>
        )
      }
    </div>
  )
}