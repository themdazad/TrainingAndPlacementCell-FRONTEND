import { Button, Input } from '@heroui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from '../../../utils/toast';
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react';
import PATHS from '../../../constants/paths';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Validation helper
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Handle reset password submission
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password/${resetToken}`,
        { newPassword }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || 'Failed to reset password');
      }

      toast.success(response.data.message || 'Password reset successfully');
      setSubmitted(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to reset password';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(PATHS.AUTH.LOGIN);
  };

  // Success state after password reset
  if (submitted) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center px-6 lg:w-1/2 bg-white dark:bg-slate-950">
        <div className="w-full max-w-[380px] space-y-12">
          {/* Success Message */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-4">
                <svg
                  className="w-12 h-12 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Password Reset Successful
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Your password has been reset successfully. You can now login with your new password.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-4">
            <Button
              className="w-full bg-blue-600 text-white font-semibold h-12 rounded-lg hover:bg-blue-700 transition-colors"
              onPress={() => navigate(PATHS.AUTH.LOGIN)}
            >
              Go to Login
            </Button>
          </div>

          {/* Footer */}
          <div className="pt-16 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">© 2025 T&P Cell, GEC Siwan</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center px-6 lg:w-1/2 bg-white dark:bg-slate-950">
      <div className="w-full max-w-[380px] space-y-12">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reset Password</h1>
          <p className="text-slate-600 dark:text-slate-400">Enter your new password below</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-6">
          {/* New Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              label="New Password"
              placeholder="Enter new password"
              variant="underlined"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
              }}
              startContent={<Lock className="text-slate-400 mr-2" size={18} />}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              isInvalid={!!errors.newPassword}
              errorMessage={errors.newPassword}
              classNames={{
                label: 'text-slate-600 dark:text-slate-400 py-2 text-md font-medium',
                input: 'text-base px-2 text-slate-900 dark:!text-white',
                inputWrapper: 'border-slate-300 dark:border-slate-700',
              }}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              placeholder="Confirm new password"
              variant="underlined"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
              }}
              startContent={<Lock className="text-slate-400 mr-2" size={18} />}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              classNames={{
                label: 'text-slate-600 dark:text-slate-400 py-2 text-md font-medium',
                input: 'text-base px-2 text-slate-900 dark:!text-white',
                inputWrapper: 'border-slate-300 dark:border-slate-700',
              }}
            />
          </div>

          {/* Password Requirements */}
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <p>Password must:</p>
            <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
              <li className={newPassword.length >= 8 ? 'text-green-600 dark:text-green-400' : ''}>
                Be at least 8 characters long
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-blue-600 text-white font-semibold h-12 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </form>

        {/* Footer */}
        <div className="pt-16 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">© 2025 T&P Cell, GEC Siwan</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
