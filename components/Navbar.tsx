'use client'

import Link from 'next/link'
import posthog from 'posthog-js'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Home, Calendar, PlusCircle, User, Bell, Code } from 'lucide-react'

const Navbar = () => {
  const pathname = usePathname();

  const handleNavClick = (linkName: string) => {
    posthog.capture('nav_link_clicked', {
      link_name: linkName,
    });
  }

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Events', href: '/', icon: Calendar },
  ]

  return (
    <header>
      <nav>
        {/* Left: Logo */}
        <div className="flex items-center gap-3 min-w-[180px]">
          <Link href='/' className='flex items-center gap-2 group' onClick={() => handleNavClick('Logo')} prefetch={false}>
            <div className="logo-box">
              <Code size={14} color="#59deca" strokeWidth={2.5} />
            </div>
            <p className="font-bold text-[1.1rem] tracking-tight text-white hidden sm:block">Dev<span className="text-primary">E</span>vent</p>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.84rem] transition-colors hover:bg-white/10 ${pathname === link.href ? 'bg-white/10 text-primary font-medium' : 'text-light-200 font-normal hover:text-white'
                }`}
            >
              <link.icon size={14} className="opacity-70" strokeWidth={2.2} />
              {link.name}
            </Link>
          ))}
          <SignedIn>
            <Link
              href="/profile"
              onClick={() => handleNavClick('Profile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.84rem] transition-colors hover:bg-white/10 ${pathname === '/profile' ? 'bg-white/10 text-primary font-medium' : 'text-light-200 font-normal hover:text-white'
                }`}
            >
              <User size={14} className="opacity-70" strokeWidth={2.2} />
              Profile
            </Link>
          </SignedIn>
        </div>

        {/* Right: Auth & Extra Actions */}
        <div className="flex items-center gap-4 min-w-[180px] justify-end">
          <button className="p-1 rounded-md hover:bg-white/10 transition-colors relative group">
            <Bell size={18} className="text-light-200 group-hover:text-white opacity-80 group-hover:opacity-100" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary border-background border-[1px] rounded-full"></div>
          </button>

          <div className="w-[1px] h-[18px] bg-white/10 mx-1"></div>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-signin text-[0.84rem] font-medium">Sign In</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <Link href="/create-event" className="bg-primary text-black text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors hidden md:block">
                Create Event
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-[28px] h-[28px] border border-white/20"
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
