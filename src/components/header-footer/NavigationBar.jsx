import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Tooltip,  
} from "@heroui/react";
import { UsersRound,MapPinned, UserRound, Briefcase, FileText, Mail } from "lucide-react";
import { Image } from "@heroui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext"; // Adjust path as needed
import ThemeSwitch from "../ui/ThemeSwitch";
import axios from 'axios'

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Access auth context
  const {isLogedIn, setIsLogedIn } = useAuth();

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setIsLogedIn({ admin: false, student: false }); // Reset state
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const navItems = [
    { title: "Home", navigate: "/" },
    { title: "Programs", navigate: "programs" },
    { title: "Placements", navigate: "placements" },
    { title: "Gallery", navigate: "gallery" },
    { title: "Careers", navigate: "careers" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderNavItems = (isMobile = false) =>
    navItems.map((item, index) => (
      <NavbarItem key={index}>
        <NavLink
          to={item.navigate}
          onClick={isMobile ? toggleMenu : undefined}
          className={isMobile ? "text-2xl" : ""}
          color="foreground"
        >
          {item.title}
        </NavLink>
      </NavbarItem>
    ));

  const renderUserSection = () => {
    if (isLogedIn.admin) {
      return (
        <>
          <Tooltip
            content="Go To Dashboard"
            color="primary"
            closeDelay="100"
            showArrow={true}
          >
            <User
              as={NavLink}
              to="/dashboard/admin"
              avatarProps={{
                src: "https://png.pngtree.com/png-clipart/20221219/original/pngtree-profile-locked-securely-cion-png-image_8781108.png",
              }}
              description="Admin User"
              name="Admin"
            />
          </Tooltip>
          <Button
            radius="lg"
            color="danger"
            variant="bordered"
            onPress={handleLogout}
          >
            Logout
          </Button>
        </>
      );
    }

    if (isLogedIn.student) {
      return (
        <>
          <Tooltip
            content="Go To Dashboard"
            color="primary"
            closeDelay="100"
            showArrow={true}
          >
            <User
              as={NavLink}
              to="/dashboard/student"
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/81636077?v=4",
              }}
              description="Student User"
              name="Student"
            />
          </Tooltip>
          <Button
            radius="lg"
            color="danger"
            variant="bordered"
            onPress={handleLogout}
          >
            Logout
          </Button>
        </>
      );
    }

    return (
      <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Button radius="lg" variant="bordered">
              Login
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            className="flex"
            aria-label="Dropdown menu with icons"
            variant="faded"
          >
            <DropdownItem
              onPress={() => navigate("/auth/admin/login")}
              key="admin"
              startContent={<UserRound />}
            >
              Admin
            </DropdownItem>
            <DropdownItem
              onPress={() => navigate("/auth/student/login")}
              key="student"
              startContent={<UsersRound />}
            >
              Students
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    );
  };

  const renderRecruiterDropdown = () => (
    <NavbarItem>
      <Dropdown>
        <DropdownTrigger>
          <Button radius="lg" variant="bordered">
            For Recruiter
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="flex"
          aria-label="Dropdown menu for recruiters"
          variant="faded"
        >
          <DropdownItem
            as={NavLink}
            to="/reach-siwan"
            key="reach-siwan"
            startContent={<MapPinned/>}
          >
            Reach Siwan
          </DropdownItem>
          
          <DropdownItem
            as={NavLink}
            to="/contact"
            key="contact"
            startContent={<Mail />}
          >
            Contact Us
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarItem>
  );

  return (
    <Navbar className="py-2" isMenuOpen={isMenuOpen} shouldHideOnScroll>
      <NavbarContent>
        <NavbarBrand>
          <NavLink to="/" className="font-bold py-2 text-inherit">
            <Image className="dark:brightness-200" src="/images/gecsiwan-logo.png" height={60} width={60} />
          </NavLink>
        </NavbarBrand>
        <NavbarMenuToggle className="sm:hidden" onPress={toggleMenu} />
      </NavbarContent>

      {/* Menu Items for Desktop */}
      <NavbarContent className="hidden space-x-2 sm:flex" justify="center">
        {renderNavItems()}
        {renderRecruiterDropdown()}
        {renderUserSection()}
      </NavbarContent>

      {/* Menu Items for Mobile */}
      <NavbarMenu className="items-center bg-transparent space-y-4 text-xl justify-center md:hidden sm:flex">
        {renderNavItems(true)}
        {renderRecruiterDropdown()}
        <Dropdown>
          <DropdownTrigger>
            <Button radius="lg" variant="bordered">
              Signup
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            className="flex"
            aria-label="Dropdown menu with icons"
            variant="faded"
          >
            <DropdownItem
              as={NavLink}
              to="/auth/admin/register"
              key="admin"
              startContent={<UserRound />}
              onPress={toggleMenu}
            >
              Admin
            </DropdownItem>
            <DropdownItem
              as={NavLink}
              to="/auth/student/register"
              key="student"
              startContent={<UsersRound />}
              onPress={toggleMenu}
            >
              Students
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarMenu>

    </Navbar>
  );
}
