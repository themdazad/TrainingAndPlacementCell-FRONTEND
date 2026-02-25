/**
 * EditSocialLinksModal Component
 * Modal for editing social media links
 */
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@heroui/react';

const EditSocialLinksModal = ({ isOpen, onClose, profile, onSave }) => {
  const [formData, setFormData] = React.useState({
    linkedIn: profile?.socialLinks?.linkedIn || '',
    github: profile?.socialLinks?.github || '',
    portfolio: profile?.socialLinks?.portfolio || '',
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (profile?.socialLinks) {
      setFormData({
        linkedIn: profile.socialLinks.linkedIn || '',
        github: profile.socialLinks.github || '',
        portfolio: profile.socialLinks.portfolio || '',
      });
    }
  }, [profile?.socialLinks]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ socialLinks: formData });
      onClose();
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>Edit Social Links</ModalHeader>
        <ModalBody className="space-y-4">
          <Input
            label="LinkedIn URL"
            placeholder="https://linkedin.com/in/username"
            value={formData.linkedIn}
            onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
          />
          <Input
            label="GitHub URL"
            placeholder="https://github.com/username"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          />
          <Input
            label="Portfolio URL"
            placeholder="https://yourportfolio.com"
            value={formData.portfolio}
            onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
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
  );
};

export default EditSocialLinksModal;
