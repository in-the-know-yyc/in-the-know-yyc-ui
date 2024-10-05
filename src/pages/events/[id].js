import Link from "next/link";
import Image from "next/image";
import "../../app/styles/components/eventInfo.css";


export default function EventInfo() {

    // This constant is only simulating a response from the API to show information about a specific event
    const eventContentTest = {
        id: 1,
        imagePath: '/images/events/evt2.png',
        title_short: 'Tech Innovators Meetup',
        host: 'Edmonton Unlimited',
        title_long: 'Tech Innovators Meetup: Unlocking Success in the Digital World',
        description: "Join us for an exciting evening of learning, networking, and inspiration at the Tech Innovators Meetup in Toronto. Whether you're a tech enthusiast, budding entrepreneur, or seasoned professional, this event is perfect for anyone eager to expand their knowledge and skills in the tech industry. Our panel of leading tech entrepreneurs, developers, and innovators will share their expertise on topics such as emerging technologies, product development, and growth strategies.",
        type: 'general',
        industry: 'Tech',
        speakers: ['Alex Mitchell, Founder & CEO at TechWave'],
        date: 'September 12, 2024',
        time: '9:00am MDT',
        location: 'MaRS Discovery District, Toronto',
        price: 0
    };

    return (
        <section class="eventInformation">
            <div className="row-1">
                <Link href={'/events'}>
                    <Image src={'/images/icons/back-arrow.svg'} width={'15'} height={'15'} alt='' />
                </Link>
                <h1>{eventContentTest.title_short}</h1>
            </div>
            <div className="row-2">
                <Image src={'/images/events/evt2.png'} width={'805'} height={'664'} alt={eventContentTest.title_short} />
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.4344470780775!2d-79.39123432346902!3d43.659933651994805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34b7ccd8ba1f%3A0x7e6f7af0cc4e65f3!2sMaRS%20Discovery%20District!5e0!3m2!1sen!2sca!4v1727629651229!5m2!1sen!2sca" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="row-3">
                <h2>About Event</h2>

                <h3>Event Host/Facilitator</h3>
                <p>{eventContentTest.host}</p>

                <h3>Event Description</h3>
                <p>{eventContentTest.description}</p>

                <ul>
                    <li>
                        <h3>Event Type</h3>
                        <p>{eventContentTest.type}</p>
                    </li>
                    <li>
                        <h3>Industry</h3>
                        <p>{eventContentTest.industry}</p>
                    </li>
                </ul>

                {eventContentTest.speakers.map((speaker, index) => {
                    return <label className="speaker" key={`speaker_${index}`}>{speaker}</label>
                })}
                <label className="date">{eventContentTest.date}</label>
                <label className="time">{eventContentTest.time}</label>
                <label className="location">{eventContentTest.location}</label>

                <label className="admission"><b>Admission:</b> {(eventContentTest.price !== 0) ? eventContentTest.price : 'Free'}</label>

                <button> Attend </button>


            </div>
        </section>
    );
}
