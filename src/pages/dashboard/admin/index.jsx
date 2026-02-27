/**
 * Admin Dashboard
 * Main dashboard view for administrators
 */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Skeleton, Progress } from '@heroui/react';
import { toast } from '../../../utils/toast';
import { getFullName } from '../../../utils/helpers';
import PATHS from '../../../constants/paths';
import usersAPI from '../../../api/services/users.api';
7799022129;

const STAT_COLOR_CLASSES = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  secondary: 'bg-secondary/10 text-secondary',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
};

const StatCard = ({ title, value, subtitle, icon, color = 'primary', loading }) => (
  <Card className="bg-content1">
    <CardBody className="flex flex-row items-center gap-4">
      <div className={`p-3 rounded-xl ${STAT_COLOR_CLASSES[color] || STAT_COLOR_CLASSES.primary}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-default-500">{title}</p>
        {loading ? (
          <Skeleton className="h-8 w-16 rounded-lg" />
        ) : (
          <>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs text-default-400">{subtitle}</p>}
          </>
        )}
      </div>
    </CardBody>
  </Card>
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    placedStudents: 0,
    activeJobs: 0,
    pendingApprovals: 0,
    totalRecruiters: 0,
    upcomingEvents: 0,
    unverifiedUsers: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const response = await usersAPI.getDashboardStats();
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const placementRate =
    stats.totalStudents > 0 ? Math.round((stats.placedStudents / stats.totalStudents) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-default-500">Welcome back, {getFullName(user) || 'Admin'}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          color="primary"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                fill="none"
              />
            </svg>
          }
        />
        <StatCard
          title="Placed"
          value={stats.placedStudents}
          subtitle={`${placementRate}% rate`}
          color="success"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                fill="none"
              />
            </svg>
          }
        />
        <StatCard
          title="Active Jobs"
          value={stats.activeJobs}
          color="secondary"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                fill="none"
              />
            </svg>
          }
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          color="warning"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                fill="none"
              />
            </svg>
          }
        />
        <StatCard
          title="Recruiters"
          value={stats.totalRecruiters}
          color="primary"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                fill="none"
              />
            </svg>
          }
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          color="danger"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                fill="none"
              />
            </svg>
          }
        />
        <StatCard
          title="Unverified Users"
          value={stats.unverifiedUsers}
          color="warning"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.73 3z"
                fill="none"
              />
            </svg>
          }
        />
      </div>

      {/* Placement Progress */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Placement Progress</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-default-600">Overall Placement Rate</span>
              <span className="font-bold text-success">{placementRate}%</span>
            </div>
            <Progress
              value={placementRate}
              color="success"
              className="h-3"
              showValueLabel={false}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center p-3 bg-default-100 rounded-lg">
                <p className="text-2xl font-bold text-primary">{stats.placedStudents}</p>
                <p className="text-sm text-default-500">Placed</p>
              </div>
              <div className="text-center p-3 bg-default-100 rounded-lg">
                <p className="text-2xl font-bold text-warning">
                  {stats.totalStudents - stats.placedStudents}
                </p>
                <p className="text-sm text-default-500">Not Placed</p>
              </div>
              <div className="text-center p-3 bg-default-100 rounded-lg">
                <p className="text-2xl font-bold text-secondary">{stats.activeJobs}</p>
                <p className="text-sm text-default-500">Open Positions</p>
              </div>
              <div className="text-center p-3 bg-default-100 rounded-lg">
                <p className="text-2xl font-bold text-danger">{stats.pendingApprovals}</p>
                <p className="text-sm text-default-500">Pending Review</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Button
          as={Link}
          to={PATHS.ADMIN.PROJECTS}
          className="h-20 flex-col gap-2"
          variant="flat"
          color="secondary"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7a2 2 0 012-2h3.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0011.414 7H19a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
              fill="none"
            />
          </svg>
          Project Approvals ({stats.pendingApprovals})
        </Button>
        <Button
          as={Link}
          to={PATHS.ADMIN.USER_VERIFICATION}
          className="h-20 flex-col gap-2"
          variant="flat"
          color="warning"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              fill="none"
            />
          </svg>
          User Verification
        </Button>
        <Button
          as={Link}
          to={PATHS.ADMIN.STUDENTS}
          className="h-20 flex-col gap-2"
          variant="flat"
          color="primary"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              fill="none"
            />
          </svg>
          Manage Users
        </Button>
        <Button
          as={Link}
          to={PATHS.ADMIN.JOBS}
          className="h-20 flex-col gap-2"
          variant="flat"
          color="secondary"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              fill="none"
            />
          </svg>
          Manage Jobs
        </Button>
        <Button
          as={Link}
          to={PATHS.ADMIN.EVENTS}
          className="h-20 flex-col gap-2"
          variant="flat"
          color="warning"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              fill="none"
            />
          </svg>
          Manage Events
        </Button>
        <Button
          as={Link}
          to={PATHS.ADMIN.RESOURCES}
          className="h-20 flex-col gap-2"
          variant="flat"
          color="success"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              fill="none"
            />
          </svg>
          Manage Resources
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
