/**
 * EditAcademicModal Component
 * Modal for editing academic information
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
import { toast } from 'sonner';

const EditAcademicModal = ({ isOpen, onClose, profile, onSave }) => {
  const [formData, setFormData] = React.useState({
    cgpa: profile?.academicInfo?.cgpa || '',
    backlogs: profile?.academicInfo?.backlogs || 0,
    tenthPercentage: profile?.academicInfo?.tenthPercentage || '',
    twelfthPercentage: profile?.academicInfo?.twelfthPercentage || '',
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (profile?.academicInfo) {
      setFormData({
        cgpa: profile.academicInfo.cgpa || '',
        backlogs: profile.academicInfo.backlogs || 0,
        tenthPercentage: profile.academicInfo.tenthPercentage || '',
        twelfthPercentage: profile.academicInfo.twelfthPercentage || '',
      });
    }
  }, [profile?.academicInfo]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Validate inputs
      const cgpa = parseFloat(formData.cgpa);
      const backlogs = parseInt(formData.backlogs, 10);
      const tenthPercentage = parseFloat(formData.tenthPercentage);
      const twelfthPercentage = parseFloat(formData.twelfthPercentage);

      if (cgpa && (cgpa < 0 || cgpa > 10)) {
        toast.error('CGPA must be between 0 and 10');
        return;
      }

      if (backlogs < 0) {
        toast.error('Backlogs cannot be negative');
        return;
      }

      if (tenthPercentage && (tenthPercentage < 0 || tenthPercentage > 100)) {
        toast.error('10th Percentage must be between 0 and 100');
        return;
      }

      if (twelfthPercentage && (twelfthPercentage < 0 || twelfthPercentage > 100)) {
        toast.error('12th Percentage must be between 0 and 100');
        return;
      }

      const result = await onSave({
        academicInfo: {
          ...profile?.academicInfo,
          cgpa: cgpa || null,
          backlogs: backlogs || 0,
          tenthPercentage: tenthPercentage || null,
          twelfthPercentage: twelfthPercentage || null,
        },
      });

      if (result) {
        onClose();
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to update academic information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>Edit Academic Information</ModalHeader>
        <ModalBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Registration Number"
              value={profile?.academicInfo?.registrationNumber}
              isDisabled
              description="Cannot be changed"
            />
            <Input
              label="Branch"
              value={profile?.academicInfo?.branch}
              isDisabled
              description="Cannot be changed"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="CGPA"
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={formData.cgpa}
              onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
              placeholder="8.5"
            />
            <Input
              label="Batch"
              value={profile?.academicInfo?.batch}
              isDisabled
              description="Cannot be changed"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="10th Percentage"
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.tenthPercentage}
              onChange={(e) => setFormData({ ...formData, tenthPercentage: e.target.value })}
              placeholder="85.5"
            />
            <Input
              label="12th Percentage"
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.twelfthPercentage}
              onChange={(e) => setFormData({ ...formData, twelfthPercentage: e.target.value })}
              placeholder="90.0"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Active Backlogs"
              type="number"
              min="0"
              value={formData.backlogs}
              onChange={(e) => setFormData({ ...formData, backlogs: e.target.value })}
              placeholder="0"
              description="Number of active backlogs"
            />
          </div>
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

export default EditAcademicModal;
