import { User } from "@prisma/client";

export const EmptyUser: User = {
  id: "",
  email: "",
  emailVerified: null,
  image: "",
  name: "",
  password: "",
  role: "User",
  createdAt: new Date(),
  updatedAt: new Date(),
}