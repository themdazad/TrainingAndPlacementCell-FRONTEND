import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "MD AZAD",
    title: "MERN Stack Web Developer",
    email: "collezian@gmail.com",
    phone: "+91 9110172886",
    location: "Vaishali, Bihar, India",
    github: "github/themdazad",
    linkedin: "linkedin/in/themdazad",
    skills: "C/C++, Tailwind CSS, JavaScript, React.js, Node.js, MongoDB",
    education:
      "Electrical Engineering - GEC Siwan (2022–2026)\nDiploma in CSE - GP Chhapra (2019–2022)",
    experience:
      "Web Developer Intern at Sishar Global (June 2024–Aug 2024)\n- Redesigned landing page\n- Used Laravel & MySQL\n- Fixed UI bugs",
    achievements:
      "Infosys offer for Ass. Engineer\nLead technical club at GEC Siwan",
  });

  const resumeRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 10;
    let y = margin;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(form.name, margin, y);
    y += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(form.title, margin, y);
    y += 10;

    // Contact Info
    pdf.setFontSize(10);
    pdf.text(`Email: ${form.email}`, margin, y);
    y += 6;
    pdf.text(`Phone: ${form.phone}`, margin, y);
    y += 6;
    pdf.text(`Location: ${form.location}`, margin, y);
    y += 6;
    pdf.text(`GitHub: ${form.github}`, margin, y);
    y += 6;
    pdf.text(`LinkedIn: ${form.linkedin}`, margin, y);
    y += 10;

    // Skills
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("Skills", margin, y);
    y += 6;
    pdf.setFont("helvetica", "normal");
    const skillsList = form.skills.split(",").map((s) => s.trim());
    skillsList.forEach((skill) => {
      pdf.text(`- ${skill}`, margin + 4, y);
      y += 5;
    });

    y += 5;

    // Education
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("Education", margin, y);
    y += 6;
    pdf.setFont("helvetica", "normal");
    form.education.split("\n").forEach((edu) => {
      pdf.text(edu, margin + 4, y);
      y += 5;
    });

    y += 5;

    // Experience
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("Experience", margin, y);
    y += 6;
    pdf.setFont("helvetica", "normal");
    form.experience.split("\n").forEach((exp) => {
      pdf.text(`- ${exp}`, margin + 4, y);
      y += 5;
    });

    y += 5;

    // Achievements
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("Achievements", margin, y);
    y += 6;
    pdf.setFont("helvetica", "normal");
    form.achievements.split("\n").forEach((ach) => {
      pdf.text(`- ${ach}`, margin + 4, y);
      y += 5;
    });

    pdf.save(`${form.name.replace(/\s+/g, "_")}_Resume.pdf`);
  };
  

  return (
    <div className="mt-24 bg-zinc-100 dark:bg-zinc-900 min-h-screen text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-zinc-800 p-6 rounded shadow space-y-6">
          <h2 className="text-xl font-bold mb-4">Resume Builder</h2>

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            {[
              ["name", "Full Name"],
              ["title", "Job Title"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["location", "Location"],
            ].map(([field, label]) => (
              <div key={field} className="mb-4">
                <label className="block font-medium mb-1">{label}</label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-zinc-50 dark:bg-zinc-700"
                />
              </div>
            ))}
          </div>

          {/* Online Profiles */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Online Profiles</h3>
            {[
              ["github", "GitHub"],
              ["linkedin", "LinkedIn"],
            ].map(([field, label]) => (
              <div key={field} className="mb-4">
                <label className="block font-medium mb-1">{label}</label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-zinc-50 dark:bg-zinc-700"
                />
              </div>
            ))}
          </div>

          {/* Skills & Qualifications */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Skills & Qualifications
            </h3>
            {[["skills", "Skills (comma-separated)"]].map(([field, label]) => (
              <div key={field} className="mb-4">
                <label className="block font-medium mb-1">{label}</label>
                <textarea
                  rows={3}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-zinc-50 dark:bg-zinc-700 resize-none"
                />
              </div>
            ))}
          </div>

          {/* Education & Experience */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Education & Experience
            </h3>
            {[
              ["education", "Education (newline-separated)"],
              ["experience", "Experience (newline-separated)"],
            ].map(([field, label]) => (
              <div key={field} className="mb-4">
                <label className="block font-medium mb-1">{label}</label>
                <textarea
                  rows={3}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-zinc-50 dark:bg-zinc-700 resize-none"
                />
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Additional Information
            </h3>
            {[["achievements", "Achievements (newline-separated)"]].map(
              ([field, label]) => (
                <div key={field} className="mb-4">
                  <label className="block font-medium mb-1">{label}</label>
                  <textarea
                    rows={3}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-zinc-50 dark:bg-zinc-700 resize-none"
                  />
                </div>
              )
            )}
          </div>

          <button
            onClick={downloadPDF}
            className="mt-4 bg-blue-600 px-4 py-2 rounded-3xl hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>

        {/* Resume Preview */}
        <div
          ref={resumeRef}
          className="w-full lg:w-1/2 bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 p-6 rounded shadow font-sans text-sm"
        >
          <div className="grid gap-4">
            {/* Sidebar */}
            <div className="header grid grid-cols-2 w-full p-4 space-y-4">
              <div>
                <h1 className="text-4xl font-bold">{form.name}</h1>
                <p>{form.title}</p>
              </div>
              <div className="text-xs space-y-1">
                <p>📧 {form.email}</p>
                <p>📞 {form.phone}</p>
                <p>📍 {form.location}</p>
                <p>🔗 {form.github}</p>
                <p>🔗 {form.linkedin}</p>
              </div>
              <div>
                <h2 className="font-semibold border-b  mb-1">Skills</h2>
                <ul className="list-disc ml-4">
                  {form.skills.split(",").map((s, i) => (
                    <li key={i}>{s.trim()}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-semibold border-b mb-1">Education</h2>
                {form.education.split("\n").map((e, i) => (
                  <p key={i} className="text-xs mb-1">
                    {e}
                  </p>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-2 space-y-4">
              <div>
                <h2 className="text-lg font-bold border-b border-black dark:border-white mb-1">
                  Experience
                </h2>
                {form.experience.split("\n").map((line, i) => (
                  <p key={i} className="mb-1">
                    {line}
                  </p>
                ))}
              </div>
              <div>
                <h2 className="text-lg font-bold border-b border-black dark:border-white mb-1">
                  Achievements
                </h2>
                <ul className="list-disc ml-5">
                  {form.achievements.split("\n").map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
