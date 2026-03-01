'use client'

import Link from "next/link";
import { MapPin, Calendar, Clock, ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  tags?: string[];
}

const Eventcard = ({ title, image, slug, location, date, time, tags = [] }: Props) => {
  return (
    <div className="p-1 h-full">
      <Link
        href={`/events/${slug}`}
        id="event-card"
        prefetch={false}
        className="block relative group h-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-4 transition-all duration-500 hover:bg-white/[0.06] hover:border-primary/30 hover:shadow-[0_0_30px_-10px_rgba(93,254,202,0.2)]"
      >
        {/* Hover Arrow Indicator */}
        <div className="absolute top-6 right-6 z-20 opacity-0 transform translate-x-[-10px] translate-y-[10px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
          <div className="bg-primary p-2 rounded-full shadow-lg shadow-primary/20">
            <ArrowUpRight size={18} className="text-black" />
          </div>
        </div>

        {/* Image Container */}
        <div className="relative overflow-hidden rounded-xl mb-5 aspect-[4/3] z-10">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Tag Badges Overlay */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 rounded-md uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-primary/80">
            <MapPin size={14} className="opacity-80" />
            <p className="text-[11px] font-bold tracking-widest uppercase">{location}</p>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem] leading-snug">
            {title}
          </h3>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] mt-auto">
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-light-200 opacity-60" />
              <p className="text-[12px] text-light-200 font-medium">{date}</p>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={13} className="text-light-200 opacity-60" />
              <p className="text-[12px] text-light-200 font-medium">{time}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Eventcard;
