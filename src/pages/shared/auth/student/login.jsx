import GECSIWAN_LOGO from "../../../../assets/images/logos/gecsiwan-logo.png";
import GECSIWAN_LOGO_LIGHT from "../../../../assets/images/logos/gecsiwan-logo-light.png";
import { Image } from "@heroui/react";
import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../../../hooks/contexts/auth/AuthContext";

const StudentLogin = () => {
  const { setIsLogedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Start loading
    setLoading(true);

    // Validate inputs
    if (!regNo || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Send login request
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/student/login`,
        { regNo, password },
        {
          withCredentials: true,
        }
      );

      // Handle successful login
      if (res.status === 200) {
        // Token automatically save in Cookies by backend
        toast.success("Logged in successfully");
        setIsLogedIn({ admin: false, student: true }); // Update context state
        setTimeout(() => {
          navigate("/dashboard/student"); // Redirect to dashboard
        }, 1000);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Login Failed: ${errorMessage}`);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <main className="min-h-max grid grid-cols-1 md:grid-cols-2 ">
      {/* Left Section */}
      <div className="py-[180px] hidden md:flex flex-col justify-center items-center bg-sky-100 dark:bg-zinc-900">
        <Image
          src={GECSIWAN_LOGO}
          alt="GEC Siwan Logo "
          className="my-6 dark:hidden"
          height={240}
          width={240}
        />
        <Image
          src={GECSIWAN_LOGO_LIGHT}
          alt="GEC Siwan Logo"
          className="my-6 hidden dark:block"
          height={240}
          width={240}
        />
        <div className="text-sm font-semibold mb-4">
          Training and Placement Cell
        </div>

        <p className="text-sm font-semibold">Instructions</p>
        <p className="text-sm text-center">
          Login using your institute registration number.
        </p>
      </div>

      {/* Right Section: Form */}
      <div className="flex items-center justify-center">
        
        <Card className="border-t-4 border-y-blue-500 w-full max-w-md p-3 m-[5%] shadow-md rounded-3xl">
          <CardBody>
            <h2 className="text-2xl font-bold text-center mb-6">
              Student Login
            </h2>
            <div>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <Input
                  type="text"
                  label="Registration No"
                  placeholder="Enter your registration number"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="w-full"
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
                <Button
                  type="submit"
                  color="primary"
                  className="w-full mt-4"
                  isLoading={loading}
                >
                  Login
                </Button>
              </form>

              <div className="text-center mt-4">
                <Link href="/auth/student/forgot-password" color="primary">
                  Forgot Password?
                </Link>
              </div>
              <div className="text-center mt-2">
                <span className="text-zinc-600">Not registered?</span>{" "}
                <NavLink to="/auth/student/register" className="text-primary">
                  Sign Up
                </NavLink>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

export default StudentLogin;
