import PageHeader from "../../../../../components/PageHeader.jsx";

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Training" },
  { label: "Summer web development 2025", isCurrent: true }, // No `to` = current page
];
export default function SummerWebDevelopment2025() {
  return (
    <main className="max-w-screen-2xl m-auto  px-[2%] dark:bg-slate-900 grid gap-12 py-6 ">
      <PageHeader
        title={"Summer Program"}
        breadcrumbItems={breadcrumbItems}
        description={
          "Organized by the Training & Placement Cell, this program offers students an opportunity to gain practical experience in modern web technologies through guided instruction and hands-on project work."
        }
      />

      {/* Register CTA */}
      <section className="px-[2%] py-12 flex justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-md p-8 text-center max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-3">Registration Open</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Summer Web Development Program 2025 is now open for registration!
            Join us to learn the latest web technologies and build real-world
            projects.
          </p>
          <a
            href="https://forms.gle/xy1KBRBJKMF5d2k6A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              onClick={() => alert("Redirecting to Google Form...")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-3xl"
            >
              Register Now
            </button>
          </a>
        </div>
      </section>
    </main>
  );
}
