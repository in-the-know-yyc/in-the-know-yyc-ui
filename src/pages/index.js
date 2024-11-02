import Hero from '../components/Hero';
import LatestEvents from '../components/LatestEvents';
import Comments from '../components/Comments';
import Community from '../components/Community';
import Sponsors from '../components/Sponsors';

// FETCHING NEXT 6 EVENTS EVENTS
import { getNextEvents } from '../api/events';
import { getSecret } from '../api/secrets';


export default function Home({ latestEvents }) {
  return (
    <>
      <Hero />
      <LatestEvents latestEvents={latestEvents} />
      <Comments />
      <Community />
      <Sponsors />
    </>
  );
}


export async function getServerSideProps() {

  
    const secret = await getSecret('dev/api/Mailchimp');
    console.log("SECRETS:",secret.yourSecretKey,secret);
  




  const latestEvents = await getNextEvents();

  return { props: { latestEvents } };

}