'use server';
import Event from '@/database/event.model';
import connectDB from "../mongodb";

const mockEvents = [
    {
        title: "Global AI Hackathon 2026",
        description: "Join developers worldwide to build the next generation of AI-powered applications. Focused on LLMs, Edge AI, and generative media.",
        overview: "A 48-hour global sprint to innovate with AI.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        venue: "Google Mumbai & Online",
        location: "Mumbai, India",
        date: "2026-04-15",
        time: "09:00",
        mode: "hybrid",
        audience: "Developers, AI Researchers, Students",
        agenda: ["Opening Keynote", "Team Building", "Hacking Starts", "Mid-way Checkpoint", "Final Pitching", "Awards Ceremony"],
        organizer: "AI Collective",
        tags: ["Hackathon", "AI & ML", "Hybrid"]
    },
    {
        title: "React India Meetup: Next.js 16 Deep Dive",
        description: "Exploring the latest features of Next.js 16, Turbopack optimizations, and advanced React patterns for 2026.",
        overview: "Deep dive into Next.js 16 and performance.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        venue: "WeWork Galaxy",
        location: "Bangalore, India",
        date: "2026-03-20",
        time: "18:30",
        mode: "offline",
        audience: "Frontend Developers, React Enthusiasts",
        agenda: ["Networking & Snacks", "The Future of RSC", "Turbopack Under the Hood", "Lightning Talks", "Q&A"],
        organizer: "React India Community",
        tags: ["Meetup", "React", "Next.js"]
    },
    {
        title: "CyberSecurity Summit 2026",
        description: "The premier conference for security professionals to discuss zero-trust architecture, quantum-safe encryption, and cloud-native security.",
        overview: "Leading conference for cybersecurity innovation.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        venue: "Online",
        location: "Virtual",
        date: "2026-05-10",
        time: "10:00",
        mode: "online",
        audience: "CISO, Security Engineers, DevOps",
        agenda: ["Keynote: Quantum Threat", "Workshop: Pentesting", "Panel: AI in Security", "Closing Remark"],
        organizer: "Global Security Org",
        tags: ["Conference", "Security", "Cloud"]
    },
    {
        title: "DevOps Days Delhi",
        description: "Bringing together experts in automation, CI/CD, and platform engineering for a day of sharing and community building.",
        overview: "Community-led DevOps conference.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
        venue: "The Leela Palace",
        location: "New Delhi, India",
        date: "2026-06-05",
        time: "09:30",
        mode: "offline",
        audience: "SREs, DevOps Engineers, SysAdmins",
        agenda: ["Registration", "Kubernetes Scaling", "GitOps at Scale", "Open Spaces", "Evening Mixer"],
        organizer: "DevOps Delhi Community",
        tags: ["Conference", "DevOps", "Cloud Native"]
    },
    {
        title: "Web3 & Blockchain Workshop",
        description: "Hands-on workshop on building decentralized apps (dApps) using Solidity and the latest L2 scaling solutions.",
        overview: "Practical guide to Web3 development.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
        venue: "T-Hub Hyderabad",
        location: "Hyderabad, India",
        date: "2026-03-28",
        time: "14:00",
        mode: "offline",
        audience: "Software Engineers, Web3 Curious",
        agenda: ["Intro to smart contracts", "Developing on Polygon", "Frontend Integration", "QA session"],
        organizer: "Web3 Builders India",
        tags: ["Workshop", "Blockchain", "Web3"]
    }
];

export const seedEvents = async () => {
    try {
        await connectDB();

        // Optional: Clear existing events if you want a clean slate
        // await Event.deleteMany({});

        const count = await Event.countDocuments();
        if (count > 8) return { message: "Already seeded with enough events." };

        await Event.create(mockEvents);
        return { message: "Seeded successfully with 5 new events!" };
    } catch (e) {
        console.error('Error seeding events:', e);
        return { error: "Failed to seed events." };
    }
}
