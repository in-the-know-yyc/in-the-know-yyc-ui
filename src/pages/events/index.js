import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import Image from 'next/image';
import Banner from '../../components/Banner';
import EventsFilter from '../../components/EventsFilter';
import CardHorizontal from '../../components/CardHorizontal';

import "../../app/styles/pages/events.css";

import { getFilteredEvents } from '../../api/events';

// SEO: Pages metadata
import pagesMetaData from "../../utils/pagesMetaData";
import PagesMetaData from "../../components/PagesMetaData";


export default function AllEvents({ eventsList, searchParams, metadata }) {
  const [events, setEvents] = useState(eventsList);
  const [params, setParams] = useState(searchParams);
  const [moreEventsAvailable, setMoreEventsAvailable] = useState(true);

  // CSR RENDERING (ALL THE EVENTS ON INFINITE SCROLL)
  const fetchMoreEvents = async () => {
    setParams((prevParams) => ({
      ...prevParams,
      page: (prevParams.page + 1),
    }));

    if (moreEventsAvailable) {
      try {
        const newEvents = await getFilteredEvents(params);
        setEvents((prevEvents) => [...prevEvents, ...newEvents.data.content]);
        setMoreEventsAvailable((newEvents.data.totalPages > newEvents.data.number));
      } catch (error) {
        console.error('Error fetching events in fetchMoreEvents CSR:', error);
      }
    }
  };

  return (
    <>
      <PagesMetaData metadata={metadata} />
      <Banner />
      <EventsFilter filters={params} />
      <div id="events-horizontal-container">
        <InfiniteScroll
          dataLength={events.length}
          next={fetchMoreEvents}
          hasMore={moreEventsAvailable}
          loader={<div id='loadingSpinner'><Image src="/images/icons/loading.gif" alt="" width={200} height={200} /></div>}
          endMessage={<p className='endMessage'>There are no more results for this search criteria</p>}
        >
          {events.map((eventContent, index) => (
            <CardHorizontal key={`event_id_${eventContent.id}-${index}`} content={eventContent} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

// SSR RENDERING (ONLY FIRST BATCH OF EVENTS)
export async function getServerSideProps(context) {
  const metadata = await pagesMetaData('events')
  const events = await getFilteredEvents(context.query);
  return { props: { eventsList: events.data.content, searchParams: events.params, metadata } };
}


