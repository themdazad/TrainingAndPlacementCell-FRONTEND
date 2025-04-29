import { User, Link } from "@heroui/react";
import { Phone } from "lucide-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdMarkEmailUnread } from "react-icons/md";

const studentCoordinatorProfileDetails = [
  {
    avatar: "https://avatars.githubusercontent.com/u/81636077?v=4",
    name: "Md Azad",
    department: "Electrical Engineering",
    links: {
      phone: "",
      linkedin: "https://www.linkedin.com/in/modest-azad/",
      github: "https://github.com/themdazad",
      email: "mailto:collezian@gmail.com",
    },
  },
  {
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQGQ_mO5FXyXwQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1726557002846?e=1743033600&v=beta&t=Zr6e909DPjdoIkuHggnx6IgSid2dRT_WQ5rKalwT74o",
    name: "Anupam Kumar",
    department: "Electrical Engineering",
    links: {
      phone: "",
      linkedin: "https://www.linkedin.com/in/jnvdeotianupam/",
      github: "https://github.com/themdazad",
      email: "",
    },
  },
  {
    avatar: "./assets/male-profile.webp",
    name: "Abhishek Kumar",
    department: "Mechanical Engineering",
    links: {
      phone: "",
      linkedin: "",
      github: "",
      email: "",
    },
  },
  {
    avatar: "./assets/male-profile.webp",
    name: "Shahnoor Ishtiyaque",
    department: "CSE IoT",
    links: {
      phone: "",
      linkedin: "",
      github: "",
      email: "",
    },
  },
  {
    avatar: "./assets/male-profile.webp",
    name: "Rajnish Kumar",
    department: "Civil Engineering",
    links: {
      phone: "",
      linkedin: "https://www.linkedin.com/in/",
      github: "",
      email: "",
    },
  },
  {
    avatar: "./assets/male-profile.webp",
    name: "Varun Kumar",
    department: "Civil Engineering",
    links: {
      phone: "",
      linkedin: "https://www.linkedin.com/in/",
      github: "",
      email: "",
    },
  },
];

export const TPOCoordinators = () => {
  const renderLink = (href, icon) =>
    href && (
      <Link className="m-1" target="_blank" href={href} size="md" isExternal>
        {icon}
      </Link>
    );

  return (
    <div className="max-w-[1920px] mx-auto py-12">
      <h1 className="text-center text-xl md:text-2xl mb-4 font-bold">
        Student <span className="text-sky-600">Coordinators</span>
      </h1>
      <div className="our_team snap-mandatory snap-x overflow-x-scroll scrollbar-hide text-center flex gap-6 ">
        {studentCoordinatorProfileDetails.map((profile, index) => (
          <User
            key={index}
            className="border-1 snap-start border-zinc-500/40 px-4 py-2 rounded-2xl min-w-fit"
            name={profile.name}
            description={
              <div className="text-left">
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
        ))}
      </div>
    </div>
  );
};