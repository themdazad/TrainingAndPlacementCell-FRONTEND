import PageHeader from "../../../../components/ui/PageHeader.jsx";

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Training" },
  { label: "Summer web development 2025", isCurrent: true }, // No `to` = current page
];

const schedule = [
  { day: "Day 1", topic: "Introduction to Web Development, Internet Basics" },
  { day: "Day 2", topic: "Getting Started with HTML: Structure & Tags" },
  { day: "Day 3", topic: "HTML Elements: Lists, Tables, Forms" },
  { day: "Day 4", topic: "HTML Media: Images, Audio, Video, iframes" },
  { day: "Day 5", topic: "HTML Semantics & Accessibility" },

  { day: "Day 6", topic: "Introduction to CSS: Selectors & Syntax" },
  { day: "Day 7", topic: "Colors, Fonts, Text Styling" },
  { day: "Day 8", topic: "Box Model, Padding, Margin, Borders" },
  { day: "Day 9", topic: "Flexbox Layout: Align, Justify, Wrap" },
  { day: "Day 10", topic: "CSS Grid & Responsive Design Basics" },

  { day: "Day 11", topic: "Media Queries & Mobile-first Design" },
  { day: "Day 12", topic: "CSS Transitions & Basic Animations" },
  { day: "Day 13", topic: "Creating a Complete Webpage with HTML/CSS" },
  { day: "Day 14", topic: "Intro to Git & GitHub: Repositories & Commits" },
  { day: "Day 15", topic: "Git Branching, Collaboration, Hosting on GitHub" },

  {
    day: "Day 16",
    topic: "JavaScript Basics: Variables, Data Types, Operators",
  },
  { day: "Day 17", topic: "Control Structures: If-else, Switch, Loops" },
  { day: "Day 18", topic: "Functions and Scope in JavaScript" },
  { day: "Day 19", topic: "DOM Manipulation & Events" },
  { day: "Day 20", topic: "Working with Forms, Input Validation" },

  { day: "Day 21", topic: "JavaScript Arrays & Objects" },
  { day: "Day 22", topic: "Array Methods & Iteration Patterns" },
  { day: "Day 23", topic: "Object Manipulation & Nesting" },
  { day: "Day 24", topic: "JSON & Fetching Data (Basics)" },
  { day: "Day 25", topic: "Mini Project: Responsive Web Form with Validation" },

  { day: "Day 26", topic: "Debugging Tools & Console.log Mastery" },
  { day: "Day 27", topic: "Basic Error Handling & Try/Catch" },
  { day: "Day 28", topic: "Project Planning & File Structure Best Practices" },
  {
    day: "Day 29",
    topic: "Final Capstone Project: Landing Page with JS Interactivity",
  },
  {
    day: "Day 30",
    topic: "Project Presentation + Review & Certificate Distribution",
  },
];
export default function SummerWebDevelopment2025() {
  return (
    <main className="max-w-screen-2xl m-auto  px-[2.5%] dark:bg-zinc-900 grid gap-12 py-6 ">
      <PageHeader
        title={"Summer Program"}
        breadcrumbItems={breadcrumbItems}
        description={
          "Organized by the Training & Placement Cell, this program offers students an opportunity to gain practical experience in modern web technologies through guided instruction and hands-on project work."
        }
      />

      {/* Register CTA */}
      <section className="px-[2.5%] py-12 flex justify-center">
        <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-md p-8 text-center max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-3">Registration Open</h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-6">
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
