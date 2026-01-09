/**
 * Recruiter Jobs Page
 * Manage job postings
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  Chip,
  Button,
  Skeleton,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import { useJobs } from '../../../../hooks';
import { formatDate, formatPackage } from '../../../../utils/helpers';
import PATHS from '../../../../constants/paths';

const statusColorMap = {
  Draft: 'default',
  'Pending Approval': 'warning',
  Published: 'success',
  Closed: 'secondary',
  Cancelled: 'danger',
};

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <Card>
      <CardBody className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Chip
                color={statusColorMap[job.status] || 'default'}
                variant="flat"
                size="sm"
              >
                {job.status}
              </Chip>
              <Chip variant="bordered" size="sm">{job.type}</Chip>
            </div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-default-500 text-sm mt-1 line-clamp-2">
              {job.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <div>
                <span className="text-default-400">Package: </span>
                <span className="font-medium text-success">
                  {formatPackage(job.compensation?.ctc)}
                </span>
              </div>
              <div>
                <span className="text-default-400">Location: </span>
                <span>{job.location || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-default-400">Deadline: </span>
                <span>{formatDate(job.applicationDeadline)}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 text-sm text-default-400">
              <span>{job.applicationsCount || 0} applications</span>
              <span>Posted {formatDate(job.createdAt)}</span>
            </div>
          </div>
          
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Job actions">
              <DropdownItem key="view" as={Link} to={`${PATHS.RECRUITER.JOBS}/${job._id}`}>
                View Details
              </DropdownItem>
              <DropdownItem key="applications" as={Link} to={`${PATHS.RECRUITER.JOBS}/${job._id}/applications`}>
                View Applications
              </DropdownItem>
              {job.status === 'Draft' && (
                <DropdownItem key="edit" onPress={() => onEdit(job)}>
                  Edit
                </DropdownItem>
              )}
              {(job.status === 'Draft' || job.status === 'Cancelled') && (
                <DropdownItem key="delete" className="text-danger" onPress={() => onDelete(job)}>
                  Delete
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>
    </Card>
  );
};

const RecruiterJobs = () => {
  const navigate = useNavigate();
  const { jobs, pagination, loading, fetchMyJobs, deleteJob } = useJobs();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMyJobs({ page, limit: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleEdit = (job) => {
    navigate(`${PATHS.RECRUITER.JOBS}/${job._id}/edit`);
  };

  const handleDelete = async (job) => {
    if (window.confirm(`Are you sure you want to delete "${job.title}"?`)) {
      try {
        await deleteJob(job._id);
        fetchMyJobs({ page, limit: 10 });
      } catch {
        // Error handled by hook
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Job Postings</h1>
          <p className="text-default-500">Manage your job listings</p>
        </div>
        <Button 
          color="primary" 
          as={Link} 
          to={PATHS.RECRUITER.JOBS_CREATE}
          startContent={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Post New Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold">{jobs.length}</p>
            <p className="text-sm text-default-500">Total Jobs</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-success">
              {jobs.filter(j => j.status === 'Published').length}
            </p>
            <p className="text-sm text-default-500">Active</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-warning">
              {jobs.filter(j => j.status === 'Pending Approval').length}
            </p>
            <p className="text-sm text-default-500">Pending</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-secondary">
              {jobs.filter(j => j.status === 'Closed').length}
            </p>
            <p className="text-sm text-default-500">Closed</p>
          </CardBody>
        </Card>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <>
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center">
              <Pagination
                total={pagination.pages}
                page={page}
                onChange={setPage}
              />
            </div>
          )}
        </>
      ) : (
        <Card>
          <CardBody className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-default-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium mb-2">No Job Postings Yet</h3>
            <p className="text-default-500 mb-4">
              Create your first job posting to start receiving applications
            </p>
            <Button color="primary" as={Link} to={PATHS.RECRUITER.JOBS_CREATE}>
              Post Your First Job
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default RecruiterJobs;
