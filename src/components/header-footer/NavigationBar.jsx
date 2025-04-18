// eslint-disable-next-line no-unused-vars
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
import { Users,UserRound, UsersRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import ThemeSwitch from "../ui/ThemeSwitch";
import AuthContext from "../../contexts/auth/AuthContext";

const student = {
  name: "",
  role: "",
  registrationNo: "",
}; // This is a dummy variable, you can replace it with your authentication logic

export default function NavigationBar() {
  const [isLogedIn, setIsLogedIn] = useState(useContext(AuthContext))
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {admin, student} = isLogedIn;

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

  return (
    <Navbar isMenuOpen={isMenuOpen} shouldHideOnScroll>
      <NavbarContent>
        <NavbarBrand>
          <NavLink to="/" className="font-bold text-inherit">
            T&P Cell
          </NavLink>
        </NavbarBrand>
        <NavbarMenuToggle className="sm:hidden" onPress={toggleMenu} /> 
      </NavbarContent>

      {/* Menu Items for Desktop */}
      <NavbarContent className="hidden space-x-2 sm:flex" justify="center">
        {renderNavItems()}
        {!admin && !student ? (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button radius="lg" variant="bordered">
                  Login
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="flex "
                aria-label="Dropdown menu with icons"
                variant="faded"
              >
                <DropdownItem
                  as={NavLink}
                  to="/auth/admin/register"
                  key="admin"
                  startContent={<UserRound />}
                >
                  Admin
                </DropdownItem>
                <DropdownItem
                  as={NavLink}
                  to="/auth/student/login"
                  className="flex justify-center"
                  key="student"
                  startContent={<UsersRound />}
                >
                  Students
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : null}

        {/* for admin dashboard  */}
        {admin ? (
          <Tooltip content="Go To Dashboard" color="primary" closeDelay="100" showArrow={true}>
            <User
              as={NavLink}
              to="/dashboard/admin"
              avatarProps={{
                src: "https://png.pngtree.com/png-clipart/20221219/original/pngtree-profile-locked-securely-cion-png-image_8781108.png",
              }}
              description={student.registrationNo}
              name={student.name}
            />
          </Tooltip>
        ) : null}
        {/* for student dashboard */}
        {student ? (
          <Tooltip content="Go To Dashboard" color="primary" closeDelay="100" showArrow={true}>
            <User
              as={NavLink}
              to="/dashboard/student"
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/81636077?v=4",
              }}
              description={student.registrationNo}
              name={student.name}
            />
          </Tooltip>
        ) : null}



      </NavbarContent>
      {/* Menu Items for Mobile */}
      <NavbarMenu className="items-center bg-transparent space-y-4 text-xl justify-center md:hidden sm:flex">
        {renderNavItems(true)}
        <Dropdown>
          <DropdownTrigger>
            <Button radius="lg" variant="bordered">
              Signup
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            className="flex "
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
              className="flex justify-center"
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
