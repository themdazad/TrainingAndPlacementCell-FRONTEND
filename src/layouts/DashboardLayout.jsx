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
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
      label: 'Jobs', 
      path: PATHS.STUDENT.JOBS, 
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
    },
    { 
      label: 'Applications', 
      path: PATHS.STUDENT.APPLICATIONS, 
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' 
    },
    { 
      label: 'Events', 
      path: PATHS.STUDENT.EVENTS, 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
    },
    { 
      label: 'Resources', 
      path: PATHS.STUDENT.RESOURCES, 
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' 
    },
    { 
      label: 'Profile', 
      path: PATHS.STUDENT.PROFILE, 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' 
    },
  ],
  [USER_ROLES.ADMIN]: [
    { 
      label: 'Dashboard', 
      path: PATHS.ADMIN.DASHBOARD, 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
      label: 'User Verification', 
      path: PATHS.ADMIN.USER_VERIFICATION, 
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' 
    },
    { 
      label: 'Jobs', 
      path: PATHS.ADMIN.JOBS, 
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
    },
    { 
      label: 'Students', 
      path: PATHS.ADMIN.STUDENTS, 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' 
    },
    { 
      label: 'Coordinators', 
      path: PATHS.ADMIN.COORDINATORS, 
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' 
    },
    { 
      label: 'Recruiters', 
      path: PATHS.ADMIN.RECRUITERS, 
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' 
    },
    { 
      label: 'Events', 
      path: PATHS.ADMIN.EVENTS, 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
    },
    { 
      label: 'Resources', 
      path: PATHS.ADMIN.RESOURCES, 
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' 
    },
    { 
      label: 'Announcements', 
      path: PATHS.ADMIN.ANNOUNCEMENTS, 
      icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' 
    },
    { 
      label: 'Analytics', 
      path: PATHS.ADMIN.ANALYTICS, 
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' 
    },
  ],
  [USER_ROLES.COORDINATOR]: [
    { 
      label: 'Dashboard', 
      path: PATHS.COORDINATOR.DASHBOARD, 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
      label: 'Jobs', 
      path: PATHS.COORDINATOR.JOBS, 
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
    },
    { 
      label: 'Applications', 
      path: PATHS.COORDINATOR.APPLICATIONS, 
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' 
    },
    { 
      label: 'Students', 
      path: PATHS.COORDINATOR.STUDENTS, 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' 
    },
    { 
      label: 'Events', 
      path: PATHS.COORDINATOR.EVENTS, 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
    },
  ],
  [USER_ROLES.RECRUITER]: [
    { 
      label: 'Dashboard', 
      path: PATHS.RECRUITER.DASHBOARD, 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
      label: 'Post Job', 
      path: PATHS.RECRUITER.JOBS_CREATE, 
      icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' 
    },
    { 
      label: 'My Jobs', 
      path: PATHS.RECRUITER.JOBS, 
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
    },
    { 
      label: 'Applications', 
      path: PATHS.RECRUITER.APPLICATIONS, 
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' 
    },
    { 
      label: 'Events', 
      path: PATHS.RECRUITER.EVENTS, 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
    },
    { 
      label: 'Company Profile', 
      path: PATHS.RECRUITER.PROFILE, 
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' 
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
    const isActive = location.pathname === item.path || 
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
              <NavItem 
                key={item.path} 
                item={item} 
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-divider">
            <div className="flex items-center gap-3">
              <Avatar
                name={getInitials(user)}
                src={profile?.avatar || user?.avatar}
                size="sm"
                className="flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {getFullName(user)}
                </p>
                <p className="text-xs text-default-400 capitalize">
                  {role?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
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
                  startContent={<Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" className="w-4 h-4" />}
                >
                  My Profile
                </DropdownItem>
                <DropdownItem 
                  key="settings"
                  startContent={<Icon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" className="w-4 h-4" />}
                >
                  Settings
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  color="danger"
                  startContent={<Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" className="w-4 h-4" />}
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
