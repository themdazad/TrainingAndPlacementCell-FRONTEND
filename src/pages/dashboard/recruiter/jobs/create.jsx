/**
 * Create Job Posting Page
 * Form for recruiters to create new job postings
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
} from '@heroui/react';
import { toast } from '../../../../utils/toast';
import { useJobs } from '../../../../hooks';
import PATHS from '../../../../constants/paths';
import { JOB_TYPES, BRANCHES, BATCHES } from '../../../../constants/api.constants';

const CreateJob = () => {
  const navigate = useNavigate();
  const { createJob, loading } = useJobs();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    location: '',
    skillsRequired: '',
    
    // Compensation
    ctc: '',
    baseSalary: '',
    bonus: '',
    
    // Eligibility
    minCgpa: '',
    branches: [],
    batches: [],
    maxBacklogs: '0',
    
    // Dates
    applicationDeadline: '',
    joiningDate: '',
    
    // Additional
    openings: '1',
    selectionProcess: '',
    perks: '',
    jobDescriptionUrl: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (asDraft = false) => {
    // Validation
    if (!formData.title || !formData.description || !formData.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        location: formData.location,
        skillsRequired: formData.skillsRequired.split(',').map(s => s.trim()).filter(Boolean),
        compensation: {
          ctc: parseFloat(formData.ctc) || undefined,
          baseSalary: parseFloat(formData.baseSalary) || undefined,
          bonus: parseFloat(formData.bonus) || undefined,
        },
        eligibility: {
          minCgpa: parseFloat(formData.minCgpa) || undefined,
          branches: formData.branches,
          batches: formData.batches.map(b => parseInt(b)),
          maxActiveBacklogs: parseInt(formData.maxBacklogs) || 0,
        },
        applicationDeadline: formData.applicationDeadline || undefined,
        joiningDate: formData.joiningDate || undefined,
        openings: parseInt(formData.openings) || 1,
        selectionProcess: formData.selectionProcess.split('\n').filter(Boolean),
        perks: formData.perks.split(',').map(p => p.trim()).filter(Boolean),
        jobDescriptionUrl: formData.jobDescriptionUrl || undefined,
        status: asDraft ? 'Draft' : 'Pending Approval',
      };

      await createJob(jobData);
      toast.success(asDraft ? 'Job saved as draft' : 'Job submitted for approval');
      navigate(PATHS.RECRUITER.JOBS);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create job');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Post a New Job</h1>
          <p className="text-default-500">Fill in the details to create a job posting</p>
        </div>
        <Button variant="light" onPress={() => navigate(-1)}>
          Cancel
        </Button>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Basic Information</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Job Title"
            placeholder="e.g., Software Engineer"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            isRequired
          />
          <Textarea
            label="Job Description"
            placeholder="Describe the role, responsibilities, and requirements..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            minRows={4}
            isRequired
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Job Type"
              placeholder="Select job type"
              selectedKeys={formData.type ? [formData.type] : []}
              onChange={(e) => handleInputChange('type', e.target.value)}
              isRequired
            >
              {Object.values(JOB_TYPES).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="Location"
              placeholder="e.g., Bangalore, Remote, Hybrid"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
          <Input
            label="Required Skills"
            placeholder="Comma-separated (e.g., JavaScript, React, Node.js)"
            value={formData.skillsRequired}
            onChange={(e) => handleInputChange('skillsRequired', e.target.value)}
          />
        </CardBody>
      </Card>

      {/* Compensation */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Compensation</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="number"
              label="CTC (Annual in INR)"
              placeholder="e.g., 1200000"
              value={formData.ctc}
              onChange={(e) => handleInputChange('ctc', e.target.value)}
              startContent={<span className="text-default-400">₹</span>}
            />
            <Input
              type="number"
              label="Base Salary"
              placeholder="e.g., 1000000"
              value={formData.baseSalary}
              onChange={(e) => handleInputChange('baseSalary', e.target.value)}
              startContent={<span className="text-default-400">₹</span>}
            />
            <Input
              type="number"
              label="Joining Bonus"
              placeholder="e.g., 100000"
              value={formData.bonus}
              onChange={(e) => handleInputChange('bonus', e.target.value)}
              startContent={<span className="text-default-400">₹</span>}
            />
          </div>
          <Input
            label="Perks & Benefits"
            placeholder="Comma-separated (e.g., Health Insurance, ESOPs, Flexible Hours)"
            value={formData.perks}
            onChange={(e) => handleInputChange('perks', e.target.value)}
          />
        </CardBody>
      </Card>

      {/* Eligibility Criteria */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Eligibility Criteria</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Minimum CGPA"
              placeholder="e.g., 6.5"
              value={formData.minCgpa}
              onChange={(e) => handleInputChange('minCgpa', e.target.value)}
              min="0"
              max="10"
              step="0.1"
            />
            <Input
              type="number"
              label="Maximum Active Backlogs"
              placeholder="0"
              value={formData.maxBacklogs}
              onChange={(e) => handleInputChange('maxBacklogs', e.target.value)}
              min="0"
            />
          </div>

          <div>
            <p className="text-sm text-default-600 mb-2">Eligible Branches</p>
            <CheckboxGroup
              value={formData.branches}
              onChange={(value) => handleInputChange('branches', value)}
              orientation="horizontal"
              classNames={{ wrapper: 'gap-4' }}
            >
              {BRANCHES.map((branch) => (
                <Checkbox key={branch} value={branch} size="sm">
                  {branch}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>

          <div>
            <p className="text-sm text-default-600 mb-2">Eligible Batches</p>
            <CheckboxGroup
              value={formData.batches}
              onChange={(value) => handleInputChange('batches', value)}
              orientation="horizontal"
              classNames={{ wrapper: 'gap-4' }}
            >
              {BATCHES.map((batch) => (
                <Checkbox key={batch.toString()} value={batch.toString()} size="sm">
                  {batch}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </CardBody>
      </Card>

      {/* Dates & Process */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Dates & Selection Process</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="date"
              label="Application Deadline"
              value={formData.applicationDeadline}
              onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
            />
            <Input
              type="date"
              label="Expected Joining Date"
              value={formData.joiningDate}
              onChange={(e) => handleInputChange('joiningDate', e.target.value)}
            />
            <Input
              type="number"
              label="Number of Openings"
              placeholder="1"
              value={formData.openings}
              onChange={(e) => handleInputChange('openings', e.target.value)}
              min="1"
            />
          </div>
          <Textarea
            label="Selection Process"
            placeholder="Enter each round on a new line (e.g., Online Test, Technical Interview, HR Interview)"
            value={formData.selectionProcess}
            onChange={(e) => handleInputChange('selectionProcess', e.target.value)}
            minRows={3}
          />
          <Input
            label="Job Description URL (Optional)"
            placeholder="Link to detailed JD"
            value={formData.jobDescriptionUrl}
            onChange={(e) => handleInputChange('jobDescriptionUrl', e.target.value)}
          />
        </CardBody>
      </Card>

      {/* Actions */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              variant="flat"
              isLoading={loading}
              onPress={() => handleSubmit(true)}
            >
              Save as Draft
            </Button>
            <Button
              color="primary"
              isLoading={loading}
              onPress={() => handleSubmit(false)}
            >
              Submit for Approval
            </Button>
          </div>
          <p className="text-xs text-default-400 text-center mt-4">
            Job postings require admin approval before being visible to students.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateJob;
