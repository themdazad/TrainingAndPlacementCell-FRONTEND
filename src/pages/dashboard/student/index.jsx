/**
 * Student Dashboard
 * Main dashboard view for students
 */

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
          <p className="text-default-500">Here's what's happening with your placement journey</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
