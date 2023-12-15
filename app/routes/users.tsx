import { Link, Outlet } from '@remix-run/react'
import { buttonVariants } from '~/components/ui/button'

export async function loader() {
  return null
}

export default function Component() {
  return (
    <div className="min-h-screen">
      <div className="w-full border-b border-border">
        <nav className="container flex items-center gap-2 h-[57px]">
          <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
            Home
          </Link>
          <Link to="/users" className={buttonVariants({ variant: 'ghost' })}>
            Users
          </Link>
        </nav>
      </div>
      <div className="relative flex min-h-full flex-col" id="page">
        <div className="flex-1 container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
