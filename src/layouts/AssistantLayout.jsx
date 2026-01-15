/**
 * AssistantLayout.jsx
 * Layout component for the AI Assistant section of the application.
 * This layout includes a header, footer, and main content area where
 * the AI Assistant related pages will be rendered.
 */

import { Outlet } from 'react-router-dom';
// import {DashboardHeader} from '../layouts/DashboardLayout';
const AssistantLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <DashboardHeader /> */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};
export default AssistantLayout;
