import { useEffect, useState } from "react";

const defaultAvatars = [
  {image:"/images/students2025/abhishek22102151908.jpg",
    details:{
      name:"abcd xyz",
      branch:"Electrical Engineering",
      company:"adff company",
      package:"5LPA",
      
    }
  },
  {image:"/images/students2025/hanshraj21103151013.jpg",
    details:{
      name:"abcd xyz",
      branch:"Electrical Engineering",
      company:"adff company",
      package:"5LPA",
      
    }
  },
  {image:"/images/students2025/laxmi22103151953.jpg",
    details:{
      name:"abcd xyz",
      branch:"Electrical Engineering",
      company:"adff company",
      package:"5LPA",
      
    }
  },
  {image:"/images/students2025/nishant21103151005.jpg",
    details:{
      name:"abcd xyz",
      branch:"Electrical Engineering",
      company:"adff company",
      package:"5LPA",
      
    }
  },
  {image:"/images/students2025/prakash21103151003.jpg",
    details:{
      name:"abcd xyz",
      branch:"Electrical Engineering",
      company:"adff company",
      package:"5LPA",
      
    }
  },
  {image:"/images/students2025/romi22102151903.jpg",
    details:{
      name:"abcd xyz",
      branch:"Electrical Engineering",
      company:"adff company",
      package:"5LPA",
      
    }
  },
  {image:"/images/students2025/sidhant21103151018.jpg",
    details:{
      name:"abcd xyz",
      branch:"Electrical Engineering",
      company:"adff company",
      package:"5LPA",
      
    }
  },
];

function AvatarCarousel({
  avatarSize = 120,
  avatarSpacing = 8,
  avatars = defaultAvatars,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const getPlacementIndex = (index) => {
    const half = Math.floor(avatars.length / 2);
    const diff = index - activeIndex;

    if (diff > half) return diff - avatars.length;
    if (diff < -half) return diff + avatars.length;
    return diff;
  };

  const isAtEnd = (placementIndex) => {
    const half = Math.floor(avatars.length / 2);
    return placementIndex === -half || placementIndex === half;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((index) => (index + 1) % avatars.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [avatars.length]);

  return (
    <div
      className="relative flex h-full w-full gap-2"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        minHeight: `${avatarSize}px`,
        maxWidth: `${(avatarSize + avatarSpacing) * 5}px`,
      }}
    >
      {avatars.map((avatar, index) => {
        const placement = getPlacementIndex(index);
        const left = placement * (avatarSize + avatarSpacing);
        const shouldHide = isAtEnd(placement);
        const isActive = activeIndex === index;

      return (
        <div className="group" key={index}>
          <img
            src={avatar.image}
            alt={`Avatar ${index}`}
            className={`absolute m-0 rounded-full object-cover transition-all duration-500`}
            style={{
              width: avatarSize,
              height: avatarSize,
              top: "50%",
              left: `calc(50% + ${left}px)`,
              transform: `translate(-50%, -50%) scale(${
                1 - Math.abs(placement) * 0.1
              })`,
              zIndex: isActive ? 1 : 0,
              opacity: shouldHide ? 0 : isActive ? 1 : 0.6,
              transformOrigin: "top left",
            }}
          />

          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:flex flex-col items-center bg-white text-black text-xs p-2 rounded shadow-lg z-10 whitespace-nowrap">
            <div>
              <strong>{avatar.details.name}</strong>
            </div>
             <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:flex flex-col items-center bg-white text-black text-xs p-2 rounded shadow-lg z-10 whitespace-nowrap">
      <div><strong>{avatar.details.name}</strong></div>
      <div>{avatar.details.branch}</div>
      <div>{avatar.details.company}</div>
      <div>{avatar.details.package}</div>
    </div>
          </div>
        </div>
      );


      })}
    </div>
  );
}

const SelectedStudentSlider = () => {
  return (
    <>
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 py-10 bg-gray-100 ">
      <h3 className="text-2xl font-semibold text-gray-800">
        Recently Placed Students
      </h3>
      <AvatarCarousel  />
    </div>
    </>
  );
};

export default SelectedStudentSlider;
