import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Image, Button } from "@heroui/react";
import { ChevronDown, ChevronUp, X, AlignLeft } from "lucide-react";
import { useAuth } from "../../../../hooks/contexts/auth/AuthContext"; // Adjust path as needed
import ThemeSwitch from "../../../../components/ThemeSwitch";

const navLinks = [
  { name: "Home", path: "/" },

  // Learn & Prepare
  {
    name: "For Student",
    dropdown: true,
    items: [
      { name: "Student's Projects", path: "/student/projects" },
    ],
  },


  // Careers
  {
    name: "Careers",
    dropdown: true,
    items: [
      { name: "Placement Drives", path: "/careers/placement-drives" },
      {
        name: "Summer Web Development 2025",
        path: "/training/summer-web-development-2025",
      },
      { name: "Mock Interviews", path: "/training/mock-interview" },
      { name: "Workshops & Webinars", path: "/training/workshops" },
    ],
  },

  {
    name: "Gallery",
    path: "/gallery",
  },
  {
    name: "Blogs",
    path: "/blogs",
  },
  // Static Info
  {
    name: "About us",
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

  const handleDropdownToggle = (name) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
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
      className={`sticky top-0 z-50 m-auto ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } transition-all duration-700 ease-in-out`}
    >
      <header>
        {/* Navigation Header*/}
        <div className="navHeader bg-white dark:bg-neutral-900  px-4 py-2">
          <div className="max-w-screen-2xl m-auto flex justify-between items-center">
            <div className="max-md:w-full flex max-md:flex-col justify-center items-center gap-3 md:gap-6 ">
              <div className="college-logo flex justify-center aspect-square">
                <Image
                  className="dark:hidden h-[80px]"
                  src="/images/gecsiwan-logo.png"
                  alt="gec-siwan-logo"
                />
                <Image
                  className="hidden dark:inline h-[80px]"
                  src="/images/gecsiwan-logo-light.png"
                  alt="gec-siwan-logo"
                />
              </div>
              <div className="title max-sm:hidden max-md:text-center">
                <h1 className=" dm-serif-text-regular text-xl md:text-3xl font-bold">
                  Training and Placement Cell
                </h1>
                <h2 className="md:text-md font-semibold">
                  Government Engineering College, Siwan Bihar-841226
                </h2>
              </div>
            </div>
            <div className="r-logos  max-md:hidden flex gap-3 items-center">
              <div className="images flex gap-1 md:gap-3">
                <img
                  className="brand-logo border border-black dark:border-white p-1 rounded-full min-h-[30px] max-h-[48px] aspect-square"
                  src="/images/dstbihar-logo.png"
                  alt="dstbihar-logo"
                />
                <img
                  className="brand-logo min-h-[30px] max-h-[48px] aspect-square"
                  src="/images/aicte-logo.png"
                  alt="aicte-logo"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Menu items bar*/}
        <div className=" py-1 mx-auto relative bg-neutral-100 dark:bg-neutral-800">
          <div className="max-w-screen-2xl m-auto">
            <div className=" px-4 flex items-center justify-between py-2 relative z-50">
              {/* Hamburger */}
              <button
                ref={hamburgerRef}
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="text-black dark:text-white transition-all duration-200 lg:hidden"
              >
                <AlignLeft
                  className={`${
                    isMobileMenuOpen ? "hidden" : "block"
                  } w-8 h-auto`}
                />
                <X
                  className={`${
                    isMobileMenuOpen ? "block" : "hidden"
                  } w-8 h-auto `}
                />
              </button>

              {/* Desktop Menu Nav */}
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
                      onMouseEnter={() =>
                        setIsDropdownOpen({ [link.name]: true })
                      }
                      onMouseLeave={() =>
                        setIsDropdownOpen({ [link.name]: false })
                      }
                    >
                      <span className="flex items-center cursor-pointer transition-all duration-200hover:text-opacity-80 dark:hover:text-opacity-80">
                        {link.name}
                        <ChevronDown className="rotate-0 group-hover:rotate-180 transition-rotate duration-200" />
                      </span>
                      <ul
                        className={`absolute  shadow-md left-1/2 transform -translate-x-1/2 min-w-max text-small rounded-xl border-t-1 hover:border-t-4 border-t-blue-600 bg-white dark:bg-neutral-800 py-2 transition-all duration-200 ${
                          isDropdownOpen[link.name] ? "flex flex-col" : "hidden"
                        }`}
                      >
                        {/* dropdown list items  */}
                        {link.items.map((item, idx) => (
                          <NavLink
                            key={idx}
                            to={item.path}
                            className="hover:bg-blue-500/30 w-full py-2 px-3"
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>

              {/* Auth: Theme Switch, Dashboard/Login, and Logout */}
              <div className="flex items-center gap-6 ml-4">
                <span className="max-md:hidden">
                  <ThemeSwitch />
                </span>

                {/* Login Button */}
                {!(isLogedIn.admin || isLogedIn.student) && (
                  <Button
                    as={NavLink}
                    to="/auth"
                    content="Login"
                    variant="solid"
                    radius="full"
                    color="primary"
                    className="inline-flex text-sm items-center font-medium bg-gradient-to-r from-blue-500 to-sky-500"
                  >
                    Login
                  </Button>
                )}

                {/* Dashboard button  */}
                {!!isLogedIn.admin && (
                  <NavLink
                    to="/dashboard/admin"
                    className="flex items-center gap-2 text-neutral-800 dark:text-neutral-100"
                  >
                    <Image
                      className="rounded-full border border-neutral-300 dark:border-neutral-600 w-10 h-10 object-cover"
                      src="/images/profile-default-photo.jpg"
                      alt="user-profile"
                    />
                    <span className="hidden sm:inline text-sm font-medium">
                      Dashboard
                    </span>
                  </NavLink>
                )}
                {!!isLogedIn.student && (
                  <NavLink
                    to="/dashboard/student"
                    className="flex items-center gap-2 text-neutral-800 dark:text-neutral-100"
                  >
                    <Image
                      className="rounded-full border border-neutral-300 dark:border-neutral-600 w-10 h-10 object-cover"
                      src="/images/profile-default-photo.jpg"
                      alt="user-profile"
                    />
                    <span className="hidden sm:inline text-sm font-medium">
                      Dashboard
                    </span>
                  </NavLink>
                )}
              </div>
            </div>
            {/* Mobile Dropdown Menu Nav */}
            <div
              ref={mobileMenuRef}
              className={`lg:hidden absolute top-[56px] w-full bg-white dark:bg-neutral-900 z-40 shadow-md overflow-hidden transition-all duration-200 ease-in-out ${
                isMobileMenuOpen ? "opacity-100" : "h-0 opacity-0"
              }`}
              style={{
                transitionProperty: "max-height, opacity",
              }}
            >
              <div className="flex flex-col rounded-3xl p-6 space-y-4">
                {navLinks.map((link, index) =>
                  !link.dropdown ? (
                    <NavLink
                      key={index}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `py-4 px-2 text-xl rounded-md ${
                          isActive
                            ? "text-blue-500 dark:text-blue-400 font-semibold"
                            : "text-neutral-800 dark:text-white"
                        } hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ) : (
                    <div key={index} className="flex flex-col gap-2">
                      <button
                        className="text-lg text-left w-full p-3 rounded-2xl text-neutral-800 dark:text-white flex justify-between items-center hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
                        className={`ml-4 space-y-3 transition-all duration-200 ${
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
                                    : "text-neutral-800 dark:text-white"
                                } hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all`
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
          </div>
        </div>
      </header>
    </nav>
  );
}
