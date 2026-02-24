import ExploreBtn from "@/components/ExploreBtn"
import Eventcard from "@/components/Eventcard"
import { IEvent } from "@/database";
import { getAllEvents } from "@/lib/actions/event.action";

const page = async () => {
  const events: IEvent[] = await getAllEvents();

  return (
    <section>
      <h1 className="text-center"> The Hub for Every Dev <br /> Events You Can&apos;t Miss </h1>
      <p className="text-center mt-5 ">Hackathons, Meetups and Conferences, All in One Place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.title}>
              <Eventcard {...event} />
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}

export default page
