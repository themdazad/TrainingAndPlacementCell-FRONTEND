import { Image } from "@heroui/react";
import Slider from "react-slick";

function SimpleSlider() {
 
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="slider-container w-full h-full overflow-hidden">
      <Slider className="w-full h-full" {...settings}>
        <Image
          src="/images/hero_image2.svg"
          className=" aspect-[4/3] object-cover"
        />
        <Image
          src="/images/Solar_Enterpreneurship_Training.webp"
          className=" aspect-[4/3] object-cover"
        />
        <Image
          src="/images/republic-day-2.webp"
          className=" aspect-[4/3] object-cover"
        />
        <Image
          src="/images/republic-day.webp"
          className=" aspect-[4/3] object-cover"
        />
      </Slider>
    </div>
  );
}

export default SimpleSlider;
