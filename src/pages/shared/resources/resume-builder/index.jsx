import PageHeader from "../../../../components/ui/PageHeader.jsx";
import ResumeBuilder from "../../../../components/shared/tools/resume-builder/ResumeBuilder.jsx";


const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Tools", },
  { label: "Resume Builder", isCurrent: true }, // No `to` = current page
];


export default function ResumeBuilderTool() {
  return (
    <main className="max-w-screen-2xl m-auto grid gap-12 py-6 ">
      {/* Reach Us Heading */}
      <PageHeader
        title={"Resume Builder"}
        description={
          " Build your professional resume with ease using our Resume Builder."
        }
        breadcrumbItems={breadcrumbItems}
      />

      <section className="px-[2.5%] grid grid-cols-1 gap-6 ">
        <ResumeBuilder />
      </section>
    </main>
  );
}
