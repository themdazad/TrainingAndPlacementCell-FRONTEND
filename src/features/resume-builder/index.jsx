import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Input, Button, Card, Tabs, Tab, Textarea } from '@heroui/react';
import {
  Download,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Settings,
  Trash,
  Linkedin,
  Github,
} from 'lucide-react';

const ResumeBuilder = () => {
  // 1. Centralized State based on your actual resume structure
  // Default resume data with placeholder information for empty fields
  const defaultResumeData = {
    personal: {
      name: 'Full Name',
      phone: '9876543210',
      email: 'email@example.com',
      address: 'City, State - Pincode',
      summary:
        'Add a brief professional summary here. It can include your career goals, key skills, and what you bring to potential employers.',
      github: '',
      linkedin: '',
    },
    skills: [
      { label: 'Languages', content: 'C, C++, Python, MATLAB' },
      {
        label: 'Electrical',
        content: 'Circuit Design, Power Systems, Control Systems, PLC Programming',
      },
    ],
    education: [
      // Placeholder entry
      {
        institution: 'Your Institution Name',
        session: 'Year - Year',
        degree: 'Your Degree',
        specialization: 'Your Specialization',
        board: 'Your Board/University',
        result: 'Your Result',
      },
    ],
    experience: [
      // Placeholder entry
      {
        company: 'Your Company Name',
        duration: 'Month Year - Month Year',
        role: 'Your Role',
        desc: 'Describe your responsibilities and achievements here.',
      },
    ],
    projects: [
      // Placeholder entry
      {
        title: 'Your Project Title',
        links: [{ label: 'Project Link', url: 'https://your-link.com' }],
        desc: 'Briefly describe your project, technologies used, and your role.',
      },
    ],
    certifications: [{ name: 'PLC Programming Fundamentals', issuer: 'Coursera' }],
    achievements: [
      // Placeholder entry
      { title: 'Achievement Title', desc: 'Describe your achievement here.' },
    ],
  };

  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultResumeData;
      }
    }
    return defaultResumeData;
  });

  // Auto-save to localStorage on resumeData change
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Section order for navigation
  const sectionOrder = [
    'personal',
    'education',
    'skills',
    'experience',
    'projects',
    'certifications',
    'achievements',
  ];
  const [activeSection, setActiveSection] = useState(sectionOrder[0]);
  const currentIdx = sectionOrder.indexOf(activeSection);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-screen-2xl m-auto min-h-screen print:bg-white print:p-0">
      {/* LEFT: INPUT SECTIONS (Hidden during print) */}
      <Card className="w-full md:w-2/5 p-6 space-y-6 shadow-lg print:hidden h-fit ">
        <div className="flex max-md:flex-col justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Resume Editor</h2>
          <div className="flex flex-row items-center space-x-2">
            <Button onPress={() => window.print()} className="!rounded-md">
              Save as PDF
            </Button>
            <Button
              color="danger"
              size="sm"
              variant="flat"
              className="!rounded-md"
              style={{ minWidth: '80px' }}
              onPress={() => {
                setResumeData(defaultResumeData);
                toast.success('Resume reset to default!');
              }}
            >
              Default
            </Button>
            <Button
              color="warning"
              size="sm"
              variant="flat"
              className="!rounded-md"
              style={{ minWidth: '80px' }}
              onPress={() => {
                setResumeData({
                  personal: {
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    summary: '',
                    github: '',
                    linkedin: '',
                  },
                  skills: [],
                  education: [],
                  experience: [],
                  projects: [],
                  certifications: [],
                  achievements: [],
                });
                toast.success('Resume cleared!');
              }}
            >
              Clear
            </Button>
          </div>
        </div>

        <Tabs
          aria-label="Resume Sections"
          color="primary"
          variant="underlined"
          selectedKey={activeSection}
          onSelectionChange={setActiveSection}
        >
          {/* Order: personal, education, skills, experience, projects, certifications, achievements */}
          {/* Personal Details */}
          <Tab
            key="personal"
            title={
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Basics</span>
              </div>
            }
          >
            <div className="space-y-4 pt-4">
              <Input
                label="Full Name"
                variant="bordered"
                placeholder={'e.g., Md Azad'}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, name: e.target.value },
                  })
                }
              />
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <div className="flex gap-2">
                  <select
                    className="border rounded-md px-2 py-2"
                    value={resumeData.personal.countryCode || '+91'}
                    onChange={(e) => {
                      setResumeData({
                        ...resumeData,
                        personal: { ...resumeData.personal, countryCode: e.target.value },
                      });
                    }}
                  >
                    <option value="+91">+91 (India 🇮🇳)</option>
                  </select>
                  <Input
                    label=""
                    variant="bordered"
                    className="flex-1"
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        personal: { ...resumeData.personal, phone: e.target.value },
                      })
                    }
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <Input
                label="Email"
                variant="bordered"
                placeholder="e.g., example@example.com"
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, email: e.target.value },
                  })
                }
              />
              <Input
                label="Address"
                variant="bordered"
                placeholder="e.g., Muzaffarpur, Bihar - 8441XX"
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, address: e.target.value },
                  })
                }
              />
              <Textarea
                label="Professional Summary"
                variant="bordered"
                placeholder="e.g., Experienced software developer with a passion for creating innovative solutions."
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, summary: e.target.value },
                  })
                }
              />

              <Input
                label="LinkedIn Profile (Optional)"
                variant="bordered"
                placeholder="e.g., https://www.linkedin.com/in/themdazad"
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, linkedin: e.target.value },
                  })
                }
              />
              <Input
                label="GitHub Profile (Optional)"
                variant="bordered"
                placeholder="e.g., https://github.com/themdazad"
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, github: e.target.value },
                  })
                }
              />
            </div>
          </Tab>

          {/* Education */}

          <Tab
            key="education"
            title={
              <div className="flex items-center gap-2">
                <GraduationCap size={16} />
                <span>Education</span>
              </div>
            }
          >
            <div className="space-y-4 pt-4">
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="border p-3 rounded-md mb-2 relative">
                  <Input
                    label="School/College"
                    variant="bordered"
                    className="mb-2"
                    placeholder={'Add your college or school name'}
                    onChange={(e) => {
                      const updated = [...resumeData.education];
                      updated[idx].institution = e.target.value;
                      setResumeData({ ...resumeData, education: updated });
                    }}
                  />
                  <Input
                    label="Degree"
                    variant="bordered"
                    className="mb-2"
                    placeholder={'ex- B.Tech, Diploma, 12th or 10th'}
                    onChange={(e) => {
                      const updated = [...resumeData.education];
                      updated[idx].degree = e.target.value;
                      setResumeData({ ...resumeData, education: updated });
                    }}
                  />
                  <Input
                    label="Specialization"
                    variant="bordered"
                    className="mb-2"
                    placeholder={'Electrical Engineering, PCM, General, etc.'}
                    onChange={(e) => {
                      const updated = [...resumeData.education];
                      updated[idx].specialization = e.target.value;
                      setResumeData({ ...resumeData, education: updated });
                    }}
                  />
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">Board/University</label>
                    <select
                      className="border rounded-md px-3 py-2 w-full"
                      onChange={(e) => {
                        const updated = [...resumeData.education];
                        updated[idx].board =
                          e.target.value === 'Others'
                            ? edu.board &&
                              ![
                                'Bihar School Examination Board, Patna',
                                'Bihar Engineering University, Patna',
                                'State Board Of Technica Education, Patna',
                                'Central Board of Secondary Education (CBSE)',
                                'Indian Certificate of Secondary Education (ICSE)',
                              ].includes(edu.board)
                              ? edu.board
                              : ''
                            : e.target.value;
                        setResumeData({ ...resumeData, education: updated });
                      }}
                    >
                      <option value="Bihar School Examination Board, Patna">
                        Bihar School Examination Board, Patna
                      </option>
                      <option value="Bihar Engineering University, Patna">
                        Bihar Engineering University, Patna
                      </option>
                      <option value="State Board Of Technica Education, Patna">
                        State Board Of Technica Education, Patna
                      </option>
                      <option value="Central Board of Secondary Education (CBSE)">
                        Central Board of Secondary Education (CBSE)
                      </option>
                      <option value="Indian Certificate of Secondary Education (ICSE)">
                        Indian Certificate of Secondary Education (ICSE)
                      </option>
                      <option value="Others">Others</option>
                    </select>
                    {[
                      'Bihar School Examination Board, Patna',
                      'Bihar Engineering University, Patna',
                      'State Board Of Technica Education, Patna',
                      'Central Board of Secondary Education (CBSE)',
                      'Indian Certificate of Secondary Education (ICSE)',
                    ].includes(edu.board) === false && (
                      <input
                        type="text"
                        className="border rounded-md px-3 py-2 w-full mt-2"
                        placeholder="Enter Board/University"
                        onChange={(e) => {
                          const updated = [...resumeData.education];
                          updated[idx].board = e.target.value;
                          setResumeData({ ...resumeData, education: updated });
                        }}
                      />
                    )}
                  </div>
                  <Input
                    label="Session"
                    variant="bordered"
                    className="mb-2"
                    placeholder={'e.g. 2022 - 2026'}
                    onChange={(e) => {
                      const updated = [...resumeData.education];
                      updated[idx].session = e.target.value;
                      setResumeData({ ...resumeData, education: updated });
                    }}
                  />
                  <Input
                    label="CGPA/Percentage"
                    variant="bordered"
                    className="mb-2"
                    placeholder={'e.g. CGPA 8.5 or 85%'}
                    onChange={(e) => {
                      const updated = [...resumeData.education];
                      updated[idx].result = e.target.value;
                      setResumeData({ ...resumeData, education: updated });
                    }}
                  />
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    className="absolute top-2 right-2"
                    onPress={() => {
                      const updated = resumeData.education.filter((_, i) => i !== idx);
                      setResumeData({ ...resumeData, education: updated });
                    }}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                color="primary"
                variant="solid"
                onPress={() => {
                  setResumeData({
                    ...resumeData,
                    education: [
                      ...resumeData.education,
                      {
                        institution: '',
                        degree: '',
                        specialization: '',
                        board: '',
                        session: '',
                        result: '',
                      },
                    ],
                  });
                }}
              >
                Add Education
              </Button>
            </div>
          </Tab>

          {/* Skills */}
          <Tab
            key="skills"
            title={
              <div className="flex items-center gap-2">
                <Settings size={16} />
                <span>Skills</span>
              </div>
            }
          >
            <div className="space-y-4 pt-4">
              {resumeData.skills.map((skill, idx) => (
                <div key={idx} className="flex gap-2 items-center mb-2">
                  <Input
                    label="Title"
                    variant="bordered"
                    className="w-1/3"
                    placeholder={'e.g. Languages, Soft-Skills, Technical Skills'}
                    onChange={(e) => {
                      const updated = [...resumeData.skills];
                      updated[idx].label = e.target.value;
                      setResumeData({ ...resumeData, skills: updated });
                    }}
                  />
                  <Input
                    label="Description"
                    variant="bordered"
                    className="w-2/3"
                    placeholder={'e.g. JavaScript, Communication, React'}
                    onChange={(e) => {
                      const updated = [...resumeData.skills];
                      updated[idx].content = e.target.value;
                      setResumeData({ ...resumeData, skills: updated });
                    }}
                  />
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      const updated = resumeData.skills.filter((_, i) => i !== idx);
                      setResumeData({ ...resumeData, skills: updated });
                    }}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                color="primary"
                variant="solid"
                onPress={() => {
                  setResumeData({
                    ...resumeData,
                    skills: [...resumeData.skills, { label: '', content: '' }],
                  });
                }}
              >
                Add Skill Field
              </Button>
            </div>
          </Tab>

          {/* Experience */}
          <Tab
            key="experience"
            title={
              <div className="flex items-center gap-2">
                <Award size={16} />
                <span>Internships/Experience</span>
              </div>
            }
          >
            <div className="space-y-4 pt-4">
              {resumeData.experience &&
                resumeData.experience.map((exp, idx) => (
                  <div key={idx} className="border p-3 rounded-md mb-2 relative">
                    <Input
                      label="Company"
                      variant="bordered"
                      className="mb-2"
                      placeholder={'e.g. Infosys, TCS, Amazon'}
                      onChange={(e) => {
                        const updated = [...resumeData.experience];
                        updated[idx].company = e.target.value;
                        setResumeData({ ...resumeData, experience: updated });
                      }}
                    />
                    <Input
                      label="Role"
                      variant="bordered"
                      className="mb-2"
                      placeholder={'e.g. Software Engineer, Product Manager'}
                      onChange={(e) => {
                        const updated = [...resumeData.experience];
                        updated[idx].role = e.target.value;
                        setResumeData({ ...resumeData, experience: updated });
                      }}
                    />
                    <Input
                      label="Duration"
                      variant="bordered"
                      className="mb-2"
                      placeholder={'e.g. June 2022 - August 2023'}
                      onChange={(e) => {
                        const updated = [...resumeData.experience];
                        updated[idx].duration = e.target.value;
                        setResumeData({ ...resumeData, experience: updated });
                      }}
                    />
                    <Textarea
                      label="Description"
                      variant="bordered"
                      className="mb-2"
                      placeholder={
                        'e.g. Worked on developing web applications using React and Node.js.'
                      }
                      onChange={(e) => {
                        const updated = [...resumeData.experience];
                        updated[idx].desc = e.target.value;
                        setResumeData({ ...resumeData, experience: updated });
                      }}
                    />
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      className="absolute top-2 right-2"
                      onPress={() => {
                        const updated = resumeData.experience.filter((_, i) => i !== idx);
                        setResumeData({ ...resumeData, experience: updated });
                      }}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                ))}
              <Button
                size="sm"
                color="primary"
                variant="solid"
                onPress={() => {
                  setResumeData({
                    ...resumeData,
                    experience: [
                      ...resumeData.experience,
                      { company: '', role: '', duration: '', desc: '' },
                    ],
                  });
                }}
              >
                Add Experience
              </Button>
            </div>
          </Tab>

          {/* Projects */}
          <Tab
            key="projects"
            title={
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                <span>Projects</span>
              </div>
            }
          >
            <div className="space-y-4 pt-4">
              {resumeData.projects &&
                resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="border p-3 rounded-md mb-2 relative ">
                    <Input
                      label="Project Title"
                      variant="bordered"
                      className="mb-2"
                      placeholder={'e.g. Human intention based IoT Controller using EMG Signals'}
                      onChange={(e) => {
                        const updated = [...resumeData.projects];
                        updated[idx].title = e.target.value;
                        setResumeData({ ...resumeData, projects: updated });
                      }}
                    />
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm">Links</span>
                        <Button
                          size="xs"
                          color="primary"
                          variant="solid"
                          onPress={() => {
                            const updated = [...resumeData.projects];
                            if (!Array.isArray(updated[idx].links)) updated[idx].links = [];
                            updated[idx].links.push({ label: '', url: '' });
                            setResumeData({ ...resumeData, projects: updated });
                          }}
                        >
                          Add Link
                        </Button>
                      </div>
                      {Array.isArray(proj.links) &&
                        proj.links.map((link, lidx) => (
                          <div key={lidx} className="flex gap-2 items-center mb-1">
                            <Input
                              label="Label"
                              variant="bordered"
                              className="w-1/3"
                              placeholder={'e.g. GitHub, Live Demo'}
                              onChange={(e) => {
                                const updated = [...resumeData.projects];
                                updated[idx].links[lidx].label = e.target.value;
                                setResumeData({ ...resumeData, projects: updated });
                              }}
                            />
                            <Input
                              label="URL"
                              variant="bordered"
                              className="w-2/3"
                              placeholder={'Paste the link here'}
                              onChange={(e) => {
                                const updated = [...resumeData.projects];
                                updated[idx].links[lidx].url = e.target.value;
                                setResumeData({ ...resumeData, projects: updated });
                              }}
                            />
                            <Button
                              size="xs"
                              color="danger"
                              variant="flat"
                              onPress={() => {
                                const updated = [...resumeData.projects];
                                updated[idx].links = updated[idx].links.filter(
                                  (_, i) => i !== lidx
                                );
                                setResumeData({ ...resumeData, projects: updated });
                              }}
                            >
                              <Trash size={14} />
                            </Button>
                          </div>
                        ))}
                    </div>
                    <Textarea
                      label="Description"
                      variant="bordered"
                      className="mb-2"
                      placeholder={
                        'e.g. Developed a web application for managing tasks using React and Node.js.'
                      }
                      onChange={(e) => {
                        const updated = [...resumeData.projects];
                        updated[idx].desc = e.target.value;
                        setResumeData({ ...resumeData, projects: updated });
                      }}
                    />
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      className="absolute top-2 right-2"
                      onPress={() => {
                        const updated = resumeData.projects.filter((_, i) => i !== idx);
                        setResumeData({ ...resumeData, projects: updated });
                      }}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                ))}
              <Button
                size="sm"
                color="primary"
                variant="solid"
                onPress={() => {
                  setResumeData({
                    ...resumeData,
                    projects: [...resumeData.projects, { title: '', links: '', desc: '' }],
                  });
                }}
              >
                Add Project
              </Button>
            </div>
          </Tab>

          {/* Certifications */}
          <Tab
            key="certifications"
            title={
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>Certifications</span>
              </div>
            }
          >
            <div className="space-y-4 pt-4">
              {Array.isArray(resumeData.certifications) &&
                resumeData.certifications.map((cert, idx) => (
                  <Card
                    key={idx}
                    className="flex flex-col md:flex-row gap-4 items-center mb-3 p-4 bg-gray-50 border border-gray-200 shadow-sm rounded-lg"
                  >
                    <div className="flex-1 w-full">
                      <Input
                        label="Certification Name"
                        variant="faded"
                        className="w-full mb-2"
                        value={cert.name || ''}
                        onChange={(e) => {
                          const updated = [...resumeData.certifications];
                          updated[idx].name = e.target.value;
                          setResumeData({ ...resumeData, certifications: updated });
                        }}
                        radius="md"
                        size="md"
                        placeholder="e.g. AWS Certified Solutions Architect"
                      />
                      <Textarea
                        label="Description"
                        variant="faded"
                        className="w-full"
                        value={cert.description || ''}
                        onChange={(e) => {
                          const updated = [...resumeData.certifications];
                          updated[idx].description = e.target.value;
                          setResumeData({ ...resumeData, certifications: updated });
                        }}
                        radius="md"
                        size="md"
                        minRows={2}
                        placeholder="e.g. Credential ID, details, etc."
                      />
                    </div>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      className="self-start mt-2 md:mt-0"
                      onPress={() => {
                        const updated = resumeData.certifications.filter((_, i) => i !== idx);
                        setResumeData({ ...resumeData, certifications: updated });
                      }}
                    >
                      <Trash size={16} />
                    </Button>
                  </Card>
                ))}
              <Button
                size="sm"
                color="primary"
                variant="solid"
                onPress={() => {
                  setResumeData({
                    ...resumeData,
                    certifications: [
                      ...resumeData.certifications,
                      { name: '', issuer: '', year: '' },
                    ],
                  });
                }}
              >
                Add Certification
              </Button>
            </div>
          </Tab>

          {/* Achievements */}
          <Tab
            key="achievements"
            title={
              <div className="flex items-center gap-2">
                <Award size={16} />
                <span>Achievements</span>
              </div>
            }
          >
            <div className="space-y-4 pt-4">
              {Array.isArray(resumeData.achievements) &&
                resumeData.achievements.map((ach, idx) => (
                  <div key={idx} className="flex gap-2 items-center mb-2 w-full">
                    <Input
                      label="Title"
                      variant="bordered"
                      className="w-1/3"
                      placeholder={ach.title || ''}
                      onChange={(e) => {
                        const updated = [...resumeData.achievements];
                        updated[idx].title = e.target.value;
                        setResumeData({ ...resumeData, achievements: updated });
                      }}
                    />
                    <Textarea
                      label="Description"
                      variant="bordered"
                      className="w-2/3"
                      placeholder={ach.desc || ''}
                      onChange={(e) => {
                        const updated = [...resumeData.achievements];
                        updated[idx].desc = e.target.value;
                        setResumeData({ ...resumeData, achievements: updated });
                      }}
                    />
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onPress={() => {
                        const updated = resumeData.achievements.filter((_, i) => i !== idx);
                        setResumeData({ ...resumeData, achievements: updated });
                      }}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                ))}
              <Button
                size="sm"
                color="primary"
                variant="solid"
                onPress={() => {
                  setResumeData({
                    ...resumeData,
                    achievements: [...resumeData.achievements, { title: '', desc: '' }],
                  });
                }}
              >
                Add Achievement
              </Button>
            </div>
          </Tab>
        </Tabs>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <Button
            size="sm"
            color="default"
            variant="flat"
            disabled={currentIdx === 0}
            onPress={() => setActiveSection(sectionOrder[currentIdx - 1])}
          >
            Previous
          </Button>
          <Button
            size="sm"
            color="primary"
            variant="solid"
            disabled={currentIdx === sectionOrder.length - 1}
            onPress={() => setActiveSection(sectionOrder[currentIdx + 1])}
          >
            Next
          </Button>
        </div>
      </Card>

      {/* RIGHT: LIVE PREVIEW (Styled to match your layout ) */}
      <div className=" overflow-x-scroll">
        <div
          id="resume-preview"
          className=" bg-white shadow-2xl p-[0.5in] w-[210mm] h-[297mm] text-black font-serif print:shadow-none print:m-0"
        >
          {/* Header (Basic Details) */}
          <section className="border-b-1 border-black pb-2 flex flex-row items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{resumeData.personal.name}</h1>
              <div className="text-sm mt-1">
                <p>
                  Phone:{' '}
                  {(resumeData.personal.countryCode || '+91') +
                    ' ' +
                    (resumeData.personal.phone || '')}
                </p>
                <p>Email: {resumeData.personal.email}</p>
                <p>Address: {resumeData.personal.address}</p>
                <div className="flex justify-center gap-6 mt-1">
                  {resumeData.personal.linkedin && (
                    <a
                      href={resumeData.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      className="text-blue-700 flex items-center gap-2 hover:text-blue-900"
                    >
                      <Linkedin />
                      {resumeData.personal.linkedin}
                    </a>
                  )}
                  {resumeData.personal.github && (
                    <a
                      href={resumeData.personal.github}
                      placeholder="GitHub Profile URL"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      className="text-gray-700 flex items-center gap-2 hover:text-black"
                    >
                      <Github /> {resumeData.personal.github}
                    </a>
                  )}
                </div>
              </div>
            </div>
            <img
              src="/images/logos/collegelogo.png"
              alt="College Logo"
              className="h-24 w-auto object-contain ml-4"
              style={{ maxWidth: '160px' }}
            />
          </section>

          {/* Summary Section  */}
          <section className="mt-4 text-sm leading-relaxed">
            <p>{resumeData.personal.summary}</p>
          </section>

          {/* Education Section  */}
          {Array.isArray(resumeData.education) &&
            resumeData.education.length > 0 &&
            resumeData.education.some(
              (edu) =>
                edu.institution ||
                edu.degree ||
                edu.specialization ||
                edu.board ||
                edu.duration ||
                edu.result
            ) && (
              <section className="mt-6">
                <h2 className="text-lg font-bold border-b-1 border-gray-300 uppercase tracking-wider">
                  Educations
                </h2>
                {resumeData.education.map(
                  (edu, index) =>
                    (edu.institution ||
                      edu.degree ||
                      edu.specialization ||
                      edu.board ||
                      edu.session ||
                      edu.result) && (
                      <div key={index} className="mt-3 flex justify-between items-start">
                        <div className="text-sm">
                          {edu.institution && <p className="font-bold">{edu.institution}</p>}
                          <div className="flex flex-wrap gap-2">
                            {edu.degree && <p className="italic">{edu.degree}</p>}
                            {edu.specialization && (
                              <p className="italic"> in {edu.specialization}</p>
                            )}
                            {edu.board && <p className="italic">- {edu.board}</p>}
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          {edu.session && <p>{edu.session}</p>}
                          {edu.result && <p className="font-bold">{edu.result}</p>}
                        </div>
                      </div>
                    )
                )}
              </section>
            )}

          {/* Skills Section  */}
          {Array.isArray(resumeData.skills) &&
            resumeData.skills.length > 0 &&
            resumeData.skills.some((skill) => skill.label || skill.content) && (
              <section className="mt-6">
                <h2 className="text-lg font-bold border-b-1 border-gray-300 uppercase tracking-wider">
                  Skills
                </h2>
                <div className="mt-2 text-sm space-y-1">
                  {resumeData.skills.map(
                    (skill, idx) =>
                      (skill.label || skill.content) && (
                        <p key={idx}>
                          <strong>{skill.label}:</strong> {skill.content}
                        </p>
                      )
                  )}
                </div>
              </section>
            )}

          {/* Experience Section  */}
          {Array.isArray(resumeData.experience) &&
            resumeData.experience.length > 0 &&
            resumeData.experience.some(
              (exp) => exp.company || exp.role || exp.duration || exp.desc
            ) && (
              <section className="mt-6">
                <h2 className="text-lg font-bold border-b-1 border-gray-300 uppercase tracking-wider">
                  Internships/Experiences
                </h2>
                {resumeData.experience.map(
                  (exp, idx) =>
                    (exp.company || exp.role || exp.duration || exp.desc) && (
                      <div key={idx} className="mt-3 text-sm">
                        <div className="flex justify-between">
                          {exp.company && <p className="font-bold">{exp.company}</p>}
                          {exp.role && <span className="italic">{exp.role}</span>}
                          {exp.duration && <span>{exp.duration}</span>}
                        </div>
                        {exp.desc && (
                          <ul className="list-disc ml-5 mt-1">
                            {exp.desc
                              .split(/\r?\n/)
                              .filter((line) => line.trim())
                              .map((line, i) => (
                                <li key={i}>{line}</li>
                              ))}
                          </ul>
                        )}
                      </div>
                    )
                )}
              </section>
            )}

          {/* Projects Section  */}
          {Array.isArray(resumeData.projects) &&
            resumeData.projects.length > 0 &&
            resumeData.projects.some(
              (proj) =>
                proj.title ||
                (Array.isArray(proj.links) && proj.links.some((link) => link.label || link.url)) ||
                proj.desc
            ) && (
              <section className="mt-6">
                <h2 className="text-lg font-bold border-b-1 border-gray-300 uppercase tracking-wider">
                  Projects
                </h2>
                {resumeData.projects.map(
                  (proj, index) =>
                    (proj.title ||
                      (Array.isArray(proj.links) &&
                        proj.links.some((link) => link.label || link.url)) ||
                      proj.desc) && (
                      <div key={index} className="mt-3 text-sm">
                        <div className="flex justify-between">
                          {proj.title && <p className="font-bold">{proj.title}</p>}
                          {Array.isArray(proj.links) && proj.links.length > 0 && (
                            <div className="flex gap-2">
                              {proj.links.map(
                                (link, lidx) =>
                                  (link.label || link.url) && (
                                    <a
                                      key={lidx}
                                      href={link.url}
                                      className="text-blue-600 font-semibold"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {link.label || link.url}
                                    </a>
                                  )
                              )}
                            </div>
                          )}
                        </div>
                        {proj.desc && (
                          <ul className="list-disc ml-5 mt-1">
                            {proj.desc
                              .split(/\r?\n/)
                              .filter((line) => line.trim())
                              .map((line, i) => (
                                <li key={i}>{line}</li>
                              ))}
                          </ul>
                        )}
                      </div>
                    )
                )}
              </section>
            )}

          {/* Certifications Section  */}
          {Array.isArray(resumeData.certifications) &&
            resumeData.certifications.length > 0 &&
            resumeData.certifications.some(
              (cert) => cert.name || cert.description || cert.year
            ) && (
              <section className="mt-6">
                <h2 className="text-lg font-bold border-b-1 border-gray-300 uppercase tracking-wider">
                  Certifications
                </h2>
                <div className="mt-2 text-sm space-y-1">
                  {resumeData.certifications.map(
                    (cert, idx) =>
                      (cert.name || cert.description || cert.year) && (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="font-semibold">{cert.name}</span>
                          <span className="italic">- {cert.description}</span>
                        </div>
                      )
                  )}
                </div>
              </section>
            )}

          {/* Achievements Section  */}
          {Array.isArray(resumeData.achievements) &&
            resumeData.achievements.length > 0 &&
            resumeData.achievements.some((ach) => ach.title || ach.desc) && (
              <section className="mt-6">
                <h2 className="text-lg font-bold border-b-1 border-gray-300 uppercase tracking-wider">
                  Achievements
                </h2>
                <div className="mt-2 text-sm space-y-1">
                  {resumeData.achievements.map(
                    (ach, idx) =>
                      (ach.title || ach.desc) && (
                        <div key={idx} className="mb-2">
                          <span className="font-semibold">{ach.title}</span>
                          {ach.desc && <p className="ml-2 inline">- {ach.desc}</p>}
                        </div>
                      )
                  )}
                </div>
              </section>
            )}
        </div>
      </div>

      {/* Print-Only CSS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #resume-preview, #resume-preview * {
            visibility: visible !important;
          }
          #resume-preview {
            position: absolute !important;
            left: 0;
            top: 0;
            width: 210mm !important;
            min-height: 297mm !important;
            max-width: 210mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 0.5in !important; /* Adjust as needed */
            background: white !important;
            box-shadow: none !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
