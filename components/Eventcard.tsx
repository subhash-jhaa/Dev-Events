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
    <Link href={`/events/${slug}`} id="event-card" prefetch={false}>
      <img src={image} alt={title} width={410} height={300} className="poster" />

      <div className="flex flex-row gap-2">
        <img src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p className="info">{location}</p>
      </div>

      <p className="title">{title}</p>

      <div className="datetime">
        <div>
          <img src="/icons/calendar.svg" alt="calendar" width={14} height={14} />
          <p className="info">{date}</p>
        </div>

        <div>
          <img src="/icons/clock.svg" alt="clock" width={14} height={14} />
          <p className="info">{time}</p>
        </div>
      </div>
    </Link>
  )
}

export default Eventcard
