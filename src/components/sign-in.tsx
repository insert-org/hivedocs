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

export function SignInCredentials() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData)
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <Button type="submit">Sign In with credentials</Button>
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