import DashboardButton from './DashboardButton';
import NotificationBell from './NotificationBell';
import UserDropdown from './UserDropdown';
import LoginButton from './LoginButton';

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
export default AuthSection;
