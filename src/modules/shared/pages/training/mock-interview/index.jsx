
import PageHeader from "../../../../../components/ui/PageHeader.jsx";
const mock_interview_data = [
  {
    id: "#tpmock1",
    last_date: "1 July 2025",
    time: "09:00 AM",
    g_form: "",
    notes: "",
    isOver: false,
  },
  {
    id: "#tpmock2",
    last_date: "1 July 2025",
    time: "09:00 AM",
    g_form: "",
    notes: "",
    isOver: false,
  },
];

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Training" },
  { label: "Mock interview", isCurrent: true }, // No `to` = current page
];


export default function MockInterview() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  return (
    <main className="max-w-screen-2xl px-[2.5%] m-auto dark:bg-neutral-900 grid gap-12 py-6 ">
      <PageHeader breadcrumbItems={breadcrumbItems} />

      {/* main content */}
      <section>
        <div className="lastest-mock-interview-section grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Introduction  */}
          <div className="col-span-2">
            <h1 className="text-xl lg:text-3xl font-extrabold">
              Why Mock Interview?
            </h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt at
              inventore obcaecati expedita laudantium excepturi fugiat qui illo
              illum, necessitatibus magni cum omnis odit neque ipsa facilis,
              dolores odio quis enim sapiente ea! Quos autem veritatis saepe
              vero culpa libero doloremque ut dicta delectus dolor odit, tenetur
              magnam. Laudantium minus sed consequatur nostrum et distinctio
              repudiandae!
            </p>
          </div>

          {/* Latest Mock Interview Registration Card  */}
          <div className="grid content-center">
            <div className="bg-blue-100 dark:bg-neutral-800 rounded-3xl shadow-md p-8 grid gap-3 text-center  w-full">
              <h2 className="text-2xl font-bold">
                {mock_interview_data[mock_interview_data.length - 1].id}
              </h2>
              <h2 className="text-2xl font-bold">Mock Interview Session</h2>
              <p className="font-bold text-neutral-600 dark:text-neutral-300">
                Register by :
                {mock_interview_data[mock_interview_data.length - 1].last_date}
              </p>
              <a
                href={
                  mock_interview_data[mock_interview_data.length - 1].g_form
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  onClick={() => alert("Redirecting to Google Form...")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-3xl"
                >
                  Book Slot
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Past mock intreviews  */}
      <section>
        <div className="heading">
          <h1 className="text-xl font-semibold">Past Mock Interviews</h1> <hr />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 py-6">
          {mock_interview_data.map((data, index) => {
            return (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 grid gap-3 text-center  w-full"
              >
                <h2 className="text-lg font-bold">{data.id}</h2>
                <h2 className="font-semibold">Mock Interview Session</h2>
                <p className=" text-neutral-600 dark:text-neutral-300">
                  Register by :{data.last_date}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
