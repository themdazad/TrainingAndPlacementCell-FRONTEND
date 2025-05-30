import BreadCrumbs from "../../../../components/ui/BreadCrumbs.jsx";
import ResumeBuilder from "../../../../features/shared/tools/resume-builder/ResumeBuilder.jsx";


const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Tools", },
  { label: "Resume Builder", isCurrent: true }, // No `to` = current page
];


export default function ResumeBuilderTool() {
  return (
    <main className="m-auto dark:bg-zinc-900 grid gap-12 py-12 ">
      {/* Reach Us Heading */}
      <div className="header px-[5%] flex flex-col justify-center">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold">
          Resume Builder
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
         Build your professional resume with ease using our Resume Builder.
        </p>
      </div>

      {/* breadcrumbs */}
      <div className="px-[5%]">
        <BreadCrumbs items={breadcrumbItems} />
      </div>

      <section className="px-[5%] grid grid-cols-1 gap-6 ">
      <ResumeBuilder/>    
      </section>
    </main>
  );
}
