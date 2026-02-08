import ExploreBtn from "@/components/ExploreBtn"
import Eventcard from "@/components/Eventcard"
import { events } from "@/lib/constants"
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBIC_BASE_URL || "http://localhost:3000";
const page = async () => {

  'use cache';
  cacheLife('hours')
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events} = await response.json();
   
  
  return (
   <section>
    <h1 className="text-center"> The Hub for Every Dev <br /> Events You Can't Miss </h1>
    <p className="text-center mt-5 ">Hackathons, Meetups and Conferences, All in One Place</p>

    <ExploreBtn/>

    <div className="mt-20 space-y-7">
      <h3>Featured Events</h3>


      <ul className="events">
        {events && events.length > 0 && events.map((event:IEvent) => (

          <li key={event.title}>
            <Eventcard {...event}/>
          </li>
        ))}
      </ul>

    </div>
   </section>
  )
}

export default page
