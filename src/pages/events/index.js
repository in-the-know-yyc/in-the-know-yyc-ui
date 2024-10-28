import { useState, useRef, useEffect } from 'react';
import React from 'react';
import Image from 'next/image';
import Banner from '../../components/Banner';
import EventsFilter from '../../components/EventsFilter';
import CardHorizontal from '../../components/CardHorizontal';
import { getFilteredEvents } from '../../api/events';

export default function AllEvents({ eventsList, searchParams }) {

  const [events, setEvents] = useState(eventsList);
  const [params, setParams] = useState(searchParams);
  const eventsHorizontalContainerRef = useRef(null);
  const [moreEventsAvailable, setMoreEventsAvailable] = useState(true);

  useEffect(() => {
    // OBSERVING SCROLL IN EVENTS CONTEINER TO FETCH MORE EVENTS
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setMoreEventsAvailable(true);
        fetchMoreEvents();
      }
    });

    if (eventsHorizontalContainerRef.current) {
      observer.observe(eventsHorizontalContainerRef.current);
    }

    return () => {
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, [eventsHorizontalContainerRef]);

  const fetchMoreEvents = async () => {
    setParams((prevParams) => ({
      ...prevParams,
      page: (prevParams.page + 1),
    }));

    if (moreEventsAvailable) {
      try {
        const newEvents = await getFilteredEvents(params);
        setEvents((prevEvents) => [...prevEvents, ...newEvents.data.content]);
        console.log('PAGINATION:', newEvents.data.totalPages, newEvents.data.number,(newEvents.data.totalPages > newEvents.data.number))
        setMoreEventsAvailable((newEvents.data.totalPages > newEvents.data.number));
      } catch (error) {
        console.error('Error fetching events in fetchMoreEvents CSR:', error);
      }
    }
  };

  return (
    <>
      <Banner />
      <EventsFilter searchText={params.searchText} />
      <button onClick={fetchMoreEvents}>MORE EVENTS</button>
      <div id="events-horizontal-container" ref={eventsHorizontalContainerRef}>
        {events.map((eventContent, index) => (
          <CardHorizontal key={`event_id_${eventContent.id}-${index}`} content={eventContent} />
        ))}
      </div>
      <div id="loadingSpinner">
        {(moreEventsAvailable) ? <Image src="/images/icons/loading.gif" alt="" width={200} height={200} /> : 'There are no more results for this search criteria'}

      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const events = await getFilteredEvents(context.query);

  console.log('EVENTS SSR:', events);

  return { props: { eventsList: events.data.content, searchParams: events.params } };
}