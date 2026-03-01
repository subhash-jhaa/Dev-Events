import { Star } from 'lucide-react'

const testimonials = [
    {
        quote: "DevEvent helped me find my first hackathon. Won 2nd place!",
        name: "Priya S.",
        title: "Frontend Developer",
        initials: "PS",
        gradient: "from-teal-400 to-emerald-600"
    },
    {
        quote: "Best place to discover AI/ML meetups. Super clean UI too.",
        name: "Rahul M.",
        title: "ML Engineer",
        initials: "RM",
        gradient: "from-blue-400 to-indigo-600"
    },
    {
        quote: "Created my first community event here. 200+ devs showed up!",
        name: "Aditya K.",
        title: "DevRel Engineer",
        initials: "AK",
        gradient: "from-purple-400 to-pink-600"
    }
]

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 animate-fade-up [animation-delay:450ms]">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white relative inline-block">
                    What Developers Say
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-primary rounded-full"></div>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, idx) => (
                    <div
                        key={idx}
                        className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-8 transition-all duration-300 hover:translate-y-[-4px] hover:border-white/[0.15] group"
                    >
                        <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className="fill-primary text-primary" />
                            ))}
                        </div>

                        <p className="text-light-100 text-[17px] leading-relaxed mb-8 italic">
                            "{t.quote}"
                        </p>

                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                {t.initials}
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-[15px]">{t.name}</h4>
                                <p className="text-light-200 text-xs">{t.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Testimonials
