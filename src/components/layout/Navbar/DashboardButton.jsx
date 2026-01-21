import { Button } from '@heroui/react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import PATHS from '../../../constants/paths';

const getDashboardPath = (role) => {
  const roleDashboardMap = {
    student: PATHS.STUDENT.DASHBOARD,
    admin: PATHS.ADMIN.DASHBOARD,
  };
  return roleDashboardMap[role] || PATHS.DASHBOARD.ROOT;
};

const DashboardButton = ({ userRole }) => (
  <Button
    as={NavLink}
    to={getDashboardPath(userRole)}
    radius="lg"
    size="md"
    startContent={<LayoutDashboard className="w-5 h-5" />}
    className="hidden md:flex bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
  >
    Dashboard
  </Button>
);
export default DashboardButton;
