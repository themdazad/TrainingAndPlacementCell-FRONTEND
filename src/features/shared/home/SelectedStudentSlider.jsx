import { useEffect, useState } from "react";
import { Image } from "@heroui/react";

const studentDetails = [
  // 🔼 Batch 2025 Students
  {
    image: "/images/students2025/abhishek22102151907.jpg",
    details: {
      name: "Abhishek Kumar Singh",
      rollNumber: "22102151907",
      branch: "Mechanical Engineering",
      college: "Government Engineering College, Siwan",
      email: "abhishek.gecs@gmail.com",
      phone: "+91-8804080749",
      company: "High-Technext Engineering & Telcom Pvt. Ltd. ",
      package: "4.5LPA",
      location: "Bihar/Kolkata/Jharkhand/UP",
      joiningDate: "2025-07-10",
      internship: false,
      skills: [
        "AutoCAD",
        "Solidworks",
        "Ansys",
        "CNC Programming",
        " Welding Tech.",
      ],
      linkedIn: "https://www.linkedin.com/in/abhishek-kumar-singh-8312a931b",
      batch: 2025,
    },
  },
  {
    image: "/images/students2025/hanshraj21103151013.jpg",
    details: {
      name: "Hanshraj Meena",
      rollNumber: "21103151013",
      branch: "Electrical Engineering",
      college: "NIT Example",
      email: "hanshraj.meena@example.com",
      phone: "+91-9876543102",
      company: "ADFF Company",
      package: "5 LPA",
      location: "Hyderabad",
      joiningDate: "2025-07-15",
      internship: false,
      skills: ["Circuit Design", "Embedded Systems"],
      linkedIn: "https://linkedin.com/in/",
      batch: 2025,
    },
  },
  {
    image: "/images/students2025/nishant21103151005.jpg",
    details: {
      name: "Nishant Raj",
      rollNumber: "21103151005",
      branch: "Electrical Engineering",
      college: "",
      email: "",
      phone: "+91-",
      company: "",
      package: "",
      location: "",
      joiningDate: "",
      internship: true,
      skills: ["Teamwork", "AutoCAD", "Power Systems"],
      linkedIn: "https://linkedin.com/in/",
      batch: 2025,
    },
  },
  {
    image: "/images/students2025/prakash21103151003.jpg",
    details: {
      name: "Prakash Sharma",
      rollNumber: "21103151003",
      branch: "Electrical Engineering",
      college: "NIT Example",
      email: "",
      phone: "+91-",
      company: "",
      package: "",
      location: "",
      joiningDate: "",
      internship: false,
      skills: ["SCADA", "Matlab"],
      linkedIn: "https://linkedin.com/in/",
      batch: 2025,
    },
  },
  {
    image: "/images/students2025/romi22102151903.jpg",
    details: {
      name: "Romi Patel",
      rollNumber: "22102151903",
      branch: "Electrical Engineering",
      college: "",
      email: "",
      phone: "+91-",
      company: "",
      package: "",
      location: "Ahmedabad",
      joiningDate: "2025-07-22",
      internship: true,
      skills: ["Communication", "Testing", "Instrumentation"],
      linkedIn: "https://linkedin.com/in/",
      batch: 2025,
    },
  },
  {
    image: "/images/students2025/sidhant21103151018.jpg",
    details: {
      name: "Sidhant Singh",
      rollNumber: "21103151018",
      branch: "Electrical Engineering",
      college: "NIT Example",
      email: "sidhant.singh@example.com",
      phone: "+91-9876543107",
      company: "11123 Company",
      package: "5 LPA",
      location: "Kolkata",
      joiningDate: "2025-07-30",
      internship: true,
      skills: ["Project Management", "Control Systems"],
      linkedIn: "https://linkedin.com/in/",
      batch: 2025,
    },
  },
];

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
              <h2 className="text-[12px] font-bold">{avatar.details.name}</h2>
              <p className="text-[12px]">{avatar.details.rollNumber}</p>
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
      <div className="flex h-full w-full flex-col items-center justify-center py-10">
        <h1 className="text-xl font-extrabold text-zinc-800 dark:text-zinc-100">
          Recently Placed Students
        </h1>
        <AvatarCarousel />
      </div>
    </>
  );
};

export default SelectedStudentSlider;
