import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug, getEventBySlug } from "@/lib/actions/event.action";
import EventCard from "@/components/Eventcard";
import { notFound } from "next/navigation";
import { IEvent } from "@/database";
import { Suspense } from "react";

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => (
  <div className="flex-row-gap-2 items-center ">
    <img src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul className="flex-col-gap-1">
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row-gap-1.5 flex-wrap">
    {Array.isArray(tags) && tags.map((tag) => (
      <div className="pill" key={tag} >{tag}</div>
    ))}
  </div>
)

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventDetailsContent params={params} />
    </Suspense>
  )
}

const EventDetailsContent = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const event = await getEventBySlug(slug);

  if (!event) return notFound();

  const { description, image, overview, date, time, location, mode, agenda, audience, tags, organizer } = event;

  if (!description) return notFound();

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p >{description}</p>
      </div>

      <div className="details">
        {/* left side - events content*/}
        <div className="content">
          <img src={image} alt="Event Banner" width={800} height={800} className="banner" />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="Calendar Icon" label={`${date}`} />
            <EventDetailItem icon="/icons/clock.svg" alt="Clock Icon" label={`${time}`} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin Icon" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="Mode Icon" label={mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="audience Icon" label={audience} />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        {/* right side - Booking Form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20" >
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
            <EventCard key={similarEvent.title}{...similarEvent} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventDetailsPage
