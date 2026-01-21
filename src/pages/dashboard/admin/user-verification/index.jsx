/**
 * User Verification Page
 * ------------------------------------------
 * Admin dashboard for managing user verification.
 * - View all registered users with filters (role, status, search)
 * - Toggle verification status for each user
 * - Delete users with confirmation modal
 * - Pagination support
 */
import { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Switch,
  Input,
  Select,
  SelectItem,
  Pagination,
  Spinner,
  Avatar,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import { toast } from '../../../../utils/toast';
import usersAPI from '../../../../api/services/users.api';

const UserVerification = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
  });

  // Filters
  const [filters, setFilters] = useState({
    role: '',
    isVerified: '',
    search: '',
  });

  // Delete modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = {
          page,
          limit: 10,
          ...filters,
        };
        // Remove empty filters
        Object.keys(params).forEach((key) => {
          if (params[key] === '') delete params[key];
        });

        const response = await usersAPI.getAllUsers(params);
        if (response.data.success) {
          setUsers(response.data.data.users);
          setPagination(response.data.data.pagination);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleVerification = async (userId) => {
    setToggling(userId);
    try {
      const response = await usersAPI.toggleUserVerification(userId);
      if (response.data.success) {
        // Update local state
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, isVerified: response.data.data.isVerified } : user
          )
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to toggle verification');
    } finally {
      setToggling(null);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setDeleting(true);
    try {
      const response = await usersAPI.deleteUser(userToDelete._id);
      if (response.data.success) {
        setUsers((prev) => prev.filter((user) => user._id !== userToDelete._id));
        toast.success('User deleted successfully');
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeleting(false);
      setUserToDelete(null);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getRoleColor = (role) => {
    const colors = {
      student: 'primary',
      coordinator: 'secondary',
      recruiter: 'warning',
    };
    return colors[role] || 'default';
  };

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Verified' },
    { key: 'createdAt', label: 'Registered' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">User Verification</h1>
        <p className="text-default-500">Manage user verification status for new registrations</p>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by email..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="md:w-64"
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
            />
            <Select
              placeholder="Filter by role"
              selectedKeys={filters.role ? [filters.role] : []}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="md:w-48"
            >
              <SelectItem key="">All Roles</SelectItem>
              <SelectItem key="student">Student</SelectItem>
              <SelectItem key="coordinator">Coordinator</SelectItem>
              <SelectItem key="recruiter">Recruiter</SelectItem>
            </Select>
            <Select
              placeholder="Verification status"
              selectedKeys={filters.isVerified ? [filters.isVerified] : []}
              onChange={(e) => handleFilterChange('isVerified', e.target.value)}
              className="md:w-48"
            >
              <SelectItem key="">All Status</SelectItem>
              <SelectItem key="true">Verified</SelectItem>
              <SelectItem key="false">Not Verified</SelectItem>
            </Select>
            <Button
              variant="flat"
              onClick={() => {
                setFilters({ role: '', isVerified: '', search: '' });
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Registered Users</h2>
          <Chip size="sm" variant="flat">
            {pagination.totalUsers} users
          </Chip>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div className="flex justify-center py-8">
              <Spinner size="lg" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-default-500">No users found</div>
          ) : (
            <Table aria-label="Users table" removeWrapper>
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={users}>
                {(user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={user.profilePicture}
                          name={user.email?.charAt(0).toUpperCase()}
                          size="sm"
                        />
                        <div>
                          <p className="font-medium">{user.email}</p>
                          <p className="text-xs text-default-400">ID: {user._id.slice(-6)}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip size="sm" color={getRoleColor(user.role)} variant="flat">
                        {user.role}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Switch
                        isSelected={user.isVerified}
                        isDisabled={toggling === user._id}
                        onChange={() => handleToggleVerification(user._id)}
                        size="sm"
                        color="success"
                      />
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-default-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        onClick={() => handleDeleteClick(user)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                total={pagination.totalPages}
                page={pagination.currentPage}
                onChange={(page) => fetchUsers(page)}
              />
            </div>
          )}
        </CardBody>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete user <strong>{userToDelete?.email}</strong>?
            </p>
            <p className="text-sm text-danger mt-2">This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDeleteConfirm} isLoading={deleting}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserVerification;
