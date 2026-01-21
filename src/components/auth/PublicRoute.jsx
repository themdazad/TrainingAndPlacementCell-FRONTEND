/**
 * PublicRoute Component
 * Redirects authenticated users away from public routes (login, signup)
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PATHS from '../../constants/paths';
import FullPageLoader from '../ui/FullPageLoader';

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isChecking, user } = useSelector((state) => state.auth);

  // Still checking auth status
  if (isChecking) {
    return <FullPageLoader />;
  }

  // If authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    // Check if there's a redirect location stored
    const from = location.state?.from?.pathname;

    if (from) {
      return <Navigate to={from} replace />;
    }

    // Otherwise, redirect to role-based dashboard
    const roleDashboardMap = {
      student: PATHS.STUDENT.DASHBOARD,
      admin: PATHS.ADMIN.DASHBOARD,
    };

    const dashboard = roleDashboardMap[user.role] || PATHS.DASHBOARD.ROOT;
    return <Navigate to={dashboard} replace />;
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
