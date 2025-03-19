import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import img from "../seroSection.jpg"
import iphone from "../iphone15.webp"
import iphone16 from "../iphone16.webp"
import "./HeroSection.css";
import { Navigation, Autoplay } from "swiper/modules";

const HeroSection = () => {
  const slides = [
    { id: 1, img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp", title: "First Slide", desc: "Some representative placeholder content for the first slide." },
    { id: 2, img: "https://source.unsplash.com/1600x900/?smartphone", title: "Second Slide", desc: "Some representative placeholder content for the second slide." },
    { id: 3, img: "image3.jpg", title: "Third Slide", desc: "Some representative placeholder content for the third slide." },
  ];

  return (
    <div className="relative w-full max-w-full mx-auto">
       

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop
        className="rounded-lg overflow-hidden"
      >
        
       
            <div>
            <div className="relative sett">
           
              <img src={img} alt={""} className="w-full h-[400px] sizee" />
              <img src={iphone} alt={""} className="imgg1"  />
              <img src={iphone16} alt={""} className="imgg2"  />
                <h5 className="text-lg font-bold">{""}</h5>
                <p className="text-sm">{""}</p>
              </div>
            </div>
          
        
      </Swiper>
    </div>
  );
};

export default HeroSection;
