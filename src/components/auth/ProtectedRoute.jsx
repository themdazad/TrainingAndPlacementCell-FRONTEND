/**
 * ProtectedRoute Component
 * Guards routes based on authentication and roles
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PATHS from '../../constants/paths';
import FullPageLoader from '../ui/FullPageLoader';

const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = PATHS.AUTH.LOGIN }) => {
  const location = useLocation();
  const { isAuthenticated, isChecking, user } = useSelector((state) => state.auth);

  // Still checking auth status
  if (isChecking) {
    return <FullPageLoader />;
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles.length > 0 && user) {
    const hasAllowedRole = allowedRoles.includes(user.role);
    if (!hasAllowedRole) {
      // Redirect to appropriate dashboard based on user role
      const roleDashboardMap = {
        student: PATHS.STUDENT.DASHBOARD,
        admin: PATHS.ADMIN.DASHBOARD,
      };
      const defaultDashboard = roleDashboardMap[user.role] || PATHS.MAIN.HOME;
      return <Navigate to={defaultDashboard} replace />;
    }
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
