import Hero from '../components/Hero';
import LatestEvents from '../components/LatestEvents';
import Comments from '../components/Comments';
import Community from '../components/Community';
//import Sponsors from '../components/Sponsors';

// FETCHING NEXT 6 EVENTS EVENTS
import { getNextEvents } from '../api/events';

// SEO: Pages metadata
import pagesMetaData from "../utils/pagesMetaData";
import PagesMetaData from "../components/PagesMetaData";


export default function Home({ latestEvents, metadata }) {
  return (
    <>
      <PagesMetaData metadata={metadata} />
      <Hero />
      <LatestEvents latestEvents={latestEvents} />
      <Comments />
      <Community />
      {/* <Sponsors /> */}
    </>
  );
}


export async function getServerSideProps() {
  const metadata = await pagesMetaData('home')
  const latestEvents = await getNextEvents();

  return { props: { latestEvents, metadata } };

}