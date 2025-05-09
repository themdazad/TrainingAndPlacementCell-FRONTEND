import { Divider } from "@heroui/react";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="max-w-[1980px] px-[5%] py-10 bg-gray-50 sm:pt-16 bg-[url('/images/blur_bg.png')] bg-cover">
      <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-12 gap-x-12">
        {/* About Section */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
            About
          </h4>
          <ul className="mt-4 grid grid-cols-1">
            <NavLink
              to="/about-tpo"
              className="text-base text-black hover:text-blue-600 transition"
            >
              About T&P Cell
            </NavLink>
            <NavLink
              to="/contact-us"
              className="text-base text-black hover:text-blue-600 transition"
            >
              Contact
            </NavLink>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
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
                  className="text-base text-black hover:text-blue-600 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* TPO member Section */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
            Usefull links
          </h4>
          <ul className="mt-4 space-y-1">
            {["LinkedIn", "Youtube", "College Website"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-base text-black hover:text-blue-600 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
            Credit
          </h4>
          <ul className="mt-6 space-y-1">
            {["Web Developer", "Graphic Designer", "", "TPO Coordinators"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base text-black hover:text-blue-600 transition"
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
          <h4 className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
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
              className="block w-full p-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-3xl focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-3 mt-3 font-semibold text-white bg-blue-600 rounded-3xl hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <Divider className="mt-10 mb-6" />

      {/* Bottom bar */}
      <div className="text-sm text-center flex flex-col md:flex-row justify-center items-center gap-3 text-gray-600">
        <p>
          © 2025, All Rights Reserved by{" "}
          <a
            href="https://www.gecsiwan.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600"
          >
            GEC, Siwan
          </a>
          .
        </p>
        <p>
          Developed & Designed by{" "}
          <a
            href="https://www.linkedin.com/in/modest-azad/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            Azad
          </a>
        </p>
      </div>
    </footer>
  );
}
