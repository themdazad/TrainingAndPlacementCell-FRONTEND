/**
 * SkillsLinksTab Component
 * Displays skills, bio, and social links
 */
import { Card, CardBody, Divider, Chip, useDisclosure } from '@heroui/react';
import ProfileSection from '../ProfileSection';
import { LinkedInIcon, GitHubIcon, GlobeIcon } from '../../common/Icons';
import EditSkillsModal from '../modals/EditSkillsModal';
import EditBioModal from '../modals/EditBioModal';
import EditSocialLinksModal from '../modals/EditSocialLinksModal';

const SkillsLinksTab = ({ profile, onSave }) => {
  const skillsModal = useDisclosure();
  const bioModal = useDisclosure();
  const linksModal = useDisclosure();

  const hasAnyLink =
    profile?.socialLinks?.linkedIn ||
    profile?.socialLinks?.github ||
    profile?.socialLinks?.portfolio;

  return (
    <>
      <Card>
        <CardBody className="p-6 space-y-6">
          <ProfileSection title="Skills" onEdit={skillsModal.onOpen}>
            <div className="flex flex-wrap gap-2">
              {profile?.skills?.length > 0 ? (
                profile.skills.map((skill) => (
                  <Chip key={skill} variant="bordered">
                    {skill}
                  </Chip>
                ))
              ) : (
                <p className="text-default-400">No skills added yet</p>
              )}
            </div>
          </ProfileSection>

          <Divider />

          <ProfileSection title="Bio" onEdit={bioModal.onOpen}>
            <p className="text-default-600">{profile?.bio || 'No bio added yet'}</p>
          </ProfileSection>

          <Divider />

          <ProfileSection title="Social Links" onEdit={linksModal.onOpen}>
            <div className="space-y-4">
              {profile?.socialLinks?.linkedIn && (
                <a
                  href={profile.socialLinks.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <LinkedInIcon />
                  LinkedIn Profile
                </a>
              )}
              {profile?.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <GitHubIcon />
                  GitHub Profile
                </a>
              )}
              {profile?.socialLinks?.portfolio && (
                <a
                  href={profile.socialLinks.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <GlobeIcon />
                  Portfolio Website
                </a>
              )}
              {!hasAnyLink && <p className="text-default-400">No social links added yet</p>}
            </div>
          </ProfileSection>
        </CardBody>
      </Card>

      <EditSkillsModal
        isOpen={skillsModal.isOpen}
        onClose={skillsModal.onClose}
        profile={profile}
        onSave={onSave}
      />
      <EditBioModal
        isOpen={bioModal.isOpen}
        onClose={bioModal.onClose}
        profile={profile}
        onSave={onSave}
      />
      <EditSocialLinksModal
        isOpen={linksModal.isOpen}
        onClose={linksModal.onClose}
        profile={profile}
        onSave={onSave}
      />
    </>
  );
};

export default SkillsLinksTab;
