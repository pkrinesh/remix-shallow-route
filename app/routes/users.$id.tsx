import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData, useLocation, useParams } from '@remix-run/react'
import { User } from '~/lib/types'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '~/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Dialog, DialogContent } from '~/components/ui/dialog'

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params

  async function getUser(id: string) {
    const res = await fetch(`https://dummyjson.com/users/${id}`)
    const data = await res.json()
    return data as User
  }

  if (!id) throw redirect('/users')

  return {
    user: await getUser(id),
  }
}

export default function Component() {
  const { user } = useLoaderData<typeof loader>()
  const { state } = useLocation()

  console.log(state)
  return <ProfileCard user={user} />
}

function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>
          {user.firstName} {user.lastName}
        </CardTitle>
        <CardDescription>Profile and contact details</CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.firstName[0] + user.lastName[0]}</AvatarFallback>
        </Avatar>
        <div className="mt-4">
          <div className="text-sm text-muted-foreground">Email</div>
          <div className="text-lg">{user.email}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-muted-foreground">Phone</div>
          <div className="text-lg">{user.username}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProfileModal({ user }: { user: User }) {
  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          history.back()
        }
      }}
    >
      <DialogContent>
        <ProfileCard user={user} />
      </DialogContent>
    </Dialog>
  )
}
