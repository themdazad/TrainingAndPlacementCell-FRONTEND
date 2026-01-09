/**
 * Admin Students Management Page
 * View and manage student accounts
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Tabs,
  Tab,
  Switch,
  Divider,
} from '@heroui/react';
import { toast } from '../../../../utils/toast';
import { usersAPI } from '../../../../api';
import { getFullName, getInitials } from '../../../../utils/helpers';
import { BRANCHES, BATCHES, PLACEMENT_STATUS } from '../../../../constants/api.constants';

const placementStatusColors = {
  Seeking: 'warning',
  Placed: 'success',
  'Not Interested': 'default',
  'Higher Studies': 'secondary',
};

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  // Edit form state
  const [editForm, setEditForm] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      phone: '',
      gender: '',
      dateOfBirth: '',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: '',
      },
    },
    academicInfo: {
      registrationNumber: '',
      course: '',
      branch: '',
      yearOfStudy: '',
      batch: '',
      cgpa: '',
      backlogs: '',
      tenthPercentage: '',
      twelfthPercentage: '',
    },
    bio: '',
    skills: '',
    links: {
      linkedin: '',
      github: '',
      portfolio: '',
    },
    placementStatus: '',
    placedAt: {
      companyName: '',
      role: '',
      package: '',
    },
    isEligible: true,
    eligibilityRemarks: '',
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
      setStudents(response.data.data.students || []);
      setPagination(response.data.data.pagination || { page: 1, pages: 1, total: 0 });
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

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    // Initialize edit form with student data
    setEditForm({
      personalInfo: {
        firstName: student.personalInfo?.firstName || '',
        lastName: student.personalInfo?.lastName || '',
        phone: student.personalInfo?.phone || '',
        gender: student.personalInfo?.gender || '',
        dateOfBirth: student.personalInfo?.dateOfBirth?.split('T')[0] || '',
        address: {
          street: student.personalInfo?.address?.street || '',
          city: student.personalInfo?.address?.city || '',
          state: student.personalInfo?.address?.state || '',
          pincode: student.personalInfo?.address?.pincode || '',
        },
      },
      academicInfo: {
        registrationNumber: student.academicInfo?.registrationNumber || '',
        course: student.academicInfo?.course || '',
        branch: student.academicInfo?.branch || '',
        yearOfStudy: student.academicInfo?.yearOfStudy?.toString() || '',
        batch: student.academicInfo?.batch?.toString() || '',
        cgpa: student.academicInfo?.cgpa?.toString() || '',
        backlogs: student.academicInfo?.backlogs?.toString() || '0',
        tenthPercentage: student.academicInfo?.tenthPercentage?.toString() || '',
        twelfthPercentage: student.academicInfo?.twelfthPercentage?.toString() || '',
      },
      bio: student.bio || '',
      skills: student.skills?.join(', ') || '',
      links: {
        linkedin: student.links?.linkedin || '',
        github: student.links?.github || '',
        portfolio: student.links?.portfolio || '',
      },
      placementStatus: student.placementStatus || 'Seeking',
      placedAt: {
        companyName: student.placedAt?.companyName || '',
        role: student.placedAt?.role || '',
        package: student.placedAt?.package?.toString() || '',
      },
      isEligible: student.isEligible !== false,
      eligibilityRemarks: student.eligibilityRemarks || '',
    });
    onEditOpen();
  };

  const handleEditFormChange = (section, field, value) => {
    if (section === 'root') {
      setEditForm((prev) => ({ ...prev, [field]: value }));
    } else if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [parent]: {
            ...prev[section][parent],
            [child]: value,
          },
        },
      }));
    } else {
      setEditForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleSaveStudent = async () => {
    if (!selectedStudent) return;

    setIsUpdating(true);
    try {
      // Transform skills from comma-separated string to array
      const skillsArray = editForm.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const updateData = {
        personalInfo: {
          ...editForm.personalInfo,
        },
        academicInfo: {
          ...editForm.academicInfo,
          yearOfStudy: editForm.academicInfo.yearOfStudy ? parseInt(editForm.academicInfo.yearOfStudy) : undefined,
          batch: editForm.academicInfo.batch ? parseInt(editForm.academicInfo.batch) : undefined,
          cgpa: editForm.academicInfo.cgpa ? parseFloat(editForm.academicInfo.cgpa) : undefined,
          backlogs: editForm.academicInfo.backlogs ? parseInt(editForm.academicInfo.backlogs) : 0,
          tenthPercentage: editForm.academicInfo.tenthPercentage ? parseFloat(editForm.academicInfo.tenthPercentage) : undefined,
          twelfthPercentage: editForm.academicInfo.twelfthPercentage ? parseFloat(editForm.academicInfo.twelfthPercentage) : undefined,
        },
        bio: editForm.bio,
        skills: skillsArray,
        links: editForm.links,
        placementStatus: editForm.placementStatus,
        isEligible: editForm.isEligible,
        eligibilityRemarks: editForm.eligibilityRemarks,
      };

      // Only include placedAt if the student is placed
      if (editForm.placementStatus === 'Placed' && editForm.placedAt.companyName) {
        updateData.placedAt = {
          companyName: editForm.placedAt.companyName,
          role: editForm.placedAt.role,
          package: editForm.placedAt.package ? parseFloat(editForm.placedAt.package) : undefined,
        };
      }

      await usersAPI.updateStudent(selectedStudent._id, updateData);
      toast.success('Student updated successfully');
      onEditClose();
      fetchStudents();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update student');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateStatus = async (studentId, status) => {
    try {
      await usersAPI.updateStudentStatus(studentId, { placementStatus: status });
      toast.success('Status updated successfully');
      fetchStudents();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const columns = [
    { key: 'name', label: 'Student' },
    { key: 'rollNumber', label: 'Roll No.' },
    { key: 'branch', label: 'Branch' },
    { key: 'batch', label: 'Batch' },
    { key: 'cgpa', label: 'CGPA' },
    { key: 'status', label: 'Placement Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const renderCell = (student, columnKey) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex items-center gap-3">
            <Avatar
              name={getInitials(student.personalInfo) || student.userId?.email?.charAt(0).toUpperCase()}
              src={student.userId?.profilePicture}
              size="sm"
            />
            <div>
              <p className="font-medium">
                {student.personalInfo?.firstName || student.personalInfo?.lastName 
                  ? `${student.personalInfo?.firstName || ''} ${student.personalInfo?.lastName || ''}`.trim()
                  : student.userId?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-default-400">{student.userId?.email}</p>
            </div>
          </div>
        );
      case 'rollNumber':
        return <span className="font-mono">{student.academicInfo?.registrationNumber || '-'}</span>;
      case 'branch':
        return student.academicInfo?.branch || '-';
      case 'batch':
        return student.academicInfo?.batch || '-';
      case 'cgpa':
        return student.academicInfo?.cgpa?.toFixed(2) || '-';
      case 'status':
        return (
          <Chip 
            size="sm" 
            color={placementStatusColors[student.placementStatus] || 'default'}
            variant="flat"
          >
            {student.placementStatus || 'Seeking'}
          </Chip>
        );
      case 'actions':
        return (
          <div className="flex gap-1">
            <Button size="sm" variant="light" onPress={() => handleViewDetails(student)}>
              View
            </Button>
            <Button size="sm" variant="flat" color="primary" onPress={() => handleEditStudent(student)}>
              Edit
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Student actions">
                <DropdownItem 
                  key="placed" 
                  onPress={() => handleUpdateStatus(student._id, 'Placed')}
                >
                  Mark as Placed
                </DropdownItem>
                <DropdownItem 
                  key="seeking" 
                  onPress={() => handleUpdateStatus(student._id, 'Seeking')}
                >
                  Mark as Seeking
                </DropdownItem>
                <DropdownItem 
                  key="not-interested" 
                  onPress={() => handleUpdateStatus(student._id, 'Not Interested')}
                >
                  Mark as Not Interested
                </DropdownItem>
                <DropdownItem 
                  key="higher-studies" 
                  onPress={() => handleUpdateStatus(student._id, 'Higher Studies')}
                >
                  Mark as Higher Studies
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return student[columnKey];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Student Management</h1>
          <p className="text-default-500">View and manage student accounts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="flat" startContent={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          }>
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-center">
            <p className="text-2xl font-bold">{pagination.total || 0}</p>
            <p className="text-sm text-default-500">Total Students</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-2xl font-bold text-success">
              {students.filter(s => s.placementStatus === 'Placed').length}
            </p>
            <p className="text-sm text-default-500">Placed</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-2xl font-bold text-warning">
              {students.filter(s => !s.placementStatus || s.placementStatus === 'Seeking').length}
            </p>
            <p className="text-sm text-default-500">Seeking</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-2xl font-bold text-secondary">
              {students.filter(s => s.placementStatus === 'Higher Studies').length}
            </p>
            <p className="text-sm text-default-500">Higher Studies</p>
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
              className="w-full md:w-44"
            >
              {BRANCHES.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Batch"
              selectedKeys={filters.batch ? [filters.batch] : []}
              onChange={(e) => setFilters((prev) => ({ ...prev, batch: e.target.value }))}
              className="w-full md:w-32"
            >
              {BATCHES.map((batch) => (
                <SelectItem key={batch.toString()} value={batch.toString()}>
                  {batch}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Status"
              selectedKeys={filters.placementStatus ? [filters.placementStatus] : []}
              onChange={(e) => setFilters((prev) => ({ ...prev, placementStatus: e.target.value }))}
              className="w-full md:w-40"
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
                    name={selectedStudent.personalInfo?.firstName?.charAt(0) || selectedStudent.userId?.email?.charAt(0).toUpperCase()}
                    src={selectedStudent.userId?.profilePicture}
                    size="lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {selectedStudent.personalInfo?.firstName || selectedStudent.personalInfo?.lastName 
                        ? `${selectedStudent.personalInfo?.firstName || ''} ${selectedStudent.personalInfo?.lastName || ''}`.trim()
                        : selectedStudent.userId?.email?.split('@')[0]}
                    </h3>
                    <p className="text-default-500">{selectedStudent.userId?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-default-400">Registration Number</p>
                    <p className="font-mono font-medium">{selectedStudent.academicInfo?.registrationNumber || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Branch</p>
                    <p className="font-medium">{selectedStudent.academicInfo?.branch || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Batch</p>
                    <p className="font-medium">{selectedStudent.academicInfo?.batch || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">CGPA</p>
                    <p className="font-medium">{selectedStudent.academicInfo?.cgpa?.toFixed(2) || '-'}</p>
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
                    <p className="text-sm text-default-400">Backlogs</p>
                    <p className="font-medium">{selectedStudent.academicInfo?.backlogs || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Placement Status</p>
                    <Chip 
                      color={placementStatusColors[selectedStudent.placementStatus] || 'default'}
                      variant="flat"
                    >
                      {selectedStudent.placementStatus || 'Seeking'}
                    </Chip>
                  </div>
                </div>

                {selectedStudent.placedAt?.companyName && (
                  <div className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
                    <p className="text-sm text-success-600 dark:text-success-400 mb-2">Placement Details</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-default-400">Company</p>
                        <p className="font-medium">{selectedStudent.placedAt.companyName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-400">Role</p>
                        <p className="font-medium">{selectedStudent.placedAt.role || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-400">Package</p>
                        <p className="font-medium">{selectedStudent.placedAt.package ? `${selectedStudent.placedAt.package} LPA` : '-'}</p>
                      </div>
                    </div>
                  </div>
                )}

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
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Student Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="4xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader>Edit Student Profile</ModalHeader>
          <ModalBody>
            {selectedStudent && (
              <Tabs aria-label="Edit student sections">
                {/* Personal Information Tab */}
                <Tab key="personal" title="Personal Info">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <Input
                      label="First Name"
                      value={editForm.personalInfo.firstName}
                      onChange={(e) => handleEditFormChange('personalInfo', 'firstName', e.target.value)}
                    />
                    <Input
                      label="Last Name"
                      value={editForm.personalInfo.lastName}
                      onChange={(e) => handleEditFormChange('personalInfo', 'lastName', e.target.value)}
                    />
                    <Input
                      label="Phone"
                      value={editForm.personalInfo.phone}
                      onChange={(e) => handleEditFormChange('personalInfo', 'phone', e.target.value)}
                    />
                    <Select
                      label="Gender"
                      selectedKeys={editForm.personalInfo.gender ? [editForm.personalInfo.gender] : []}
                      onChange={(e) => handleEditFormChange('personalInfo', 'gender', e.target.value)}
                    >
                      <SelectItem key="Male" value="Male">Male</SelectItem>
                      <SelectItem key="Female" value="Female">Female</SelectItem>
                      <SelectItem key="Other" value="Other">Other</SelectItem>
                    </Select>
                    <Input
                      label="Date of Birth"
                      type="date"
                      value={editForm.personalInfo.dateOfBirth}
                      onChange={(e) => handleEditFormChange('personalInfo', 'dateOfBirth', e.target.value)}
                    />
                    <div className="md:col-span-2">
                      <Divider className="my-2" />
                      <p className="text-sm font-medium mb-3">Address</p>
                    </div>
                    <Input
                      label="Street"
                      value={editForm.personalInfo.address.street}
                      onChange={(e) => handleEditFormChange('personalInfo', 'address.street', e.target.value)}
                    />
                    <Input
                      label="City"
                      value={editForm.personalInfo.address.city}
                      onChange={(e) => handleEditFormChange('personalInfo', 'address.city', e.target.value)}
                    />
                    <Input
                      label="State"
                      value={editForm.personalInfo.address.state}
                      onChange={(e) => handleEditFormChange('personalInfo', 'address.state', e.target.value)}
                    />
                    <Input
                      label="Pincode"
                      value={editForm.personalInfo.address.pincode}
                      onChange={(e) => handleEditFormChange('personalInfo', 'address.pincode', e.target.value)}
                    />
                  </div>
                </Tab>

                {/* Academic Information Tab */}
                <Tab key="academic" title="Academic Info">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <Input
                      label="Registration Number"
                      value={editForm.academicInfo.registrationNumber}
                      onChange={(e) => handleEditFormChange('academicInfo', 'registrationNumber', e.target.value)}
                    />
                    <Input
                      label="Course"
                      value={editForm.academicInfo.course}
                      onChange={(e) => handleEditFormChange('academicInfo', 'course', e.target.value)}
                    />
                    <Select
                      label="Branch"
                      selectedKeys={editForm.academicInfo.branch ? [editForm.academicInfo.branch] : []}
                      onChange={(e) => handleEditFormChange('academicInfo', 'branch', e.target.value)}
                    >
                      {BRANCHES.map((branch) => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Batch"
                      selectedKeys={editForm.academicInfo.batch ? [editForm.academicInfo.batch] : []}
                      onChange={(e) => handleEditFormChange('academicInfo', 'batch', e.target.value)}
                    >
                      {BATCHES.map((batch) => (
                        <SelectItem key={batch.toString()} value={batch.toString()}>{batch}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      label="Year of Study"
                      type="number"
                      min="1"
                      max="4"
                      value={editForm.academicInfo.yearOfStudy}
                      onChange={(e) => handleEditFormChange('academicInfo', 'yearOfStudy', e.target.value)}
                    />
                    <Input
                      label="CGPA"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={editForm.academicInfo.cgpa}
                      onChange={(e) => handleEditFormChange('academicInfo', 'cgpa', e.target.value)}
                    />
                    <Input
                      label="Backlogs"
                      type="number"
                      min="0"
                      value={editForm.academicInfo.backlogs}
                      onChange={(e) => handleEditFormChange('academicInfo', 'backlogs', e.target.value)}
                    />
                    <Input
                      label="10th Percentage"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={editForm.academicInfo.tenthPercentage}
                      onChange={(e) => handleEditFormChange('academicInfo', 'tenthPercentage', e.target.value)}
                    />
                    <Input
                      label="12th Percentage"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={editForm.academicInfo.twelfthPercentage}
                      onChange={(e) => handleEditFormChange('academicInfo', 'twelfthPercentage', e.target.value)}
                    />
                  </div>
                </Tab>

                {/* Profile Tab */}
                <Tab key="profile" title="Profile">
                  <div className="space-y-4 pt-4">
                    <Textarea
                      label="Bio"
                      placeholder="Enter student bio..."
                      value={editForm.bio}
                      onChange={(e) => handleEditFormChange('root', 'bio', e.target.value)}
                      minRows={3}
                    />
                    <Input
                      label="Skills (comma-separated)"
                      placeholder="JavaScript, Python, React, Node.js..."
                      value={editForm.skills}
                      onChange={(e) => handleEditFormChange('root', 'skills', e.target.value)}
                    />
                    <Divider className="my-2" />
                    <p className="text-sm font-medium">Links</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="LinkedIn"
                        placeholder="https://linkedin.com/in/..."
                        value={editForm.links.linkedin}
                        onChange={(e) => handleEditFormChange('links', 'linkedin', e.target.value)}
                      />
                      <Input
                        label="GitHub"
                        placeholder="https://github.com/..."
                        value={editForm.links.github}
                        onChange={(e) => handleEditFormChange('links', 'github', e.target.value)}
                      />
                      <Input
                        label="Portfolio"
                        placeholder="https://..."
                        value={editForm.links.portfolio}
                        onChange={(e) => handleEditFormChange('links', 'portfolio', e.target.value)}
                      />
                    </div>
                  </div>
                </Tab>

                {/* Placement Tab */}
                <Tab key="placement" title="Placement">
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Placement Status"
                        selectedKeys={editForm.placementStatus ? [editForm.placementStatus] : []}
                        onChange={(e) => handleEditFormChange('root', 'placementStatus', e.target.value)}
                      >
                        {Object.values(PLACEMENT_STATUS).map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </Select>
                      <div className="flex items-center gap-4">
                        <Switch
                          isSelected={editForm.isEligible}
                          onValueChange={(value) => handleEditFormChange('root', 'isEligible', value)}
                        >
                          Eligible for Placement
                        </Switch>
                      </div>
                    </div>

                    {!editForm.isEligible && (
                      <Textarea
                        label="Eligibility Remarks"
                        placeholder="Reason for ineligibility..."
                        value={editForm.eligibilityRemarks}
                        onChange={(e) => handleEditFormChange('root', 'eligibilityRemarks', e.target.value)}
                      />
                    )}

                    {editForm.placementStatus === 'Placed' && (
                      <>
                        <Divider className="my-2" />
                        <p className="text-sm font-medium">Placement Details</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input
                            label="Company Name"
                            value={editForm.placedAt.companyName}
                            onChange={(e) => handleEditFormChange('placedAt', 'companyName', e.target.value)}
                          />
                          <Input
                            label="Role"
                            value={editForm.placedAt.role}
                            onChange={(e) => handleEditFormChange('placedAt', 'role', e.target.value)}
                          />
                          <Input
                            label="Package (LPA)"
                            type="number"
                            step="0.1"
                            value={editForm.placedAt.package}
                            onChange={(e) => handleEditFormChange('placedAt', 'package', e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </Tab>
              </Tabs>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onEditClose}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={handleSaveStudent}
              isLoading={isUpdating}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminStudents;
