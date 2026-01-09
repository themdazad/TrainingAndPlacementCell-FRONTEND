import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthState, setIsChecking } from '../../store/authSlice';
import FullPageLoader from '../ui/FullPageLoader';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const AuthValidator = ({ children }) => {
  const dispatch = useDispatch();
  const { isChecking } = useSelector((state) => state.auth);

  useEffect(() => {
    const validate = async () => {
      dispatch(setIsChecking(true));
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });

        if (!data.success) {
          throw new Error('No user data found');
        }

        // Success: User data aur auth status set karein
        // profileRef contains the populated profile (Student/Admin/Coordinator/Recruiter)
        dispatch(
          setAuthState({
            user: data.user || data.result,
            profile: data.user?.profileRef || data.result?.profileRef || null,
            isAuthenticated: true,
          })
        );
      } catch {
        // Fail: User ko null karein
        dispatch(
          setAuthState({
            user: null,
            profile: null,
            isAuthenticated: false,
          })
        );
      }
    };
    validate();
  }, [dispatch]);

  // Jab tak API call chal rahi hai, tab tak Loader dikhega
  if (isChecking) return <FullPageLoader />;

  return children;
};

export default AuthValidator;
