import { Button, Input } from '@heroui/react';
import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { authAPI } from '../../../api';
import { checkAuthStatus } from '../../../store/authSlice';
import PATHS from '../../../constants/paths';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleLogin = async (loginEmail = email, loginPassword = password) => {
    setLoading(true);
    setErrors({});
    try {
      // Use admin login API if in admin mode
      if (isAdminMode) {
        await authAPI.adminLogin({ email: loginEmail, password: loginPassword });
      } else {
        await authAPI.login({ email: loginEmail, password: loginPassword });
      }
      
      // Fetch user data after successful login
      await dispatch(checkAuthStatus());
      
      toast.success(isAdminMode ? 'Welcome Admin!' : 'Welcome back!');
      navigate(PATHS.DASHBOARD.ROOT);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Invalid credentials',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    setIsAdminMode(true);
    setEmail('');
    setPassword('');
    setErrors({});
    toast.info('Enter admin credentials to continue');
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center px-6 lg:w-1/2 bg-white dark:bg-slate-950">
      <div className="w-full max-w-[380px] space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Sign in</h1>
          <p className="text-slate-600 dark:text-slate-400">Enter your credentials to continue</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <Input
              type="text"
              label="Email Address"
              variant="underlined"
              classNames={{
                label: 'text-slate-600 dark:text-slate-400 py-2 text-md font-medium',
                input: 'text-base px-0 text-slate-900 dark:!text-white',
                inputWrapper: 'border-slate-300 dark:border-slate-700',
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              disabled={loading}
            />

            <div className="relative">
              <Input
                ref={passwordRef}
                type={isPasswordVisible ? 'text' : 'password'}
                label="Password"
                variant="underlined"
                classNames={{
                  label: 'text-slate-600 dark:text-slate-400 py-2 text-md font-medium',
                  input: 'text-base px-0 text-slate-900 dark:!text-white',
                  inputWrapper: 'border-slate-300 dark:border-slate-700',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                disabled={loading}
                endContent={
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    disabled={loading}
                  >
                    {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
            </div>
          </div>

          {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

          {isAdminMode && (
            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <span className="text-sm text-amber-700 dark:text-amber-300">🔐 Admin Login Mode</span>
              <button
                type="button"
                onClick={() => {
                  setIsAdminMode(false);
                  setEmail('');
                  setPassword('');
                  setErrors({});
                }}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              className={`w-full font-semibold h-12 rounded-lg transition-colors ${
                isAdminMode 
                  ? 'bg-amber-600 text-white hover:bg-amber-700' 
                  : 'bg-blue-600 text-white dark:bg-blue-600 hover:bg-blue-700'
              }`}
              isLoading={loading}
              disabled={loading}
            >
              {isAdminMode ? 'Login as Admin' : 'Login'}
            </Button>

            {/* Quick Admin Login - for development/demo */}
            {!isAdminMode && (
              <Button
                type="button"
                variant="bordered"
                className="w-full border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onPress={handleAdminLogin}
                disabled={loading}
              >
                🔐 Login as Admin
              </Button>
            )}

            <div className="flex items-center justify-between px-1">
              <Link
                to={PATHS.AUTH.SIGNUP}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Create a new account
              </Link>
              <Link
                to={PATHS.AUTH.FORGOT_PASSWORD}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </form>

        <div className="pt-16 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">© 2025 T&P Cell, GEC Siwan</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
