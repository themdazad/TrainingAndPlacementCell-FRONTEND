import ProfileCard from "../../../../components/ui/ProfileCard";

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
    image: "https://placehold.co/128x128?text=JD", // Optional second profile
    name: "Prof. Sweta Kumari",
    designation: "Asst. Professor, Electrical Engineering",
    mobile: "+91 9905618148",
    email: "",
    linkedin: "",
  },
  {
    title: "Asst. T&P Officer",
    image: "https://placehold.co/128x128?text=JD", // Optional second profile
    name: "Dr. Yamika Palel",
    designation: "Asst. Professor, Mechanical Engineering",
    mobile: "+91 ",
    email: "",
    linkedin: "",
  },
  {
    title: "Asst. T&P Officer",
    image: "https://placehold.co/128x128?text=JD", // Optional second profile
    name: "Prof. Sundram Mishra",
    designation: "Asst. Professor, Electrical Engineering",
    mobile: "+91 9354701980",
    email: "",
    linkedin: "",
  },
  {
    title: "Asst. T&P Officer",
    image: "https://placehold.co/128x128?text=JD", // Optional second profile
    name: "Prof. Shikha Pal",
    designation: "Asst. Professor, Civil Engineering",
    mobile: "+91 6394212913",
    email: "pal.shikha07@gmail.com",
    linkedin: "",
  },
  {
    title: "Asst. T&P Officer",
    image: "https://placehold.co/128x128?text=JD", // Optional second profile
    name: "Prof. Tufail Khan",
    designation: "Asst. Professor, Civil Engineering",
    mobile: "+91 9716030691",
    email: "mdtufail.jmi@gmail.com",
    linkedin: "",
  },
];

export default function TPCellMembers() {
  return (
    <section className="m-auto px-[5%] grid grid-cols-1 gap-12">
      <div className="members dark:bg-gray-900 p-4 my-12 rounded-3xl">
        {/* Section Title */}
        <div className="title text-xl md:text-3xl font-extrabold text-center py-12">
          Training & Placement Members
        </div>

        {/* Members Details */}
        <div className="members-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
          <ProfileList profiles = {profiles} />
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

