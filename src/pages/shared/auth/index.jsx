import { useState } from "react";
import GECSIWAN_LOGO from "../../../assets/images/logos/gecsiwan-logo.png";
import { Image } from "@heroui/react";
import StudentLogin from "../../../components/auth/StudentLogin";
import CoordinatorLogin from "../../../components/auth/CoordinatorLogin";
import AdminLogin from "../../../components/auth/AdminLogin";

export default function Auth() {
  const [tab, setTab] = useState("Student");
  return (
    <main>
      <div className="max-w-screen-2xl m-auto min-h-[900px] grid md:grid-cols-2 ">
        {/* Left Section */}
        <div className="max-sm:hidden flex flex-col justify-center items-center px-10 ">
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
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-center text-blue-500 font-semibold mb-4">
              Sign-in to GEC Siwan Placement Portal
            </h2>

            {/* Tabs */}
            <div className="flex justify-center space-x-6 text-sm font-medium text-zinc-500 mb-6">
              {["Student", "Coordinator", "Admin"].map((value, index) => {
                return (
                  <span
                    key={value}
                    className={`cursor-pointer after:bg-blue-600 dark:after:bg-blue-400  ${
                      tab === value
                        ? "text-blue-500 dark:text-blue-400 underline underline-offset-4 after:w-full"
                        : "text-black dark:text-white after:w-0 group-hover:after:w-full"
                    } hover:opacity-80 transition-all`}
                    onClick={() => {
                      setTab(value);
                    }}
                  >
                    {value}
                  </span>
                );
              })}
            </div>

            {/* rendered components */}
            {tab === "Student" && <StudentLogin />}
            {tab === "Recruiter" && "Recruiter"}
            {tab === "Coordinator" && <CoordinatorLogin/>}
            {tab === "Admin" && <AdminLogin />}
          </div>
        </div>
      </div>
    </main>
  );
}
