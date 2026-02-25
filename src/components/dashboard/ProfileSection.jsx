/**
 * ProfileSection Component
 * Displays a section with title and children
 */
import { Button } from '@heroui/react';

const ProfileSection = ({ title, children, onEdit, editLabel = 'Edit' }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {onEdit && (
        <Button size="sm" variant="flat" color="primary" onPress={onEdit}>
          {editLabel}
        </Button>
      )}
    </div>
    {children}
  </div>
);

export default ProfileSection;
