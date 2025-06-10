import PageHeader from "../../../components/ui/PageHeader.jsx";

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Recruiters" },
  { label: "Why Us?", isCurrent: true }, // No `to` = current page
];


export default function WhyUs() {
  return (
	<main className=" dark:bg-zinc-900 grid gap-12">
	  <div className="m-auto max-w-screen-2xl px-[2.5%] ">
		<PageHeader
		  title={"Why Us"}
		 
		  breadcrumbItems={breadcrumbItems}
		/>

		<section className="text-center min-h-32">
		No information found.
		</section>
	  </div>
	</main>
  );
}
