import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import Image from 'next/image';
import moment from "moment/moment";


// API
import { getAllEvents, switchEventStatus, deleteEvent, updateEvent, createEvent, uploadImage } from '../../../api/events';


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

  // MODAL SIZE
  

  // CHECK IF EVENTS IS EMPTY TO RUN THE FIRST CALL
  /* ******* ARREGLAR! tira error por mucho rendering. Falta el dependency array... ******* */
  // useEffect(() => {
  //   if (!events || events.length === 0) {
  //     fetchMoreEvents();
  //   }
  // });


  // CSR RENDERING (ALL THE EVENTS ON INFINITE SCROLL)
  const fetchMoreEvents = async () => {
    setParams((prevParams) => ({
      ...prevParams,
      page: (prevParams.page + 1),
    }));

    if (moreEventsAvailable) {
      try {
        const newEvents = await getAllEvents(params);

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
  const [modalSize, setModalSize] = useState('5xl');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState('new');
  const [modalEvent, setModalEvent] = useState();
  const handleModal = (type, ev) => {
    setModalType(type);
    setModalEvent(ev);
    setModalSize((type === 'delete') ? 'sm' : '5xl');
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
      
      if (changeStatus.type === 'success') {
        updatedEvents[index].status = newStatus;
        setEvents(updatedEvents);
        const statusText = (newStatus === 'approved') ? 'published' : 'unpublished';
        toast.success(`The event is now ${statusText}!`, { theme: 'colored' });
      } else {
        toast.error('There was an error switching the status. Please, try again later.', { theme: 'colored' });
      }
    }
  };
  const handleEventDeletion = async (eventId, onClose) => {
    const eventDeleted = await deleteEvent(eventId);
    
    if (eventDeleted.type === 'success') {
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents)
      toast.success('The event has been successfully removed!', { theme: 'colored' });
    } else {
      toast.error('There was an error removing the event. Please, try again later.', { theme: 'colored' });
    }
    onClose();
  }
  const uploadEventImage = async (currentLink) => {
    const imageFiles = document.getElementById('inputImageFile').files;
    if(imageFiles.length > 0){
      const formData = new FormData();
      formData.append('file', imageFiles[0])
      const uploadedImage = await uploadImage(formData); // Sending FormData for file uploading
      if(uploadedImage.type === 'success' && uploadedImage.link !== ''){
        return uploadedImage.link
      }else{
        return currentLink;
      }
    }
  }
  const eventFormValidation = (evt) => {
    if(
        evt.organizationName === '' || 
        evt.eventName === '' || 
        evt.eventDescription === '' || 
        (!evt.freeEvent && evt.eventCost <= 0) || 
        evt.eventLink === '' || 
        evt.eventType === '' || 
        evt.location === '' || 
        evt.industry === '' || 
        evt.eventImage === ''
      ){
      toast.error('You are missing required fields.', { theme: 'colored' })
      return false;
    };

    return true;
  }
  const handleFormSubmit = async (type, evt, onClose) => {

    // IMAGE UPLOAD IF SELECTED IN INPUT
    const eventImage = await uploadEventImage(evt.eventImage);
    evt = {...evt, eventImage: eventImage}

    // FORM VALIDATION
    if(!eventFormValidation(evt)){ return; }


    // EVENT UPDATE | CREATION
    const response = (type === 'edit') ? await updateEvent(evt) : await createEvent(evt);

    // MESSAGES
    switch(response.type){
      case 'success':
        const successMesage = (type === 'edit') ? "updated" : "created"
        toast.success(`The event was ${successMesage} successfully`, { theme: 'colored' });
        break;
      case 'error':
        const errorMesage = (type === 'edit') ? "updating" : "creating"
        toast.error(`There was an error ${errorMesage} the event. Pleas try again later.`, { theme: 'colored' });
        break;
      default:
        toast.error(`There was an unexpected error. Pleas try again later.`, { theme: 'colored' });
    }

    // CLOSE MODAL
    onClose();

    console.log('RESPONSE CRUD:', response)
  }

  return (
    <main>
      <ToastContainer />
      <Tooltip color='primary' content='Create an event'>
        <Button onPress={() => {handleModal('new')}} color='primary' className='rounded-full w-16 h-16 fixed bottom-14 right-14'>
          <Image src={'/images/icons/add-white.svg'} width={50} height={50} alt='Create new event' />
        </Button>
      </Tooltip>
      <InfiniteScroll
        dataLength={events.length}
        next={fetchMoreEvents}
        hasMore={moreEventsAvailable}
        loader={<Spinner color="success" />}
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
                    {(!ev.eventImage) ? ' - No image -' : <Image src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/files/download/${ev.eventImage}`} width={'805'} height={'664'} alt='' />}
                  </Tab>
                  <Tab key="description" title="Description" className={(!ev.eventDescription) ? 'bg-warning-100' : ''} >
                    {(!ev.eventDescription) ? ' - No description -' : ev.eventDescription}
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
                        return (<div key={`speaker_${ev.id}_${index}`}>{speaker.name} ({speaker.company})</div>)
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
                      <Switch defaultSelected={(ev.status === 'approved') ? true : false} aria-label="Publish event" onChange={() => handleEventPublication(ev.id)} />
                    </Tooltip>
                  </div>
                </div>
              </div>


            </AccordionItem>
          ))}
        </Accordion>
      </InfiniteScroll>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' size={modalSize}>
        <ModalContent>
          {(onClose) => (
            <ModalEventsContent type={modalType} event={modalEvent} onClose={onClose} handleEventDeletion={handleEventDeletion} handleFormSubmit={handleFormSubmit} />
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}

// SSR RENDERING (ONLY FIRST BATCH OF EVENTS)
export async function getServerSideProps(context) {
  const filters = { ...context.query, size: 10, sortField: 'eventDate', sortDirection: 'asc', page: 0 }

  return { props: { eventsList: [], searchParams: filters } };
}





