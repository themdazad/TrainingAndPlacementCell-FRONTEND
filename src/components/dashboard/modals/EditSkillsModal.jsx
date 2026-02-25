/**
 * EditSkillsModal Component
 * Modal for editing skills
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
  Chip,
} from '@heroui/react';

const EditSkillsModal = ({ isOpen, onClose, profile, onSave }) => {
  const [skills, setSkills] = React.useState(profile?.skills || []);
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (profile?.skills) {
      setSkills(profile.skills);
    }
  }, [profile?.skills]);

  const handleAddSkill = () => {
    if (inputValue.trim()) {
      const newSkills = inputValue
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      setSkills([...skills, ...newSkills]);
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({ skills });
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
        <ModalHeader>Edit Skills</ModalHeader>
        <ModalBody className="space-y-4">
          <Input
            label="Add Skills"
            placeholder="Enter skills separated by comma"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            description="Press Enter or click Add to add skills"
            endContent={
              <Button size="sm" onPress={handleAddSkill}>
                Add
              </Button>
            }
          />

          <div className="space-y-2">
            <p className="text-sm font-medium">Current Skills:</p>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Chip key={index} variant="flat" onClose={() => handleRemoveSkill(skill)}>
                    {skill}
                  </Chip>
                ))
              ) : (
                <p className="text-sm text-default-400">No skills added yet</p>
              )}
            </div>
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

export default EditSkillsModal;
