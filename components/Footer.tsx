'use client'

import Link from 'next/link'
import { Twitter, Github, Linkedin, Disc as Discord, Mail, Code } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        Platform: [
            { name: 'Home', href: '/' },
            { name: 'Events', href: '/' },
            { name: 'Create Event', href: '/create-event' },
            { name: 'Browse', href: '/' }
        ],
        Community: [
            { name: 'Discord', href: '#' },
            { name: 'Twitter', href: '#' },
            { name: 'GitHub', href: '#' },
            { name: 'Newsletter', href: '#' }
        ],
        Resources: [
            { name: 'Docs', href: '#' },
            { name: 'API', href: '#' },
            { name: 'Blog', href: '#' },
            { name: 'Changelog', href: '#' }
        ],
        Legal: [
            { name: 'Privacy', href: '#' },
            { name: 'Terms', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'Contact', href: '#' }
        ]
    }

    return (
        <footer className="bg-[#080d0d] border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-5 sm:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

                    {/* Logo & Tagline */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" prefetch={false} className="flex items-center gap-2 group">
                            <div className="w-6 h-6 bg-[#2a2a28] rounded-[6px] flex items-center justify-center transition-transform group-hover:scale-105">
                                <Code size={14} color="#59deca" strokeWidth={2.5} />
                            </div>
                            <p className="font-bold text-[1.1rem] tracking-tight text-white">Dev<span className="text-primary">E</span>vent</p>
                        </Link>
                        <p className="text-light-200 text-sm max-w-xs leading-relaxed">
                            The hub for developers to discover, attend, and host the world's best tech events.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:col-span-4 gap-8">
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title} className="space-y-4">
                                <h4 className="text-primary uppercase text-[0.7rem] font-bold tracking-[0.1em]">
                                    {title}
                                </h4>
                                <ul className="space-y-2 list-none p-0 m-0">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                prefetch={false}
                                                className="text-light-200 hover:text-white text-sm transition-colors duration-200 font-normal"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter Section (Mobile Responsive) */}
                <div className="border-t border-white/5 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="space-y-1 text-center lg:text-left">
                        <h4 className="text-white font-semibold">Join the community</h4>
                        <p className="text-light-200 text-sm">Stay updated with the latest events and developer news.</p>
                    </div>
                    <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-light-200" size={16} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-dark-100 border border-dark-200 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-light-200/50 outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-2 rounded-lg text-sm transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-light-200/50 text-xs">
                        © {currentYear} DevEvent. All rights reserved. Built for the developer community.
                    </p>

                    <div className="flex items-center gap-5">
                        {[
                            { Icon: Twitter, href: '#' },
                            { Icon: Github, href: '#' },
                            { Icon: Linkedin, href: '#' },
                            { Icon: Discord, href: '#' }
                        ].map(({ Icon, href }, idx) => (
                            <Link key={idx} href={href} prefetch={false} className="text-light-200 hover:text-white transition-colors duration-200">
                                <Icon size={18} strokeWidth={2} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
