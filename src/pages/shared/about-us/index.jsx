import TPCellMembers from "../../../features/shared/about-us/TPCellMembers.jsx";
import TPCellCoordinators from "../../../features/shared/about-us/TPCellCoordinators.jsx";
import BreadCrumbs from "../../../components/ui/BreadCrumbs.jsx";


const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "About us", isCurrent: true }, // No `to` = current page
];
export default function AboutUs() {
  return (
    <main className="about-us max-w-[1980px] m-auto dark:bg-zinc-900 grid py-12 gap-12">
      {/* Heading */}
      <div className="header px-[5%] flex flex-col justify-center">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold">
          About Us
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Connect with Training and Placement Cell - Government Engineering
          College, Siwan
        </p>
      </div>
      
      {/* breadcrumbs */}
      <div className="px-[5%]">
        <BreadCrumbs items={breadcrumbItems} />
      </div>

      <TPCellMembers />
      <TPCellCoordinators />
    </main>
  );
}
