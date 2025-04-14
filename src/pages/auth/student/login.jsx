import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // login process
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/student/login`,
        {
          registrationNo,
          password,
        }
      );

      if (response.status) {
        // saving response data to localStorage 
        localStorage.setItem("isStudentLoggedin",JSON.stringify(response.data) );
              
        toast.success("Logged in");
        navigate("/dashboard/student");
      } else {
        toast.error("Incorrect Registration No or Password!");
      }
    } catch (error) {
      // Handle errors
      toast.error(
        `Login Failed: ${
          error.response?.data?.message || error.message || "An error occurred"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

 /*  // useEffect to check if user is already logged in
  useEffect(() => {
    const isStudentLoggedin = JSON.parse(
      localStorage.getItem("isStudentLoggedin")
    );
    if (isStudentLoggedin) {
      navigate("/dashboard/student");
    }
  }, [navigate]); // Empty dependency array, so this runs only once when component mounts
 */
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">Student Login</h2>
          <div className="space-y-4">
            <Input
              type="registrationNo"
              label="Registration No"
              placeholder="Enter your registration No"
              value={registrationNo}
              onChange={(e) => setRegistrationNo(e.target.value)}
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
              color="primary"
              className="w-full mt-4"
              isLoading={loading}
              onPress={handleLogin}
            >
              Login
            </Button>
            <div className="text-center mt-4">
              <Link href="/forgot-password" color="primary">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-600">Not registered?</span>{" "}
              <NavLink to="/auth/student/register" className="text-primary">
                Sign Up
              </NavLink>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentLogin;
