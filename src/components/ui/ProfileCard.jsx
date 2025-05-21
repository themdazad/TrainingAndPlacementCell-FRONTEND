import { Linkedin } from "lucide-react";

export default function ProfileCard({
  title,
  image,
  name,
  designation,
  mobile,
  email,
  linkedin,
}) {
  return (
    <div className="max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center space-y-4">
      <h2 className="text-lg font-bold text-blue-600 dark:text-blue-500 py-2">
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
          Mobile: {mobile}
        </p>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Email:{" "}
          <a
            href={`mailto:${email}`}
            className="text-blue-600 dark:text-blue-400 underline"
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
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
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
