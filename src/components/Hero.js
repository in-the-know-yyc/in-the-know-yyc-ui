import "../app/styles/components/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-slide" style={{ backgroundImage: `url('/images/hero/hero1.png')` }}>
        <div className="hero-content">
          <h1>DISCOVER & ATTEND!</h1>
          <h2><span>ALL OVER CANADA</span>, More than 23,600 participants join our registered events daily.</h2>
          <div className="call-to-action">
            <button>Attend an Event</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;