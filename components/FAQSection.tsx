'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

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
    return (
        <section id="faq" className="py-24 animate-fade-up [animation-delay:500ms]">
            <div className="text-center mb-16">
                <span className="text-primary uppercase text-[0.7rem] font-bold tracking-[0.2em] mb-4 block">
                    Everything you need to know
                </span>
                <h2 className="text-4xl font-bold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="group border rounded-xl bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.05] transition-all duration-300 data-[state=open]:bg-white/5 data-[state=open]:border-primary/30 data-[state=open]:border-l-[3px] data-[state=open]:border-l-primary px-2"
                        >
                            <AccordionTrigger className="px-4 py-5 hover:no-underline text-[17px] font-medium text-light-200 hover:text-white data-[state=open]:text-white transition-colors duration-200">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-6 text-light-200 leading-relaxed text-[15px]">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

export default FAQSection
