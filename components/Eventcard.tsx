'use client'

import Link from "next/link";

interface props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const Eventcard = ({ title, image, slug, location, date, time }: props) => {
  return (
    <div className="p-1">
      <Link
        href={`/events/${slug}`}
        id="event-card"
        prefetch={false}
        className="block tilt-on-hover inner-glow bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 transition-all overflow-hidden group h-full"
      >
        <div className="overflow-hidden rounded-xl mb-5 aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <img src="/icons/pin.svg" alt="location" width={14} height={14} className="opacity-80" />
            <p className="text-[12px] font-semibold tracking-wide uppercase opacity-90">{location}</p>
          </div>

          <p className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
            <div className="flex items-center gap-2">
              <img src="/icons/calendar.svg" alt="calendar" width={14} height={14} className="opacity-60" />
              <p className="text-[13px] text-light-200">{date}</p>
            </div>

            <div className="flex items-center gap-2">
              <img src="/icons/clock.svg" alt="clock" width={14} height={14} className="opacity-60" />
              <p className="text-[13px] text-light-200">{time}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Eventcard
