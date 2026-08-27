import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Home, Package, ShoppingBag, BarChart3, MoreHorizontal } from "lucide-react";
import { Phone, TabBar, type Tab } from "@/components/duka/shell";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const icon = "size-6";

const tabs: Tab[] = [
  { to: "/admin", label: "Mwanzo", icon: <Home className={icon} strokeWidth={1.5} /> },
  { to: "/admin/bidhaa", label: "Bidhaa", icon: <Package className={icon} strokeWidth={1.5} /> },
  { to: "/admin/mauzo", label: "Mauzo", icon: <ShoppingBag className={icon} strokeWidth={1.5} /> },
  { to: "/admin/ripoti", label: "Ripoti", icon: <BarChart3 className={icon} strokeWidth={1.5} /> },
  {
    to: "/admin/zaidi",
    label: "Zaidi",
    icon: <MoreHorizontal className={icon} strokeWidth={1.5} />,
  },
];

function AdminLayout() {
  return (
    <Phone>
      <Outlet />
      <TabBar tabs={tabs} />
    </Phone>
  );
}
