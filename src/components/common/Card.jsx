import { Button, Divider, Image } from "@heroui/react";
import { Eye, GithubIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const ProjectsData = [
  {
    _id: 1,
    title: "Training & Placement Cell",
    description:
      "Full-Stact web platform for training and palcement cell, student, coordinator and recruiter. ",
    skills: ["React.js", "Node.js"],
    image: "/images/heroThumbnails/2.svg",
    view: "https://training-and-placement-cell-gec-siwan.vercel.app/",
    github: "https://github.com/themdazad/TrainingAndPlacementCell-FRONTEND",
  },
  {
    _id: 2,
    title: "Technical Club ",
    description:
      "Fullstack Technical club website of Government Engineering College, Siwan. Quiz | Live updates | User Registration ",
    skills: ["React.js", "Node.js"],
    image: "/images/heroThumbnails/3.svg",
    view: "https://training-and-placement-cell-gec-siwan.vercel.app/",
    github: "",
  },
  {
    _id: 3,
    title: "Resume Builder Tools ",
    description:
      "React.js mini project that help student to build resume quickly.",
    skills: ["React.js", "tialwind CSS"],
    image: "/images/heroThumbnails/4.webp",
    view: "https://training-and-placement-cell-gec-siwan.vercel.app/",
    github: "",
  },
  {
    _id: 4,
    title: "Portfolio",
    description: "My own portfolio to showcase skills and project.",
    skills: ["Next.js", "Tailwind CSD"],
    image: "/images/azad_sign.svg",
    view: "",
    github: "",
  },
  {
    _id: 5,
    title: "College Logo",
    description: "Redesigned college official logo and won 1st prize.",
    skills: ["Logo Design"],
    image: "/images/gecsiwan-logo.png",
    view: "",
    github: "",
  },
];

export const Card = () => {
  return (
    <div className="max-w-screen-2xl m-auto">
        <h1 className="text-4xl font-extrabold mb-6">Workshops & Training</h1>
		<Divider/>
      <section className=" grid grid-cols-4 gap-6">
        {ProjectsData.map((item) => {
          return (
            <div
              key={item._id}
              className="group aspect-[5/4] bg-white relative overflow-hidden rounded-3xl hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={"azad-projects"}
                width={600}
                height={400}
                className="object-contain bg-center "
              />

              <div className="absolute grid place-content-center z-11 backdrop-blur-xl backdrop-saturate-0 p-6 space-y-6 h-full w-full -top-full group-hover:top-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="space-y-4 text-center">
                  <h1 className="text-xl font-extrabold">{item.title}</h1>
                  <p className="">{item.description}</p>
                  <div className="inline-flex gap-2">
                    {item.skills.map((data, ls) => {
                      return <p key={ls}>{data}</p>;
                    })}
                  </div>
                </div>

                <div className="space-x-2 flex justify-center">
                  <NavLink href={item.view} target="_blank">
                    <Button
                      className="hover:shadow-xl  cursor-pointer rounded-3xl"
                      variant="outline"
                    >
                      <Eye />
                      View
                    </Button>
                  </NavLink>
                  {!!item?.github && (
                    <NavLink href={item.github} target="_blank">
                      <Button
                        className="hover:shadow-xl  cursor-pointer rounded-3xl"
                        variant="outline"
                      >
                        <GithubIcon />
                      </Button>
                    </NavLink>
                  )}
                </div>
              </div>
              <div className="absolute z-10 px-3 py-1 flex bg-slate-800 text-white text-[12px] rounded-tr-3xl opacity-100 group-hover:opacity-0 min-w-max -bottom-0 group-hover:-bottom-full transition-all duration-500 ">
                <p className=" px-2">{item.title}</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
