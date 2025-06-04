import TPCellMembers from "../../../components/shared/about-us/TPCellMembers.jsx";
import TPCellCoordinators from "../../../components/shared/about-us/TPCellCoordinators.jsx";
import About from "../../../components/shared/about-us/About.jsx";
import PageHeader from "../../../components/ui/PageHeader.jsx";


const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "About us", isCurrent: true }, // No `to` = current page
];
export default function AboutUs() {
  return (
    <main className="about-us max-w-[1980px] m-auto dark:bg-zinc-900 grid py-6 gap-12">
      <div className="px-[5%]">
        <PageHeader
          title={" About Us"}
          description={
            " Connect with Training and Placement Cell - Government Engineering College, Siwan"
          }
          breadcrumbItems={breadcrumbItems}
        />
      </div>
      <section className="px-[5%] grid grid-cols-1 md:grid-cols-2 gap-12">
        <About />
        {/* Address */}
        <div className="bg-zinc-100/50 dark:bg-zinc-800 rounded-3xl shadow-md place-content-center text-center">
          <h5 className="font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-300 mb-2">
           Address
          </h5>
          <p>
            Training & Placement Cell Government Engineering College, Siwan <br/>
            Mairwa Road, Old Suta Mill Factory Bhada Khurd, Siwan, Bihar -
            841226
          </p>
          <p> <br/>
            <strong>Contact Details</strong>
            <br />
            Training & Placement Officer: Mr. Navdeep Pandey <br />
            Phone: +91-9084063221 <br />
            Email: tpogecsiwan@gmail.com
          </p>
        </div>
      </section>
      <TPCellMembers />
      <TPCellCoordinators />
    </main>
  );
}
