import { Button, Card, CardBody, Input, Link } from "@heroui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
	setLoading(true);
	// login process
	try {
	  // Replace with your actual API endpoint
	  const response = await axios.post(
		`${import.meta.env.VITE_API_BASE_URL}/auth/admin/login`,
		{
		  email,
		  password,
		}
	  );

	  if (response.data.success) {
		localStorage.setItem("isAdminLoggedin",response.data.success);
		console.log(localStorage.getItem("isAdminLoggedin"))
		navigate("/dashboard/admin");
		toast.success("Logged in");   
	  } else {
		toast.error("Incorrect email or password!");
	  }
	} catch (error) {
	  // Handle errors
	  toast.error(
		`Login Failed: ${error.response?.data?.message || error.message}`
	  );
	} finally {
	  setLoading(false);
	}
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="border-t-4 border-y-blue-500 w-full max-w-md p-3 m-[5%] shadow-md rounded-3xl">
        <CardBody>
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form  className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <a href="#" color="primary" onClick={()=>{
				window.alert("Contact developer for new password.")
			  }}>
                Forgot Password?
              </a>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminLogin;
