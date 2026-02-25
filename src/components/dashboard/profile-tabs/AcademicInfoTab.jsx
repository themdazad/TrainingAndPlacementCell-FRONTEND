/**
 * AcademicInfoTab Component
 * Displays academic information and backlogs
 */
import { Card, CardBody, Divider, Chip, useDisclosure } from '@heroui/react';
import ProfileSection from '../ProfileSection';
import InfoRow from '../InfoRow';
import EditAcademicModal from '../modals/EditAcademicModal';

const AcademicInfoTab = ({ profile, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card>
        <CardBody className="p-6 space-y-6">
          <ProfileSection title="Academic Information" onEdit={onOpen}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoRow
                label="Registration Number"
                value={profile?.academicInfo?.registrationNumber}
              />
              <InfoRow label="Branch" value={profile?.academicInfo?.branch} />
              <InfoRow label="Batch" value={profile?.academicInfo?.batch} />
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
                color={profile?.academicInfo?.backlogs > 0 ? 'danger' : 'success'}
                variant="flat"
                size="lg"
              >
                {profile?.academicInfo?.backlogs || 0} Active Backlogs
              </Chip>
            </div>
          </ProfileSection>
        </CardBody>
      </Card>

      <EditAcademicModal isOpen={isOpen} onClose={onClose} profile={profile} onSave={onSave} />
    </>
  );
};

export default AcademicInfoTab;
