import { signIn, signOut } from "@/auth"
import { Button } from "@nextui-org/button"

export function SignIn({
  provider
}: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <Button type="submit">Sign In with {provider}</Button>
    </form>
  )
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit" className="w-full p-0">
        Sign Out
      </Button>
    </form>
  )
}