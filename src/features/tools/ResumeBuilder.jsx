import { useState, useRef } from 'react';
import { Button, Divider, Input } from '@heroui/react';
import { Github, Linkedin, X } from 'lucide-react';
import GECSIWAN_LOGO from '../../assets/images/logos/gecsiwanlogo.svg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const initialData = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
  },
  onlineProfiles: {
    github: '',
    linkedin: '',
  },
  skills: [''],
  education: [
    {
      year: '',
      course: '',
      institution: '',
      marks_cgpa: '',
    },
  ],
  experience: [
    {
      role: '',
      company: '',
      duration: '',
      details: [''],
    },
  ],
  achievements: [],
  interestsandhobbies: [],
};

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);
  const [careerObjective, setCareerObjective] = useState();
  const [onlineProfiles, setOnlineProfiles] = useState(initialData.onlineProfiles);
  const [skills, setSkills] = useState(initialData.skills);
  const [education, setEducation] = useState(initialData.education);
  const [experience, setExperience] = useState(initialData.experience);
  const [achievements, setAchievements] = useState(initialData.achievements);
  const [interestsandhobbies, setInterestsHobbies] = useState(initialData.interestsandhobbies);

  const resumeRef = useRef();

  // Handlers for personal info
  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  // Handlers for online profiles
  const handleOnlineProfilesChange = (e) => {
    setOnlineProfiles({ ...onlineProfiles, [e.target.name]: e.target.value });
  };

  // Skill handlers
  const addSkill = () => setSkills([...skills, '']);
  const updateSkill = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };
  const removeSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  // Education handlers
  const addEducation = () =>
    setEducation([...education, { year: '', course: '', institution: '', marks_cgpa: '' }]);
  const updateEducation = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };
  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  // Experience handlers
  const addExperience = () =>
    setExperience([...experience, { role: '', company: '', duration: '', details: [''] }]);
  const updateExperienceField = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };
  const addExperienceDetail = (index) => {
    const newExperience = [...experience];
    newExperience[index].details.push('');
    setExperience(newExperience);
  };
  const updateExperienceDetail = (expIndex, detailIndex, value) => {
    const newExperience = [...experience];
    newExperience[expIndex].details[detailIndex] = value;
    setExperience(newExperience);
  };
  const removeExperienceDetail = (expIndex, detailIndex) => {
    const newExperience = [...experience];
    newExperience[expIndex].details.splice(detailIndex, 1);
    setExperience(newExperience);
  };
  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  // Achievements handlers
  const addAchievement = () => setAchievements([...achievements, '']);
  const updateAchievement = (index, value) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setAchievements(newAchievements);
  };
  const removeAchievement = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  // Interests and Hobbies handlers
  const addInterestsHobbies = () => setInterestsHobbies([...interestsandhobbies, '']);
  const updateInterestsHobbies = (index, value) => {
    const newInterestsHobbies = [...interestsandhobbies];
    newInterestsHobbies[index] = value;
    setInterestsHobbies(newInterestsHobbies);
  };
  const removeInterestsHobbies = (index) => {
    setInterestsHobbies(interestsandhobbies.filter((_, i) => i !== index));
  };

  // PDF download code
  const downloadPDF = async () => {
    const input = resumeRef.current;
    if (!input) return;
    window.scrollTo(0, 0);
    const canvas = await html2canvas(input, {
      scale: 3,
      useCORS: true,
      svgRendering: 'foreignObject', // helps preserve icon rendering
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
  };

  return (
    <div className="dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300 py-8">
      <div className="flex flex-col lg:flex-row gap-8 mx-auto">
        <div className="w-full lg:w-1/2 p-6 rounded shadow overflow-auto max-h-[90vh] space-y-6 bg-white dark:bg-slate-900">
          {/* Personal Info */}
          <section className="p-5 border border-slate-300 dark:border-slate-700 rounded-3xl bg-slate-50 dark:bg-slate-800 space-y-4">
            <h3 className="text-lg font-semibold text-blue-500">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {['name', 'title', 'email', 'phone', 'location'].map((field) => (
                <div key={field} className={`${field === 'location' ? 'col-span-2' : ''}`}>
                  <Input
                    type="text"
                    label={field}
                    name={field}
                    value={personalInfo[field]}
                    onChange={handlePersonalInfoChange}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Career Objective */}

          <section className="p-5 border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-4">
            <h3 className="text-lg font-semibold text-blue-500">Career Objective</h3>
            <Input
              type="textarea"
              rows={4}
              value={careerObjective}
              onChange={(e) => setCareerObjective(e.target.value)}
              placeholder="Write your career objective here..."
              className="w-full "
            />
          </section>

          {/* Online Profiles */}
          <section className="p-5 border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-4">
            <h3 className="text-lg font-semibold text-blue-500">Online Profiles</h3>
            <div className="space-y-2">
              <Input
                type="text"
                name="github"
                placeholder="github.com/yourusername"
                startContent={<Github className="py-1" />}
                value={onlineProfiles['github']}
                onChange={handleOnlineProfilesChange}
                className="w-full"
              />
              <Input
                type="text"
                name="linkedin"
                placeholder="linkedin.com/in/yourusername"
                startContent={<Linkedin className="py-1" />}
                value={onlineProfiles['linkedin']}
                onChange={handleOnlineProfilesChange}
                className="w-full"
              />
            </div>
          </section>

          {/* Skills */}
          <section className="p-5 border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-500">Skills</h3>
            </div>
            <div className="space-y-2">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Add your Skill"
                    value={skill}
                    onChange={(e) => updateSkill(i, e.target.value)}
                    className="w-full"
                  />
                  <button
                    onClick={() => removeSkill(i)}
                    className="text-red-500 hover:text-red-600"
                    type="button"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addSkill} className="text-sm text-blue-600 " type="button">
              + Add Skill
            </button>
          </section>

          {/* Education */}
          <section className="p-5 border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-500">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="border border-slate-300 dark:border-slate-600 rounded-2xl p-4 space-y-3 bg-white dark:bg-slate-700"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => updateEducation(i, 'year', e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Course"
                      value={edu.course}
                      onChange={(e) => updateEducation(i, 'course', e.target.value)}
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => updateEducation(i, 'institution', e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Marks/CGPA"
                    value={edu.marks_cgpa}
                    onChange={(e) => updateEducation(i, 'marks_cgpa', e.target.value)}
                  />
                  <button
                    onClick={() => removeEducation(i)}
                    className="text-center w-full text-red-500 hover:text-red-600"
                    type="button"
                  >
                    Remove Education
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addEducation} className="text-sm text-blue-500" type="button">
              + Add Education
            </button>
          </section>

          {/* Experience */}
          <section className="p-5 border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-500">Projects/Experience</h3>
            </div>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="border border-slate-300 dark:border-slate-600 rounded-2xl p-4 space-y-3 bg-white dark:bg-slate-700"
                >
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) => updateExperienceField(i, 'role', e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateExperienceField(i, 'company', e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) => updateExperienceField(i, 'duration', e.target.value)}
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-slate-600 dark:text-slate-200 mb-1">
                      Details
                    </h4>
                    <div className="space-y-2">
                      {exp.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <Input
                            type="text"
                            value={detail}
                            onChange={(e) => updateExperienceDetail(i, dIdx, e.target.value)}
                            className="w-full"
                          />
                          <button
                            onClick={() => removeExperienceDetail(i, dIdx)}
                            className="text-red-500 hover:text-red-600"
                            type="button"
                          >
                            <X />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addExperienceDetail(i)}
                        className="text-center w-full text-blue-500 hover:text-blue-600"
                        type="button"
                      >
                        Add more details
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeExperience(i)}
                    className="text-center w-full text-red-500 hover:text-red-600"
                    type="button"
                  >
                    Remove Experience
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addExperience} className="text-sm text-blue-600 " type="button">
              + Add Experience
            </button>
          </section>

          {/* Achievements */}
          <section className="p-5 border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-500">Achievements</h3>
            </div>
            <div className="space-y-2">
              {achievements.map((ach, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={ach}
                    onChange={(e) => updateAchievement(i, e.target.value)}
                    className="w-full"
                  />
                  <button
                    onClick={() => removeAchievement(i)}
                    className="text-red-500 hover:text-red-600"
                    type="button"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addAchievement} className="text-sm text-blue-600 " type="button">
              + Add Achievement
            </button>
          </section>

          {/* Interests and Hobbies */}
          <section className="p-5 border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-500">Interests and Hobbies</h3>
            </div>
            <div className="space-y-2">
              {interestsandhobbies.map((ach, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={ach}
                    onChange={(e) => updateInterestsHobbies(i, e.target.value)}
                    className="w-full"
                  />
                  <button
                    onClick={() => removeInterestsHobbies(i)}
                    className="text-red-500 hover:text-red-600"
                    type="button"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addInterestsHobbies} className="text-sm text-blue-600 " type="button">
              + Add Interest and Hobbies
            </button>
          </section>
        </div>

        {/* Resume Preview */}
        <div
          ref={resumeRef}
          className="w-full lg:w-1/2 bg-white dark:bg-slate-800 text-black dark:text-slate-100 p-8 rounded shadow font-sans text-sm overflow-auto "
        >
          {/* I. Header */}
          <div className="py-2">
            <div className="flex justify-between items-center mb-4">
              <img src={GECSIWAN_LOGO} alt="GEC Siwan logo" className="w-16" />

              <div className="text-center gap-1">
                <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
                <b>{personalInfo.title}</b>
                <p>
                  <a
                    href={`https://${onlineProfiles.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {onlineProfiles.github}
                  </a>
                </p>
                <p>
                  <a
                    href={`https://${onlineProfiles.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {onlineProfiles.linkedin}
                  </a>
                </p>
              </div>

              <div className="text-sm">
                <p className="flex items-center gap-1 leading-tight">Phone: {personalInfo.phone}</p>
                <p className="flex items-center gap-1 leading-tight">Email: {personalInfo.email}</p>
                <p className="flex items-center gap-1 leading-tight">
                  Adress: {personalInfo.location}
                </p>
              </div>
            </div>
          </div>

          {/* II. Career Objective */}
          {!!careerObjective && (
            <div className="py-2">
              <h2 className="font-semibold py-2">Career Objective</h2>
              <p>{careerObjective}</p>
            </div>
          )}
          <Divider />

          {/* III. Education Table*/}
          {education.length > 0 && (
            <div className="my-6">
              <h2 className="mb-3 text-lg font-semibold">Education</h2>
              <div className="w-full border border-slate-300 dark:border-slate-700 ">
                {/* Table Row */}
                <div className="grid grid-cols-5 pb-3 bg-slate-100 dark:bg-slate-800 text-center font-semibold border-b border-slate-300 dark:border-slate-700">
                  <span>Year</span>
                  <span>Course</span>
                  <span className="col-span-2">School/College</span>
                  <span>Marks/CGPA</span>
                </div>

                {/* Data Rows */}
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className=" text-center border-b border-slate-200 dark:border-slate-700"
                  >
                    <div className="grid grid-cols-5 mb-3">
                      <span>{edu.year}</span>
                      <span>{edu.course}</span>
                      <span className="col-span-2">{edu.institution}</span>
                      <span>{edu.marks_cgpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="">
              <h2 className="mb-3 text-lg font-semibold">Skills</h2>
              <Divider />
              <ul className="list-disc pl-6 grid grid-cols-3">
                {skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects/Experience */}
          {experience.length > 0 && (
            <div className="py-2">
              <h2 className="mb-3 text-lg font-semibold ">Projects/Experience</h2>
              <Divider />
              {experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  <b>{exp.role}</b> — <i>{exp.company}</i> ({exp.duration})
                  <ul className="list-disc pl-6">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold ">Achievements and Responsibility</h2>
              <Divider />
              <ul className="list-disc pl-6">
                {achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interests and Hobbies */}
          {interestsandhobbies.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold">Interests and Hobbies</h2>
              <Divider />
              <ul className="list-disc pl-6">
                {interestsandhobbies.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Download Button */}

      <Button
        onPress={downloadPDF}
        className=" bg-blue-500 mt-6 px-4 py-3 rounded-3xl hover:bg-blue-700 font-bold text-white"
      >
        Download PDF
      </Button>
    </div>
  );
}
