import Image from 'next/image';
import Banner from '../../components/Banner';
import EventsFilter from '../../components/EventsFilter';
import CardHorizontal from '../../components/CardHorizontal';
import { getFilteredEvents } from '../../api/events';


export default function AllEvents({ events }) {

  return (
    <>
        <Banner />
        <EventsFilter />
        <div id="events-horizontal-container">        
          {Object.entries(events).map((evt) => {
            const eventContent = evt[1];
            return (
              <CardHorizontal key={`event_id_${eventContent.id}`} content={eventContent} />
            );
          })}
      </div>
      <div id='loadingSpinner'>
        <Image src='/images/icons/loading.gif' alt='' width={200} height={200} />
      </div>
    </>
  );
}


export async function getServerSideProps() {
  const events = await getFilteredEvents();
  return {props: {events: events.content} };
}