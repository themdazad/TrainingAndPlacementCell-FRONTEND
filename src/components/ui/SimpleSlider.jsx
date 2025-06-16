import { Image } from "@heroui/react";
import Slider from "react-slick";

function SimpleSlider({slider_data}) {
  const settings = {
    infinite: true,
    speed: 2000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows:false,
  };
  return (
    <div
      className="slider-container w-full h-full overflow-hidden"
    >
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
