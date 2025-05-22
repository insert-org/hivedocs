import { getNotifications } from "@/app/admin/actions";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";

export const NotificationsDropdown = () => {
  const { data, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(""),
  })

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="rounded-full bg-black"
          isIconOnly
        >
          <Bell size={24} color="white" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {(data ?? []).map((notification) => (
          <DropdownItem key={notification.id}>
            <div className="flex flex-col">
              <span className="font-bold">{notification.title}</span>
              <span>{notification.content}</span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}