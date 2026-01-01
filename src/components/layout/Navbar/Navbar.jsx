import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Image,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  ChevronDown,
  ChevronUp,
  X,
  Menu,
  User,
  LogOut,
  LayoutDashboard,
  Bell,
} from "lucide-react";
import NavigationMenuRoutes from "./navigation-menu-routes.js";
import PATHS from "../../../constants/paths.js";

// SOLID Principle: Single Responsibility - Custom Hooks
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

const useScrollVisibility = (threshold = 50) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, threshold]);

  return isVisible;
};

// SOLID Principle: Single Responsibility - Logo Component
const CollegeLogo = () => (
  <Link
    to="/"
    className="flex items-center gap-3 md:gap-4 flex-shrink-0 hover:scale-105 transition-transform duration-300"
  >
    <Image
      className="h-16 md:h-20 w-auto"
      src="/images/logos/collegelogo.png"
      alt="GEC Siwan Logo"
    />
    <div className="hidden md:flex flex-col">
      <h1 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
        Training and Placement Cell
      </h1>
      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-tight">
        Government Engineering College Siwan
      </p>
    </div>
  </Link>
);

// SOLID Principle: Single Responsibility - Mobile Menu Toggle
const MobileMenuToggle = ({ isOpen, onClick, ref }) => (
  <button
    ref={ref}
    onClick={onClick}
    className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
    aria-label="Toggle menu"
  >
    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
  </button>
);

// SOLID Principle: Single Responsibility - Notification Bell Component
const NotificationBell = ({ count = 5 }) => (
  <Dropdown placement="bottom-end">
    <DropdownTrigger>
      <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-200">
        <Bell className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Notifications" className="w-80" variant="flat">
      <DropdownItem
        key="header"
        className="h-10 gap-2"
        textValue="Notifications"
      >
        <p className="font-semibold text-slate-900 dark:text-slate-100">
          Notifications
        </p>
      </DropdownItem>
      <DropdownItem key="notification-1" textValue="New placement drive">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">New placement drive added</p>
          <p className="text-xs text-slate-500">2 hours ago</p>
        </div>
      </DropdownItem>
      <DropdownItem key="notification-2" textValue="Application deadline">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">
            Application deadline approaching
          </p>
          <p className="text-xs text-slate-500">5 hours ago</p>
        </div>
      </DropdownItem>
      <DropdownItem key="view-all" className="text-center" textValue="View all">
        <Link
          to="/notifications"
          className="text-blue-600 dark:text-blue-400 text-sm font-medium"
        >
          View all notifications
        </Link>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

// SOLID Principle: Single Responsibility - User Dropdown Component
const UserDropdown = ({ user }) => (
  <Dropdown placement="bottom-end">
    <DropdownTrigger>
      <Avatar
        as="button"
        className="cursor-pointer ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 hover:ring-blue-600 transition-all duration-200"
        size="md"
        src={user?.profileImage || "/images/profile-default-photo.jpg"}
        alt={user?.name || "User"}
      />
    </DropdownTrigger>
    <DropdownMenu aria-label="User menu" className="w-56" variant="flat">
      <DropdownItem
        key="profile"
        className="h-14 gap-2"
        textValue="User profile"
      >
        <p className="font-semibold text-slate-900 dark:text-slate-100">
          {user?.name || "Welcome"}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {user?.email || "user@example.com"}
        </p>
      </DropdownItem>
      <DropdownItem
        key="dashboard"
        as={Link}
        to={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/student"}
        startContent={<LayoutDashboard className="w-4 h-4" />}
        textValue="Dashboard"
      >
        Dashboard
      </DropdownItem>
      <DropdownItem
        key="my-profile"
        as={Link}
        to="/profile"
        startContent={<User className="w-4 h-4" />}
        textValue="My Profile"
      >
        My Profile
      </DropdownItem>
      <DropdownItem
        key="logout"
        color="danger"
        startContent={<LogOut className="w-4 h-4" />}
        textValue="Logout"
      >
        Logout
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

// SOLID Principle: Single Responsibility - Login Button Component
const LoginButton = () => (
  <Button
    as={NavLink}
    to={PATHS.AUTH.LOGIN}
    radius="lg"
    size="md"
    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 px-8 text-base"
  >
    Login
  </Button>
);

// SOLID Principle: Single Responsibility - Dashboard Button Component
const DashboardButton = ({ userRole }) => (
  <Button
    as={NavLink}
    to={userRole === "admin" ? "/dashboard/admin" : "/dashboard/student"}
    radius="lg"
    size="md"
    startContent={<LayoutDashboard className="w-5 h-5" />}
    className="hidden md:flex bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
  >
    Dashboard
  </Button>
);

// SOLID Principle: Single Responsibility - Auth Section Component
const AuthSection = ({ isAuthenticated, user }) => {
  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <div className="flex items-center gap-3">
      <DashboardButton userRole={user?.role} />
      <NotificationBell />
      <UserDropdown user={user} />
    </div>
  );
};

// Main Navbar Component
export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isVisible = useScrollVisibility(50);

  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Use custom hook for click outside
  useClickOutside(mobileMenuRef, () => {
    if (isMobileMenuOpen && !hamburgerRef.current?.contains(event.target)) {
      setMobileMenuOpen(false);
    }
  });

  // Handle dropdown toggle for mobile menu
  const handleDropdownToggle = (name) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <nav className="sticky top-0 w-full z-[100] ">
      <div
        className={`transition-all duration-500 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto dark:bg-slate-950 rounded-none ">
          {/* Top Bar - Logo and Actions */}
          <div className="px-6 md:px-12 py-4 flex justify-between items-center">
            <CollegeLogo />

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <MobileMenuToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                ref={hamburgerRef}
              />
              <AuthSection isAuthenticated={isAuthenticated} user={user} />
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center justify-between px-6 md:px-12 pb-3 pt-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-700/50">
            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {NavigationMenuRoutes.map((link, index) =>
                !link.dropdown ? (
                  <NavLink
                    key={index}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                          : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`
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
                    <span className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm cursor-pointer text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen[link.name] ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                    <ul
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-max shadow-lg rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 transition-all duration-200 ${
                        isDropdownOpen[link.name]
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      {link.items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden absolute left-0 right-0 backdrop-blur-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 visible max-h-[70vh] overflow-y-auto"
              : "opacity-0 invisible max-h-0"
          }`}
        >
          <div className="p-4 space-y-2">
            {NavigationMenuRoutes.map((link, index) =>
              !link.dropdown ? (
                <NavLink
                  key={index}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-medium text-base transition-all ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ) : (
                <div key={index} className="space-y-1">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-base text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    onClick={() => handleDropdownToggle(link.name)}
                  >
                    {link.name}
                    {isDropdownOpen[link.name] ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div
                    className={`ml-4 space-y-1 overflow-hidden transition-all duration-200 ${
                      isDropdownOpen[link.name] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {link.items.map((item, idx) => (
                      <NavLink
                        key={idx}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg text-sm transition-all ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* Mobile Dashboard Link */}
            {isAuthenticated && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <NavLink
                  to={
                    user?.role === "admin"
                      ? "/dashboard/admin"
                      : "/dashboard/student"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-md"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Go to Dashboard
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
