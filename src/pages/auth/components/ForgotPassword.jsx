import { Button, Card, CardBody, Input } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import PATHS from "../../../constants/paths";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
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
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      // if (!response.ok) throw new Error('Failed to send reset link');

      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Reset link sent to your email");
      setSubmitted(true);
    } catch (error) {
      toast.error(error.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(PATHS.AUTH.LOGIN);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="border-t-4 border-blue-500 w-full max-w-md shadow-lg rounded-2xl">
          <CardBody className="p-6 space-y-6">
            {/* Success Message */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-green-100 rounded-full p-4">
                  <svg
                    className="w-8 h-8 text-green-600"
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
              <h2 className="text-2xl font-bold">Check Your Email</h2>
              <p className="text-sm text-gray-600">
                We've sent a password reset link to <span className="font-semibold">{email}</span>
              </p>
              <p className="text-xs text-gray-500">
                Click the link in the email to reset your password. If you don't see it, check your spam folder.
              </p>
            </div>

            {/* Footer Links */}
            <div className="space-y-3 border-t pt-4">
              <Button
                color="primary"
                className="w-full font-semibold"
                onClick={() => navigate(PATHS.AUTH.LOGIN)}
              >
                Back to Login
              </Button>
              <button
                type="button"
                onClick={() => {
                  setEmail("");
                  setSubmitted(false);
                  setErrors({});
                }}
                className="w-full text-sm text-blue-500 hover:underline py-2"
              >
                Try another email
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="border-t-4 border-blue-500 w-full max-w-md shadow-lg rounded-2xl">
        <CardBody className="p-6 space-y-6">
          {/* Back Button & Header */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Forgot Password?</h2>
            <p className="text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleForgotPassword();
            }}
          >
            {/* Email Input */}
            <Input
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              className="w-full"
              disabled={loading}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold mt-6"
              isLoading={loading}
              disabled={loading}
            >
              Send Reset Link
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center border-t pt-4">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <a href={PATHS.AUTH.LOGIN} className="text-blue-500 hover:underline font-semibold">
                Login
              </a>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ForgotPassword;
