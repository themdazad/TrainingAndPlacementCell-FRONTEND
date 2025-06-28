import { useState } from "react";
import { CarFront, TrainFront, PlaneTakeoff, BedDouble } from "lucide-react";


const transportModes = [
  {
    mode: "By Road",
    icon: <CarFront />,
    description:
      "Government Engineering College, Siwan, is well-connected by road to major cities in Bihar. The college is located approximately 4 km from Siwan city center, easily accessible via local and state highways.",
    cities: [
      { name: "Patna", distance: "137 km", travelTime: "3 hrs 52 mins" },
      { name: "Muzaffarpur", distance: "127 km", travelTime: "3 hrs 9 mins" },
      { name: "Gopalganj", distance: "34 km", travelTime: "1 hr 5 mins" },
      { name: "Chhapra", distance: "67 km", travelTime: "1 hr 51 mins" },
    ],
  },

  {
    mode: "By Train",
    icon: <TrainFront />,
    description:
      "Siwan Junction is the nearest railway station, located approximately 3 km from the college. It is a major station with connections to cities like Delhi, Kolkata, Patna, and Varanasi.",
    cities: [
      { name: "Patna", travelTime: "3 hrs" },
      { name: "Varanasi", travelTime: "5 hrs" },
      { name: "Delhi", travelTime: "12 hrs" },
    ],
  },

  {
    mode: "By Air",
    icon: <PlaneTakeoff />,
    description:
      "The nearest airport to Siwan is Jay Prakash Narayan International Airport, Patna, approximately 130 km away. It is connected to major Indian cities by regular domestic flights.",
    cities: [
      {
        name: "Patna Airport",
        distance: "130 km",
        travelTime: "3.5 hrs by road",
      },
      {
        name: "Gorakhpur Airport",
        distance: "160 km",
        travelTime: "4 hrs by road",
      },
    ],
  },
];


export default function ReachUs() {
 
  const [data, setData] = useState(transportModes);

  return (
    <section>
      <h1 className="text-4xl font-extrabold flex items-center">Reach Us</h1>
      <div className=" grid grid-cols-1 gap-6 lg:gap-10 py-6">
        {/* google-map */}
        <div className="google-map-container w-full h-[300px] md:h-[500px] ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.123061521421!2d84.32628237583968!3d26.225190677063694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992ff716c7b37ad%3A0x5737371d64c4aed1!2sGovernment%20Engineering%20College%2C%20Siwan!5e0!3m2!1sen!2sin!4v1747835854317!5m2!1sen!2sin&maptype=satellite"
            width=""
            height=""
            allowfullscreen=""
            className="google-map w-full h-full rounded-3xl"
          ></iframe>
        </div>

        {/* Travel cards */}
        <div className="snap-mandatory snap-x overflow-x-scroll scrollbar-hide p-2 flex items-start  gap-6">
          {data.map(({ mode, icon, description, cities }) => (
            <div
              key={mode}
              className="snap-center min-w-[280px] card shadow-md p-6 dark:bg-slate-800 rounded-3xl"
            >
              <h1 className="text-lg font-bold inline-flex gap-2 text-blue-500 dark:text-blue-400">
                {icon}
                {mode}
              </h1>
              <p className="mt-2">{description}</p>
              {cities?.length > 0 && (
                <>
                  <p className="font-bold mt-4">
                    Distance/Travel Time from key locations:
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    {cities.map(({ name, distance, travelTime }) => (
                      <li key={name}>
                        <strong>{name}:</strong>{" "}
                        {distance && `Approximately ${distance}, `}travel time ~{" "}
                        {travelTime}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Accommodation  */}
        <div className="shadow-md p-6 dark:bg-slate-800 rounded-3xl max-w-full">
          <h2 className="text-lg font-bold text-blue-500 dark:text-blue-400 inline-flex gap-3 items-center mb-4">
            <BedDouble /> Accommodation
          </h2>
          <p>
            Government Engineering College, Siwan provides on-campus
            accommodation facilities for visiting faculty, recruiters, and
            guests through its dedicated guest house. This facility ensures a
            comfortable stay within the college premises, facilitating easy
            access to campus activities.
          </p>

          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>
              <strong>Location:</strong> Within the campus at Mairwa Road, Old
              Suta Mill Factory, Bhada Khurd, Siwan, Bihar – 841226.
            </li>
            <li>
              <strong>Facilities:</strong> The guest house offers well-furnished
              rooms equipped with essential amenities to ensure a pleasant stay
              for guests.
            </li>
            <li>
              <strong>Eligibility:</strong> Primarily available for visiting
              faculty, recruiters, and family members of students.
            </li>
            <li>
              <strong>Booking:</strong> For reservations and inquiries, please
              contact the college administration at{" "}
              <a
                href="mailto:gecsiwan@gmail.com"
                className="text-blue-500 underline"
              >
                gecsiwan@gmail.com
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
