/**
 * EditProfileModal Component
 * Modal for editing student profile information
 */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Divider,
} from '@heroui/react';

const EditProfileModal = ({ isOpen, onClose, formData, loading, onInputChange, onSave }) => {
  const handleSaveClick = async () => {
    const success = await onSave();
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody className="space-y-6">
          {/* Personal Information */}
          <Input
            label="Full Name"
            value={formData.personalInfo.fullName}
            onChange={(e) => onInputChange('personalInfo.fullName', e.target.value)}
          />

          <Divider />

          {/* Academic Information */}
          <h4 className="font-medium">Academic Information</h4>
          <Input
            label="Registration Number"
            value={formData.academicInfo.registrationNumber}
            onChange={(e) => onInputChange('academicInfo.registrationNumber', e.target.value)}
            disabled
          />
          <Input
            label="Course"
            value={formData.academicInfo.course || ''}
            onChange={(e) => onInputChange('academicInfo.course', e.target.value)}
          />
          <Input
            label="Active Backlogs"
            type="number"
            value={formData.academicInfo.backlogs}
            onChange={(e) => onInputChange('academicInfo.backlogs', parseInt(e.target.value))}
            disabled
          />

          <Divider />

          {/* Placement Information */}
          <h4 className="font-medium">Placement Information</h4>
          <Input
            label="Placement Status"
            value={formData.placementStatus}
            onChange={(e) => onInputChange('placementStatus', e.target.value)}
          />

          <Divider />

          {/* Bio and Skills */}
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={(e) => onInputChange('bio', e.target.value)}
          />
          <Input
            label="Skills"
            placeholder="Comma separated (e.g., JavaScript, React, Node.js)"
            value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
            onChange={(e) => onInputChange('skills', e.target.value)}
          />

          <Divider />

          {/* Social Links */}
          <h4 className="font-medium">Social Links</h4>
          <Input
            label="LinkedIn URL"
            placeholder="https://linkedin.com/in/username"
            value={formData.socialLinks.linkedIn}
            onChange={(e) => onInputChange('socialLinks.linkedIn', e.target.value)}
          />
          <Input
            label="GitHub URL"
            placeholder="https://github.com/username"
            value={formData.socialLinks.github}
            onChange={(e) => onInputChange('socialLinks.github', e.target.value)}
          />
          <Input
            label="Portfolio URL"
            placeholder="https://yourportfolio.com"
            value={formData.socialLinks.portfolio}
            onChange={(e) => onInputChange('socialLinks.portfolio', e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" isLoading={loading} onPress={handleSaveClick}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
