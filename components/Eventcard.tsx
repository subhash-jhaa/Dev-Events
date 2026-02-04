'use client'

import Link from "next/link";
import posthog from 'posthog-js';

interface props{
    title:string;
    image:string;
    slug:string;
    location:string;
    date:string;
    time:string;
}
const Eventcard = ({title , image,slug,location,date,time}: props) => {
  const handleClick = () => {
    posthog.capture('event_card_clicked', {
      event_title: title,
      event_slug: slug,
      event_location: location,
      event_date: date,
    });
  }

  return (
    <Link href={`/events/${slug}`} id="event-card" onClick={handleClick}>
    <img src= {image}  alt={title} width={410} height={300} className="poster" />

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
