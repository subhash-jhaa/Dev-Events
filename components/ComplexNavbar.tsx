'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
    Home,
    Calendar,
    User,
    PlusCircle,
    Code,
    Menu as MenuIcon,
    X,
    Plus,
    Bell
} from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import posthog from "posthog-js";

// Nav List Component - Using original data from Navbar.tsx
const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Events', href: '/', icon: Calendar },
]

function NavList({ setIsNavOpen }: { setIsNavOpen?: (open: boolean) => void }) {
    const pathname = usePathname();

    const handleLinkClick = (name: string) => {
        posthog.capture('nav_link_clicked', { link_name: name });
        setIsNavOpen?.(false);
    }

    return (
        <ul className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-6 mt-4 lg:mt-0 list-none">
            {navLinks.map((link) => (
                <li key={link.name}>
                    <Link
                        href={link.href}
                        prefetch={false}
                        onClick={() => handleLinkClick(link.name)}
                        className={`flex items-center gap-2 text-[0.85rem] font-medium transition-colors py-2 px-3 rounded-full ${pathname === link.href
                            ? "bg-white/10 text-primary"
                            : "text-light-200 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <link.icon size={14} className="opacity-70" />
                        <span>{link.name}</span>
                    </Link>
                </li>
            ))}
            <SignedIn>
                <li>
                    <Link
                        href="/profile"
                        prefetch={false}
                        onClick={() => handleLinkClick('Profile')}
                        className={`flex items-center gap-2 text-[0.85rem] font-medium transition-colors py-2 px-3 rounded-full lg:hidden ${pathname === '/profile'
                            ? "bg-white/10 text-primary"
                            : "text-light-200 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <User size={14} className="opacity-70" />
                        <span>Profile</span>
                    </Link>
                </li>
            </SignedIn>
        </ul>
    );
}

export function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleResize = () => window.innerWidth >= 960 && setIsNavOpen(false);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleTrack = (name: string) => {
        posthog.capture('nav_link_clicked', { link_name: name });
    }

    return (
        <header className="fixed top-4 left-0 right-0 z-[100] px-4 sm:px-10 pointer-events-none">
            <div className="mx-auto max-w-screen-xl pointer-events-auto relative">
                <div className="bg-[#030708]/80 backdrop-blur-xl border border-white/10 rounded-full py-2 px-6 shadow-xl relative z-20">
                    <div className="flex items-center justify-between text-white">

                        {/* Logo */}
                        <Link href="/" prefetch={false} onClick={() => handleTrack('Logo')} className="flex items-center gap-2 mr-6">
                            <div className="w-8 h-8 bg-[#2a2a28] rounded-full flex items-center justify-center border border-white/10">
                                <Code size={16} className="text-primary font-bold" />
                            </div>
                            <p className="font-bold text-lg tracking-tight hidden sm:block">Dev<span className="text-primary">E</span>vent</p>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:block">
                            <NavList />
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            <button className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative group mr-1">
                                <Bell size={18} className="text-light-200 group-hover:text-white opacity-80" />
                            </button>

                            <SignedOut>
                                <div className="flex items-center gap-2">
                                    <SignInButton mode="modal">
                                        <button className="text-[0.85rem] font-semibold text-light-200 hover:text-white px-4">Log In</button>
                                    </SignInButton>
                                    <Link href="/" prefetch={false} onClick={() => handleTrack('GetStarted')} className="bg-primary text-black text-xs font-bold px-5 py-2 rounded-full hover:bg-primary/90 transition-all shadow-lg active:scale-95">
                                        Get Started
                                    </Link>
                                </div>
                            </SignedOut>
                            <SignedIn>
                                <div className="flex items-center gap-4">
                                    <Link href="/create-event" prefetch={false} onClick={() => handleTrack('CreateEvent')} className="bg-primary hover:bg-primary/90 text-black p-1.5 rounded-full shadow-lg transition-transform hover:scale-105">
                                        <Plus size={18} strokeWidth={3} />
                                    </Link>
                                    <div className="hidden lg:block">
                                        <Link
                                            href="/profile"
                                            prefetch={false}
                                            onClick={() => handleTrack('Profile')}
                                            className={`text-[0.85rem] font-medium transition-colors ${pathname === '/profile' ? 'text-primary' : 'text-light-200 hover:text-white'}`}
                                        >
                                            Profile
                                        </Link>
                                    </div>
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

                            {/* Mobile Toggle */}
                            <button
                                className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                                onClick={() => setIsNavOpen(!isNavOpen)}
                            >
                                {isNavOpen ? <X size={20} /> : <MenuIcon size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav Dropdown - Separate Absolute Card */}
                <div className={`lg:hidden absolute top-full left-4 right-4 mt-2 transition-all duration-300 z-10 ${isNavOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
                    <div className="bg-[#030708] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
                        <NavList setIsNavOpen={setIsNavOpen} />
                        <SignedIn>
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <Link
                                    href="/create-event"
                                    prefetch={false}
                                    onClick={() => handleLinkClick('CreateEventMobile')}
                                    className="flex items-center gap-2 text-[0.85rem] font-medium text-primary hover:text-primary/80 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                                >
                                    <PlusCircle size={14} />
                                    <span>Create New Event</span>
                                </Link>
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default ComplexNavbar;
