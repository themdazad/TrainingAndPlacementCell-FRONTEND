import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Image, Button } from "@heroui/react";
import { ChevronDown, ChevronUp, X, AlignLeft } from "lucide-react";
import { useAuth } from "../../../../hooks/contexts/auth/AuthContext"; // Adjust path as needed
import ThemeSwitch from "../../../../components/ThemeSwitch";
import NavigationMenuRoutes from "../../data/navigation-menu-routes.js"

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
    <nav className="sticky top-4 w-full m-auto z-50 p-2">
      <header>
        {/* Navigation Header*/}
        <div
          className={`navHeader
            ${
              isVisible
                ? "translate-y-0 opacity-1"
                : "-translate-y-full opacity-0"
            }
            transition-all duration-500 
          `}
        >
          <div className="max-w-screen-2xl px-[2%] m-auto flex justify-between items-center gap-4">
            {/* 1. Left-side-logo */}
            <div
              className={`max-sm:hidden hover:shadow-md hover:scale-105 backdrop-blur-md bg-gray-200/70 dark:bg-gray-800/70 p-1 rounded-full flex justify-center`}
            >
              <Link to="/">
                <Image
                  className="dark:hidden h-[80px] aspect-square"
                  src="/images/logos/gecsiwan-logo.png"
                  alt="gec-siwan-logo"
                />
                <Image
                  className="hidden dark:inline h-[80px] aspect-square"
                  src="/images/gecsiwan-logo-light.png"
                  alt="gec-siwan-logo"
                />
              </Link>
            </div>

            {/* 2. center-navigation-bar  */}
            <div
              className={`transition-all duration-500
            w-full relative md:max-w-min text-nowrap py-1 mx-auto rounded-full backdrop-blur-md bg-gray-200/70 dark:bg-gray-800/70`}
            >
              <div className=" px-4 flex items-center justify-between py-2 relative z-50">
                {/* Hamburger-Botton */}
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

                {/* i. Shows in Desktop by default: Navigation menus */}
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                  {NavigationMenuRoutes.map((link, index) =>
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
                          className={`absolute  shadow-md left-1/2 transform -translate-x-1/2 min-w-max text-small rounded-xl border-t-1 hover:border-t-4 border-t-blue-600 bg-white dark:bg-gray-800 py-2 transition-all duration-200 ${
                            isDropdownOpen[link.name]
                              ? "flex flex-col"
                              : "hidden"
                          }`}
                        >
                          {/* dropdown list items  */}
                          {link.items.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.path}
                              className="hover:bg-blue-500/30 w-full py-2 px-3"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>

                {/*Theme Switch, Dashboard/Login, and Logout */}
                <div className="flex items-center gap-6 ml-4">
                  <ThemeSwitch />

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
                      className="flex items-center gap-2 text-gray-800 dark:text-gray-100"
                    >
                      <Image
                        className="rounded-full border border-gray-300 dark:border-gray-600 w-10 h-10 object-cover"
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
                      className="flex items-center gap-2 text-gray-800 dark:text-gray-100"
                    >
                      <Image
                        className="rounded-full border border-gray-300 dark:border-gray-600 w-10 h-10 object-cover"
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

              {/* ii. Shows in Mobile only:  Dropdown lists */}
              <div
                ref={mobileMenuRef}
                className={`lg:hidden absolute w-full rounded-3xl backdrop-blur-md z-40  overflow-hidden transition-all duration-200 ease-in-out ${
                  isMobileMenuOpen ? "opacity-100" : "hidden opacity-0"
                }`}
                style={{
                  transitionProperty: "height, opacity",
                }}
              >
                <div className="flex flex-col rounded-3xl justify-center bg-gray-100 dark:bg-gray-800 p-6 space-y-4">
                  {NavigationMenuRoutes.map((link, index) =>
                    !link.dropdown ? (
                      <NavLink
                        key={index}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `py-4 px-2 text-xl rounded-md ${
                            isActive
                              ? "text-blue-500 dark:text-blue-400 font-semibold"
                              : "text-gray-800 dark:text-white"
                          } hover:bg-gray-100 dark:hover:bg-gray-800 transition-all`
                        }
                      >
                        {link.name}
                      </NavLink>
                    ) : (
                      // dropdown menu
                      <div key={index} className="flex flex-col gap-2">
                        <button
                          className="text-xl text-left w-full p-3 rounded-2xl text-gray-800 dark:text-white flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800"
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
                                      : "text-gray-800 dark:text-white"
                                  } hover:bg-gray-100 dark:hover:bg-gray-800 transition-all`
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

            {/* 3. right-side-logos */}
            <div
              className={`hidden md:flex gap-1 md:gap-3 backdrop-blur-md bg-gray-200 dark:bg-gray-800 p-2 rounded-full`}
            >
              <Image
                className="brand-logo border border-black dark:border-white p-1 rounded-full min-h-[30px] max-h-[52px] aspect-square"
                src="/images/dstbihar-logo.png"
                alt="dstbihar-logo"
              />
              <Image
                className="brand-logo min-h-[30px] max-h-[52px] aspect-square"
                src="/images/aicte-logo.png"
                alt="aicte-logo"
              />
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
}
