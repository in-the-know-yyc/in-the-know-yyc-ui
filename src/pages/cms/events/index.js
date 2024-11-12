import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import Image from 'next/image';
import moment from "moment/moment";

// API
import { switchEventStatus, deleteEvent } from '../../../api/events';

// HOOKS
import { getFilteredEvents } from '../../../api/events';

// NextUI Components
import { Chip } from "@nextui-org/chip";
import { Spacer } from "@nextui-org/spacer";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Tooltip, Tabs, Tab, Spinner, Avatar } from '@nextui-org/react';
import { Switch } from "@nextui-org/switch";
import { Button } from "@nextui-org/button";

// TOAST MESSAGES
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// MODAL
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import ModalEventsContent from '../../../components/cms/ModalEventsContent';

export default function AllEvents({ eventsList, searchParams }) {
  // EVENTS FETCHING
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
        console.log('NEW EVENTS:', newEvents)

        // Filter out duplicates based on unique IDs
        const uniqueNewEvents = newEvents.data.content.filter(
          (newEvent) => !events.some((existingEvent) => existingEvent.id === newEvent.id)
        );

        //setEvents((prevEvents) => [...prevEvents, ...newEvents.data.content]);
        setEvents((prevEvents) => [...prevEvents, ...uniqueNewEvents]);


        setMoreEventsAvailable((newEvents.data.totalPages > newEvents.data.number));
      } catch (error) {
        console.error('Error fetching events in fetchMoreEvents CSR:', error);
      }
    }
  };
  

  // MODAL
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [modalType, setModalType] = useState('new');
  const [modalEvent, setModalEvent] = useState();
  const handleModal = (type, ev) => {
    setModalType(type);
    setModalEvent(ev);
    onOpen();
  }
  

  // EVENTS CRUD
  const missingInfo = (ev) => {
    const missingInfo = [
      (!ev.eventDate || ev.eventDate === 'undefined' || ev.eventDate === null) ? 'Date' : '',
      (!ev.eventDescription || ev.eventDescription === 'undefined' || ev.eventDescription === null) ? 'Description' : '',
      (!ev.eventImage || ev.eventImage === 'undefined' || ev.eventImage === null) ? 'Image' : '',
      (!ev.eventLink || ev.eventLink === 'undefined' || ev.eventLink === null) ? 'Link' : '',
      (!ev.eventName || ev.eventName === 'undefined' || ev.eventName === null) ? 'Name' : '',
      (!ev.eventType || ev.eventType === 'undefined' || ev.eventType === null) ? 'Type' : '',
      (!ev.industry || ev.industry === 'undefined' || ev.industry === null) ? 'Industry' : '',
      (!ev.location || ev.location === 'undefined' || ev.location === null) ? 'Location' : '',
      (!ev.organizationName || ev.organizationName === 'undefined' || ev.organizationName === null) ? 'Organization Name' : '',
      (!ev.freeEvent && (!ev.eventCost || ev.eventCost === 'undefined' || ev.eventCost === null)) ? 'Price' : '',
      (!ev.industry || ev.industry === 'undefined' || ev.industry === null) ? 'Industry' : '',
      (!ev.industry || ev.speakers.length === 0) ? 'Speakers' : '',
    ].filter(i => i !== '');
  
    if (missingInfo.length === 0) {
      return (<Tooltip content={'There is no mising information for this event'} color='success'><Avatar size='sm' src='#' className='bg-success-200' /></Tooltip>);
    } else {
      const tooltipContent = 'MISSING INFORMATION: ' + missingInfo.join(' , ');
      return (
        <Tooltip content={tooltipContent} color='warning'><Avatar size='sm' src='/images/icons/warning.svg' className='bg-white border-solid border-2 border-danger-700 p-1' /></Tooltip>
      )
    }
  }

  const handleEventPublication = async (eventId) => {
    const updatedEvents = [...events]; // COPY EVENTS ARRAY TO PREVENT MUTATION OF ORIGNAL ONE
    const index = updatedEvents.findIndex(e => e.id === eventId); // FIND THE EVENT IN THE NEW ARRAY
    if (index !== -1) {
      // If the event is found, set the new status: [ pending | approved | rejected ]
      const newStatus = (updatedEvents[index].status === 'pending') ? 'approved' : 'pending';
      const changeStatus = await switchEventStatus(eventId, newStatus);
      console.log('EVENT STATUS CHANGE:',changeStatus)
      if(changeStatus.type === 'success'){
        updatedEvents[index].status = newStatus;
        setEvents(updatedEvents);
        const statusText = (newStatus === 'approved') ? 'published' : 'unpublished';
        toast.success(`The event is now ${statusText}!`,{theme:'colored'});
      }else{
        toast.error('There was an error switching the status. Please, try again later.',{theme:'colored'});
      }
    }
  };


  const handleEventDeletion = async (eventId, onClose) => {
    const eventDeleted = await deleteEvent(eventId);
    console.log('EVENT DELETED:',eventDeleted);
    if(eventDeleted.type === 'success'){
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents)
      toast.success('The event has been successfully removed!',{theme:'colored'});
    }else{
      toast.error('There was an error removing the event. Please, try again later.',{theme:'colored'});
    }
    onClose();
  }
  
  return (
    <main>
      <ToastContainer />
      <InfiniteScroll
        dataLength={events.length}
        next={fetchMoreEvents}
        hasMore={moreEventsAvailable}
        loader={<Spinner color="success"/>}
        endMessage={<p className='endMessage'>There are no more results for this search criteria</p>}
      >
        <Accordion variant="splitted" className='p-7'>
          {events.map((ev, index) => (


            <AccordionItem
              // className='bg-green-400'
              key={`event_id_key_${ev.id}_${index}`}
              aria-label={(ev.eventName) ? ev.eventName : 'NO TITLE'}
              title={(ev.eventName) ? ev.id + ' | ' + ev.eventName + ' | - - - > ' + ev.status : ev.id + ' | NO TITLE | - - - > ' + ev.status}
              startContent={missingInfo(ev)}
            >
              <div className="flex w-full flex-col">

                {/* EVENT INFORMATION TABS: IMAGE | DESCRIPTION | DETAILS */}
                <Tabs aria-label="Options" variant='light'>
                  <Tab key="image" title='Images' className={(!ev.eventImage) ? 'bg-warning-100' : ''}>
                    {(!ev.eventImage) ? ' - No image -' : <Image src={'/images/events/evt2.png'} width={'805'} height={'664'} alt='' /> }
                  </Tab>
                  <Tab key="description" title="Description" className={(!ev.eventDescription) ? 'bg-warning-100' : ''} >
                    {(!ev.eventDescription) ? ' - No description -' : ev.eventDescription }
                  </Tab>
                  <Tab key="details" title="Details" className={(!ev.eventDate || !ev.location || !ev.eventLink || !ev.eventType || !ev.industry || ev.speakers.length === 0) ? 'bg-warning-100' : ''}>
                    <p><b>Date: </b>{(ev.eventDate) ? moment(ev.eventDate).format('DD/MM/YYYY') : <Chip color='warning'>No date</Chip>}</p>
                    <p><b>Time: </b>{(ev.eventDate) ? moment(ev.eventDate).format('HH:MM') : <Chip color='warning'>No time</Chip>}</p>
                    <p><b>Location: </b>{(ev.location) ? ev.location : <Chip color='warning'>No location</Chip>}</p>
                    <p><b>Price: </b>{(ev.freeEvent) ? 'Free' : ev.eventCost}</p>
                    <p><b>Link: </b>{(ev.eventLink) ? ev.eventLink : <Chip color='warning'>No link</Chip>}</p>
                    <p><b>Type: </b>{(ev.eventType) ? ev.eventType : <Chip color='warning'>No type</Chip>}</p>
                    <p><b>Industry: </b>{(ev.industry) ? ev.industry : <Chip color='warning'>No industry</Chip>}</p>
                    <p><b>Organization: </b>{(ev.organizationName) ? ev.organizationName : <Chip color='warning'>No Organization</Chip>}</p>
                    <p><b>Speakers: </b>{
                      (ev.speakers.length === 0) ? <Chip color='warning'>No speakers</Chip> : ev.speakers.map((speaker, index) => {
                        return(<div key={`speaker_${ev.id}_${index}`}>{speaker.name} ({speaker.company})</div>)
                      })
                    }</p>
                  </Tab>
                </Tabs>

                {/* ACTIONS FOOTER: EDIT | DELETE | PUBLISH */}
                <div className="flex w-full justify-between p-4">
                  <div className='flex items-center justify-between'>
                      <Button size="sm" color='warning' onPress={() => handleModal('edit', ev)}>
                        <Image src="/images/icons/edit-black.svg" width={24} height={24} alt="Edit icon" />
                        Edit
                      </Button>
                      <Spacer x={4} />
                      <Button size="sm" color='danger' onPress={() => handleModal('delete', ev)}>
                        <Image src="/images/icons/delete-white.svg" width={24} height={24} alt="Delete icon" />
                        Delete
                      </Button>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span>Published event: </span>
                      <Spacer x={4} />
                      <Tooltip content={(ev.status === 'approved') ? 'Published event' : 'This event is NOT published yet '} color={(ev.status === 'approved') ? 'success' : 'danger'}>
                        <Switch defaultSelected={(ev.status === 'approved') ? true : false}  aria-label="Publish event" onChange={() => handleEventPublication(ev.id)}  />
                      </Tooltip>
                    </div>
                </div>
              </div>


            </AccordionItem>
          ))}
        </Accordion>
      </InfiniteScroll>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <ModalEventsContent type={modalType} event={modalEvent} onClose={onClose} handleEventDeletion={handleEventDeletion} />
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}

// SSR RENDERING (ONLY FIRST BATCH OF EVENTS)
export async function getServerSideProps(context) {
  const filters = { ...context.query, size: 10 }
  const events = await getFilteredEvents(filters);
  return { props: { eventsList: events.data.content, searchParams: events.params } };
}





