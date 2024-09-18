import Image from "next/image";
import "../app/styles/components/cardVertical.css";

const CardVertical = ({content}) => {
  return (
    <article className="cardVertical">
      {/* IMAGE | REQUIRED */}
      <Image src={content.imagePath} width={390} height={228} alt={content.title} />

      {/* TITLE | REQUIRED*/}
      <h3>{content.title}</h3>

      {/* DESCRIPTION | OPTIONAL */}
      {content.description && content.description !== '' && (<p>{content.description}</p>)}

      <ul>
        {/* LOCATION | REQUIRED */}
        <li>
          <Image src={'/images/icons/location.svg'} alt={'Location icon'} width={16} height={16}/> 
          {content.location}
        </li>
        
        {/* DATE | REQUIRED */}
        <li>
          <Image src={'/images/icons/calendar.svg'} alt={'Calendar icon'} width={16} height={16}/> 
          {content.date}
        </li>

        {/* SPEAKER | OPTIONAL */}
        {content.speaker && content.speaker !== '' && (
          <li>
            <Image src={'/images/icons/microphone.svg'} alt={'Microphone icon'} width={16} height={16}/> 
            Speaker: 
            {content.speaker}
          </li>
        )}
        {content.speaker && content.speaker !== '' && (<li></li>)}
        
        {/* ATTENDANTS | OPTIONAL */}
        {content.attendants && content.attendants !== '' && (
          <li className="attendants">
            <Image src={'/images/icons/seat.svg'} alt={'Seat icon'} width={16} height={16}/> 
            Attendants: 
            {content.attendants}
          </li>
        )}

        {/* PRICE | REQUIRED */}
        <li><button>{(content.price !== 0) ? content.price : 'Free'}</button></li>
      </ul>
    </article>
  );
};

export default CardVertical;