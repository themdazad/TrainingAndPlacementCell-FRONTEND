/**
 * Student Applications Page
 * Track and manage job applications
 */
import { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardBody,
  Chip,
  Button,
  Skeleton,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
} from '@heroui/react';
import { useApplications } from '../../../../hooks';
import { formatDate, formatPackage, getRelativeTime } from '../../../../utils/helpers';
import { APPLICATION_STATUS_COLORS } from '../../../../constants/api.constants';

const ApplicationCard = ({ application, onWithdraw }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardBody className="p-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {application.jobId?.title || 'Job Position'}
              </h3>
              <p className="text-default-500">{application.jobId?.company || 'Company'}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Chip
                  color={APPLICATION_STATUS_COLORS[application.status] || 'default'}
                  variant="flat"
                  size="sm"
                >
                  {application.status}
                </Chip>
                {application.jobId?.type && (
                  <Chip variant="bordered" size="sm">
                    {application.jobId.type}
                  </Chip>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-success font-medium">
                {formatPackage(application.jobId?.compensation?.ctc)}
              </p>
              <p className="text-xs text-default-400 mt-1">
                Applied {getRelativeTime(application.appliedAt)}
              </p>
            </div>
          </div>

          {/* Timeline */}
          {application.timeline && application.timeline.length > 0 && (
            <div className="mt-4 pt-4 border-t border-divider">
              <p className="text-xs text-default-400 mb-2">Latest Update:</p>
              <p className="text-sm">
                {application.timeline[application.timeline.length - 1]?.remarks ||
                  `Status changed to ${application.status}`}
              </p>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="light" onPress={onOpen}>
              View Details
            </Button>
            {['Pending', 'Under Review'].includes(application.status) && (
              <Button
                size="sm"
                color="danger"
                variant="flat"
                onPress={() => onWithdraw(application._id)}
              >
                Withdraw
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Application Details</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{application.jobId?.title}</h4>
                <p className="text-default-500">{application.jobId?.company}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-default-400">Applied On</p>
                  <p>{formatDate(application.appliedAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-default-400">Current Status</p>
                  <Chip color={APPLICATION_STATUS_COLORS[application.status]} variant="flat">
                    {application.status}
                  </Chip>
                </div>
                <div>
                  <p className="text-sm text-default-400">Package</p>
                  <p className="text-success font-medium">
                    {formatPackage(application.jobId?.compensation?.ctc)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-default-400">Location</p>
                  <p>{application.jobId?.location || 'Not specified'}</p>
                </div>
              </div>

              {/* Application Timeline */}
              {application.timeline && application.timeline.length > 0 && (
                <div>
                  <h5 className="font-medium mb-3">Application Timeline</h5>
                  <div className="space-y-3">
                    {application.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          {index < application.timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-default-200 my-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-medium">{event.status}</p>
                          {event.remarks && (
                            <p className="text-sm text-default-500">{event.remarks}</p>
                          )}
                          <p className="text-xs text-default-400">{formatDate(event.changedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const StudentApplications = () => {
  const { applications, pagination, loading, fetchMyApplications, withdrawApplication } =
    useApplications();
  const [selectedTab, setSelectedTab] = useState('all');
  const [page, setPage] = useState(1);

  const fetchApplications = useCallback(() => {
    fetchMyApplications({
      page,
      limit: 10,
      status: selectedTab === 'all' ? undefined : selectedTab,
    });
  }, [fetchMyApplications, page, selectedTab]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleWithdraw = async (applicationId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      try {
        await withdrawApplication(applicationId);
      } catch {
        // Error handled by hook
      }
    }
  };

  const statusTabs = [
    { key: 'all', label: 'All' },
    { key: 'Pending', label: 'Pending' },
    { key: 'Shortlisted', label: 'Shortlisted' },
    { key: 'Interview Scheduled', label: 'Interviews' },
    { key: 'Offered', label: 'Offers' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="text-default-500">Track the status of your job applications</p>
      </div>

      {/* Status Tabs */}
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
        color="primary"
        variant="underlined"
      >
        {statusTabs.map((tab) => (
          <Tab key={tab.key} title={tab.label} />
        ))}
      </Tabs>

      {/* Applications List */}
      {loading ? (
        <div className="space-y-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
        </div>
      ) : applications.length > 0 ? (
        <>
          <div className="space-y-4">
            {applications.map((app) => (
              <ApplicationCard key={app._id} application={app} onWithdraw={handleWithdraw} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center">
              <Pagination total={pagination.pages} page={page} onChange={setPage} />
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium mb-2">No Applications</h3>
            <p className="text-default-500">
              {selectedTab === 'all'
                ? "You haven't applied to any jobs yet"
                : `No applications with "${selectedTab}" status`}
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default StudentApplications;
