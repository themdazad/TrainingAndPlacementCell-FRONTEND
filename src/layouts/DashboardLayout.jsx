/**
 * Dashboard Layout with role-based sidebar navigation
 */
import { useState, useMemo } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
} from '@heroui/react';
import { selectUser, selectProfile, selectUserRole, logout } from '../store/authSlice';
import { toggleSidebar, selectSidebarOpen } from '../store/uiSlice';
import { USER_ROLES } from '../constants/api.constants';
import { getFullName, getInitials } from '../utils/helpers';
import PATHS from '../constants/paths';

// Navigation configuration by role
const navigationConfig = {
  [USER_ROLES.STUDENT]: [
    {
      label: 'Dashboard',
      path: PATHS.STUDENT.DASHBOARD,
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      label: 'Profile',
      path: PATHS.STUDENT.PROFILE,
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
  ],
  [USER_ROLES.ADMIN]: [
    {
      label: 'Dashboard',
      path: PATHS.ADMIN.DASHBOARD,
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      label: 'Announcements',
      path: PATHS.ADMIN.ANNOUNCEMENTS,
      icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
    },
    {
      label: 'User Verification',
      path: PATHS.ADMIN.USER_VERIFICATION,
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },

    {
      label: 'Students',
      path: PATHS.ADMIN.STUDENTS,
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
  ],
};

// Icon component
const Icon = ({ path, className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const role = useSelector(selectUserRole);
  const sidebarOpen = useSelector(selectSidebarOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = useMemo(() => navigationConfig[role] || [], [role]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const NavItem = ({ item, onClick }) => {
    const isActive =
      location.pathname === item.path ||
      (item.path !== navItems[0]?.path && location.pathname.startsWith(item.path));

    return (
      <NavLink
        to={item.path}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          isActive
            ? 'bg-primary text-white shadow-lg shadow-primary/30'
            : 'text-default-600 hover:bg-default-100'
        }`}
      >
        <Icon path={item.icon} />
        <span className={sidebarOpen ? 'block' : 'hidden lg:block'}>{item.label}</span>
      </NavLink>
    );
  };

  const DashboardHeader = () => {
    return (
      <header className="sticky top-0 z-30 h-16 bg-content1/80 backdrop-blur-lg border-b border-divider flex items-center justify-between px-4 lg:px-6">
        {/* Mobile menu button */}
        <Button
          isIconOnly
          variant="light"
          className="lg:hidden"
          onPress={() => setMobileMenuOpen(true)}
        >
          <Icon path="M4 6h16M4 12h16M4 18h16" />
        </Button>

        {/* Page title placeholder - can be dynamic */}
        <div className="hidden lg:block" />

        {/* Header actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Badge content="3" color="danger" size="sm">
            <Button isIconOnly variant="light" radius="full">
              <Icon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </Button>
          </Badge>

          {/* User dropdown */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" className="gap-2">
                <Avatar name={getInitials(user)} src={profile?.avatar || user?.avatar} size="sm" />
                <span className="hidden md:block max-w-[100px] truncate">{getFullName(user)}</span>
                <Icon path="M19 9l-7 7-7-7" className="w-4 h-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownItem
                key="profile"
                startContent={
                  <Icon
                    path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    className="w-4 h-4"
                  />
                }
              >
                My Profile
              </DropdownItem>
              <DropdownItem
                key="settings"
                startContent={
                  <Icon
                    path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    className="w-4 h-4"
                  />
                }
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                startContent={
                  <Icon
                    path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    className="w-4 h-4"
                  />
                }
                onPress={handleLogout}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-content1 border-r border-divider transform transition-transform duration-300 lg:transform-none ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-divider">
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src="/images/logos/collegelogo.png"
                alt="College Logo"
                className="w-10 h-10 object-contain"
              />
            </NavLink>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="lg:hidden"
              onPress={() => setMobileMenuOpen(false)}
            >
              <Icon path="M6 18L18 6M6 6l12 12" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <NavItem key={item.path} item={item} onClick={() => setMobileMenuOpen(false)} />
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-content1/80 backdrop-blur-lg border-b border-divider flex items-center justify-between px-4 lg:px-6">
          {/* Mobile menu button */}
          <Button
            isIconOnly
            variant="light"
            className="lg:hidden"
            onPress={() => setMobileMenuOpen(true)}
          >
            <Icon path="M4 6h16M4 12h16M4 18h16" />
          </Button>

          {/* Page title placeholder - can be dynamic */}
          <div className="hidden lg:block" />

          {/* Header actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Badge content="3" color="danger" size="sm">
              <Button isIconOnly variant="light" radius="full">
                <Icon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </Button>
            </Badge>

            {/* User dropdown */}
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="light" className="gap-2">
                  <Avatar
                    name={getInitials(user)}
                    src={profile?.avatar || user?.avatar}
                    size="sm"
                  />
                  <span className="hidden md:block max-w-[100px] truncate">
                    {getFullName(user)}
                  </span>
                  <Icon path="M19 9l-7 7-7-7" className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem
                  key="profile"
                  startContent={
                    <Icon
                      path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      className="w-4 h-4"
                    />
                  }
                >
                  My Profile
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={
                    <Icon
                      path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      className="w-4 h-4"
                    />
                  }
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={
                    <Icon
                      path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      className="w-4 h-4"
                    />
                  }
                  onPress={handleLogout}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
