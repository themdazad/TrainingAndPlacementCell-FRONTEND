/**
 * EditBioModal Component
 * Modal for editing bio
 */
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from '@heroui/react';

const EditBioModal = ({ isOpen, onClose, profile, onSave }) => {
  const [bio, setBio] = React.useState(profile?.bio || '');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (profile?.bio) {
      setBio(profile.bio);
    }
  }, [profile?.bio]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ bio });
      onClose();
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader>Edit Bio</ModalHeader>
        <ModalBody>
          <Textarea
            label="About You"
            placeholder="Tell us about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            minRows={5}
            maxRows={10}
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

export default EditBioModal;
