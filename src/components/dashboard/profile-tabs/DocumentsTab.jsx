/**
 * DocumentsTab Component
 * Displays uploaded documents like resume
 */
import { Card, CardBody, Button } from '@heroui/react';
import ProfileSection from '../ProfileSection';
import { DocumentIcon } from '../../common/Icons';

const DocumentsTab = ({ profile }) => {
  return (
    <Card>
      <CardBody className="p-6 space-y-6">
        <ProfileSection title="Uploaded Documents">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile?.documents?.resume ? (
              <Card className="bg-default-50">
                <CardBody className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <DocumentIcon />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Resume</p>
                    <p className="text-sm text-default-400">PDF Document</p>
                  </div>
                  <Button
                    size="sm"
                    variant="flat"
                    as="a"
                    href={profile.documents.resume}
                    target="_blank"
                  >
                    View
                  </Button>
                </CardBody>
              </Card>
            ) : (
              <Card className="bg-default-50 border-2 border-dashed border-default-200">
                <CardBody className="flex flex-col items-center justify-center py-8">
                  <DocumentIcon className="w-12 h-12 text-default-300 mb-2" />
                  <p className="text-default-400">No resume uploaded</p>
                  <Button size="sm" color="primary" variant="flat" className="mt-2">
                    Upload Resume
                  </Button>
                </CardBody>
              </Card>
            )}
          </div>
        </ProfileSection>
      </CardBody>
    </Card>
  );
};

export default DocumentsTab;
