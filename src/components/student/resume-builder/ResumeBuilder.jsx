import { useState, useRef } from "react";
import {Button} from "@heroui/react";
import { X } from "lucide-react";
import GECSIWAN_LOGO from "../../../assets/images/logos/gecsiwanlogo.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const initialData = {
  personalInfo: {
    name: "MD AZAD",
    title: "MERN Stack Web Developer",
    email: "collezian@gmail.com",
    phone: "+91 9110172886",
    location: "Vaishali, Bihar, India",
  },
  onlineProfiles: {
    github: "github/themdazad",
    linkedin: "linkedin/in/themdazad",
  },
  skills: ["C/C++", "Tailwind CSS", "JavaScript", "React.js", "Node.js", "MongoDB"],
  education: [
    { year: "2022–2026", course: "Electrical Engineering", institution: "GEC Siwan" },
    { year: "2019–2022", course: "Diploma in CSE", institution: "GP Chhapra" },
  ],
  experience: [
    {
      role: "Web Developer Intern",
      company: "Sishar Global",
      duration: "June 2024–Aug 2024",
      details: ["Redesigned landing page", "Used Laravel & MySQL", "Fixed UI bugs"],
    },
  ],
  achievements: ["Infosys offer for Ass. Engineer", "Lead technical club at GEC Siwan"],
};

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);
  const [onlineProfiles, setOnlineProfiles] = useState(initialData.onlineProfiles);
  const [skills, setSkills] = useState(initialData.skills);
  const [education, setEducation] = useState(initialData.education);
  const [experience, setExperience] = useState(initialData.experience);
  const [achievements, setAchievements] = useState(initialData.achievements);

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
  const addSkill = () => setSkills([...skills, ""]);
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
    setEducation([...education, { year: "", course: "", institution: "" }]);
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
    setExperience([...experience, { role: "", company: "", duration: "", details: [""] }]);
  const updateExperienceField = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };
  const addExperienceDetail = (index) => {
    const newExperience = [...experience];
    newExperience[index].details.push("");
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
  const addAchievement = () => setAchievements([...achievements, ""]);
  const updateAchievement = (index, value) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setAchievements(newAchievements);
  };
  const removeAchievement = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  // PDF download code unchanged
  const downloadPDF = async () => {
    const input = resumeRef.current;
    if (!input) return;
    window.scrollTo(0, 0);
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`);
  };

  return (
    <div className="dark:bg-zinc-900 min-h-screen text-zinc-800 dark:text-zinc-100 transition-colors duration-300 py-8">
      <div className="flex flex-col lg:flex-row gap-8 mx-auto">
        {/* Edit Form */}
        <div className="w-full lg:w-1/2 p-6 rounded shadow overflow-auto max-h-[90vh] space-y-6 bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-blue-600 border-b pb-3 mb-2 text-center">
            Edit Resume
          </h2>

          {/* Personal Info */}
          <section className="p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 space-y-4">
            <h3 className="text-lg font-semibold text-blue-500">
              Personal Information
            </h3>
            {["name", "title", "email", "phone", "location"].map((field) => (
              <div key={field}>
                <label className="block mb-1 capitalize font-medium text-zinc-700 dark:text-zinc-200">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={personalInfo[field]}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
            ))}
          </section>

          {/* Online Profiles */}
          <section className="p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 space-y-4">
            <h3 className="text-lg font-semibold text-blue-500">
              Online Profiles
            </h3>
            {["github", "linkedin"].map((field) => (
              <div key={field}>
                <label className="block mb-1 capitalize font-medium text-zinc-700 dark:text-zinc-200">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={onlineProfiles[field]}
                  onChange={handleOnlineProfilesChange}
                  className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-500">Skills</h3>
            </div>
            {skills.map((skill, i) => (
              <div key={i} className="flex mb-2 items-center">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(i, e.target.value)}
                  className="flex-grow p-2 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
                />
                <button
                  onClick={() => removeSkill(i)}
                  className="ml-2 text-red-500 hover:text-red-600"
                  type="button"
                >
                  <X />
                </button>
              </div>
            ))}
            <button
              onClick={addSkill}
              className="text-sm text-blue-600 hover:underline"
              type="button"
            >
              + Add Skill
            </button>
          </section>

          {/* Education */}
          <section className="p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-500">Education</h3>
              <button
                onClick={addEducation}
                className="text-sm text-blue-600 hover:underline"
                type="button"
              >
                + Add Education
              </button>
            </div>
            {education.map((edu, i) => (
              <div
                key={i}
                className="mb-4 border border-zinc-300 dark:border-zinc-600 rounded p-4 bg-white dark:bg-zinc-700 space-y-2"
              >
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => updateEducation(i, "year", e.target.value)}
                    className="flex-1 p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Course"
                    value={edu.course}
                    onChange={(e) =>
                      updateEducation(i, "course", e.target.value)
                    }
                    className="flex-2 p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(i, "institution", e.target.value)
                    }
                    className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                  />
                  <button
                    onClick={() => removeEducation(i)}
                    className="ml-2 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section className="p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-500">
                Experience
              </h3>
              <button
                onClick={addExperience}
                className="text-sm text-blue-600 hover:underline"
                type="button"
              >
                + Add Experience
              </button>
            </div>
            {experience.map((exp, i) => (
              <div
                key={i}
                className="mb-6 border border-zinc-300 dark:border-zinc-600 rounded p-4 bg-white dark:bg-zinc-700 space-y-2"
              >
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) =>
                      updateExperienceField(i, "role", e.target.value)
                    }
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperienceField(i, "company", e.target.value)
                    }
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) =>
                      updateExperienceField(i, "duration", e.target.value)
                    }
                    className="flex-1 p-2 border rounded"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-zinc-600 dark:text-zinc-200 mb-1">
                    Details
                  </h4>
                  {exp.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center mb-1">
                      <input
                        type="text"
                        value={detail}
                        onChange={(e) =>
                          updateExperienceDetail(i, dIdx, e.target.value)
                        }
                        className="flex-grow p-2 border rounded"
                      />
                      <button
                        onClick={() => removeExperienceDetail(i, dIdx)}
                        className="ml-2 text-white bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addExperienceDetail(i)}
                    className="mt-2 text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                    type="button"
                  >
                    + Add Detail
                  </button>
                </div>

                <button
                  onClick={() => removeExperience(i)}
                  className="text-white bg-red-700 px-3 py-1 rounded hover:bg-red-800"
                  type="button"
                >
                  Remove Experience
                </button>
              </div>
            ))}
          </section>

          {/* Achievements */}
          <section className="p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-500">
                Achievements
              </h3>
              <button
                onClick={addAchievement}
                className="text-sm text-blue-600 hover:underline"
                type="button"
              >
                + Add Achievement
              </button>
            </div>
            {achievements.map((ach, i) => (
              <div key={i} className="flex mb-2 items-center">
                <input
                  type="text"
                  value={ach}
                  onChange={(e) => updateAchievement(i, e.target.value)}
                  className="flex-grow p-2 border rounded bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
                />
                <button
                  onClick={() => removeAchievement(i)}
                  className="ml-2 text-white bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
          </section>

          {/* Download Button */}
          <Button
            onClick={downloadPDF}
            className="w-full bg-blue-600 px-4 py-3 rounded-3xl hover:bg-blue-700 font-bold text-white"
          >
            Download PDF
          </Button>
        </div>

        {/* Resume Preview */}
        <div
          ref={resumeRef}
          className="w-full lg:w-1/2 bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 p-16 rounded shadow font-sans text-sm overflow-auto max-h-[90vh]"
        >
          {/* Preview header */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <img src={GECSIWAN_LOGO} alt="GEC Siwan logo" className="w-24" />
              <div className="text-center">
                <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
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
              <div className="text-right no-underline">
                <p>📞 {personalInfo.phone}</p>
                <p>📧 {personalInfo.email}</p>
                <p>📍 {personalInfo.location}</p>
              </div>
            </div>
            {/* Career objective placeholder */}
            <div className="mb-4">
              <h2 className="font-bold border-b mb-1">Career Objective</h2>
              <p className="text-sm">
                A passionate MERN Stack Web Developer with a strong foundation
                in building responsive and user-friendly web applications.
                Seeking to leverage my skills in a dynamic team environment.
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="font-bold border-b mb-2">Education</h2>
            {education.map((edu, i) => (
              <p key={i}>
                <b>{edu.year}</b> - {edu.course} - {edu.institution}
              </p>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="font-bold border-b mb-2">Skills</h2>
            <ul className="list-disc pl-6 grid grid-cols-2 gap-1">
              {skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h2 className="font-bold border-b mb-2">Experience</h2>
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

          {/* Achievements */}
          <div className="mb-6">
            <h2 className="font-bold border-b mb-2">Achievements</h2>
            <ul className="list-disc pl-6">
              {achievements.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
