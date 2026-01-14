/**
 * Coordinator Dashboard
 * Main dashboard view for placement coordinators
 */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Chip, Button, Skeleton } from '@heroui/react';
import { getFullName, getRelativeTime } from '../../../utils/helpers';
import PATHS from '../../../constants/paths';

const StatCard = ({ title, value, icon, color = 'primary', loading }) => (
  <Card className="bg-content1">
    <CardBody className="flex flex-row items-center gap-4">
      <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-default-500">{title}</p>
        {loading ? (
          <Skeleton className="h-8 w-16 rounded-lg" />
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
      </div>
    </CardBody>
  </Card>
);

const CoordinatorDashboard = () => {
  const { user, profile } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    assignedStudents: 0,
    pendingJobs: 0,
    upcomingEvents: 0,
    recentApplications: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      // TODO: Replace with actual API calls
      setTimeout(() => {
        setStats({
          assignedStudents: 245,
          pendingJobs: 8,
          upcomingEvents: 3,
          recentApplications: 42,
        });
        setRecentActivities([
          {
            id: 1,
            type: 'application',
            message: 'New application received for Software Engineer at TCS',
            time: new Date(Date.now() - 30 * 60 * 1000),
          },
          {
            id: 2,
            type: 'job',
            message: 'New job posted by Infosys awaiting approval',
            time: new Date(Date.now() - 2 * 60 * 60 * 1000),
          },
          {
            id: 3,
            type: 'event',
            message: 'PPT scheduled by Microsoft for tomorrow',
            time: new Date(Date.now() - 5 * 60 * 60 * 1000),
          },
          {
            id: 4,
            type: 'student',
            message: '3 students updated their profiles',
            time: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        ]);
        setLoading(false);
      }, 1000);
    };
    loadDashboardData();
  }, []);

  const getActivityIcon = (type) => {
    const icons = {
      application: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      job: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      event: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      student: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    };
    return icons[type] || icons.student;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Coordinator Dashboard</h1>
          <p className="text-default-500">Welcome back, {getFullName(user) || 'Coordinator'}</p>
        </div>
        <div className="flex gap-2">
          {profile?.assignedBranches?.length > 0 && (
            <Chip color="primary" variant="flat">
              {profile.assignedBranches.join(', ')}
            </Chip>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Students"
          value={stats.assignedStudents}
          color="primary"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
        />
        <StatCard
          title="Pending Jobs"
          value={stats.pendingJobs}
          color="warning"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          color="secondary"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <StatCard
          title="Recent Applications"
          value={stats.recentApplications}
          color="success"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)
              : recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-default-100"
                  >
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-default-400">{getRelativeTime(activity.time)}</p>
                    </div>
                  </div>
                ))}
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </CardHeader>
          <CardBody className="grid grid-cols-2 gap-4">
            <Button
              as={Link}
              to={PATHS.COORDINATOR.STUDENTS}
              className="h-24 flex-col gap-2"
              variant="flat"
              color="primary"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              View Students
            </Button>
            <Button
              as={Link}
              to={PATHS.COORDINATOR.JOBS}
              className="h-24 flex-col gap-2"
              variant="flat"
              color="warning"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Review Jobs
            </Button>
            <Button
              as={Link}
              to={PATHS.COORDINATOR.EVENTS}
              className="h-24 flex-col gap-2"
              variant="flat"
              color="secondary"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Schedule Event
            </Button>
            <Button
              as={Link}
              to={PATHS.STUDENT.RESOURCES}
              className="h-24 flex-col gap-2"
              variant="flat"
              color="success"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Add Resource
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
