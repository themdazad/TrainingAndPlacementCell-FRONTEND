import { Linkedin, Mail } from "lucide-react";
import TPCellMemberProfiles from "../../../../assets/data/TPCellMemberProfiles.js";


export default function TPCellMembers() {
  return (
    <section className="m-auto grid grid-cols-1 ">
      <div className="members rounded-3xl">
        {/* Section Title */}
        <div className="title text-xl md:text-3xl font-extrabold text-center py-12">
          Training & Placement Members
        </div>

        {/* Members Details */}
        <div className="members-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          <ProfileList profiles={TPCellMemberProfiles} />
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
    <div className="max-w-sm bg-neutral-100/50 dark:bg-neutral-800 rounded-3xl shadow-md p-6 text-center space-y-4">
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

        <div className="mt-4 flex justify-center gap-4">
          {/* LinkedIn Icon */}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          {/* Email Icon */}
          {email && (
            <a
              href={email}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 text-sky-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              aria-label="LinkedIn"
            >
              <Mail className="w-6 h-6 " /> 
              <p className="max-md:hidden">{email}</p></a>
          )}
        </div>
      </div>
    </div>
  );
}
