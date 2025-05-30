import { useState, useRef } from "react";
import { Button, Input } from "@heroui/react";
import { Github, Linkedin, Mail, MapPinned, Phone, X } from "lucide-react";
import GECSIWAN_LOGO from "../../../../assets/images/logos/gecsiwanlogo.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const initialData = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
  },
  onlineProfiles: {
    github: "",
    linkedin: "",
  },
  skills: [""],
  education: [
    {
      year: "",
      course: "",
      institution: "",
      marks_cgpa: "",
    },
  ],
  experience: [
    {
      role: "Add Your Role",
      company: "Company Name",
      duration: "Starting Date - Ending Date",
      details: ["Add your work details here", "Add more details if needed"],
    },
  ],
  achievements: [
    "Add your achievement here",
    "Add more achievements if needed",
  ],
};

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);
  const [careerObjective, setCareerObjective] = useState(
    "Add your career objective here"
  );
  const [onlineProfiles, setOnlineProfiles] = useState(
    initialData.onlineProfiles
  );
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
    setEducation([
      ...education,
      { year: "", course: "", institution: "", marks_cgpa: "" },
    ]);
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
    setExperience([
      ...experience,
      { role: "", company: "", duration: "", details: [""] },
    ]);
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
        <div className="w-full lg:w-1/2 p-6 rounded shadow overflow-auto max-h-[90vh] space-y-6 bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-blue-600 border-b pb-3 mb-2 text-center">
            Edit Resume
          </h2>

          {/* Personal Info */}
          <section className="p-5 border border-zinc-300 dark:border-zinc-700 rounded-3xl bg-zinc-50 dark:bg-zinc-800 space-y-4">
            <h3 className="text-lg font-semibold text-blue-500">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["name", "title", "email", "phone", "location"].map((field) => (
                <div
                  key={field}
                  className={`${field === "location" ? "col-span-2" : ""}`}
                >
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
          <section className="p-5 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-800 space-y-4">
            <h3 className="text-lg font-semibold text-blue-500">
              Career Objective
            </h3>
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
          <section className="p-5 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-800 space-y-4">
            <h3 className="text-lg font-semibold text-blue-500">
              Online Profiles
            </h3>
            <div className="space-y-2">
              <Input
                type="text"
                name="github"
                placeholder="github.com/yourusername"
                startContent={<Github className="py-1" />}
                value={onlineProfiles["github"]}
                onChange={handleOnlineProfilesChange}
                className="w-full"
              />
              <Input
                type="text"
                name="linkedin"
                placeholder="linkedin.com/in/yourusername"
                startContent={<Linkedin className="py-1" />}
                value={onlineProfiles["linkedin"]}
                onChange={handleOnlineProfilesChange}
                className="w-full"
              />
            </div>
          </section>

          {/* Skills */}
          <section className="p-5 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-800 space-y-4">
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
            <button
              onClick={addSkill}
              className="text-sm text-blue-600 "
              type="button"
            >
              + Add Skill
            </button>
          </section>

          {/* Education */}
          <section className="p-5 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-500">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="border border-zinc-300 dark:border-zinc-600 rounded-2xl p-4 space-y-3 bg-white dark:bg-zinc-700"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) =>
                        updateEducation(i, "year", e.target.value)
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Course"
                      value={edu.course}
                      onChange={(e) =>
                        updateEducation(i, "course", e.target.value)
                      }
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(i, "institution", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Marks/CGPA"
                    value={edu.marks_cgpa}
                    onChange={(e) =>
                      updateEducation(i, "marks_cgpa", e.target.value)
                    }
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
            <button
              onClick={addEducation}
              className="text-sm text-blue-500"
              type="button"
            >
              + Add Education
            </button>
          </section>

          {/* Experience */}
          <section className="p-5 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-500">
                Experience
              </h3>
            </div>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="border border-zinc-300 dark:border-zinc-600 rounded-2xl p-4 space-y-3 bg-white dark:bg-zinc-700"
                >
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) =>
                        updateExperienceField(i, "role", e.target.value)
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperienceField(i, "company", e.target.value)
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) =>
                        updateExperienceField(i, "duration", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-zinc-600 dark:text-zinc-200 mb-1">
                      Details
                    </h4>
                    <div className="space-y-2">
                      {exp.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <Input
                            type="text"
                            value={detail}
                            onChange={(e) =>
                              updateExperienceDetail(i, dIdx, e.target.value)
                            }
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
            <button
              onClick={addExperience}
              className="text-sm text-blue-600 "
              type="button"
            >
              + Add Experience
            </button>
          </section>

          {/* Achievements */}
          <section className="p-5 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-500">
                Achievements
              </h3>
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
            <button
              onClick={addAchievement}
              className="text-sm text-blue-600 "
              type="button"
            >
              + Add Achievement
            </button>
          </section>
        </div>
        {/* ******************************************Resume Preview****************************** */}
        {/* Resume Preview */}
        <div
          ref={resumeRef}
          className="w-full lg:w-1/2 bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 p-16 rounded shadow font-sans text-sm overflow-auto max-h-[90vh]"
        >
          {/* Preview header */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <img src={GECSIWAN_LOGO} alt="GEC Siwan logo" className="w-24" />
              <div className="text-center gap-1">
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
              <div className="text-sm no-underline">
                <p className="flex gap-1 items-center">
                  <Phone className="p-1" />
                  {personalInfo.phone}
                </p>
                <p className="flex gap-1 items-center">
                  <Mail className="p-1" />
                  {personalInfo.email}
                </p>
                <p className="flex gap-1 items-center">
                  <MapPinned className="p-1" /> {personalInfo.location}
                </p>
              </div>
            </div>
          </div>

          {/* Career Objective */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Career Objective</h2>
            <p>{careerObjective}</p>
          </div>
          <hr />
          {/* Education Table*/}
          {education.length > 0 && (
            <div className="my-6">
              <h2 className="font-semibold text-lg border-b mb-2">Education</h2>
              <table className="w-full text-center table-auto border-collapse border border-zinc-300 dark:border-zinc-700">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Course</th>
                    <th>College</th>
                    <th>Marks/CGPA</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu, i) => (
                    <tr key={i}>
                      <td>{edu.year}</td>
                      <td>{edu.course}</td>
                      <td>{edu.institution}</td>
                      <td>{edu.marks_cgpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-lg border-b mb-2">Skills</h2>
              <ul className="list-disc pl-6 grid grid-cols-2 gap-1">
                {skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-lg border-b mb-2">
                Experience
              </h2>
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

          {/* Projects */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-lg border-b mb-2">Projects</h2>
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
              <h2 className="font-semibold text-lg border-b mb-2">
                Achievements and Responsibility
              </h2>
              <ul className="list-disc pl-6">
                {achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interests and Hobbies */}
          {achievements.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-lg border-b mb-2">
                {" "}
                Interests and Hobbies
              </h2>
              <ul className="list-disc pl-6">
                {achievements.map((ach, i) => (
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
