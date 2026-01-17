/**
 * Student Dashboard
 * Main dashboard view for students
 */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Chip, Button, Skeleton } from '@heroui/react';
import { useJobs, useApplications, useEvents } from '../../../hooks';
import { getFullName, formatDate, formatPackage } from '../../../utils/helpers';
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

const StudentDashboard = () => {
  const { user, profile } = useSelector((state) => state.auth);
  const { jobs, fetchEligibleJobs, loading: jobsLoading } = useJobs();
  const { applications, fetchMyApplications, loading: applicationsLoading } = useApplications();
  const { events, fetchUpcomingEvents, loading: eventsLoading } = useEvents();

  const [stats, setStats] = useState({
    eligibleJobs: 0,
    appliedJobs: 0,
    upcomingEvents: 0,
    shortlisted: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [jobsData, appsData, eventsData] = await Promise.all([
          fetchEligibleJobs({ limit: 5 }),
          fetchMyApplications({ limit: 5 }),
          fetchUpcomingEvents(5),
        ]);

        setStats({
          eligibleJobs: jobsData?.pagination?.total || jobs.length,
          appliedJobs: appsData?.pagination?.total || applications.length,
          upcomingEvents: eventsData?.length || 0,
          shortlisted: applications.filter((a) => a.status === 'Shortlisted').length,
        });
      } catch {
        // Error handling is managed by hooks
      }
    };

    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = jobsLoading || applicationsLoading || eventsLoading;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {getFullName(user) || 'Student'}! 👋</h1>
          <p className="text-default-500">Here's what's happening with your placement journey</p>
        </div>
        <div className="flex gap-2">
          <Chip
            color={profile?.placementStatus === 'Placed' ? 'success' : 'warning'}
            variant="flat"
          >
            {profile?.placementStatus || 'Not Placed'}
          </Chip>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Eligible Jobs"
          value={stats.eligibleJobs}
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
          title="Applications"
          value={stats.appliedJobs}
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
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          color="warning"
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Latest Job Opportunities</h2>
            <Button as={Link} to={PATHS.STUDENT.JOBS} size="sm" variant="light">
              View All
            </Button>
          </CardHeader>
          <CardBody className="space-y-3">
            {jobsLoading ? (
              Array(3)
                .fill(0)
                .map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)
            ) : jobs.length > 0 ? (
              jobs.slice(0, 3).map((job) => (
                <div
                  key={job._id}
                  className="flex justify-between items-center p-3 rounded-lg bg-default-100 hover:bg-default-200 transition-colors"
                >
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-default-500">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-success">
                      {formatPackage(job.compensation?.ctc)}
                    </p>
                    <p className="text-xs text-default-400">
                      Deadline: {formatDate(job.applicationDeadline)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-default-500 py-4">No jobs available</p>
            )}
          </CardBody>
        </Card>

        {/* My Applications */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">My Applications</h2>
            <Button as={Link} to={PATHS.STUDENT.APPLICATIONS} size="sm" variant="light">
              View All
            </Button>
          </CardHeader>
          <CardBody className="space-y-3">
            {applicationsLoading ? (
              Array(3)
                .fill(0)
                .map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)
            ) : applications.length > 0 ? (
              applications.slice(0, 3).map((app) => (
                <div
                  key={app._id}
                  className="flex justify-between items-center p-3 rounded-lg bg-default-100"
                >
                  <div>
                    <p className="font-medium">{app.jobId?.title || 'Job'}</p>
                    <p className="text-sm text-default-500">Applied: {formatDate(app.appliedAt)}</p>
                  </div>
                  <Chip
                    color={APPLICATION_STATUS_COLORS[app.status] || 'default'}
                    variant="flat"
                    size="sm"
                  >
                    {app.status}
                  </Chip>
                </div>
              ))
            ) : (
              <p className="text-center text-default-500 py-4">No applications yet</p>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <Button as={Link} to={PATHS.STUDENT.EVENTS} size="sm" variant="light">
            View All
          </Button>
        </CardHeader>
        <CardBody>
          {eventsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-lg" />
                ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {events.slice(0, 3).map((event) => (
                <div
                  key={event._id}
                  className="p-4 rounded-lg bg-default-100 hover:bg-default-200 transition-colors"
                >
                  <Chip size="sm" color="primary" variant="flat" className="mb-2">
                    {event.type}
                  </Chip>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-default-500">{formatDate(event.schedule?.date)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-default-500 py-4">No upcoming events</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentDashboard;
