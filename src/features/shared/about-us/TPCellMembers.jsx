import { Linkedin } from "lucide-react";
import YamikaPatelImage from "../../../assets/images/tpo_members/yamika_patel.jpg";

const profiles = [
  {
    title: "T&P Officer",
    image:
      "https://media.licdn.com/dms/image/v2/C4D03AQFNIU2OBqxD7Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1610258093973?e=1753315200&v=beta&t=s-NiAako_B4gRyTPbH-tu4XIYwYo35omMNvHUn6_QHY", // You can use an actual image URL
    name: "Mr. Navdeep Pandey",
    designation: "Asst. Professor, Mechanical Engineering",
    mobile: "+91 9084063221",
    email: "ndpgecswn@gmail.com",
    linkedin: "https://www.linkedin.com/in/navdeep-pandey-55a8ab55/",
  },
  {
    title: "Asst. T&P Officer",
    image: "https://placehold.co/128x128?text=SK", 
    name: "Prof. Sweta Kumari",
    designation: "Asst. Professor, Electrical Engineering",
    mobile: "+91 9905618148",
    email: "swetagecsiwanee@gmail.com",
    linkedin: "",
  },
  {
    title: "Asst. T&P Officer",
    image: YamikaPatelImage, 
    name: "Dr. Yamika Patel",
    designation: "Asst. Professor, Mechanical Engineering",
    mobile: "+91 9717463922",
    email: "yamika.patel013@gmail.com",
    linkedin: "",
  },
  {
    title: "Asst. T&P Officer",
    image: "https://placehold.co/128x128?text=SM", 
    name: "Prof. Sundram Mishra",
    designation: "Asst. Professor, Electrical Engineering",
    mobile: "+91 9354701980",
    email: " ",
    linkedin: " ",
  },
  {
    title: "Asst. T&P Officer",
    image: "https://placehold.co/128x128?text=SP", 
    name: "Prof. Shikha Pal",
    designation: "Asst. Professor, Civil Engineering",
    mobile: "+91 6394212913",
    email: "pal.shikha07@gmail.com",
    linkedin: "",
  },
  {
    title: "Asst. T&P Officer",
    image: "https://placehold.co/128x128?text=TK", 
    name: "Prof. Tufail Khan",
    designation: "Asst. Professor, Civil Engineering",
    mobile: "+91 9716030691",
    email: "mdtufail.jmi@gmail.com",
    linkedin: "",
  },
];

export default function TPCellMembers() {
  return (
    <section className="m-auto px-[5%] grid grid-cols-1 gap-6">
      <div className="members  p-4 rounded-3xl">
        {/* Section Title */}
        <div className="title text-xl md:text-3xl font-extrabold text-center py-12">
          Training & Placement Members
        </div>

        {/* Members Details */}
        <div className="members-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
          <ProfileList profiles={profiles} />
        </div>
      </div>
    </section>
  );
}

function ProfileList({ profiles }) {
  return (
    <>
      {profiles.map((profile, index) => (
        <ProfileCard
          key={index}
          title={profile.title}
          image={profile.image}
          name={profile.name}
          designation={profile.designation}
          mobile={profile.mobile}
          email={profile.email}
          linkedin={profile.linkedin}
        />
      ))}
    </>
  );
}

function ProfileCard({
  title,
  image,
  name,
  designation,
  mobile,
  email,
  linkedin,
}) {
  return (
    <div className="max-w-sm bg-stone-100/50 dark:bg-stone-800 rounded-3xl shadow-md p-6 text-center space-y-4">
      <h2 className="text-lg font-bold text-blue-500 dark:text-blue-500 py-2">
        {title}
      </h2>
      <img
        src={image}
        alt={name}
        className="w-32 h-32 mx-auto rounded-full border-2 border-blue-500 object-cover"
      />
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          {designation}
        </p>

        <p className="text-sm text-blue-700 dark:text-blue-300">
          Email:{" "}
          <a
            href={`mailto:${email}`}
            className="text-blue-500 dark:text-blue-400 underline"
          >
            {email}
          </a>
        </p>

        {/* LinkedIn Icon */}
        {linkedin && (
          <div className="mt-4 flex justify-center">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
