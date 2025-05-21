import { CarFront, TrainFront, PlaneTakeoff } from "lucide-react";
import TPCellMembers from "./sections/TPCellMembers.jsx";
import TPCellCoordinators from "./sections/TPCellCoordinators.jsx";

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
      "Siwan Junction (SV) is the nearest railway station, located approximately 3 km from the college. It is a major station with connections to cities like Delhi, Kolkata, Patna, and Varanasi.",
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

export default function AboutUs() {
  return (
    <main className="about-us max-w-[1980px] m-auto dark:bg-gray-900">
      <div className="header px-[5%] flex flex-col justify-center py-12">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold">
          About Us
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Connect with Training and Placement Cell - Government Engineering
          College, Siwan
        </p>
      </div>
      <section className="m-auto px-[5%] grid grid-cols-1 gap-6">
        {/* google-map */}
        <div className="google-map-container w-full h-[300px] md:h-[500px] space-y-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.123061521421!2d84.32628237583968!3d26.225190677063694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992ff716c7b37ad%3A0x5737371d64c4aed1!2sGovernment%20Engineering%20College%2C%20Siwan!5e0!3m2!1sen!2sin!4v1747835854317!5m2!1sen!2sin&maptype=satellite"
            width=""
            height=""
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="google-map w-full h-full rounded-3xl"
          ></iframe>
        </div>

        {/* reach us cards */}
        <div className="contact-info mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* loop for card  */}
          {transportModes.map(({ mode, icon, description, cities }) => (
            <div
              key={mode}
              className="card shadow-md p-6 dark:bg-gray-800 rounded-3xl"
            >
              <h1 className="text-lg font-extrabold inline-flex gap-3 text-blue-600 dark:text-blue-500">
                {icon} {mode}
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
      </section>
        
      <TPCellMembers/>
      <TPCellCoordinators/>

    </main>
  );
}
