import { Divider, Image } from "@heroui/react";
import { Code } from "lucide-react";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <section className="max-w-[1980px] px-[5%] lg:px-[10%] py-10 bg-gray-50 sm:pt-16 bg-[url('/images/blur_bg.png')] bg-cover">
  
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <div className="brand-logo max-h-[100%] h-[80px] aspect-square">
              <Image src="./images/gecsiwan-logo.png" alt="gec-siwan-logo" />
            </div>

            <p className="text-base leading-relaxed text-gray-600 mt-7">
              The Training and Placement Cell of Government Engineering College,
              Siwan is dedicated to bridging the gap between students and the
              corporate world. We aim to provide students with the best
              opportunities to excel in their careers.
            </p>

            <ul className="flex items-center space-x-3 mt-9">
              <li>
                <a
                  href="https://twitter.com"
                  title="Twitter"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  title="LinkedIn"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              About
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  title="About Us"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="Our Mission"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Our Mission
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="Our Vision"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Our Vision
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="Contact"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Resources
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  title="Placement Preparation"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Placement Preparation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="Internship Opportunities"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Internship Opportunities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="Workshops"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Workshops
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="Career Guidance"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  Career Guidance
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Subscribe to Newsletter
            </p>

            <form action="#" method="POST" className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-3xl focus:outline-none focus:border-blue-600 caret-blue-600"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-3 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-3xl hover:bg-blue-700 focus:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <Divider className="mt-4 mb-2" />

        <div className="text-sm text-center flex flex-col md:flex-row justify-center items-center gap-3 text-gray-600">
          <p>
            © Copyright 2025, All Rights Reserved by{" "}
            <a
              href="https://www.gecsiwan.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              GEC, Siwan.
            </a>{" "}
          </p>
          <a
            href="https://www.linkedin.com/in/modest-azad/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            <Image
              src="./images/azad_sign.svg"
              height={60}
              alt="gec-siwan-logo"
            />
          </a>
        </div>
    </section>
  );
}

function Footer2() {
  return (
    <>
      <Divider />
      <footer className=" hidden px-[5%] py-8 max-w-[1920px] m-auto">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-700 dark:text-gray-300">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold mb-2">T&P Cell</h3>
            <ul className="space-y-1">
              <li>
                <NavLink to="/contact-us">Contact Us</NavLink>
              </li>
              <li>
                <NavLink to="/careers">Careers</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1">
              <li>
                <a href="/docs">Interview Tips</a>
              </li>
              <li>
                <a href="/tutorials">Mock Interview</a>
              </li>
              <li>
                <a href="/support">Support Center</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
              <li>
                <a href="/security">Security</a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold mb-2">Connect</h3>
            <div className="flex space-x-4 text-xl mb-4">
              <a href="https://linkedin.com">
                <FaLinkedinIn />
              </a>
              <a href="https://twitter.com">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8  pt-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs">
            2025 ©Copyright reserved. Developed with{" "}
            <span className="text-red-600">❤</span> by{" "}
            <a
              className="font-semibold text-sky-600"
              href="https://www.linkedin.com/in/modest-azad/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GEC, Siwan
            </a>
          </p>
          <NavLink
            to="https://www.linkedin.com/in/themdazad/"
            className="text-sm mt-2 md:mt-0"
          >
            <Code className="inline mr-1" />
          </NavLink>
        </div>
      </footer>
    </>
  );
}
