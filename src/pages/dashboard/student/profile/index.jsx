/**
 * Student Profile Page
 * View and edit student profile information
 */
import { useState } from 'react';
import { Button, Tabs, Tab, useDisclosure } from '@heroui/react';

// Components
import ProfileHeader from '../../../../components/dashboard/ProfileHeader';
import PersonalInfoTab from '../../../../components/dashboard/profile-tabs/PersonalInfoTab';
import AcademicInfoTab from '../../../../components/dashboard/profile-tabs/AcademicInfoTab';
import SkillsLinksTab from '../../../../components/dashboard/profile-tabs/SkillsLinksTab';
import DocumentsTab from '../../../../components/dashboard/profile-tabs/DocumentsTab';
import EditProfileModal from '../../../../components/dashboard/EditProfileModal';

// Hooks
import useProfileForm from '../../../../hooks/useProfileForm';

const StudentProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState('personal');

  const {
    user,
    studentProfile,
    formData,
    loading,
    handleInputChange,
    handleSave,
    handleSectionSave,
  } = useProfileForm();

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
      <ProfileHeader user={user} profile={studentProfile} />

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
      {selectedTab === 'personal' && <PersonalInfoTab user={user} onSave={handleSectionSave} />}
      {selectedTab === 'academic' && (
        <AcademicInfoTab profile={studentProfile} onSave={handleSectionSave} />
      )}
      {selectedTab === 'skills' && (
        <SkillsLinksTab profile={studentProfile} onSave={handleSectionSave} />
      )}
      {selectedTab === 'documents' && <DocumentsTab profile={studentProfile} />}

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        loading={loading}
        onInputChange={handleInputChange}
        onSave={handleSave}
      />
    </div>
  );
};

export default StudentProfile;
