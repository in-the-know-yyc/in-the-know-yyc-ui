import Link from "next/link";
import CardVertical from "./CardVertical";
import "../app/styles/components/latestEvents.css";



// CAROUSEL IMPORTS
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../app/styles/components/latestEventsCarousel.css";


export default function LatestEvents({latestEvents}) {

  const slideSettings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
 
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
 
    }, {
 
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        centerMode:true,
        mobileFirst:true,
      }
 
    }]
  };

  return (
    <section className="latestEvents">
      
      <div id="latestEventsSectionSpaced"></div>

      
        <h2>Latest events</h2>
        <Link href={`/events`} className="all-events-link">View all events</Link>

      <div className="latestEvents-container">
        <div className="slider-container">
          <Slider {...slideSettings}>


            {latestEvents.map((content, index) => {
              return (
                <CardVertical key={`event_id_${index}`} content={content} />
              );
            })}


          </Slider>
        </div>
      </div>
    </section>
  );
};



