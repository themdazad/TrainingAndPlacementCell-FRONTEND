import { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { Image } from "@heroui/react";
import { ChevronDown, ChevronUp, BellDot } from "lucide-react";
import { useAuth } from "../../../hooks/contexts/auth/AuthContext"; // Adjust path as needed
import ThemeSwitch from "../../ui/ThemeSwitch";

const navLinks = [
  { name: "Home", path: "/" },

  // Learn & Prepare
  {
    name: "Learn & Prepare",
    dropdown: true,
    items: [
      { name: "Projects", path: "/projects" },
      { name: "Programs", path: "/programs" },
      { name: "Course Highlights", path: "/academics/course-highlights" },
      { name: "Skill Courses", path: "/academics/skills" },
      { name: "Certifications", path: "/academics/certifications" },
      { name: "Aptitude & Soft Skills", path: "/training/aptitude-softskills" },
    ],
  },

  // Career & Events
  {
    name: "Career & Events",
    dropdown: true,
    items: [
      { name: "Upcoming Drives", path: "/events/upcoming-drives" },
      { name: "Workshops & Webinars", path: "/events/workshops" },
      { name: "Hackathons", path: "/events/hackathons" },
      { name: "Placement Calendar", path: "/events/placement-calendar" },
      { name: "Mock Interviews", path: "/training/mock-interview" },
    ],
  },

  // Resources
  {
    name: "Resources",
    dropdown: true,
    items: [
      { name: "Resume Builder", path: "/tools/resume-builder" },
      { name: "Resume Templates", path: "/resources/resume-templates" },
      { name: "Interview Q&A Bank", path: "/resources/qa-bank" },
      { name: "Company Profiles", path: "/resources/company-profiles" },
      { name: "Placement Preparation Guide", path: "/resources/guide" },
    ],
  },

  // Community
  {
    name: "Community",
    dropdown: true,
    items: [
      { name: "Alumni Connect", path: "/alumni/connect" },
      { name: "Success Stories", path: "/alumni/success-stories" },
      { name: "Mentorship Program", path: "/alumni/mentorship" },
      { name: "Photo Gallery", path: "/events/gallery" },
    ],
  },

  // Recruiters
  {
    name: "Recruiters",
    dropdown: true,
    items: [
      { name: "Why Recruit From Us?", path: "/recruiter/why-us" },
      { name: "Past Recruiters", path: "/recruiter/past-recruiters" },
      { name: "Recruiter Registration", path: "/recruiter/registration" },
      { name: "Contact Us", path: "/reach-us" },
    ],
  },

  // Static Info
  {
    name: "About",
    path: "/about-us",
  },
];

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  // Access auth context
  const { isLogedIn, setIsLogedIn } = useAuth();

  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handling login/logout Features
  const navigate = useNavigate();

  const handleDropdownToggle = (name) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`max-w-[1980px] sticky top-0 m-auto z-[99] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } transition-all duration-500 ease-in-out`}
    >
      {/* 1st row */}
      <header className="navHeader px-[5%] py-4 bg-white dark:bg-zinc-900 min-h-[100px] flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-6 lg:gap-12">
          <div className="brand-logo min-h-[40px] max-h-[64px] aspect-square">
            <Image
              className="dark:hidden"
              src="/images/gecsiwan-logo.png"
              alt="gec-siwan-logo"
            />
            <Image
              className="hidden dark:inline"
              src="/images/gecsiwan-logo-light.png"
              alt="gec-siwan-logo"
            />
          </div>
          <div className="title">
            <h1 className=" dm-serif-text-regular text-md sm:text-2xl md:text-3xl font-bold">
              Training and Placement Cell
            </h1>
            <h3 className="text-sm md:text-md">
              Government Engineering College, Siwan Bihar-841226
            </h3>
          </div>
        </div>

        <div className="r-logos flex gap-3 items-center">
          <div className="hidden md:flex flex-col text-right text-sm">
            <a href="">Contact: +91-123456789</a>
            <a href="">Email: tpogecsiwan@gmail.com</a>
          </div>
          <div className="images flex gap-1 md:gap-3">
            <Image
              className="brand-logo border border-black dark:border-white p-1 rounded-full min-h-[30px] max-h-[48px] aspect-square"
              src="/images/dstbihar-logo.png"
              alt="dstbihar-logo"
            />
            <Image
              className="brand-logo min-h-[30px] max-h-[48px] aspect-square"
              src="/images/aicte-logo.png"
              alt="aicte-logo"
            />
          </div>
        </div>
      </header>

      {/* 2nd row */}
      <header className="mx-auto relative bg-zinc-100 dark:bg-zinc-800">
        <div className="px-[5%] flex items-center justify-between py-2 relative z-50">
          {/* Hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex p-2 text-black dark:text-white transition-all duration-200 rounded-md lg:hidden focus:bg-zinc-100 hover:bg-zinc-100 dark:focus:bg-zinc-700 dark:hover:bg-zinc-700"
          >
            <svg
              className={`${isMobileMenuOpen ? "hidden" : "block"} w-6 h-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>
            <svg
              className={`${isMobileMenuOpen ? "block" : "hidden"} w-6 h-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navLinks.map((link, index) =>
              !link.dropdown ? (
                <NavLink
                  key={index}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative after:bg-blue-600 dark:after:bg-blue-400  ${
                      isActive
                        ? "text-blue-500 dark:text-blue-400 after:w-full"
                        : "text-black dark:text-white after:w-0 group-hover:after:w-full"
                    } hover:opacity-80 transition-all`
                  }
                >
                  {link.name}
                </NavLink>
              ) : (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setIsDropdownOpen({ [link.name]: true })}
                  onMouseLeave={() => setIsDropdownOpen({ [link.name]: false })}
                >
                  <span className="flex items-center cursor-pointer transition-all duration-300 hover:text-opacity-80 dark:hover:text-opacity-80">
                    {link.name}
                    <ChevronDown className="rotate-0 group-hover:rotate-180 transition-rotate duration-300" />
                  </span>
                  <ul
                    className={`absolute  shadow-md left-1/2 transform -translate-x-1/2 min-w-max text-small rounded-xl border-t-4 border-t-blue-600 bg-white dark:bg-zinc-800 p-3  transition-all duration-200 ${
                      isDropdownOpen[link.name] ? "flex flex-col" : "hidden"
                    }`}
                  >
                    {link.items.map((item, idx) => (
                      <NavLink
                        key={idx}
                        to={item.path}
                        className="text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-100 rounded-3xl w-full py-2 px-3"
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>

          {/* Mobile Dropdown */}
          <div
            ref={mobileMenuRef}
            className={`lg:hidden absolute py-12 top-[60px] left-0 w-screen bg-white dark:bg-zinc-900 z-40 shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
            style={{ transitionProperty: "max-height, opacity" }}
          >
            <div className="flex flex-col rounded-[30px] px-6 py-6 space-y-4">
              {navLinks.map((link, index) =>
                !link.dropdown ? (
                  <NavLink
                    key={index}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `py-4 px-2 text-lg rounded-md ${
                        isActive
                          ? "text-blue-500 dark:text-blue-400 font-semibold"
                          : "text-zinc-800 dark:text-white"
                      } hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all`
                    }
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <div key={index} className="flex flex-col gap-2">
                    <button
                      className="text-lg text-left w-full px-2 py-3 rounded-md text-zinc-800 dark:text-white font-semibold flex justify-between items-center hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      onClick={() => handleDropdownToggle(link.name)}
                    >
                      {link.name}
                      <span>
                        {isDropdownOpen[link.name] ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                      </span>
                    </button>
                    <ul
                      className={`ml-4 space-y-3 ${
                        isDropdownOpen[link.name] ? "block" : "hidden"
                      }`}
                    >
                      {link.items.map((item, idx) => (
                        <li key={idx}>
                          <NavLink
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              `block px-2 py-3 text-md rounded-3xl ${
                                isActive
                                  ? "text-blue-500 dark:text-blue-400 font-medium"
                                  : "text-zinc-800 dark:text-white"
                              } hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all`
                            }
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Action Buttons: Theme Switch, Dashboard/Login, and Logout */}
          <div className="flex items-center gap-6 ml-4">
            {/* Theme Switch */}
            <ThemeSwitch />

            {/* Dashboard or Login Button */}
            <NavLink
              to={
                isLogedIn?.student
                  ? "/dashboard/student"
                  : "/auth/student/login"
              }
              className="flex items-center gap-2 text-zinc-800 dark:text-zinc-100"
            >
              <Image
                className="rounded-full border border-zinc-300 dark:border-zinc-600 w-10 h-10 object-cover"
                src="https://www.bu.edu/prsocial/files/2019/07/profile-default-photo.jpg"
                alt="user-profile"
              />
              <span className="hidden sm:inline text-sm font-medium">
                {isLogedIn?.student ? "Dashboard" : "Login"}
              </span>
            </NavLink>
          </div>
        </div>
      </header>
    </nav>
  );
}
