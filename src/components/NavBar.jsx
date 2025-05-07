import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Image } from "@heroui/react";
import { Mail, Phone } from "lucide-react";

const navItems = [
  { title: "Home", navigate: "/" },
  { title: "Programs", navigate: "programs" },
  { title: "Placements", navigate: "placements" },
  { title: "Gallery", navigate: "gallery" },
  { title: "Careers", navigate: "careers" },
];

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`max-w-[1980px] sticky top-0 m-auto z-[99] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } transition-all duration-500 ease-in-out`}
    >
      {/* 1st row */}
      <header className="navHeader px-[5%] py-4 bg-white min-h-[100px] flex justify-between items-center">
        {/* top-left */}
        <div className="flex  items-center gap-[36px]">
          <div className="brand-logo min-h-[40px] max-h-[64px] aspect-square">
            <Image src="./images/gecsiwan-logo.png" alt="gec-siwan-logo" />
          </div>
          <div className="title">
            <h1 className="text-xl md:text-3xl lg:text-3xl font-bold">
              Training and Placement Cell
            </h1>
            <h3 className="">
              Government Engineering College, Siwan Bihar-841226
            </h3>
          </div>
        </div>
        {/* top-right */}
        <div className="r-logos flex gap-3 items-center">
          <div className="hidden md:flex flex-col text-right">
            <a href="" className="flex gap-1">
              Contact: +91-123456789
            </a>
            <a href="" className="flex gap-1">
              Email: tpogecsiwan@gmail.com
            </a>
          </div>
          <div className="images flex gap-3">
            <Image
              className="brand-logo border-1 border-black p-1 rounded-full min-h-[30px] max-h-[48px] aspect-square"
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

      {/* 2nd row  */}
      <header className="px-[5%] bg-sky-200 ">
        <div className="mx-auto">
          <div className="flex items-center justify-between py-2">
            {/* <div className="flex-shrink-0">
                    <NavLink to="#" title="" className="flex">
                        <img className="w-auto h-8" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" alt="" />
                    </a>
                </div> */}

            <button
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8h16M4 16h16"
                ></path>
              </svg>

              {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <NavLink
                to="#"
                title=""
                className=" text-black transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Home{" "}
              </NavLink>

              <NavLink
                to="#"
                title=""
                className=" text-black transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Training{" "}
              </NavLink>

              <NavLink
                to="#"
                title=""
                className=" text-black transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Campus Placement{" "}
              </NavLink>

              <NavLink
                to="#"
                title=""
                className=" text-black relative drop-down transition-all duration-200 hover:text-opacity-80"
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                Resources
                <ul
                  className={`absolute ${
                    isDropdownOpen ? "flex" : "hidden"
                  } bg-sky-300 py-2.5 px-4 rounded-xl`}
                >
                  <li>item</li>
                  <li>item</li>
                  <li>item</li>
                </ul>
              </NavLink>

              <NavLink
                to="#"
                title=""
                className=" text-black transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Online Test{" "}
              </NavLink>
            </div>
            <div className="buttons-link">
              <NavLink
                to="#"
                title=""
                className="hidden lg:inline-flex items-center justify-center px-5 py-2.5  transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 rounded-full"
                role="button"
              >
                Recruiters
              </NavLink>
              <NavLink
                to="#"
                title=""
                className="hidden lg:inline-flex items-center justify-center px-4 py-2.5 transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black  rounded-full"
                role="button"
              >
                Student Login
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
}
