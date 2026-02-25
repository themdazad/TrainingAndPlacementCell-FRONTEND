/**
 * PersonalInfoTab Component
 * Displays personal and contact information
 */
import { Card, CardBody, Divider, useDisclosure } from '@heroui/react';
import ProfileSection from '../ProfileSection';
import InfoRow from '../InfoRow';
import { formatDate } from '../../../utils/helpers';
import { EnvelopeIcon, PhoneIcon } from '../../common/Icons';
import EditContactModal from '../modals/EditContactModal';

const PersonalInfoTab = ({ user, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card>
        <CardBody className="p-6 space-y-6">
          <ProfileSection title="Contact Information" onEdit={onOpen}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoRow label="Email Address" value={user?.email} icon={<EnvelopeIcon />} />
              <InfoRow label="Phone Number" value={user?.phone} icon={<PhoneIcon />} />
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

      <EditContactModal isOpen={isOpen} onClose={onClose} user={user} onSave={onSave} />
    </>
  );
};

export default PersonalInfoTab;
