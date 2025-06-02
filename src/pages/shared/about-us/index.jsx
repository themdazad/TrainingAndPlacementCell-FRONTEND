import TPCellMembers from "../../../components/shared/about-us/TPCellMembers.jsx";
import TPCellCoordinators from "../../../components/shared/about-us/TPCellCoordinators.jsx";
import BreadCrumbs from "../../../components/ui/BreadCrumbs.jsx";
import PageHeader from "../../../components/ui/PageHeader.jsx";


const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "About us", isCurrent: true }, // No `to` = current page
];
export default function AboutUs() {
  return (
    <main className="about-us max-w-[1980px] m-auto dark:bg-zinc-900 grid py-12 gap-12">
      <div className="px-[5%]">
      <PageHeader
      title={" About Us"}
      description={" Connect with Training and Placement Cell - Government Engineering College, Siwan"}
      breadcrumbItems={breadcrumbItems}
      />
      </div>

      <TPCellMembers />
      <TPCellCoordinators />
    </main>
  );
}
