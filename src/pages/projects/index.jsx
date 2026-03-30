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

const numberFormatter = new Intl.NumberFormat('en-US');

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
    const shouldLoadImmediately = page === 1;
    setPage(1);

    // Avoid duplicate fetch when page change already triggers useEffect.
    if (shouldLoadImmediately) {
      loadProjects(1, search);
    }
  };

  const getProjectDestination = (project) =>
    project?.links?.liveDemo || project?.links?.repository || project?.links?.documentation || null;

  const getProjectActionLabel = (project) => {
    if (project?.links?.liveDemo) return 'Open Live Demo';
    if (project?.links?.repository) return 'View Repository';
    if (project?.links?.documentation) return 'Read Docs';
    return 'No Public Link';
  };

  const getInitials = (name = '') =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'ST';

  const formatDate = (value) => {
    if (!value) return 'Recently published';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Recently published';
    return `Published ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const handleViewProject = async (project) => {
    try {
      await incrementViews(project._id);
    } catch {
      // keep UX uninterrupted
    }

    const destination = getProjectDestination(project);

    if (!destination) {
      toast.info('No public link available for this project yet');
      return;
    }

    window.open(destination, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Showcase</p>
        <h1 className="text-3xl md:text-4xl font-black leading-tight">Student Projects</h1>
        <p className="text-default-600 mt-2">Explore published projects from students</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Browse and discover</h2>
          <p className="text-default-500 text-sm">Search by title, domain, or summary keywords</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
            placeholder="Search by title or description"
            className="w-full md:w-96"
            isClearable
            onClear={() => {
              setSearch('');
              if (page === 1) {
                loadProjects(1, '');
              } else {
                setPage(1);
              }
            }}
          />
          <Button color="primary" onPress={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="border border-default-200">
              <CardHeader className="pb-2">
                <div className="w-full space-y-3">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-1/2 rounded-md" />
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <Skeleton className="h-14 w-full rounded-lg" />
                <Skeleton className="h-8 w-2/3 rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="h-full border border-default-200 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-col items-start gap-3 pb-2">
                <div className="flex justify-between items-start w-full gap-3">
                  <h3 className="font-semibold text-base leading-6 line-clamp-2">
                    {project.title}
                  </h3>
                  <Chip
                    size="sm"
                    color={PROJECT_STATUS_COLORS[project.status] || 'default'}
                    variant="flat"
                  >
                    {project.status}
                  </Chip>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-full bg-primary/15 text-primary font-semibold flex items-center justify-center text-xs">
                    {getInitials(project?.uploadedBy?.personalInfo?.fullName || 'Student')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {project?.uploadedBy?.personalInfo?.fullName || 'Student'}
                    </p>
                    <p className="text-xs text-default-500 truncate">
                      Reg No: {project?.uploadedBy?.academicInfo?.registrationNumber || 'N/A'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0 h-full flex flex-col gap-4">
                <p className="text-sm text-default-600 line-clamp-3 min-h-[60px]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {(project.technologies || []).slice(0, 4).map((tech) => (
                    <Chip key={tech} size="sm" variant="dot" color="secondary">
                      {tech}
                    </Chip>
                  ))}
                  {(project.technologies || []).length > 4 && (
                    <Chip size="sm" variant="flat" color="default">
                      +{(project.technologies || []).length - 4} more
                    </Chip>
                  )}
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center text-xs text-default-500 border-t border-default-100 pt-3">
                    <span>{numberFormatter.format(project.views || 0)} views</span>
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {project?.links?.liveDemo && (
                      <Chip size="sm" variant="flat" color="success">
                        Live Demo
                      </Chip>
                    )}
                    {project?.links?.repository && (
                      <Chip size="sm" variant="flat" color="secondary">
                        GitHub
                      </Chip>
                    )}
                    {project?.links?.documentation && (
                      <Chip size="sm" variant="flat" color="warning">
                        Docs
                      </Chip>
                    )}
                  </div>
                  <Button
                    size="md"
                    color="primary"
                    variant="shadow"
                    onPress={() => handleViewProject(project)}
                    isDisabled={!getProjectDestination(project)}
                    className="w-full font-semibold"
                  >
                    {getProjectActionLabel(project)}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <Card className="border border-dashed border-default-300">
          <CardBody className="text-center py-12 space-y-2">
            <p className="text-lg font-semibold">No published projects found</p>
            <p className="text-default-500 text-sm">
              Try a different keyword or clear your search to see more results.
            </p>
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
