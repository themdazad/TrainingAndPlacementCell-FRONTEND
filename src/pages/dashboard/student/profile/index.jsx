/**
 * Student Profile Page
 * View and edit student profile information
 */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Avatar,
  Chip,
  Divider,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import { toast } from '../../../../utils/toast';
import { selectUser, selectProfile, setUser } from '../../../../store/authSlice';
import { authAPI } from '../../../../api';
import { formatDate, getFullName, getInitials } from '../../../../utils/helpers';
import usersAPI from '../../../../api/services/users.api';

const ProfileSection = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    {children}
  </div>
);

const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-start gap-3">
    {icon && <div className="p-2 rounded-lg bg-default-100 text-default-500">{icon}</div>}
    <div>
      <p className="text-sm text-default-400">{label}</p>
      <p className="font-medium">{value || '-'}</p>
    </div>
  </div>
);

const StudentProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('personal');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    // Academic
    rollNumber: '',
    branch: '',
    batch: '',
    cgpa: '',
    // Profile
    bio: '',
    skills: '',
    linkedIn: '',
    github: '',
    portfolio: '',
  });
  const [studentProfile, setStudentProfile] = useState(null);
  useEffect(() => {
    async function fetchProfile() {
      if (user?.id) {
        const data = await usersAPI.getStudentById(user.id); // Make sure this returns a promise
        setStudentProfile(data);
      }
    }
    fetchProfile();
  }, [user?.id]);
  console.log('Student Profile:', studentProfile);

  useEffect(() => {
    if (user || profile) {
      setFormData({
        firstName: user?.firstName || profile?.personalInfo?.firstName || '',
        lastName: user?.lastName || profile?.personalInfo?.lastName || '',
        phone: user?.phone || profile?.personalInfo?.phone || '',
        rollNumber: profile?.academicInfo?.registrationNumber || '',
        branch: profile?.academicInfo?.branch || '',
        batch: profile?.academicInfo?.batch || '',
        cgpa: profile?.academicInfo?.cgpa || '',
        bio: profile?.bio || '',
        skills: profile?.skills?.join(', ') || '',
        linkedIn: profile?.links?.linkedin || '',
        github: profile?.links?.github || '',
        portfolio: profile?.links?.portfolio || '',
      });
    }
  }, [user, profile]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        profile: {
          bio: formData.bio,
          skills: formData.skills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          socialLinks: {
            linkedIn: formData.linkedIn,
            github: formData.github,
            portfolio: formData.portfolio,
          },
        },
      };

      const response = await authAPI.updateProfile(updateData);
      // Update Redux state with new user data
      if (response.user) {
        dispatch(setUser(response.user));
      }
      toast.success('Profile updated successfully');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-default-500">Manage your personal and academic information</p>
        </div>
        <Button color="primary" onPress={onOpen}>
          Edit Profile
        </Button>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar name={getInitials(user)} src={profile?.avatar} className="w-24 h-24 text-2xl" />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{getFullName(user)}</h2>
              <p className="text-default-500">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                <Chip color="primary" variant="flat">
                  {profile?.branch || 'Branch'}
                </Chip>
                <Chip color="secondary" variant="flat">
                  Batch {profile?.batch || 'N/A'}
                </Chip>
                <Chip color="success" variant="flat">
                  {profile?.placementStatus === 'placed' ? 'Placed' : 'Seeking Opportunities'}
                </Chip>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-default-400">Registration Number</p>
              <p className="font-mono font-semibold text-lg">{profile?.rollNumber || 'N/A'}</p>
              <p className="text-sm text-default-400 mt-2">CGPA</p>
              <p className="font-semibold text-lg">{profile?.academicInfo?.cgpa || 'N/A'}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Profile Tabs */}
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
        color="primary"
        variant="underlined"
      >
        <Tab key="personal" title="Personal Info" />
        <Tab key="academic" title="Academic Info" />
        <Tab key="skills" title="Skills & Links" />
        <Tab key="documents" title="Documents" />
      </Tabs>

      {/* Tab Content */}
      {selectedTab === 'personal' && (
        <Card>
          <CardBody className="p-6 space-y-6">
            <ProfileSection title="Contact Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow
                  label="Email Address"
                  value={user?.email}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                />
                <InfoRow
                  label="Phone Number"
                  value={user?.phone}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  }
                />
              </div>
            </ProfileSection>

            <Divider />

            <ProfileSection title="Account Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow label="Account Created" value={formatDate(user?.createdAt)} />
                <InfoRow label="Email Verified" value={user?.isEmailVerified ? 'Yes' : 'No'} />
              </div>
            </ProfileSection>
          </CardBody>
        </Card>
      )}

      {selectedTab === 'academic' && (
        <Card>
          <CardBody className="p-6 space-y-6">
            <ProfileSection title="Academic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoRow label="Registration Number" value={profile?.rollNumber} />
                <InfoRow label="Branch" value={profile?.branch} />
                <InfoRow label="Batch" value={profile?.batch} />
                <InfoRow label="CGPA" value={profile?.academicInfo?.cgpa} />
                <InfoRow
                  label="10th Percentage"
                  value={
                    profile?.academicInfo?.tenthPercentage
                      ? `${profile.academicInfo.tenthPercentage}%`
                      : '-'
                  }
                />
                <InfoRow
                  label="12th Percentage"
                  value={
                    profile?.academicInfo?.twelfthPercentage
                      ? `${profile.academicInfo.twelfthPercentage}%`
                      : '-'
                  }
                />
              </div>
            </ProfileSection>

            <Divider />

            <ProfileSection title="Active Backlogs">
              <div className="flex items-center gap-4">
                <Chip
                  color={profile?.academicInfo?.activeBacklogs > 0 ? 'danger' : 'success'}
                  variant="flat"
                  size="lg"
                >
                  {profile?.academicInfo?.activeBacklogs || 0} Active Backlogs
                </Chip>
              </div>
            </ProfileSection>
          </CardBody>
        </Card>
      )}

      {selectedTab === 'skills' && (
        <Card>
          <CardBody className="p-6 space-y-6">
            <ProfileSection title="Skills">
              <div className="flex flex-wrap gap-2">
                {profile?.skills?.length > 0 ? (
                  profile.skills.map((skill) => (
                    <Chip key={skill} variant="bordered">
                      {skill}
                    </Chip>
                  ))
                ) : (
                  <p className="text-default-400">No skills added yet</p>
                )}
              </div>
            </ProfileSection>

            <Divider />

            <ProfileSection title="Bio">
              <p className="text-default-600">{profile?.bio || 'No bio added yet'}</p>
            </ProfileSection>

            <Divider />

            <ProfileSection title="Social Links">
              <div className="space-y-4">
                {profile?.socialLinks?.linkedIn && (
                  <a
                    href={profile.socialLinks.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn Profile
                  </a>
                )}
                {profile?.socialLinks?.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub Profile
                  </a>
                )}
                {profile?.socialLinks?.portfolio && (
                  <a
                    href={profile.socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    Portfolio Website
                  </a>
                )}
                {!profile?.socialLinks?.linkedIn &&
                  !profile?.socialLinks?.github &&
                  !profile?.socialLinks?.portfolio && (
                    <p className="text-default-400">No social links added yet</p>
                  )}
              </div>
            </ProfileSection>
          </CardBody>
        </Card>
      )}

      {selectedTab === 'documents' && (
        <Card>
          <CardBody className="p-6 space-y-6">
            <ProfileSection title="Uploaded Documents">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile?.documents?.resume && (
                  <Card className="bg-default-50">
                    <CardBody className="flex flex-row items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Resume</p>
                        <p className="text-sm text-default-400">PDF Document</p>
                      </div>
                      <Button
                        size="sm"
                        variant="flat"
                        as="a"
                        href={profile.documents.resume}
                        target="_blank"
                      >
                        View
                      </Button>
                    </CardBody>
                  </Card>
                )}
                {!profile?.documents?.resume && (
                  <Card className="bg-default-50 border-2 border-dashed border-default-200">
                    <CardBody className="flex flex-col items-center justify-center py-8">
                      <svg
                        className="w-12 h-12 text-default-300 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-default-400">No resume uploaded</p>
                      <Button size="sm" color="primary" variant="flat" className="mt-2">
                        Upload Resume
                      </Button>
                    </CardBody>
                  </Card>
                )}
              </div>
            </ProfileSection>
          </CardBody>
        </Card>
      )}

      {/* Edit Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalBody className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
            />
            <Input
              label="Skills"
              placeholder="Comma separated (e.g., JavaScript, React, Node.js)"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
            />
            <Divider />
            <h4 className="font-medium">Social Links</h4>
            <Input
              label="LinkedIn URL"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedIn}
              onChange={(e) => handleInputChange('linkedIn', e.target.value)}
            />
            <Input
              label="GitHub URL"
              placeholder="https://github.com/username"
              value={formData.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
            />
            <Input
              label="Portfolio URL"
              placeholder="https://yourportfolio.com"
              value={formData.portfolio}
              onChange={(e) => handleInputChange('portfolio', e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" isLoading={loading} onPress={handleSave}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default StudentProfile;
