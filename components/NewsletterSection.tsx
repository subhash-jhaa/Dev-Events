'use client'

import { useState } from 'react'

const NewsletterSection = () => {
    const [email, setEmail] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            // Simulate API call
            setIsSubscribed(true)
            setEmail('')
        }
    }

    return (
        <section className="w-full bg-[#0d1414] border-y border-[#00f5c41a] py-16 mt-12 overflow-hidden animate-fade-up [animation-delay:420ms]">
            <div className="container mx-auto px-5 sm:px-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">

                    {/* Left Content */}
                    <div className="max-w-xl space-y-3 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white leading-tight">
                            Never Miss a Dev Event
                        </h2>
                        <p className="text-light-200 text-[17px]">
                            Get weekly digests of the best hackathons, meetups, and conferences.
                            Delivered straight to your inbox.
                        </p>
                    </div>

                    {/* Right Content - Form */}
                    <div className="w-full lg:max-w-md">
                        {isSubscribed ? (
                            <div className="bg-[#00f5c410] border border-primary/30 rounded-xl p-6 text-center animate-fade-in">
                                <p className="text-primary font-bold text-lg">You're in! 🎉</p>
                                <p className="text-light-200 text-sm mt-1">Check your inbox for the next weekly digest.</p>
                                <button
                                    onClick={() => setIsSubscribed(false)}
                                    className="text-primary text-xs mt-4 hover:underline underline-offset-4"
                                >
                                    Subscribe another email
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="flex-1 bg-dark-100 border border-white/12 text-white px-4 py-3 rounded-lg outline-none focus:border-primary transition-all text-[15px] placeholder:text-light-200/40"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-3 rounded-lg transition-all transform active:scale-[0.98] whitespace-nowrap"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <p className="text-[13px] text-light-200/50 text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                                    <span className="opacity-70">🔒</span> No spam. Unsubscribe anytime.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsletterSection
