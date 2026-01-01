import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import PATHS from "../constants/paths";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="text-foreground bg-background dark:bg-slate-950 ">
        <div className="flex h-screen w-full overflow-hidden bg-[#fafafa] dark:bg-slate-950 font-sans">
          {/* LEFT: Aesthetic Image with Logo Overlay */}
          <div className="relative hidden w-1/2 lg:block">
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="space-y-6 text-center px-8">
                <Link to={PATHS.MAIN.HOME}>
                  <img
                    src="/images/logos/collegelogo.png"
                    alt="GEC Siwan Logo"
                    className="h-40 w-auto mx-auto drop-shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Training & Placement Cell
                  </h2>
                  <p className="text-lg text-white/90 font-medium">
                    Government Engineering College Siwan
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/images/gecsiwan.jpeg"
              alt="Campus"
              className="h-full w-full object-cover brightness-[0.6]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-slate-900/60"></div>
          </div>
          {/* RIGHT: Dynamic Content Area */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
