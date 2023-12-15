import { Link, useLoaderData } from '@remix-run/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

export async function loader() {
  async function getUsers() {
    const res = await fetch('https://dummyjson.com/users?limit=15&select=id,username,email')
    const data = await res.json()
    return data.users as Array<{ id: string; username: string; email: string }>
  }

  return {
    users: await getUsers(),
  }
}

export default function Component() {
  const { users } = useLoaderData<typeof loader>()

  return (
    <div className="py-16">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>See who is using your app</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Link to={`/users/${user.id}`} state={{ id: user.id }}>
                      View Profile
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
