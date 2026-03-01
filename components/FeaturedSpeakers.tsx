import Link from 'next/link'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const speakers = [
    {
        name: "Anjali Sharma",
        role: "Staff Engineer @ Google",
        topic: "Building Scalable APIs",
        initials: "AS",
        bgImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
        gradient: "from-blue-400 to-emerald-500"
    },
    {
        name: "Rohan Verma",
        role: "AI Researcher @ OpenAI",
        topic: "LLMs in Production",
        initials: "RV",
        bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        gradient: "from-purple-500 to-indigo-600"
    },
    {
        name: "Meera Nair",
        role: "DevRel @ GitHub",
        topic: "Open Source in 2026",
        initials: "MN",
        bgImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
        gradient: "from-orange-400 to-pink-600"
    },
    {
        name: "Karan Singh",
        role: "CTO @ Razorpay",
        topic: "Fintech for Developers",
        initials: "KS",
        bgImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
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
                    <Card
                        key={idx}
                        className="bg-white/[0.04] border-white/[0.08] transition-all duration-300 hover:translate-y-[-4px] hover:border-white/[0.15] hover:bg-white/[0.06] group overflow-hidden"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src={speaker.bgImage}
                                alt={speaker.name}
                                className="w-full h-full object-cover grayscale-[0.2] transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <Avatar className="absolute bottom-4 left-4 w-12 h-12 border-2 border-[#030708] shadow-2xl group-hover:scale-110 transition-transform">
                                <AvatarFallback className={`bg-gradient-to-br ${speaker.gradient} text-white font-bold text-sm`}>
                                    {speaker.initials}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <CardContent className="p-6">
                            <div className="space-y-1 mb-4">
                                <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                                    {speaker.name}
                                </h3>
                                <p className="text-primary text-[0.8rem] font-medium leading-tight opacity-90">
                                    {speaker.role}
                                </p>
                            </div>

                            <div className="inline-block px-3 py-1 bg-white/5 border border-primary/20 rounded-full">
                                <span className="text-light-200 text-[0.75rem] font-semibold whitespace-nowrap">
                                    {speaker.topic}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default FeaturedSpeakers
