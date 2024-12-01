import Link from "next/link";
import Image from "next/image";
import "../../app/styles/components/eventInfo.css";
import { getEventById } from '../../api/events';
import moment from "moment/moment";
import EventMap from "./map";
import isValidImageUrl from "../../utils/isValidImage";


export default function EventInfo({ eventInformation }) {
    const eventImage = isValidImageUrl(eventInformation.eventImage)
    const dateTime = moment(eventInformation.eventDate);
    
    // const eventImage = '/images/events/evt2.png';

    return (
        <section className="eventInformation">
            <div className="row-1">
                <Link href={'/events'}>
                    <Image src={'/images/icons/back-arrow.svg'} width={'15'} height={'15'} alt='' />
                </Link>
                <h1>{eventInformation.eventName}</h1>
            </div>
            <div className="row-2">
                <Image src={eventImage} width={'805'} height={'664'} alt={eventInformation.eventName || ''} />
                <EventMap location={eventInformation.location} />
            </div>
            <div className="row-3">
                <h2>About Event</h2>

                <h3>Event Host/Facilitator</h3>
                <p>{eventInformation.organizationName}</p>

                <h3>Event Description</h3>
                <p>{eventInformation.eventDescription}</p>

                <ul>
                    <li>
                        <h3>Event Type</h3>
                        <p>{eventInformation.eventType}</p>
                    </li>
                    <li>
                        <h3>Industry</h3>
                        <p>{eventInformation.industry}</p>
                    </li>
                </ul>

                {(eventInformation.speakers && typeof eventInformation.speakers === 'array') ? eventInformation.speakers.map((speaker, index) => {
                    return <label className="speaker" key={`speaker_${index}`}>{speaker}</label>
                }) : ''}
                <label className="date">{dateTime.format('MMMM D, YYYY')}</label>
                <label className="time">{dateTime.format('h:mm a z')}</label>
                <label className="location">{eventInformation.location}</label>

                <label className="admission"><b>Admission:</b> {(eventInformation.freeEvent) ? 'Free' : `$ ${eventInformation.eventCost.toFixed(2)}`}</label>

                <Link className="attend" href={eventInformation.eventLink || '#'} target="_blank"> Attend </Link>


            </div>
        </section>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;

    const eventInformation = await getEventById(id);

    return {props: {id, eventInformation} };
}