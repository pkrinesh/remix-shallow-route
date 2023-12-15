import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { buttonVariants } from '~/components/ui/button'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export default function Index() {
  return (
    <div className="min-h-screen">
      <div className="w-full border-b border-border">
        <nav className="container flex items-center gap-2 h-[57px]">
          <a href="/" className={buttonVariants({ variant: 'ghost' })}>
            Home
          </a>
          <a href="/users" className={buttonVariants({ variant: 'ghost' })}>
            Users
          </a>
        </nav>
      </div>
      <div className="relative flex min-h-full flex-col" id="page">
        <div className="flex-1 container">
          <slot />
        </div>
      </div>
    </div>
  )
}
