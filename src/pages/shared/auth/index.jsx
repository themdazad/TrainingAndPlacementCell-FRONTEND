import { useState } from "react";
import GECSIWAN_LOGO from "../../../assets/images/logos/gecsiwan-logo.png";
import { Image } from "@heroui/react";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-[700px] flex bg-blue-100 ">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10 ">
        <Image
          src={GECSIWAN_LOGO}
          alt="GEC Siwan Logo"
          className="my-6"
          height={240}
          width={240}
        />
        <div className="text-sm font-semibold mb-4">GEC Siwan Placements</div>
        <h1 className="text-3xl font-bold leading-tight mb-6">
          One stop portal for students & companies for placements.
        </h1>
        <p className="text-sm font-semibold">Instructions</p>
        <p className="text-sm text-center">
          Login using your LinkedIn account or email address and password.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-center text-blue-500 font-semibold mb-4">
            Sign-in to IIT Bombay Placement Portal
          </h2>

          {/* Tabs */}
          <div className="flex justify-center space-x-6 text-sm font-medium text-zinc-500 mb-6">
            <span className="hover:text-blue-500 cursor-pointer">Student</span>
            <span className="text-blue-700 border-b-2 border-blue-700">
              Recruiter
            </span>
            <span className="hover:text-blue-500 cursor-pointer">
              Coordinator
            </span>
            <span className="hover:text-blue-500 cursor-pointer">Verifier</span>
          </div>

          {/* LinkedIn Button */}
          <button className="flex items-center justify-center w-full bg-blue-700 text-white py-2 rounded-md shadow mb-4">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v12h-4V8zm7.5 0h3.6v1.71h.05c.5-.94 1.73-1.92 3.55-1.92 3.8 0 4.5 2.47 4.5 5.68V20h-4v-5.59c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.94V20h-4V8z" />
            </svg>
            Sign in with LinkedIn
          </button>

          <div className="text-center text-sm text-zinc-500 mb-4">or</div>

          {/* Email/Password Fields */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-zinc-400 py-2 focus:outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border-b border-zinc-400 py-2 focus:outline-none"
              />
              <span
                className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-zinc-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </span>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* reCAPTCHA placeholder */}
            <div className="border p-4 flex items-center space-x-2">
              <input type="checkbox" id="captcha" />
              <label htmlFor="captcha" className="text-sm">
                I'm not a robot
              </label>
              <div className="ml-auto text-xs text-zinc-400">reCAPTCHA</div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-zinc-300 text-white py-2 rounded-md cursor-not-allowed"
              disabled
            >
              Sign In
            </button>

            {/* Register */}
            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Register now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
