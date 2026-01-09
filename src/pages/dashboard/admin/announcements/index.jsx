/**
 * Admin Announcements Management Page
 * Create, edit, and manage announcements
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
  Textarea,
  Skeleton,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Switch,
} from '@heroui/react';
import { toast } from '../../../../utils/toast';
import { announcementsAPI } from '../../../../api';

const CATEGORIES = ['Placement', 'Internship', 'Training', 'Event', 'General'];
const PRIORITIES = ['Low', 'Normal', 'High', 'Urgent'];

const priorityColors = {
  Low: 'default',
  Normal: 'primary',
  High: 'warning',
  Urgent: 'danger',
};

const categoryColors = {
  Placement: 'success',
  Internship: 'primary',
  Training: 'secondary',
  Event: 'warning',
  General: 'default',
};

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    isActive: '',
    page: 1,
  });

  const [form, setForm] = useState({
    title: '',
    description: '',
    link: '',
    category: 'General',
    priority: 'Normal',
    isActive: true,
    publishDate: '',
    expiryDate: '',
  });

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      link: '',
      category: 'General',
      priority: 'Normal',
      isActive: true,
      publishDate: '',
      expiryDate: '',
    });
    setSelectedAnnouncement(null);
  };

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await announcementsAPI.getAllAnnouncements({
        page: filters.page,
        limit: 10,
        search: filters.search || undefined,
        category: filters.category || undefined,
        isActive: filters.isActive || undefined,
      });
      setAnnouncements(response.data.data.announcements || []);
      setPagination(response.data.data.pagination || { page: 1, pages: 1, total: 0 });
    } catch {
      toast.error('Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page]);

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
    fetchAnnouncements();
  };

  const handleOpenCreate = () => {
    resetForm();
    onOpen();
  };

  const handleOpenEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setForm({
      title: announcement.title || '',
      description: announcement.description || '',
      link: announcement.link || '',
      category: announcement.category || 'General',
      priority: announcement.priority || 'Normal',
      isActive: announcement.isActive !== false,
      publishDate: announcement.publishDate ? announcement.publishDate.split('T')[0] : '',
      expiryDate: announcement.expiryDate ? announcement.expiryDate.split('T')[0] : '',
    });
    onOpen();
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        ...form,
        publishDate: form.publishDate || undefined,
        expiryDate: form.expiryDate || undefined,
      };

      if (selectedAnnouncement) {
        await announcementsAPI.updateAnnouncement(selectedAnnouncement._id, data);
        toast.success('Announcement updated successfully');
      } else {
        await announcementsAPI.createAnnouncement(data);
        toast.success('Announcement created successfully');
      }
      onClose();
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (announcement) => {
    try {
      await announcementsAPI.toggleAnnouncementStatus(announcement._id);
      toast.success(`Announcement ${announcement.isActive ? 'deactivated' : 'activated'}`);
      fetchAnnouncements();
    } catch {
      toast.error('Failed to toggle status');
    }
  };

  const handleDelete = async () => {
    if (!selectedAnnouncement) return;

    try {
      await announcementsAPI.deleteAnnouncement(selectedAnnouncement._id);
      toast.success('Announcement deleted successfully');
      onDeleteClose();
      setSelectedAnnouncement(null);
      fetchAnnouncements();
    } catch {
      toast.error('Failed to delete announcement');
    }
  };

  const openDeleteModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    onDeleteOpen();
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'priority', label: 'Priority' },
    { key: 'status', label: 'Status' },
    { key: 'publishDate', label: 'Publish Date' },
    { key: 'actions', label: 'Actions' },
  ];

  const renderCell = (announcement, columnKey) => {
    switch (columnKey) {
      case 'title':
        return (
          <div className="max-w-md">
            <p className="font-medium truncate">{announcement.title}</p>
            {announcement.link && (
              <a
                href={announcement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                View Link
              </a>
            )}
          </div>
        );
      case 'category':
        return (
          <Chip size="sm" color={categoryColors[announcement.category]} variant="flat">
            {announcement.category}
          </Chip>
        );
      case 'priority':
        return (
          <Chip size="sm" color={priorityColors[announcement.priority]} variant="dot">
            {announcement.priority}
          </Chip>
        );
      case 'status':
        return (
          <Chip size="sm" color={announcement.isActive ? 'success' : 'default'} variant="flat">
            {announcement.isActive ? 'Active' : 'Inactive'}
          </Chip>
        );
      case 'publishDate':
        return (
          <span className="text-sm">
            {announcement.publishDate
              ? new Date(announcement.publishDate).toLocaleDateString('en-IN')
              : '-'}
          </span>
        );
      case 'actions':
        return (
          <div className="flex gap-1">
            <Button size="sm" variant="flat" color="primary" onPress={() => handleOpenEdit(announcement)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="flat"
              color={announcement.isActive ? 'warning' : 'success'}
              onPress={() => handleToggleStatus(announcement)}
            >
              {announcement.isActive ? 'Deactivate' : 'Activate'}
            </Button>
            <Button size="sm" variant="flat" color="danger" onPress={() => openDeleteModal(announcement)}>
              Delete
            </Button>
          </div>
        );
      default:
        return announcement[columnKey];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="text-default-500">Manage announcements shown on the homepage</p>
        </div>
        <Button color="primary" onPress={handleOpenCreate}>
          + New Announcement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-center">
            <p className="text-2xl font-bold">{pagination.total || 0}</p>
            <p className="text-sm text-default-500">Total Announcements</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-2xl font-bold text-success">
              {announcements.filter((a) => a.isActive).length}
            </p>
            <p className="text-sm text-default-500">Active</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-2xl font-bold text-warning">
              {announcements.filter((a) => a.priority === 'High' || a.priority === 'Urgent').length}
            </p>
            <p className="text-sm text-default-500">High Priority</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-2xl font-bold text-primary">
              {announcements.filter((a) => a.category === 'Placement').length}
            </p>
            <p className="text-sm text-default-500">Placement Related</p>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search announcements..."
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
              placeholder="Category"
              selectedKeys={filters.category ? [filters.category] : []}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full md:w-40"
            >
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Status"
              selectedKeys={filters.isActive ? [filters.isActive] : []}
              onChange={(e) => setFilters((prev) => ({ ...prev, isActive: e.target.value }))}
              className="w-full md:w-32"
            >
              <SelectItem key="true" value="true">Active</SelectItem>
              <SelectItem key="false" value="false">Inactive</SelectItem>
            </Select>
            <Button color="primary" onPress={handleSearch}>
              Search
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Announcements Table */}
      <Card>
        <CardBody className="p-0">
          <Table aria-label="Announcements table" removeWrapper>
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody
              items={announcements}
              isLoading={loading}
              loadingContent={<Skeleton className="w-full h-10" />}
              emptyContent="No announcements found"
            >
              {(announcement) => (
                <TableRow key={announcement._id}>
                  {(columnKey) => <TableCell>{renderCell(announcement, columnKey)}</TableCell>}
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

      {/* Create/Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>{selectedAnnouncement ? 'Edit Announcement' : 'New Announcement'}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Title"
                placeholder="Enter announcement title"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                isRequired
              />
              <Textarea
                label="Description"
                placeholder="Enter announcement description (optional)"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                minRows={3}
              />
              <Input
                label="Link"
                placeholder="https://example.com (optional)"
                value={form.link}
                onChange={(e) => setForm((prev) => ({ ...prev, link: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Category"
                  selectedKeys={[form.category]}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                >
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Priority"
                  selectedKeys={[form.priority]}
                  onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}
                >
                  {PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Publish Date"
                  type="date"
                  value={form.publishDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, publishDate: e.target.value }))}
                />
                <Input
                  label="Expiry Date"
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, expiryDate: e.target.value }))}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  isSelected={form.isActive}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, isActive: value }))}
                >
                  Active
                </Switch>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSubmit} isLoading={isSubmitting}>
              {selectedAnnouncement ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} size="sm">
        <ModalContent>
          <ModalHeader>Delete Announcement</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this announcement?</p>
            <p className="text-sm text-default-500 mt-2">"{selectedAnnouncement?.title}"</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onDeleteClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminAnnouncements;
