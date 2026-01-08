import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="text-foreground bg-background dark:bg-slate-950 ">
        <div className="temp-div">
          <p> Temp user dashboard!</p>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
