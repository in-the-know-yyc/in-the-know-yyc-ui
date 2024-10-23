import Link from "next/link";
import "../app/styles/components/cardHorizontal.css";
import moment from "moment/moment";

const CardHorizontal = ({ content }) => {
  const dateTime = moment(content.eventDate)
  return (
    <Link href={`/events/${content.id}`} className="linkCardHorizontal">
      <article className="cardHorizontal">
        {/* IMAGE | REQUIRED */}
        <div className="img" style={{ backgroundImage: `url(${content.imagePath})` }}></div>

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

            {/* CATEGORIES | OPTIONAL */}
            <li className="categories">
                <span>{content.eventType}</span>
            </li>
          </ul>

          <div className="location">
            {/* LOCATION | REQUIRED */}
            <label>{content.location}</label>

            {/* ENTRANCE | REQUIRED */}
            <span>{content.freeEvent ? 'Free' : '$'+content.cost}</span>
          </div>

        </div>
      </article>
    </Link>
  );
};

export default CardHorizontal;