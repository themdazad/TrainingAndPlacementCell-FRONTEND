import studentDetails from "../../../assets/data/PlacedStudentDetails";
import { useEffect, useState } from "react";

function AvatarCarousel({
  avatarSize = 140,
  avatarSpacing = 8,
  avatars = studentDetails,
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
      className="relative h-full w-full gap-2 py-[100px]"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 30%, black 80%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 30%, black 80%, transparent)",
        minHeight: `${avatarSize + 60}px`,
        maxWidth: `${(avatarSize + avatarSpacing) * 10}px`,
      }}
    >
      {avatars.map((avatar, index) => {
        const placement = getPlacementIndex(index);
        const left = placement * (avatarSize + avatarSpacing);
        const shouldHide = isAtEnd(placement);
        const isActive = activeIndex === index;

        return (
          <div className=" group" key={index}>
            <img
              src={avatar.image}
              alt={`Avatar ${index}`}
              className={`${
                isActive ? "" : "saturate-0"
              }  absolute  border-2 border-white dark:border-zinc-800 aspect-square m-0 rounded-full object-cover transition-all duration-1000`}
              style={{
                width: avatarSize,
                top: "50%",
                left: `calc(50% + ${left}px)`,
                transform: `translate(-50%, -50%) scale(${
                  1 - Math.abs(placement) * 0.1
                })`,
                zIndex: isActive ? 1 : 0,
                opacity: shouldHide ? 0 : isActive ? 1 : 0.3,
                transformOrigin: "top left",
              }}
            />

            <a
              href={avatar.details.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute bg-white dark:bg-zinc-800 dark:text-zinc-100 hover:shadow-md dark:hover:shadow-lg rounded-3xl px-6 py-1 m-0 text-center transition-all duration-1000`}
              style={{
                bottom: "-5%",
                left: `calc(50% + ${left}px)`,
                transform: `translate(-50%, -50%) scale(${
                  1 - Math.abs(placement) * 0.1
                })`,
                zIndex: isActive ? 1 : 0,
                opacity: shouldHide ? 0 : isActive ? 1 : 0,
                transformOrigin: "top left",
              }}
            >
              <h2 className="font-bold">{avatar.details.package}</h2>
              <p className="text-[12px]">{avatar.details.name} | {avatar.details.rollNumber}</p>
            </a>
          </div>
        );
      })}
    </div>
  );
}

const SelectedStudentSlider = () => {
  return (
    <>
      <div className="max-w-screen-2xl m-auto px-[2.5%] flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-xl font-extrabold text-zinc-800 dark:text-zinc-100">
          Recently Placed Students
        </h1>
        <AvatarCarousel />
      </div>
    </>
  );
};

export default SelectedStudentSlider;
