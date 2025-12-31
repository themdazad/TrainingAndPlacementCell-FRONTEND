import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="text-foreground bg-background dark:bg-slate-950 ">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
