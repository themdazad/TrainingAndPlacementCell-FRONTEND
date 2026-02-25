import { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Chip,
  Pagination,
  Skeleton,
} from '@heroui/react';
import { toast } from '../../utils/toast';
import { useProjects } from '../../hooks/api';
import { PROJECT_STATUS_COLORS } from '../../constants/api.constants';

const ProjectsPage = () => {
  const { getPublishedProjects, incrementViews, loading } = useProjects();
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const loadProjects = async (nextPage = page, nextSearch = search) => {
    try {
      const response = await getPublishedProjects({
        page: nextPage,
        limit: 9,
        search: nextSearch || undefined,
      });
      const payload = response?.data?.data;
      setProjects(payload?.projects || []);
      setPagination(payload?.pagination || { page: 1, pages: 1, total: 0 });
    } catch {
      toast.error('Failed to fetch projects');
    }
  };

  useEffect(() => {
    loadProjects(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    loadProjects(1, search);
  };

  const handleViewProject = async (project) => {
    try {
      await incrementViews(project._id);
    } catch {
      // keep UX uninterrupted
    }

    const destination =
      project?.links?.liveDemo || project?.links?.repository || project?.links?.documentation;

    if (!destination) {
      toast.info('No public link available for this project yet');
      return;
    }

    window.open(destination, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Student Projects</h1>
          <p className="text-default-500">Explore published projects from students</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
            placeholder="Search by title or description"
            className="w-full md:w-80"
          />
          <Button color="primary" onPress={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardBody className="space-y-3">
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project._id} className="h-full">
              <CardHeader className="flex flex-col items-start gap-2">
                <div className="flex justify-between items-start w-full gap-2">
                  <h3 className="font-semibold line-clamp-2">{project.title}</h3>
                  <Chip
                    size="sm"
                    color={PROJECT_STATUS_COLORS[project.status] || 'default'}
                    variant="flat"
                  >
                    {project.status}
                  </Chip>
                </div>
                <p className="text-xs text-default-500">
                  By {project?.uploadedBy?.personalInfo?.fullName || 'Student'}
                </p>
                <p className="text-xs text-default-500">
                  Reg No: {project?.uploadedBy?.academicInfo?.registrationNumber || 'N/A'}
                </p>
              </CardHeader>
              <CardBody className="pt-0 space-y-4">
                <p className="text-sm text-default-600 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-1">
                  {(project.technologies || []).slice(0, 4).map((tech) => (
                    <Chip key={tech} size="sm" variant="dot" color="secondary">
                      {tech}
                    </Chip>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-default-500">{project.views || 0} views</span>
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={() => handleViewProject(project)}
                  >
                    View Project
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <Card>
          <CardBody className="text-center py-10">
            <p className="text-default-500">No published projects found.</p>
          </CardBody>
        </Card>
      )}

      {pagination.pages > 1 && (
        <div className="flex justify-center">
          <Pagination page={page} total={pagination.pages} onChange={setPage} showControls />
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
