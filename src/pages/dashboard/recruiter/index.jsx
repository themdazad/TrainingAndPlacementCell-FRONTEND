/**
 * Recruiter Dashboard
 * Main dashboard view for recruiters
 */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Chip, Button, Skeleton, Progress } from '@heroui/react';
import { getFullName } from '../../../utils/helpers';
import { APPLICATION_STATUS_COLORS } from '../../../constants/api.constants';
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

const RecruiterDashboard = () => {
  const { user, profile } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
    offered: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      // TODO: Replace with actual API calls
      setTimeout(() => {
        setStats({
          activeJobs: 5,
          totalApplications: 128,
          shortlisted: 24,
          offered: 8,
        });
        setRecentApplications([
          {
            id: 1,
            studentName: 'Rahul Sharma',
            jobTitle: 'Software Engineer',
            status: 'Under Review',
            appliedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          },
          {
            id: 2,
            studentName: 'Priya Patel',
            jobTitle: 'Data Analyst',
            status: 'Shortlisted',
            appliedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
          },
          {
            id: 3,
            studentName: 'Amit Kumar',
            jobTitle: 'Software Engineer',
            status: 'Interview Scheduled',
            appliedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        ]);
        setLoading(false);
      }, 1000);
    };
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
          <p className="text-default-500">Welcome, {getFullName(user) || 'Recruiter'}</p>
        </div>
        <div className="flex gap-2 items-center">
          {profile?.company?.name && (
            <Chip color="primary" variant="flat" size="lg">
              {profile.company.name}
            </Chip>
          )}
          {profile?.isCompanyVerified ? (
            <Chip
              color="success"
              variant="flat"
              startContent={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            >
              Verified
            </Chip>
          ) : (
            <Chip color="warning" variant="flat">
              Verification Pending
            </Chip>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Jobs"
          value={stats.activeJobs}
          color="primary"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          color="secondary"
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
        <StatCard
          title="Shortlisted"
          value={stats.shortlisted}
          color="warning"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          }
        />
        <StatCard
          title="Offers Extended"
          value={stats.offered}
          color="success"
          loading={loading}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </div>

      {/* Hiring Pipeline */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Hiring Pipeline</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {[
              { label: 'Pending Review', count: 45, color: 'default' },
              { label: 'Under Review', count: 32, color: 'primary' },
              { label: 'Shortlisted', count: 24, color: 'warning' },
              { label: 'Interview Scheduled', count: 12, color: 'secondary' },
              { label: 'Offered', count: 8, color: 'success' },
            ].map((stage) => (
              <div key={stage.label} className="flex items-center gap-4">
                <div className="w-40 text-sm text-default-600">{stage.label}</div>
                <div className="flex-1">
                  <Progress
                    value={(stage.count / stats.totalApplications) * 100}
                    color={stage.color}
                    className="h-2"
                  />
                </div>
                <div className="w-12 text-right font-medium">{stage.count}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Applications</h2>
            <Button as={Link} to={PATHS.RECRUITER.APPLICATIONS} size="sm" variant="light">
              View All
            </Button>
          </CardHeader>
          <CardBody className="space-y-3">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)
              : recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-default-100"
                  >
                    <div>
                      <p className="font-medium">{app.studentName}</p>
                      <p className="text-sm text-default-500">Applied for {app.jobTitle}</p>
                    </div>
                    <Chip
                      color={APPLICATION_STATUS_COLORS[app.status] || 'default'}
                      variant="flat"
                      size="sm"
                    >
                      {app.status}
                    </Chip>
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
              to={PATHS.RECRUITER.JOBS_CREATE}
              className="h-24 flex-col gap-2"
              color="primary"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Post New Job
            </Button>
            <Button
              as={Link}
              to={PATHS.RECRUITER.JOBS}
              className="h-24 flex-col gap-2"
              variant="flat"
              color="secondary"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              My Jobs
            </Button>
            <Button
              as={Link}
              to={PATHS.RECRUITER.APPLICATIONS}
              className="h-24 flex-col gap-2"
              variant="flat"
              color="warning"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Applications
            </Button>
            <Button
              as={Link}
              to={PATHS.RECRUITER.EVENTS}
              className="h-24 flex-col gap-2"
              variant="flat"
              color="success"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Schedule PPT
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
