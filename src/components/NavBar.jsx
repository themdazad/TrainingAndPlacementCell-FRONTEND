import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Image } from "@heroui/react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Training", path: "/training" },
  { name: "Campus Placement", path: "/campus-placement" },
  {
    name: "Resources",
    dropdown: true,
    items: [
      { name: "Item 1", path: "/resources/item1" },
      { name: "Item 2", path: "/resources/item2" },
      { name: "Item 3", path: "/resources/item3" },
    ],
  },
  { name: "Online Test", path: "/online-test" },
];

const actionButtons = [
  { name: "Recruiters", path: "/recruiters" },
  { name: "Student Login", path: "/auth/student/login", primary: true },
];

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

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
      <header className="navHeader px-[5%] py-4 bg-white min-h-[100px] flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-6 lg:gap-12">
          <div className="brand-logo min-h-[40px] max-h-[64px] aspect-square">
            <Image src="./images/gecsiwan-logo.png" alt="gec-siwan-logo" />
          </div>
          <div className="title">
            <h1 className="text-md md:text-3xl font-bold">
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
              className="brand-logo border border-black p-1 rounded-full min-h-[30px] max-h-[48px] aspect-square"
              src="./images/dstbihar-logo.png"
              alt="dstbihar-logo"
            />
            <Image
              className="brand-logo min-h-[30px] max-h-[48px] aspect-square"
              src="./images/aicte-logo.png"
              alt="aicte-logo"
            />
          </div>
        </div>
      </header>

      {/* 2nd row */}
      <header className="px-[5%] bg-sky-200">
        <div className="mx-auto">
          <div className="flex items-center justify-between py-2 px-4 relative z-50">
            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
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
            <div className="hidden lg:flex lg:items-center lg:space-x-10">
              {navLinks.map((link, index) =>
                !link.dropdown ? (
                  <NavLink
                    key={index}
                    to={link.path}
                    className=" h-full transition-all duration-200 hover:text-opacity-80"
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() =>
                      setIsDropdownOpen({ [link.name]: true })
                    }
                    onMouseLeave={() =>
                      setIsDropdownOpen({ [link.name]: false })
                    }
                  >
                    <span className=" cursor-pointer transition-all duration-200 hover:text-opacity-80">
                      {link.name}
                    </span>

                    <ul
                      className={`absolute left-[-50%] min-w-max text-small rounded-md border-t-4 border-t-blue-600 bg-white py-2.5 px-12 space-y-1 transition-all duration-200 ${
                        isDropdownOpen[link.name] ? "flex flex-col" : "hidden"
                      }`}
                    >
                      {link.items.map((item, idx) => (
                        <li key={idx}>
                          <NavLink
                            to={item.path}
                            className="hover:text-blue-600 space-y-4"
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

            {/* Buttons */}
            <div className="hidden lg:inline-flex items-center space-x-4">
              {actionButtons.map((btn, i) => (
                <NavLink
                  key={i}
                  to={btn.path}
                  className={`px-5 py-2.5 rounded-full transition-all duration-200 ${
                    btn.primary
                      ? "bg-black text-white hover:bg-yellow-300 hover:text-black font-semibold"
                      : "hover:bg-yellow-300 hover:text-black"
                  }`}
                >
                  {btn.name}
                </NavLink>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div
              className={`lg:hidden flex flex-col w-full absolute top-full left-0 bg-white px-6 py-4 shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
                isMobileMenuOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              style={{ transitionProperty: "max-height, opacity" }}
            >
              {navLinks.map((link, index) =>
                !link.dropdown ? (
                  <NavLink
                    key={index}
                    to={link.path}
                    className="py-2 text-black hover:opacity-80"
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <div key={index} className="py-2">
                    <button
                      className="text-black font-semibold w-full flex justify-between items-center"
                      onClick={() => handleDropdownToggle(link.name)}
                    >
                      {link.name}
                      <span>{isDropdownOpen[link.name] ? "▲" : "▼"}</span>
                    </button>
                    <ul
                      className={`ml-4 mt-2 space-y-1 ${
                        isDropdownOpen[link.name] ? "block" : "hidden"
                      }`}
                    >
                      {link.items.map((item, idx) => (
                        <li key={idx}>
                          <NavLink
                            to={item.path}
                            className="text-black hover:underline"
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
              <div className="pt-4 border-t border-gray-200 mt-4">
                {actionButtons.map((btn, i) => (
                  <NavLink
                    key={i}
                    to={btn.path}
                    className={`block py-2 rounded-full ${
                      btn.primary
                        ? "text-white bg-black font-semibold hover:bg-yellow-300 hover:text-black px-4"
                        : "text-black hover:opacity-80"
                    }`}
                  >
                    {btn.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
}
