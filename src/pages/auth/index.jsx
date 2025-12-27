import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function Auth() {
  const [tab, setTab] = useState("Login");
  return (
    <main>
      <div className=" max-w-screen-2xl m-auto min-h-[80dvh] grid tems-center">
        {/* Right Section */}
        <div className=" flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-center text-blue-500 font-semibold mb-4">
              Welcome to GEC Siwan Placement Portal
            </h2>

            {/* Tabs */}
            <div className="flex justify-center space-x-6 text-sm font-medium text-slate-500 mb-6">
              {["Login", "Sign-up"].map((value, index) => {
                return (
                  <a
                    key={value}
                    className={`cursor-pointer py-2 after:bg-blue-600 dark:after:bg-blue-400  ${
                      tab === value
                        ? "text-blue-500 dark:text-blue-400 underline underline-offset-4 after:w-full"
                        : "text-black dark:text-white after:w-0 group-hover:after:w-full"
                    } hover:opacity-80 transition-all`}
                    onClick={() => {
                      setTab(value);
                    }}
                  >
                    {value}
                  </a>
                );
              })}
            </div>

            {/* rendered components */}
            {tab === "Login" && <Login />}
            {tab === "Sign-up" && <Signup />}
          </div>
        </div>
      </div>
    </main>
  );
}
