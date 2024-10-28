import Link from "next/link";
import "../app/styles/components/cardHorizontal.css";
import moment from "moment/moment";

const CardHorizontal = ({ content }) => {
  
  const dateTime = moment(content.eventDate)
  const eventImage = content.eventImage || '/images/events/evt2.png';
  
  return (
    <Link href={`/events/${content.id}`} className="linkCardHorizontal">
      <div className="TEST-ID">{content.id}</div>
      <article className="cardHorizontal">
        {/* IMAGE | REQUIRED */}
        <div className="img" style={{ backgroundImage: `url(${eventImage})` }}></div>

        <div className="content">
          {/* DATE | REQUIRED*/}
          <h4>{dateTime.format('ddd, MMM DD YYYY, h:mm a z')}</h4>

          <div className="name">
            {/* TITLE | REQUIRED*/}
            <h3>{content.eventName}</h3>

            {/* DESCRIPTION | OPTIONAL */}
            {content.eventDescription && content.eventDescription !== '' && (<p>{content.eventDescription}</p>)}
          </div>

          <ul>
            {/* HOST | OPTIONAL */}
            {content.host && content.host !== '' && (
              <li>
                <label>Host/Facilitator:</label><br />
                <p>{content.host}</p>
              </li>
            )}

            {/* CATEGORIES (TYPES) & INDUSTRY | OPTIONAL */}
            <li className="categories">
                {content.industry && content.industry !== '' && (<span>{content.industry}</span>)}
                {content.eventType && content.eventType !== '' && (<span>{content.eventType}</span>)}
            </li>
          </ul>

          <div className="location">
            {/* LOCATION | REQUIRED */}
            <label>{content.location}</label>

            {/* ENTRANCE | REQUIRED */}
            <span>{content.freeEvent ? 'General' : '$'+content.cost}</span>
          </div>

        </div>
      </article>
    </Link>
  );
};

export default CardHorizontal;