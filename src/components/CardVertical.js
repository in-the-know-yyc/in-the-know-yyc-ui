import Image from "next/image";
import Link from "next/link";
import validator from "validator";
import moment from 'moment';
import "../app/styles/components/cardVertical.css";

const CardVertical = ({content}) => {

  // NEEDS DEFINITION FOR IMAGE FULL PATH!
  //const image = (validator.isURL(content.eventImage)) ? content.eventImage : '/images/events/evt1.png';
  const imagePath = (content && typeof content.eventImage === 'string') ? `/images/events/${content.eventImage}` : '/images/events/evt1.png';
  const image = (validator.isURL(imagePath)) ? imagePath : '/images/events/evt1.png';
  

  const date = moment(content.eventDate).format('MMM DD, YYYY');

  return (
    <Link href={`/events/${content.id}`} className="cardVerticalContainer">
      <article className="cardVertical">
        {/* IMAGE | REQUIRED */}
        <Image src={image} width={390} height={228} alt={content.eventName} />

        {/* TITLE | REQUIRED*/}
        <h3>{content.eventName}</h3>

        {/* DESCRIPTION | OPTIONAL */}
        {content.eventDescription && content.eventDescription !== '' && (<p>{content.eventDescription}</p>)}

        <ul>
          {/* LOCATION | REQUIRED */}
          <li className="location">{content.location}</li>
          
          {/* DATE | REQUIRED */}
          <li className="calendar">{date}</li>

          <li className="line-break"></li>

          {/* SPEAKER | OPTIONAL */}
          {content.speakers && content.speakers.length > 0 && (
            <li className="speaker">Speaker: {content.speakers.map(speaker => speaker.name+' | ')}</li>
          )}

          <li className="line-break"></li>
          
          {/* ATTENDANTS | OPTIONAL */}
          {/* {content.attendants && content.attendants !== '' && (
            <li className="attendants">Attendants: {content.attendants}</li>
          )} */}
          <li></li>

          {/* PRICE | REQUIRED */}
          <li className="price">{(content.freeEvent) ? 'Free' : content.eventCost}</li>
        </ul>
      </article>
    </Link>
  );
};

export default CardVertical;