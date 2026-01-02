import { Image } from '@heroui/react';
import Slider from 'react-slick';

function SimpleSlider({ slider_data }) {
  const settings = {
    infinite: true,
    speed: 2000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="slider-container w-full h-full overflow-hidden">
      <Slider className="w-full h-full aspect-[4/3]" {...settings}>
        {slider_data.map((data, index) => {
          return (
            <div key={index} className="w-full h-full">
              <Image
                src={data}
                alt={`Slider Image ${index + 1}`}
                className="w-full h-full rounded-none object-cover"
                width="100%"
                height="100%"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
