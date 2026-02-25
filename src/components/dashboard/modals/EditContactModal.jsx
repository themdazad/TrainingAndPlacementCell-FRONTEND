/**
 * EditContactModal Component
 * Modal for editing contact information
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

const EditContactModal = ({ isOpen, onClose, user, onSave }) => {
  const [phone, setPhone] = React.useState(user?.phone || '');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user?.phone) setPhone(user.phone);
  }, [user?.phone]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ phone });
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
        <ModalHeader>Edit Contact Information</ModalHeader>
        <ModalBody className="space-y-4">
          <Input
            label="Email Address"
            value={user?.email}
            isDisabled
            description="Email cannot be changed"
          />
          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1234567890"
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

export default EditContactModal;
