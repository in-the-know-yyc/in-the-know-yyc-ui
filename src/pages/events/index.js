import { useState, useRef, useEffect } from 'react';
import React from 'react';
import Image from 'next/image';
import Banner from '../../components/Banner';
import EventsFilter from '../../components/EventsFilter';
import CardHorizontal from '../../components/CardHorizontal';
import { getFilteredEvents } from '../../api/events';

export default function AllEvents({ eventsList }) {
  const [events] = useState(eventsList); // Initialize state
  //const [currentPage, setCurrentPage] = useState(1); // Initialize state for current page
  const eventsHorizontalContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
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

    /* - - - - - - - - - - - - - - - - * * * * * * * - - - - - - - - - - - - - - - - */
    /*  - - - - - - -  |  THIS ONE NEEDS CORS ENABLED ON API SIDE  |  - - - - - - -  */
    /* - - - - - - - - - - - - - - - - * * * * * * * - - - - - - - - - - - - - - - - */
    
    //setCurrentPage(currentPage + 1); // Update current page
    
    //const newEvents = await getFilteredEvents();
    
    //console.log('FETCHEANDO EVENTOS:');
    //console.log('EVENTS:', events);
    //console.log('NEW EVENTS:', newEvents);
    //setEvents([...events, ...newEvents.content]); // Append new events
  };

  return (
    <>
      <Banner />
      <EventsFilter />
      <div id="events-horizontal-container" ref={eventsHorizontalContainerRef}>
        {events.map((eventContent) => (
          <CardHorizontal key={`event_id_${eventContent.id}`} content={eventContent} />
        ))}
      </div>
      <div id="loadingSpinner">
        <Image src="/images/icons/loading.gif" alt="" width={200} height={200} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const events = await getFilteredEvents();
  return { props: { eventsList: events.content } };
}