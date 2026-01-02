import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthState } from '../../store/authSlice';
import FullPageLoader from '../ui/FullPageLoader';
import axios from 'axios';

const AuthValidator = ({ children }) => {
  const dispatch = useDispatch();
  const { isChecking } = useSelector((state) => state.auth);

  useEffect(() => {
    const validate = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });
        if (!data.user) {
          throw new Error('No user data found');
        }
        // Success: User data aur auth status set karein
        dispatch(setAuthState({ user: data.user, isAuthenticated: true }));
      } catch (err) {
        // Fail: User ko null karein
        dispatch(setAuthState({ user: null, isAuthenticated: false }));
      }
    };
    validate();
  }, [dispatch]);

  // Jab tak API call chal rahi hai, tab tak Loader dikhega
  if (isChecking) return <FullPageLoader />;

  return children;
};

export default AuthValidator;
