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
    <main className="about-us">
      <div className="m-auto max-w-screen-2xl px-[2.5%]  grid py-6 gap-12">
        <div>
          <PageHeader
            title={" About Us"}
            description={
              " Connect with Training and Placement Cell - Government Engineering College, Siwan"
            }
            breadcrumbItems={breadcrumbItems}
          />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <About />
          {/* Address */}
          <div className="py-6 bg-sky-500/10 dark:bg-neutral-800 rounded-3xl border-t-4 border-t-blue-600  shadow-md place-content-center text-center">
            <h5 className="font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-300 mb-2">
              Address
            </h5>
            <p>
              Training & Placement Cell Government Engineering College, Siwan{" "}
              <br />
              Mairwa Road, Old Suta Mill Factory Bhada Khurd, Siwan, Bihar -
              841226
            </p>
            <p>
              <br />
              <strong>Contact Details</strong>
              <br />
              Training & Placement Officer: Mr. Navdeep Pandey <br />
              Phone: +91-9084063221 <br />
              Email: tpogecsiwan@gmail.com
            </p>
          </div>
        </section>
        <TPCellMembers />
        {/* <TPCellCoordinators /> */}
      </div>
    </main>
  );
}
