import PageHeader from "../../../components/ui/PageHeader.jsx";
import ResumeBuilderTool from "../../../components/shared/tools/resume-builder/ResumeBuilder";

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Student",},
  { label: "Resume builder", isCurrent: true }, // No `to` = current page
];
export default function ResumeBuilder() {
  return (
    <main className="about-us">
      <div className="m-auto max-w-screen-2xl px-4  grid py-6 gap-12">
        <div>
          <PageHeader
            title={"Resume Builder"}
            breadcrumbItems={breadcrumbItems}
          />
        </div>
        <section><ResumeBuilderTool/></section>
      </div>
    </main>
  );
}


