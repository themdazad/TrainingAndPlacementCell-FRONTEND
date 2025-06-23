import { NavLink } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

// Props: items = [{ label: "Home", to: "/", isCurrent: false }, ...]
export default function BreadCrumbs({ items = [], ...props }) {
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
// export default function App() {
