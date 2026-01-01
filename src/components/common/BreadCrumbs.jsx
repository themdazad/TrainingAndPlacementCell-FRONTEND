import BreadCrumbs from "./BreadCrumbs.jsx";
import { NavLink } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

export default function BreadCrumbsRender({ items = [], ...props }) {
  return (
    <Breadcrumbs {...props} size="lg">
      {items.map((item, index) => (
        <BreadcrumbItem key={index} isCurrent={item.isCurrent}>
          {item.to && !item.isCurrent ? (
            <NavLink to={item.to} style={{ textDecoration: "none" }}>
              {item.label}
            </NavLink>
          ) : (
            item.label
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}

export default function BreadCrumbs({ title, description, breadcrumbItems }) {
  return (
    <div className="grid gap-4 my-12">
      <div className="header flex flex-col justify-center gap-4">
        <h1 className="text-xl sm:text-4xl lg:text-4xl font-extrabold">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {breadcrumbItems && <BreadCrumbsRender items={breadcrumbItems} />}
    </div>
  );
}
