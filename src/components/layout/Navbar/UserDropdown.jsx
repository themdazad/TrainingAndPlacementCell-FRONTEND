import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@heroui/react';
import { LayoutDashboard, User, LogOut } from 'lucide-react';
import { logoutUser } from '../../../store/authSlice';

const UserDropdown = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="cursor-pointer ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 hover:ring-blue-600 transition-all duration-200"
          size="md"
          src={user?.profileImage || '/images/profile-default-photo.jpg'}
          alt={user?.name || 'User'}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu" className="w-56" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" textValue="User profile">
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {user?.name || 'Welcome'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {user?.email || 'user@example.com'}
          </p>
        </DropdownItem>
        <DropdownItem
          key="dashboard"
          as={Link}
          to={user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/student'}
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
          onPress={handleLogout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
