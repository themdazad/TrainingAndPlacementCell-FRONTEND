/**
 * Student Jobs Page
 * Browse and apply for eligible jobs
 */
import { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Button,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Pagination,
} from '@heroui/react';
import { useJobs, useApplications } from '../../../../hooks';
import {
  formatDate,
  formatPackage,
  isDeadlinePassed,
  truncateText,
} from '../../../../utils/helpers';
import { JOB_TYPES } from '../../../../constants/api.constants';

const JobCard = ({ job, onApply, applying }) => {
  const deadlinePassed = isDeadlinePassed(job.applicationDeadline);

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <p className="text-default-500">{job.company}</p>
        </div>
        <Chip color="primary" variant="flat" size="sm">
          {job.type}
        </Chip>
      </CardHeader>
      <CardBody className="space-y-3">
        <p className="text-sm text-default-600">{truncateText(job.description, 120)}</p>
        <div className="flex flex-wrap gap-2">
          {job.skillsRequired?.slice(0, 4).map((skill) => (
            <Chip key={skill} size="sm" variant="bordered">
              {skill}
            </Chip>
          ))}
          {job.skillsRequired?.length > 4 && (
            <Chip size="sm" variant="flat">
              +{job.skillsRequired.length - 4} more
            </Chip>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-default-400">Package:</span>
            <span className="ml-1 font-medium text-success">
              {formatPackage(job.compensation?.ctc)}
            </span>
          </div>
          <div>
            <span className="text-default-400">Location:</span>
            <span className="ml-1">{job.location || 'Not specified'}</span>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center border-t border-divider">
        <div className="text-sm">
          <span className={deadlinePassed ? 'text-danger' : 'text-default-500'}>
            Deadline: {formatDate(job.applicationDeadline)}
          </span>
        </div>
        <Button
          color="primary"
          size="sm"
          isDisabled={deadlinePassed || job.hasApplied}
          isLoading={applying}
          onPress={() => onApply(job._id)}
        >
          {job.hasApplied ? 'Applied' : deadlinePassed ? 'Closed' : 'Apply Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const StudentJobs = () => {
  const { jobs, pagination, loading, fetchEligibleJobs } = useJobs();
  const { applyToJob, loading: applying } = useApplications();

  const [filters, setFilters] = useState({
    search: '',
    type: '',
    page: 1,
  });

  const loadJobs = useCallback(() => {
    fetchEligibleJobs({
      page: filters.page,
      limit: 9,
      search: filters.search,
      type: filters.type,
    });
  }, [fetchEligibleJobs, filters.page, filters.search, filters.type]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const handleApply = async (jobId) => {
    try {
      await applyToJob(jobId);
      // Refresh jobs to update hasApplied status
      loadJobs();
    } catch {
      // Error handled by hook
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Job Opportunities</h1>
        <p className="text-default-500">Browse and apply for jobs matching your profile</p>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              startContent={
                <svg
                  className="w-4 h-4 text-default-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
              className="flex-1"
            />
            <Select
              placeholder="Job Type"
              selectedKeys={filters.type ? [filters.type] : []}
              onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
              className="w-full md:w-48"
            >
              {Object.values(JOB_TYPES).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
            <Button color="primary" onPress={handleSearch}>
              Search
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Jobs Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
        </div>
      ) : jobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} onApply={handleApply} applying={applying} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center">
              <Pagination
                total={pagination.pages}
                page={filters.page}
                onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
              />
            </div>
          )}
        </>
      ) : (
        <Card>
          <CardBody className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-default-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-medium mb-2">No Jobs Found</h3>
            <p className="text-default-500">
              {filters.search || filters.type
                ? 'Try adjusting your filters'
                : 'No job openings available for your profile at the moment'}
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default StudentJobs;
