/**
 * Student Resources Page
 * Access study materials, mock tests, and interview experiences
 */
import { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Button,
  Input,
  Skeleton,
  Pagination,
  Tabs,
  Tab,
} from '@heroui/react';
import { useResources } from '../../../../hooks';
import { getRelativeTime } from '../../../../utils/helpers';

const ResourceCard = ({ resource, onLike, onDownload }) => {
  const getResourceIcon = (type) => {
    const icons = {
      'Study Material': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      'Mock Test': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      'Interview Experience': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      'Placement Guide': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      default: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    };
    return icons[type] || icons.default;
  };

  const getTypeColor = (type) => {
    const colors = {
      'Study Material': 'primary',
      'Mock Test': 'secondary',
      'Interview Experience': 'success',
      'Placement Guide': 'warning',
      'Resume Template': 'danger',
    };
    return colors[type] || 'default';
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardBody className="p-4">
        <div className="flex gap-4">
          <div className={`p-3 rounded-xl bg-${getTypeColor(resource.type)}/10 text-${getTypeColor(resource.type)} flex-shrink-0`}>
            {getResourceIcon(resource.type)}
          </div>
          <div className="flex-1 min-w-0">
            <Chip
              color={getTypeColor(resource.type)}
              variant="flat"
              size="sm"
              className="mb-2"
            >
              {resource.type}
            </Chip>
            <h3 className="font-semibold text-lg line-clamp-1">{resource.title}</h3>
            <p className="text-sm text-default-500 line-clamp-2 mt-1">
              {resource.description}
            </p>
            
            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {resource.tags.slice(0, 3).map((tag) => (
                  <Chip key={tag} size="sm" variant="bordered" className="text-xs">
                    {tag}
                  </Chip>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 mt-3 text-sm text-default-400">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{resource.likes || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{resource.downloads || 0}</span>
              </div>
              <span className="ml-auto">
                {getRelativeTime(resource.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="border-t border-divider gap-2">
        <Button
          size="sm"
          variant="flat"
          startContent={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
          onPress={() => onLike(resource._id)}
        >
          Like
        </Button>
        {resource.fileUrl && (
          <Button
            size="sm"
            color="primary"
            startContent={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            }
            onPress={() => {
              onDownload(resource._id);
              window.open(resource.fileUrl, '_blank');
            }}
          >
            Download
          </Button>
        )}
        {resource.externalLink && (
          <Button
            size="sm"
            color="secondary"
            variant="flat"
            as="a"
            href={resource.externalLink}
            target="_blank"
            startContent={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            }
          >
            Open Link
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const StudentResources = () => {
  const { resources, pagination, loading, fetchResources, fetchInterviewExperiences, likeResource, trackDownload } = useResources();
  const [selectedTab, setSelectedTab] = useState('all');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const loadResources = useCallback(() => {
    if (selectedTab === 'Interview Experience') {
      fetchInterviewExperiences({ page, limit: 9 });
    } else {
      fetchResources({
        page,
        limit: 9,
        type: selectedTab === 'all' ? undefined : selectedTab,
        search: search || undefined,
      });
    }
  }, [fetchInterviewExperiences, fetchResources, page, selectedTab, search]);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  const handleSearch = () => {
    setPage(1);
    fetchResources({
      page: 1,
      limit: 9,
      type: selectedTab === 'all' ? undefined : selectedTab,
      search: search || undefined,
    });
  };

  const handleLike = async (resourceId) => {
    try {
      await likeResource(resourceId);
    } catch {
      // Error handled by hook
    }
  };

  const handleDownload = async (resourceId) => {
    try {
      await trackDownload(resourceId);
    } catch {
      // Error handled by hook
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Resources</h1>
        <p className="text-default-500">Study materials, interview experiences, and more</p>
      </div>

      {/* Search */}
      <Card>
        <CardBody>
          <div className="flex gap-4">
            <Input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              startContent={
                <svg className="w-4 h-4 text-default-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              className="flex-1"
            />
            <Button color="primary" onPress={handleSearch}>
              Search
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Tabs */}
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
        color="primary"
        variant="underlined"
      >
        <Tab key="all" title="All" />
        <Tab key="Study Material" title="Study Materials" />
        <Tab key="Mock Test" title="Mock Tests" />
        <Tab key="Interview Experience" title="Interview Experiences" />
        <Tab key="Placement Guide" title="Guides" />
      </Tabs>

      {/* Resources Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : resources.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <ResourceCard
                key={resource._id}
                resource={resource}
                onLike={handleLike}
                onDownload={handleDownload}
              />
            ))}
          </div>

          {/* Pagination */}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-medium mb-2">No Resources Found</h3>
            <p className="text-default-500">
              {search
                ? 'Try adjusting your search query'
                : 'No resources available in this category'}
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default StudentResources;
