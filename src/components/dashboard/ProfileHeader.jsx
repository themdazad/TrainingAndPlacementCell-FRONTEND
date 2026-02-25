/**
 * ProfileHeader Component
 * Displays student profile header with avatar and basic info
 */
import { Card, CardBody, Avatar, Chip } from '@heroui/react';
import { getInitials } from '../../utils/helpers';

const ProfileHeader = ({ user, profile }) => {
  if (!profile) return null;

  return (
    <Card>
      <CardBody className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar name={getInitials(user)} src={profile?.avatar} className="w-24 h-24 text-2xl" />

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{profile?.personalInfo?.fullName}</h2>
            <p className="text-default-500">{user?.email}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <Chip color="primary" variant="flat">
                {profile?.academicInfo?.branch || 'Branch'}
              </Chip>
              <Chip color="secondary" variant="flat">
                Batch {profile?.academicInfo?.batch || 'N/A'}
              </Chip>
              <Chip
                color={profile?.placementStatus === 'Placed' ? 'success' : 'warning'}
                variant="flat"
              >
                {profile?.placementStatus === 'Placed'
                  ? 'Placed'
                  : profile?.placementStatus || 'Seeking Opportunities'}
              </Chip>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-default-400">Registration Number</p>
            <p className="font-mono font-semibold text-lg">
              {profile?.academicInfo?.registrationNumber || 'N/A'}
            </p>
            <p className="text-sm text-default-400 mt-2">CGPA</p>
            <p className="font-semibold text-lg">{profile?.academicInfo?.cgpa || 'N/A'}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileHeader;
