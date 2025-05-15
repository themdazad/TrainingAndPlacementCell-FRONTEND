import { Divider } from "@heroui/react";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="max-w-[1980px] m-auto px-[5%] py-10 sm:pt-16 bg-[url('/images/blur_bg.png')] bg-cover dark:bg-gray-800">
      <div className="grid grid-cols-2 sm:col-span-3 md:grid-cols-6 gap-y-6 gap-x-12">
        {/* About Section */}
        <div>
          <h4 className="font-semibold tracking-widest text-gray-400 dark:text-gray-300 uppercase">
            About
          </h4>
          <ul className="mt-4 grid grid-cols-1">
            <NavLink
              to="/about-tpo"
              className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              About T&P Cell
            </NavLink>
            <NavLink
              to="/contact-us"
              className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Contact
            </NavLink>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h4 className="font-semibold tracking-widest text-gray-400 dark:text-gray-300 uppercase">
            Resources
          </h4>
          <ul className="mt-4 space-y-1">
            {[
              "Placement Preparation",
              "Internship Opportunities",
              "Workshops",
              "Career Guidance",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-base text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links Section */}
        <div>
          <h4 className="font-semibold tracking-widest text-gray-400 dark:text-gray-300 uppercase">
            Useful Links
          </h4>
          <ul className="mt-4 space-y-1">            
              <li>
                <a
                  href="#"
                  className="text-base text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.gecsiwan.org/"
                  className="text-base text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  College Website
                </a>
              </li>            
          </ul>
        </div>

        {/* Credit Section */}
        <div>
          <h4 className="font-semibold tracking-widest text-gray-400 dark:text-gray-300 uppercase">
            Credit
          </h4>
          <ul className="mt-6 space-y-1">
            {["Web Developer", "Graphic Designer", "", "TPO Coordinators"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
          <h4 className="font-semibold tracking-widest text-gray-400 dark:text-gray-300 uppercase">
            Subscribe to Newsletter
          </h4>
          <form className="mt-6">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="block w-full p-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-3xl focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-3 mt-3 font-semibold text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-3xl transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <Divider className="mt-10 mb-6" />

      {/* Bottom bar */}
      <div className="text-center flex flex-col md:flex-row justify-center items-center gap-3 text-gray-600 dark:text-gray-300">
        <p>
          © 2025, All Rights Reserved by{" "}
          <a
            href="https://www.gecsiwan.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600 dark:hover:text-blue-400"
          >
            Government Engineering College, Siwan
          </a>
          .
        </p>
       
      </div>
    </footer>
  );
}
