import { Image } from "@heroui/react";
import Slider from "react-slick";
import { useState } from "react";

function SimpleSlider({slider_data}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const settings = {
    infinite: true,
    speed: 2000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows:false,
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);

    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  return (
    <div className="slider-container w-full h-full overflow-hidden">
      <Slider className="w-full  h-full aspect-[4/3]" {...settings}>
        {slider_data.map((data, index) => {
          return (
            <Image
              key={index}
              src={data}
              alt="Slider Image"
              className="w-full h-full rounded-none object-cover"
              width={""}
              height={""}
            />
          );
        })}
      </Slider>
      
    </div>
  );
}

export default SimpleSlider;
