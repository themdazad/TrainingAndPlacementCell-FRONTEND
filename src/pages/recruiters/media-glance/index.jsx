import PageHeader from "../../../components/ui/PageHeader.jsx";

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Recruiters" },
  { label: "Media Glance", isCurrent: true }, // No `to` = current page
];


export default function MediaGlance() {
  return (
	<main className=" dark:bg-neutral-900 grid gap-12">
	  <div className="m-auto max-w-screen-2xl px-[2.5%] ">
		<PageHeader
		  title={"Media Glance"}
		 
		  breadcrumbItems={breadcrumbItems}
		/>

		<section className="text-center min-h-32">
		No information found.
		</section>
	  </div>
	</main>
  );
}
