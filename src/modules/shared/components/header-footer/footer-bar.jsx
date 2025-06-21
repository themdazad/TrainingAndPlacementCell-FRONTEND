import { Divider } from "@heroui/react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" bg-neutral-100 border-t-4 rounded-3xl border-blue-500 dark:bg-neutral-900 transition-all duration-200">
      <div className="max-w-screen-2xl m-auto py-4 md:py-10  px-4 ">
        {/* Top Section */}
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-12">
          {/* About */}
          <div>
            <h4 className="font-semibold tracking-widest text-neutral-400 dark:text-neutral-300 uppercase">
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
          {/* Recruiters */}
          <div>
            <h4 className="font-semibold tracking-widest text-neutral-400 dark:text-neutral-300 uppercase">
              Recruiters
            </h4>
            <ul className="mt-4 space-y-1">
              {[
                { label: "Why Us?", path: "/recruiters/why-us" },
                { label: "Register", path: "/recruiters/registration" },
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
            <h5 className="font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-300 mb-2">
              Social Media
            </h5>
            <ul className="space-y-1">
              <li>X</li>
              <li>
                <a
                  href="*https://www.linkedin.com/company/tpogecsiwan/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          {/* Teams */}
          <div>
            <h5 className="font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-300 mb-2">
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
                  Developer
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 flex justify-between items-start flex-col md:flex-row gap-6">
            {/* Newsletter */}
            <div className="justify-self-end w-full">
              <h4 className="font-semibold tracking-widest text-neutral-400 dark:text-neutral-300 uppercase">
                Newsletter
              </h4>
              <form className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 p-4 text-black dark:text-white placeholder-neutral-500 dark:placeholder-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-3xl focus:outline-none focus:border-blue-500"
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

        {/* Bottom Bar */}
        <div className="text-center text-sm text-neutral-600 dark:text-neutral-300 py-4">
          <p>
            <a
              href="https://www.gecsiwan.org/"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-blue-500 dark:hover:text-blue-400"
            >
              Training and Placement Cell | GEC, Siwan
            </a>
            ,© 2025
          </p>
          <a
            href="https://www.linkedin.com/in/themdazad/"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-blue-500"
          >
            {"<Developer/>"}
          </a>
        </div>
      </div>
    </footer>
  );
}
