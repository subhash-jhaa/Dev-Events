'use client'

import Link from 'next/link'
import posthog from 'posthog-js'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const handleNavClick = (linkName: string) => {
    posthog.capture('nav_link_clicked', {
      link_name: linkName,
    });
  }

  return (
    <header>
      <nav>
        <Link href='/' className='logo' onClick={() => handleNavClick('Logo')}>
          <img src='/icons/logo.png' alt='logo' width={24} height={24} />
          <p>DevEvent</p>

        </Link>
        <ul>
          <Link href="/" onClick={() => handleNavClick('Home')}>Home</Link>
          <Link href="/events" onClick={() => handleNavClick('Events')}>Events</Link>
          <SignedIn>
            <Link href="/create-event" prefetch={false} onClick={() => handleNavClick('Create Event')}>Create Event</Link>
          </SignedIn>
        </ul>

        <div className="nav-auth">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-signin">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
