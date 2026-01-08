import { Button, Input } from '@heroui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import PATHS from '../../../constants/paths';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Validation helper
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle forgot password submission
  const handleForgotPassword = async () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`,
        { email }
      );
      console.log(response);
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Failed to send reset link');
      }
      toast.success(response.data.message || 'Reset link sent to your email');
      setSubmitted(true);
    } catch (error) {
      toast.error(error.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(PATHS.AUTH.LOGIN);
  };

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
                Check Your Email
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                We've sent a password reset link to
              </p>
              <p className="font-semibold text-slate-900 dark:text-white">{email}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Click the link in the email to reset your password. If you don't see it, check your
                spam folder.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              className="w-full bg-blue-600 text-white font-semibold h-12 rounded-lg hover:bg-blue-700 transition-colors"
              onPress={() => navigate(PATHS.AUTH.LOGIN)}
            >
              Back to Login
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setEmail('');
                  setSubmitted(false);
                  setErrors({});
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Try another email
              </button>
            </div>
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reset password</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleForgotPassword();
          }}
        >
          {/* Identifier Input */}
          <Input
            type="text"
            label="Email Address"
            variant="underlined"
            classNames={{
              label: 'text-slate-600 dark:text-slate-400 py-2 text-md font-medium',
              input: 'text-base px-0  dark:text-white',
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
            disabled={loading}
          />

          {/* Submit Button */}
          <div className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold h-12 rounded-lg hover:bg-blue-700 transition-colors"
              isLoading={loading}
              disabled={loading}
            >
              Send Reset Link
            </Button>
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Remember your password?{' '}
                <a
                  href={PATHS.AUTH.LOGIN}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="pt-16 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">© 2025 T&P Cell, GEC Siwan</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
