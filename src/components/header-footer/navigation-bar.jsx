import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Image, Button } from "@heroui/react";
import { ChevronDown, ChevronUp, X, AlignLeft, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import NavigationMenuRoutes from "./navigation-menu-routes.js";

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState(null); // Changed from isLoggedIn to user object
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const navigate = useNavigate();

  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Sync auth state with localStorage
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    checkAuth();

    // Listen for custom login/logout events
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out successfully");
    navigate("/login");
  };

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
    <nav className="sticky top-0 md:top-4 w-full z-[100] p-0 md:p-2">
      <div
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg rounded-none md:rounded-3xl shadow-lg border-b md:border border-slate-200 dark:border-slate-700">
          
          {/* Top Bar - Logo and Actions */}
          <div className="px-4 md:px-6 py-2 flex justify-between items-center">
            
            {/* 1. Left-side-logo */}
            <div className="max-sm:hidden hover:shadow-md hover:scale-105 bg-slate-200 dark:bg-slate-800 p-1 rounded-full flex justify-center">
              <Link to="/">
                <Image className="h-[70px] aspect-square" src="/images/logos/gecsiwanlogo.svg" alt="gec-siwan-logo" />
              </Link>
            </div>

            {/* 2. Center-navigation-bar */}
            <div className="transition-all duration-500 w-full relative md:max-w-min text-nowrap py-1 px-2 mx-auto rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="px-4 flex items-center justify-between py-2 relative z-50">
                
                <button
                  ref={hamburgerRef}
                  onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-black dark:text-white lg:hidden"
                >
                  {isMobileMenuOpen ? <X className="w-8 h-auto" /> : <AlignLeft className="w-8 h-auto" />}
                </button>

                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                  {NavigationMenuRoutes.map((link, index) =>
                    !link.dropdown ? (
                      <NavLink
                        key={index}
                        to={link.path}
                        className={({ isActive }) =>
                          `relative ${isActive ? "text-blue-500 dark:text-blue-400 font-semibold" : "text-black dark:text-white"}`
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
                        <span className="flex items-center cursor-pointer">
                          {link.name}
                          <ChevronDown className="group-hover:rotate-180 transition-transform" />
                        </span>
                        <ul className={`absolute shadow-md left-1/2 -translate-x-1/2 min-w-max rounded-xl bg-white dark:bg-slate-800 py-2 ${isDropdownOpen[link.name] ? "flex flex-col" : "hidden"}`}>
                          {link.items.map((item, idx) => (
                            <Link key={idx} to={item.path} className="hover:bg-blue-500/30 w-full py-2 px-3">
                              {item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>

                {/* Authentication Toggle */}
                <div className="flex items-center gap-4 ml-4">
                  {!user ? (
                    <Button
                      as={NavLink}
                      to="/login"
                      variant="solid"
                      radius="full"
                      color="primary"
                      className="text-sm font-medium bg-gradient-to-r from-blue-500 to-sky-500"
                    >
                      Login
                    </Button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <NavLink
                        to={user.role === "admin" ? "/dashboard/admin" : "/dashboard/student"}
                        className="flex items-center gap-2"
                      >
                        <Image
                          className="rounded-full border w-10 h-10 object-cover"
                          src="/images/profile-default-photo.jpg"
                          alt="profile"
                        />
                        <span className="hidden sm:inline text-sm font-medium">Dashboard</span>
                      </NavLink>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onClick={handleLogout}
                        title="Logout"
                      >
                        <LogOut size={20} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Right-side-logos */}
            <div className="hidden rounded-full md:flex gap-3 backdrop-blur-md">
              <Image className="brand-logo border p-1 rounded-full max-h-[60px]" src="/images/dstbihar-logo.png" alt="dstbihar" />
              <Image className="brand-logo max-h-[60px]" src="/images/aicte-logo.png" alt="aicte" />
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
}