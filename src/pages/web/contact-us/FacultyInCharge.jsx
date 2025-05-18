import { User, Link } from "@heroui/react";
import { Phone } from "lucide-react";
// icons
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdMarkEmailUnread } from "react-icons/md";

const FacultyInchargeProfileDetails = [
  {
    avatar:
      "https://media.licdn.com/dms/image/v2/C4D03AQFNIU2OBqxD7Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1610258093972?e=1743638400&v=beta&t=r_zKAiiFmD6XUIIY2ACMnWsS4o8WXyMAeT1gLBDYIx4",
    name: "Prof. Navdeep Pandey",
    department: "Training and Placement Officer",
    links: {
      phone: "",
      linkedin: "",
      github: "",
      email: "",
    },
  },
  {
    avatar: "./assets/male-profile.webp",
    name: "Prof. Sundram Mishra",
    department: "Asst. T&P Officer",
    links: {
      phone: "",
      linkedin: "",
      github: "",
      email: "",
    },
  },
  {
    avatar: "./assets/female-profile.webp",
    name: "Prof. Sweta Kumari",
    department: "Asst. T&P Officer",
    links: {
      phone: "",
      linkedin: "",
      github: "",
      email: "",
    },
  },
  {
    avatar: "./assets/male-profile.webp",
    name: "Prof. Tufail Khan",
    department: "Asst. T&P Officer",
    links: {
      phone: "",
      linkedin: "",
      github: "",
      email: "",
    },
  },
  {
    avatar: "./assets/female-profile.webp",
    name: "Prof. Shikha Pal",
    department: "Asst. T&P Officer",
    links: {
      phone: "",
      linkedin: "",
      github: "",
      email: "",
    },
  },
];

export const FacultyInCharge = () => {
  const renderLink = (href, icon) =>
    href && (
      <Link className="m-1" target="_blank" href={href} size="md" isExternal>
        {icon}
      </Link>
    );
  return (
    <div className="max-w-[1920px] m-auto py-12 ">
      <h1 className="text-center text-xl md:text-2xl mb-4 font-bold ">
        Faculty <span className="-mx-0 text-sky-600">In-Charge</span>
      </h1>
      <div className="our_team snap-mandatory snap-x overflow-x-scroll scrollbar-hide text-center flex gap-6 ">
        {FacultyInchargeProfileDetails.map((profile, index) => {
          return (
            <User
              key={index}
              className=" flex flex-col items-center border-1 snap-start  px-4 py-2 rounded-2xl min-h-[150px]  min-w-[200px] "
              name={profile.name}
              description={
                <div className="text-center flex flex-col items-center ">
                  <p>{profile.department}</p>
                  {renderLink(profile.links.phone, <Phone />)}
                  {renderLink(profile.links.linkedin, <BsLinkedin />)}
                  {renderLink(profile.links.github, <BsGithub />)}
                  {renderLink(profile.links.email, <MdMarkEmailUnread />)}
                </div>
              }
              avatarProps={{
                src: profile.avatar,
                size: "lg",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
