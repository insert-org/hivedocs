import { SignIn, SignOut } from "@/components/sign-in"
import { auth, signIn } from "auth"

export default async function Index() {
  const session = await auth()

  return (
    <div className="flex flex-col gap-6">
      {session ? (
        <div>
          <h1>Welcome {session?.user?.name}</h1>
          <p>
            {JSON.stringify(session.user, null, 2)}
          </p>
        </div>
      ) : (
        <div>
          <SignIn provider="google" />
          <SignIn provider="osu" />
        </div>
      )}
    </div>
  )
}
