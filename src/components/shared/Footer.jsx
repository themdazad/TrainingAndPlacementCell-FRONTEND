import { Divider } from "@heroui/react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" bg-zinc-100 border-t-1 hover:border-t-4 hover:rounded-3xl border-blue-500 dark:bg-zinc-900 transition-all duration-200">
      <div className="max-w-screen-2xl m-auto py-10 sm:pt-16 px-[2.5%] ">
        {/* Top Section */}
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-12">
          {/* About */}
          <div>
            <h4 className="font-semibold tracking-widest text-zinc-400 dark:text-zinc-300 uppercase">
              About
            </h4>
            <ul className="mt-4 space-y-1">
              <li>
                <NavLink
                  to="/about-us"
                  className="text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-tpo"
                  className="text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition"
                >
                  About T&P Cell
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className="text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold tracking-widest text-zinc-400 dark:text-zinc-300 uppercase">
              Resources
            </h4>
            <ul className="mt-4 space-y-1">
              {[
                { label: "Resume Builder", path: "/tools/resume-builder" },
                { label: "Q&A Bank", path: "/resources/qa-bank" },
                { label: "Guide", path: "/resources/guide" },
                {
                  label: "Company Profiles",
                  path: "/resources/company-profiles",
                },
              ].map(({ label, path }) => (
                <li key={label}>
                  <NavLink
                    to={path}
                    className="text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Career & Events */}
          <div>
            <h4 className="font-semibold tracking-widest text-zinc-400 dark:text-zinc-300 uppercase">
              Career & Events
            </h4>
            <ul className="mt-4 space-y-1">
              {[
                { label: "Upcoming Drives", path: "/events/upcoming-drives" },
                { label: "Workshops", path: "/events/workshops" },
                { label: "Hackathons", path: "/events/hackathons" },
                { label: "Calendar", path: "/events/placement-calendar" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <NavLink
                    to={path}
                    className="text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Recruiters */}
          <div>
            <h4 className="font-semibold tracking-widest text-zinc-400 dark:text-zinc-300 uppercase">
              Recruiters
            </h4>
            <ul className="mt-4 space-y-1">
              {[
                { label: "Why Us?", path: "/recruiter/why-us" },
                {
                  label: "Past Recruiters",
                  path: "/recruiter/past-recruiters",
                },
                { label: "Register", path: "/recruiter/registration" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <NavLink
                    to={path}
                    className="text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h5 className="font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-300 mb-2">
              Social Media
            </h5>
            <ul className="space-y-1">
              <li>X</li>
              <li>LinkedIn</li>
              <li>YouTube</li>
            </ul>
          </div>
          {/* Teams */}
          <div>
            <h5 className="font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-300 mb-2">
              Teams
            </h5>
            <ul className="space-y-1">
              <li>TPO Coordinators</li>
              <li>
                <a
                  href="https://www.linkedin.com/in/themdazad/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Know Developer
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-6 flex justify-between items-start flex-col md:flex-row gap-6">
          
            {/* Newsletter */}
            <div className="justify-self-end w-full">
              <h4 className="font-semibold tracking-widest text-zinc-400 dark:text-zinc-300 uppercase">
                Newsletter
              </h4>
              <form className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 p-4 text-black dark:text-white placeholder-zinc-500 dark:placeholder-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-3xl focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-5 py-3 font-semibold text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-3xl transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Divider className="mt-10 mb-6" />

        {/* Bottom Bar */}
        <div className="text-center text-zinc-600 dark:text-zinc-300">
          <p>
            © 2025, All Rights Reserved by{" "}
            <a
              href="https://www.gecsiwan.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-500 dark:hover:text-blue-400"
            >
              Government Engineering College, Siwan
            </a>
            .
          </p>{" "}
          <br />
          <a
            href="https://www.linkedin.com/in/themdazad/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            Currently Under Development
          </a>
        </div>

      </div>
    </footer>
  );
}
