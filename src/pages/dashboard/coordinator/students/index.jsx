/**
 * Coordinator Students Page
 * View and manage assigned students
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
  Progress,
} from '@heroui/react';
import { toast } from '../../../../utils/toast';
import { usersAPI } from '../../../../api';
import { getFullName, getInitials } from '../../../../utils/helpers';
import { BRANCHES, PLACEMENT_STATUS } from '../../../../constants/api.constants';

const placementStatusColors = {
  'Not Placed': 'warning',
  Placed: 'success',
  'Opted Out': 'default',
  'Higher Studies': 'secondary',
};

const CoordinatorStudents = () => {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stats, setStats] = useState({
    total: 0,
    placed: 0,
    seeking: 0,
    optedOut: 0,
  });

  const [filters, setFilters] = useState({
    search: '',
    branch: '',
    batch: '',
    placementStatus: '',
    page: 1,
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await usersAPI.getStudents({
        page: filters.page,
        limit: 10,
        search: filters.search || undefined,
        branch: filters.branch || undefined,
        batch: filters.batch || undefined,
        placementStatus: filters.placementStatus || undefined,
      });
      const data = response.data;
      setStudents(data.students || []);
      setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
      
      // Calculate stats from response
      setStats({
        total: data.pagination?.total || 0,
        placed: data.students?.filter(s => s.placementStatus === 'Placed').length || 0,
        seeking: data.students?.filter(s => !s.placementStatus || s.placementStatus === 'Not Placed').length || 0,
        optedOut: data.students?.filter(s => s.placementStatus === 'Opted Out' || s.placementStatus === 'Higher Studies').length || 0,
      });
    } catch {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page]);

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
    fetchStudents();
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    onOpen();
  };

  const placementRate = stats.total > 0 ? ((stats.placed / stats.total) * 100).toFixed(1) : 0;

  const columns = [
    { key: 'name', label: 'Student' },
    { key: 'rollNumber', label: 'Roll No.' },
    { key: 'branch', label: 'Branch' },
    { key: 'cgpa', label: 'CGPA' },
    { key: 'applications', label: 'Applications' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const renderCell = (student, columnKey) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex items-center gap-3">
            <Avatar
              name={getInitials(student.userId)}
              src={student.avatar}
              size="sm"
            />
            <div>
              <p className="font-medium">{getFullName(student.userId)}</p>
              <p className="text-xs text-default-400">{student.userId?.email}</p>
            </div>
          </div>
        );
      case 'rollNumber':
        return <span className="font-mono">{student.rollNumber}</span>;
      case 'branch':
        return student.branch;
      case 'cgpa':
        return (
          <span className={student.academicInfo?.cgpa >= 7 ? 'text-success' : ''}>
            {student.academicInfo?.cgpa || '-'}
          </span>
        );
      case 'applications':
        return (
          <div className="text-center">
            <span className="font-semibold">{student.applicationsCount || 0}</span>
          </div>
        );
      case 'status':
        return (
          <Chip 
            size="sm" 
            color={placementStatusColors[student.placementStatus] || 'warning'}
            variant="flat"
          >
            {student.placementStatus || 'Not Placed'}
          </Chip>
        );
      case 'actions':
        return (
          <Button size="sm" variant="light" onPress={() => handleViewDetails(student)}>
            View Details
          </Button>
        );
      default:
        return student[columnKey];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Student Management</h1>
        <p className="text-default-500">Monitor student placement progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-default-500">Total Students</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-default-500">Placed</p>
                <p className="text-2xl font-bold text-success">{stats.placed}</p>
              </div>
              <div className="p-2 bg-success/10 rounded-lg">
                <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-default-500">Seeking</p>
                <p className="text-2xl font-bold text-warning">{stats.seeking}</p>
              </div>
              <div className="p-2 bg-warning/10 rounded-lg">
                <svg className="w-6 h-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-default-500 mb-2">Placement Rate</p>
            <div className="flex items-center gap-3">
              <Progress 
                value={parseFloat(placementRate)} 
                color="success"
                className="flex-1"
              />
              <span className="font-bold text-success">{placementRate}%</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by name, email, roll number..."
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
              placeholder="Branch"
              selectedKeys={filters.branch ? [filters.branch] : []}
              onChange={(e) => setFilters((prev) => ({ ...prev, branch: e.target.value }))}
              className="w-full md:w-40"
            >
              {BRANCHES.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Status"
              selectedKeys={filters.placementStatus ? [filters.placementStatus] : []}
              onChange={(e) => setFilters((prev) => ({ ...prev, placementStatus: e.target.value }))}
              className="w-full md:w-36"
            >
              {Object.values(PLACEMENT_STATUS).map((status) => (
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

      {/* Students Table */}
      <Card>
        <CardBody className="p-0">
          <Table aria-label="Students table" removeWrapper>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={students}
              isLoading={loading}
              loadingContent={<Skeleton className="w-full h-10" />}
              emptyContent="No students found"
            >
              {(student) => (
                <TableRow key={student._id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(student, columnKey)}</TableCell>
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

      {/* Student Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Student Details</ModalHeader>
          <ModalBody>
            {selectedStudent && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    name={getInitials(selectedStudent.userId)}
                    src={selectedStudent.avatar}
                    className="w-16 h-16 text-xl"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {getFullName(selectedStudent.userId)}
                    </h3>
                    <p className="text-default-500">{selectedStudent.userId?.email}</p>
                    <Chip 
                      color={placementStatusColors[selectedStudent.placementStatus] || 'warning'}
                      variant="flat"
                      size="sm"
                      className="mt-1"
                    >
                      {selectedStudent.placementStatus || 'Not Placed'}
                    </Chip>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-default-400">Roll Number</p>
                    <p className="font-mono font-medium">{selectedStudent.rollNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Branch</p>
                    <p className="font-medium">{selectedStudent.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Batch</p>
                    <p className="font-medium">{selectedStudent.batch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">CGPA</p>
                    <p className="font-medium">{selectedStudent.academicInfo?.cgpa || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">10th %</p>
                    <p className="font-medium">{selectedStudent.academicInfo?.tenthPercentage || '-'}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">12th %</p>
                    <p className="font-medium">{selectedStudent.academicInfo?.twelfthPercentage || '-'}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Active Backlogs</p>
                    <p className="font-medium">{selectedStudent.academicInfo?.activeBacklogs || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Applications</p>
                    <p className="font-medium">{selectedStudent.applicationsCount || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Phone</p>
                    <p className="font-medium">{selectedStudent.userId?.phone || '-'}</p>
                  </div>
                </div>

                {selectedStudent.skills?.length > 0 && (
                  <div>
                    <p className="text-sm text-default-400 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.skills.map((skill) => (
                        <Chip key={skill} size="sm" variant="bordered">{skill}</Chip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary">
              View Applications
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CoordinatorStudents;
