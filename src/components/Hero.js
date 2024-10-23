import Link from "next/link";
import Image from "next/image";
import "../app/styles/components/hero.css";

// CAROUSEL IMPORTS
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../app/styles/components/latestEventsCarousel.css";

const Hero = () => {

  const slideSettings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    arrows: false
  };

  return (
    <section className="hero">
        <h1>DISCOVER &<br/>ATTEND!</h1>
        <h2><span>ALL OVER CANADA</span>, More than 23,600 <br /> participants join our registered events daily.</h2>
        <div className="call-to-action">
          <Link href={'#latestEventsSectionSpaced'}>Attend an Event</Link>
        </div>
        <div className="hero-image">
          <Slider {...slideSettings}>
            <Image className="hero-image" src={'/images/hero/hero1.png'} width={805} height={664} alt='In The Know YYC - Banner' />
            <Image className="hero-image" src={'/images/hero/hero3.png'} width={805} height={664} alt='In The Know YYC - Banner' />
            <Image className="hero-image" src={'/images/hero/hero4.png'} width={805} height={664} alt='In The Know YYC - Banner' />
          </Slider>
        </div>
    </section>
  );
};

export default Hero;