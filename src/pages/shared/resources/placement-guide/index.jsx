import PageHeader from "../../../../components/ui/PageHeader.jsx";


const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Resources", },
  { label: "Placement Guide", isCurrent: true }, // No `to` = current page
];


export default function PlacementGuide() {
  return (
    <main className="max-w-[1980px] m-auto grid gap-12 py-12 ">
      <PageHeader title={"Placement Guide"} breadcrumbItems ={breadcrumbItems}/>
      <section className="px-[2.5%] grid grid-cols-1 gap-6 ">helo</section>
    </main>
  );
}
