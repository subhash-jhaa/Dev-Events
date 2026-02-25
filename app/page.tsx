import EventsList from "@/components/EventsList";
import { IEvent } from "@/database";
import { getAllEvents } from "@/lib/actions/event.action";
import ExploreBtn from "@/components/ExploreBtn";
import { Zap, Cpu, Users, Globe } from "lucide-react";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import NewsletterSection from "@/components/NewsletterSection";
import StatsBar from "@/components/StatsBar";
import FeaturedSpeakers from "@/components/FeaturedSpeakers";

const Page = async () => {
  const events: IEvent[] = await getAllEvents();

  return (
    <section id="home" className="space-y-16">
      {/* Hero Section */}
      <div className="text-center animate-fade-up">
        <div className="live-badge">
          <div className="dot"></div>
          {events.length} Events Live Now
        </div>
        <h1> The Hub for Every Dev <br /> Events You Can&apos;t Miss </h1>
        <p className="subheading mx-auto max-w-2xl">
          Discover the most meaningful hackathons, meetups, and conferences in one focused space.
          Join {Math.floor(events.length * 12.5)}+ developers building the future.
        </p>
        <div className="mt-8">
          <ExploreBtn />
        </div>
      </div>

      <StatsBar />

      {/* Featured Categories */}
      <div className="category-grid animate-fade-up [animation-delay:200ms]">
        {[
          { icon: Zap, name: "Hackathons", color: "text-blue-400" },
          { icon: Cpu, name: "AI & ML", color: "text-purple-400" },
          { icon: Users, name: "Meetups", color: "text-green-400" },
          { icon: Globe, name: "Conferences", color: "text-orange-400" },
        ].map((cat) => (
          <div key={cat.name} className="category-card group">
            <cat.icon size={24} className={`icon ${cat.color}`} />
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      <FeaturedSpeakers />

      {/* Trending Now */}
      <div className="space-y-6 animate-fade-up [animation-delay:300ms]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap size={18} className="text-primary" /> Trending Now
          </h3>
          <span className="text-[11px] text-light-200 uppercase tracking-widest font-semibold opacity-50">Swipe to discover</span>
        </div>
        <div className="trending-carousel">
          {events.slice(0, 3).map((event) => (
            <Link key={event._id} href={`/events/${event.slug}`} prefetch={false} className="trending-card">
              <img src={event.image} alt={event.title} className="trending-poster" />
              <div className="trending-info">
                <span className="trending-tag">Hottest {event.tags[0] || 'Event'}</span>
                <h4 className="trending-title">{event.title}</h4>
                <p className="trending-meta">{event.location} • {event.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 animate-fade-up [animation-delay:400ms]">
        <h3 className="text-xl font-bold mb-8">All Upcoming Events</h3>
        <EventsList initialEvents={events} />
      </div>

      <NewsletterSection />

      <Testimonials />

      <FAQSection />
    </section >
  )
}

export default Page
