import BreadCrumbs from "./common/BreadCrumbs.jsx";
export default function PageHeader({ title, description, breadcrumbItems }) {
  return (
    <div className="grid gap-4 my-12">
      <div className="header flex flex-col justify-center gap-4">
        <h1 className="text-xl sm:text-4xl lg:text-4xl font-extrabold">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
      {breadcrumbItems && <BreadCrumbs items={breadcrumbItems} />}
    </div>
  );
}
