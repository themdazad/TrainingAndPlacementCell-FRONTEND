import BreadCrumbs from "./BreadCrumbs.jsx";
export default function PageHeader({ title, description, breadcrumbItems }) {
  return (
    <div div className="grid gap-4 my-12">
      <div className="header flex flex-col justify-center gap-4">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>
      {breadcrumbItems && <BreadCrumbs items={breadcrumbItems} />}
    </div>
  );
}
