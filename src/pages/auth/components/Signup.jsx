import { Button, Card, CardBody, Input } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const Signup = () => {
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify + Password
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation helper
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateRegNo = (registrationNumber) => {
    return registrationNumber.trim().length > 0;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Step 1: Send OTP to email
  const handleSendOtp = async () => {
    const newErrors = {};

    if (!validateRegNo(registrationNumber)) {
      newErrors.registrationNumber = "Registration No is required";
    }
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
      // const response = await fetch('/api/auth/send-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ registrationNumber, email })
      // });
      // if (!response.ok) throw new Error('Failed to send OTP');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    const newErrors = {};

    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ registrationNumber, email, otp, password })
      // });
      // if (!response.ok) throw new Error('Signup failed');
      // const data = await response.json();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Account created successfully!");
      // TODO: Redirect to login or dashboard
      // navigate('/login') or similar
    } catch (error) {
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setOtp("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  return (
    <Card className="border-t-4 border-blue-500 w-full max-w-md shadow-lg rounded-2xl">
      <CardBody className="p-6 space-y-6">
        {/* Back Button & Step Indicator */}
        <div className="flex items-center justify-between">
          {step === 2 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
          <h2 className="text-2xl font-bold text-center flex-1">
            {step === 1 ? "Sign Up" : "Verify & Set Password"}
          </h2>
          {step === 2 && <div className="w-20" />}
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2">
          <div
            className={`flex-1 h-1 rounded-full ${
              step >= 1 ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
          <div
            className={`flex-1 h-1 rounded-full ${
              step >= 2 ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            step === 1 ? handleSendOtp() : handleSignup();
          }}
        >
          {/* Step 1: Registration & Email */}
          {step === 1 && (
            <>
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
              <Input
                type="text"
                label="Registration Number"
                placeholder=" e.g. 22103151000"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                isInvalid={!!errors.registrationNumber}
                errorMessage={errors.registrationNumber}
                className="w-full"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                We&apos;ll send an OTP to your email for verification.
              </p>
            </>
          )}

          {/* Step 2: OTP & Password */}
          {step === 2 && (
            <>
              <Input
                type="text"
                label="One-Time Password (OTP)"
                placeholder="Enter the 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                isInvalid={!!errors.otp}
                errorMessage={errors.otp}
                className="w-full"
                disabled={loading}
              />
              <Input
                type="password"
                label="Password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                className="w-full"
                disabled={loading}
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                className="w-full"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                Password must be at least 6 characters long.
              </p>
            </>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            className="w-full mt-6 font-semibold"
            isLoading={loading}
            disabled={loading}
          >
            {step === 1 ? "Send OTP" : "Complete Sign Up"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default Signup;
