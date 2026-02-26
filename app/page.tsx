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
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/SectionReveal";
import { CommunityCluster } from "@/components/CommunityCluster";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Page = async () => {
  const events: IEvent[] = await getAllEvents();

  return (
    <section id="home" className="space-y-24 pb-20">
      {/* Hero Section */}
      <SectionReveal delay={0.1} className="text-center pt-10">
        <div className="live-badge">
          <div className="dot"></div>
          {events.length} Events Live Now
        </div>
        <h1 className="leading-tight"> The Hub for Every Dev <br /> Events You Can&apos;t Miss </h1>
        <p className="subheading mx-auto max-w-2xl opacity-80">
          Discover the most meaningful hackathons, meetups, and conferences in one focused space.
          Join {Math.floor(events.length * 12.5)}+ developers building the future.
        </p>

        <div className="mt-8 mb-12">
          <CommunityCluster />
        </div>

        <div className="mt-8">
          <ExploreBtn />
        </div>
      </SectionReveal>

      <SectionReveal delay={0.3}>
        <StatsBar />
      </SectionReveal>

      {/* Featured Categories */}
      <div className="relative">
        <div className="absolute inset-x-[-5vw] top-[-100px] bottom-[-100px] dot-grid opacity-20 pointer-events-none z-0"></div>
        <StaggerContainer className="category-grid relative z-10">
          {[
            { icon: Zap, name: "Hackathons", color: "text-blue-400" },
            { icon: Cpu, name: "AI & ML", color: "text-purple-400" },
            { icon: Users, name: "Meetups", color: "text-green-400" },
            { icon: Globe, name: "Conferences", color: "text-orange-400" },
          ].map((cat) => (
            <StaggerItem key={cat.name}>
              <div className="category-card group">
                <cat.icon size={24} className={`icon ${cat.color}`} />
                <span>{cat.name}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>


      {/* Trending Now */}
      <SectionReveal className="space-y-8 relative">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Zap size={20} className="text-primary" /> Trending Now
          </h3>
          <span className="text-[11px] text-light-200 uppercase tracking-widest font-bold opacity-40">Swipe to discover</span>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {events.slice(0, 6).map((event) => (
              <CarouselItem key={event._id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <Link href={`/events/${event.slug}`} prefetch={false} className="trending-card w-full block group">
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="trending-poster transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="trending-info">
                    <span className="trending-tag">Hottest {event.tags[0] || 'Event'}</span>
                    <h4 className="trending-title group-hover:text-primary transition-colors">{event.title}</h4>
                    <p className="trending-meta">{event.location} • {event.date}</p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-3 mt-6">
            <CarouselPrevious className="static translate-y-0 border-white/10 bg-white/5 hover:bg-white/10 text-white size-10" />
            <CarouselNext className="static translate-y-0 border-white/10 bg-white/5 hover:bg-white/10 text-white size-10" />
          </div>
        </Carousel>
      </SectionReveal>

      <SectionReveal id="events" className="pt-8">
        <h3 className="text-2xl font-bold mb-10 border-l-4 border-primary pl-6">All Upcoming Events</h3>
        <EventsList initialEvents={events} />
      </SectionReveal>

      <SectionReveal direction="right">
        <FeaturedSpeakers />
      </SectionReveal>

      <div className="relative py-12">
        <div className="absolute inset-x-[-5vw] inset-y-0 dot-grid opacity-20 pointer-events-none"></div>
        <SectionReveal>
          <NewsletterSection />
        </SectionReveal>
      </div>

      <SectionReveal>
        <Testimonials />
      </SectionReveal>

      <SectionReveal>
        <FAQSection />
      </SectionReveal>
    </section >
  )
}

export default Page
