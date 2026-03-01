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
    Bell,
    ChevronDown,
    LayoutDashboard,
    Terminal,
    Users as UsersIcon,
    Rocket
} from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import posthog from "posthog-js";

// Nav List Component
const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Events', href: '/#events', icon: Calendar },
]

// Explore Menu Items
const exploreItems = [
    {
        title: "Dashboard",
        description: "Manage your registered events and favorites",
        icon: LayoutDashboard,
        href: "/profile",
        color: "text-blue-400"
    },
    {
        title: "Developer API",
        description: "Integrate DevEvent data into your own apps",
        icon: Terminal,
        href: "/",
        color: "text-purple-400"
    },
    {
        title: "Community",
        description: "Connect with 37k+ developers worldwide",
        icon: UsersIcon,
        href: "/",
        color: "text-green-400"
    }
]

function NavList({ setIsNavOpen }: { setIsNavOpen?: (open: boolean) => void }) {
    const pathname = usePathname();
    const [isExploreOpen, setIsExploreOpen] = useState(false);

    const handleLinkClick = (name: string) => {
        posthog.capture('nav_link_clicked', { link_name: name });
        setIsNavOpen?.(false);
        setIsExploreOpen(false);
    }

    return (
        <ul className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4 mt-4 lg:mt-0 list-none">
            {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || (link.href === '/#events' && pathname === '/');
                return (
                    <li key={link.name}>
                        <Link
                            href={link.href}
                            prefetch={false}
                            onClick={() => handleLinkClick(link.name)}
                            className={`flex items-center gap-2 text-[0.85rem] font-medium transition-colors py-2 px-4 rounded-full ${isActive
                                ? "bg-white/10 text-primary"
                                : "text-light-200 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <link.icon size={14} className="opacity-70" />
                            <span>{link.name}</span>
                        </Link>
                    </li>
                );
            })}

            {/* Explore Mega-Menu Trigger */}
            <li className="relative group">
                <button
                    onMouseEnter={() => setIsExploreOpen(true)}
                    className="flex items-center gap-2 text-[0.85rem] font-medium text-light-200 hover:text-white py-2 px-4 rounded-full hover:bg-white/5 transition-colors group"
                >
                    <Code size={14} className="opacity-70" />
                    <span>Explore</span>
                    <ChevronDown size={14} className={`opacity-50 transition-transform duration-300 ${isExploreOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega-Menu Content (Desktop) */}
                <div
                    onMouseLeave={() => setIsExploreOpen(false)}
                    className={`hidden lg:block absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] transition-all duration-300 ${isExploreOpen ? 'opacity-100 translate-y-0 translate-x-1/2 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                    style={{ right: 'auto', left: '0' }}
                >
                    <div className="bg-[#0c1212] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-2xl grid grid-cols-2 gap-4">
                        <div className="col-span-1 space-y-3">
                            <p className="text-[10px] font-bold text-light-200 uppercase tracking-widest opacity-50 px-2 pb-1">Resources</p>
                            {exploreItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    prefetch={false}
                                    onClick={() => handleLinkClick(`Explore_${item.title}`)}
                                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group/item"
                                >
                                    <div className={`mt-1 p-1.5 rounded-lg bg-white/5 ${item.color} group-hover/item:scale-110 transition-transform`}>
                                        <item.icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white mb-0.5">{item.title}</p>
                                        <p className="text-[11px] text-light-200 leading-tight opacity-60">{item.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-span-1 bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                            <div>
                                <Rocket className="text-primary mb-3" size={24} />
                                <p className="text-sm font-bold text-white mb-1">Scale Your Growth</p>
                                <p className="text-[11px] text-light-200 opacity-70 leading-relaxed">
                                    Promote your hackathons to a global audience of developers.
                                </p>
                            </div>
                            <button className="text-[11px] font-bold text-primary uppercase tracking-widest hover:underline mt-4 text-left">
                                Learn More →
                            </button>
                        </div>
                    </div>
                </div>
            </li>

            <SignedIn>
                <li className="lg:hidden">
                    <Link
                        href="/profile"
                        prefetch={false}
                        onClick={() => handleLinkClick('Profile')}
                        className={`flex items-center gap-2 text-[0.85rem] font-medium transition-colors py-2 px-3 rounded-full ${pathname === '/profile'
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
                <div className="bg-[#030708]/80 backdrop-blur-xl border border-white/10 rounded-full py-2 px-6 shadow-xl relative z-50">
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
                                        <button className="text-[0.85rem] font-semibold text-light-200 hover:text-white px-4 transition-colors">Log In</button>
                                    </SignInButton>
                                    <Link href="/" prefetch={false} onClick={() => handleTrack('GetStarted')} className="bg-primary text-black text-[0.75rem] font-bold px-5 py-2 rounded-full hover:shadow-[0_0_15px_rgba(89,222,202,0.4)] transition-all active:scale-95 whitespace-nowrap">
                                        Get Started
                                    </Link>
                                </div>
                            </SignedOut>
                            <SignedIn>
                                <div className="flex items-center gap-4">
                                    <Link href="/create-event" prefetch={false} onClick={() => handleTrack('CreateEvent')} className="bg-primary hover:shadow-[0_0_10px_rgba(89,222,202,0.3)] text-black p-1.5 rounded-full shadow-lg transition-all hover:scale-105">
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
                                                userButtonAvatarBox: "w-[28px] h-[28px] border border-white/20 shadow-inner"
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

                {/* Mobile Nav Dropdown */}
                <div className={`lg:hidden absolute top-full left-4 right-4 mt-2 transition-all duration-300 z-10 ${isNavOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}`}>
                    <div className="bg-[#030708] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
                        <NavList setIsNavOpen={setIsNavOpen} />
                        <SignedIn>
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <Link
                                    href="/create-event"
                                    prefetch={false}
                                    onClick={() => {
                                        handleTrack('CreateEventMobile');
                                        setIsNavOpen(false);
                                    }}
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
