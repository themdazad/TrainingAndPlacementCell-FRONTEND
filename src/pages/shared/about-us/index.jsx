
import TPCellMembers from "../../../components/shared/about-us/TPCellMembers.jsx";
import ReachUs from "../../../components/shared/about-us/ReachUs.jsx";
// import TPCellCoordinators from "../../../components/shared/about-us/TPCellCoordinators.jsx";
import About from "../../../components/shared/about-us/About.jsx";
import PageHeader from "../../../components/ui/PageHeader.jsx";
import { Button, Image } from "@heroui/react";

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "About us", isCurrent: true }, // No `to` = current page
];
export default function AboutUs() {
  return (
    <main className="about-us">
      <div className="m-auto max-w-screen-2xl px-4  grid py-6 gap-12">
        <div>
          <PageHeader title={" About Us"} breadcrumbItems={breadcrumbItems} />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <div>
            <p className="text-sm tracking-widest text-bold uppercase dark:text-neutral-400 mb-2">
              About
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-800 dark:text-white">
              Training and Placement Cell
            </h2>
            <p className="my-4 text-justify text-neutral-600 dark:text-neutral-300 leading-relaxed">
              The Training and Placement Cell at Government Engineering College,
              Siwan, is dedicated to preparing students for successful careers
              in industry and academia. Under the esteemed leadership of our
              Principal, <strong>Dr. Suryakant Singh</strong>, and the guidance
              of our Training & Placement Officer,{" "}
              <strong>Mr. Navdeep Pandey</strong>, the cell actively fosters
              industry interaction, soft skills training, internship programs,
              and placement support. Our mission is to bridge the
              academic-industry gap and provide students with ample
              opportunities to realize their professional goals.
            </p>
            <Button>College Site</Button>
          </div>
          <Image src="/images/heroThumbnails/gecsiwan_building.png" />
          {/* Address */}
          {/* <div className="py-6 bg-sky-500/10 dark:bg-neutral-800 rounded-3xl border-t-4 border-t-blue-600  shadow-md place-content-center text-center">
            <h5 className="font-semibold uppercase text-blue-600 dark:text-neutral-300 mb-2">
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
          </div> */}
        </section>

        <ReachUs />
        <TPCellMembers />
        {/* <TPCellCoordinators /> */}
      </div>
    </main>
  );
}


