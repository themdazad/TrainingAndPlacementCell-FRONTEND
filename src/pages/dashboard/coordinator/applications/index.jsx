/**
 * Coordinator Applications Page
 * View and manage job applications
 */
import { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Input,
  Select,
  SelectItem,
  Avatar,
  Skeleton,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from '@heroui/react';
import { toast } from '../../../../utils/toast';
import { useApplications } from '../../../../hooks';
import { formatDate, getFullName, getInitials } from '../../../../utils/helpers';
import { APPLICATION_STATUS, APPLICATION_STATUS_COLORS } from '../../../../constants/api.constants';

const CoordinatorApplications = () => {
  const { 
    applications, 
    pagination, 
    loading, 
    fetchAllApplications,
    updateApplicationStatus 
  } = useApplications();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState({ status: '', remarks: '' });
  const [updating, setUpdating] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    page: 1,
  });

  useEffect(() => {
    fetchAllApplications({
      page: filters.page,
      limit: 10,
      status: filters.status || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page]);

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
    fetchAllApplications({
      page: 1,
      limit: 10,
      status: filters.status || undefined,
    });
  };

  const handleStatusChange = (application) => {
    setSelectedApplication(application);
    setStatusUpdate({ status: application.status, remarks: '' });
    onOpen();
  };

  const handleUpdateStatus = async () => {
    if (!selectedApplication || !statusUpdate.status) return;
    
    setUpdating(true);
    try {
      await updateApplicationStatus(
        selectedApplication._id, 
        statusUpdate.status, 
        statusUpdate.remarks
      );
      toast.success('Application status updated');
      onClose();
      handleSearch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const columns = [
    { key: 'student', label: 'Student' },
    { key: 'job', label: 'Job' },
    { key: 'company', label: 'Company' },
    { key: 'appliedAt', label: 'Applied' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const renderCell = (application, columnKey) => {
    switch (columnKey) {
      case 'student':
        return (
          <div className="flex items-center gap-3">
            <Avatar
              name={getInitials(application.studentId?.userId)}
              size="sm"
            />
            <div>
              <p className="font-medium">{getFullName(application.studentId?.userId)}</p>
              <p className="text-xs text-default-400">{application.studentId?.rollNumber}</p>
            </div>
          </div>
        );
      case 'job':
        return (
          <div>
            <p className="font-medium">{application.jobId?.title}</p>
            <p className="text-xs text-default-400">{application.jobId?.type}</p>
          </div>
        );
      case 'company':
        return application.jobId?.company;
      case 'appliedAt':
        return formatDate(application.appliedAt);
      case 'status':
        return (
          <Chip 
            size="sm" 
            color={APPLICATION_STATUS_COLORS[application.status] || 'default'}
            variant="flat"
          >
            {application.status}
          </Chip>
        );
      case 'actions':
        return (
          <div className="flex gap-1">
            <Button 
              size="sm" 
              color="primary" 
              variant="flat"
              onPress={() => handleStatusChange(application)}
            >
              Update Status
            </Button>
          </div>
        );
      default:
        return application[columnKey];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Applications Management</h1>
        <p className="text-default-500">Review and update application statuses</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold">{pagination.total || 0}</p>
            <p className="text-xs text-default-500">Total</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-warning">
              {applications.filter(a => a.status === 'Pending').length}
            </p>
            <p className="text-xs text-default-500">Pending</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-secondary">
              {applications.filter(a => a.status === 'Shortlisted').length}
            </p>
            <p className="text-xs text-default-500">Shortlisted</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-success">
              {applications.filter(a => a.status === 'Offered' || a.status === 'Accepted').length}
            </p>
            <p className="text-xs text-default-500">Offers</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-danger">
              {applications.filter(a => a.status === 'Rejected').length}
            </p>
            <p className="text-xs text-default-500">Rejected</p>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by student or job..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              startContent={
                <svg className="w-4 h-4 text-default-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              className="flex-1"
            />
            <Select
              placeholder="Status"
              selectedKeys={filters.status ? [filters.status] : []}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full md:w-48"
            >
              {Object.values(APPLICATION_STATUS).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
            <Button color="primary" onPress={handleSearch}>
              Search
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardBody className="p-0">
          <Table aria-label="Applications table" removeWrapper>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={applications}
              isLoading={loading}
              loadingContent={<Skeleton className="w-full h-10" />}
              emptyContent="No applications found"
            >
              {(application) => (
                <TableRow key={application._id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(application, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

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

      {/* Update Status Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Update Application Status</ModalHeader>
          <ModalBody className="space-y-4">
            {selectedApplication && (
              <>
                <div className="p-3 bg-default-100 rounded-lg">
                  <p className="font-medium">{getFullName(selectedApplication.studentId?.userId)}</p>
                  <p className="text-sm text-default-500">
                    Applied for: {selectedApplication.jobId?.title} at {selectedApplication.jobId?.company}
                  </p>
                </div>
                
                <Select
                  label="New Status"
                  selectedKeys={statusUpdate.status ? [statusUpdate.status] : []}
                  onChange={(e) => setStatusUpdate(prev => ({ ...prev, status: e.target.value }))}
                >
                  {Object.values(APPLICATION_STATUS).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </Select>
                
                <Textarea
                  label="Remarks (optional)"
                  placeholder="Add any notes about this status change..."
                  value={statusUpdate.remarks}
                  onChange={(e) => setStatusUpdate(prev => ({ ...prev, remarks: e.target.value }))}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              isLoading={updating}
              onPress={handleUpdateStatus}
            >
              Update Status
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CoordinatorApplications;
