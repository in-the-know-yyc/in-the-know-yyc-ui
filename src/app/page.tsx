import Header from '../components/Header';
import Hero from '../components/Hero';
import LatestEvents from '../components/LatestEvents';
import Comments from '../components/Comments';
import Community from '../components/Community';
import Sponsors from '../components/Sponsors';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <LatestEvents />
      <Comments />
      <Community />
      <Sponsors />
      <Footer />
    </main>
  );
}
