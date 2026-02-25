import Link from 'next/link'

const speakers = [
    {
        name: "Anjali Sharma",
        role: "Staff Engineer @ Google",
        topic: "Building Scalable APIs",
        initials: "AS",
        gradient: "from-blue-400 to-emerald-500"
    },
    {
        name: "Rohan Verma",
        role: "AI Researcher @ OpenAI",
        topic: "LLMs in Production",
        initials: "RV",
        gradient: "from-purple-500 to-indigo-600"
    },
    {
        name: "Meera Nair",
        role: "DevRel @ GitHub",
        topic: "Open Source in 2026",
        initials: "MN",
        gradient: "from-orange-400 to-pink-600"
    },
    {
        name: "Karan Singh",
        role: "CTO @ Razorpay",
        topic: "Fintech for Developers",
        initials: "KS",
        gradient: "from-teal-400 to-cyan-600"
    }
]

const FeaturedSpeakers = () => {
    return (
        <section id="speakers" className="animate-fade-up [animation-delay:250ms]">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Featured Speakers</h2>
                <Link href="/" prefetch={false} className="text-primary text-sm font-semibold hover:underline flex items-center gap-1 transition-all">
                    View All →
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {speakers.map((speaker, idx) => (
                    <div
                        key={idx}
                        className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:border-white/[0.15] hover:bg-white/[0.06] group"
                    >
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${speaker.gradient} flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg transition-transform group-hover:scale-105`}>
                            {speaker.initials}
                        </div>

                        <div className="space-y-1 mb-4">
                            <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                                {speaker.name}
                            </h3>
                            <p className="text-primary text-[0.8rem] font-medium leading-tight opacity-90">
                                {speaker.role}
                            </p>
                        </div>

                        <div className="inline-block px-3 py-1 bg-dark-200 border border-primary/20 rounded-full">
                            <span className="text-light-200 text-[0.75rem] font-semibold whitespace-nowrap">
                                {speaker.topic}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedSpeakers
