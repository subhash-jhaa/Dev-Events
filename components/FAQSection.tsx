'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

const faqs = [
    {
        question: "How do I create an event on DevEvent?",
        answer: "Just sign in to your account and click the 'Create Event' button in the navbar. You'll be guided through a simple form to add your event details, location, and poster image."
    },
    {
        question: "Is DevEvent free to use?",
        answer: "Yes, DevEvent is completely free for the community. You can list, browse, and join free events without any charges."
    },
    {
        question: "Can I attend events remotely?",
        answer: "Absolutely! Many events on our platform are remote-friendly or hybrid. You can filter events by mode to find ones that suit your location."
    },
    {
        question: "How do I get notified about new events?",
        answer: "The best way to stay updated is by subscribing to our newsletter in the footer. We'll send you a weekly curated list of upcoming events."
    },
    {
        question: "What types of events are listed?",
        answer: "We focus on developer-centric events including Hackathons, Meetups, Technical Conferences, and Workshops."
    },
    {
        question: "Can I list a paid event?",
        answer: "Currently, we focus on supporting free community-driven events. We are working on supporting paid ticketing features in the near future."
    }
]

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section id="faq" className="py-24 animate-fade-up [animation-delay:500ms]">
            <div className="text-center mb-16">
                <span className="text-primary uppercase text-[0.7rem] font-bold tracking-[0.2em] mb-4 block">
                    Everything you need to know
                </span>
                <h2 className="text-4xl font-bold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index
                    return (
                        <div
                            key={index}
                            className={`group border rounded-xl transition-all duration-300 ${isOpen
                                    ? 'bg-white/5 border-primary/30 border-l-[3px]'
                                    : 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.05] border-l-transparent'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left outline-none"
                            >
                                <span className={`text-[17px] font-medium transition-colors ${isOpen ? 'text-white' : 'text-light-200 group-hover:text-white'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-90 text-light-200'}`}>
                                    {isOpen ? (
                                        <X size={20} className="text-primary" />
                                    ) : (
                                        <Plus size={20} className="group-hover:text-white" />
                                    )}
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 pb-6 text-light-200 leading-relaxed text-[15px]">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default FAQSection
