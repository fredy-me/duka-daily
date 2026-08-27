import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ShoppingCart, ReceiptText, Settings } from "lucide-react";
import { Phone, TabBar, type Tab } from "@/components/duka/shell";

export const Route = createFileRoute("/muuzaji")({
  component: SellerLayout,
});

const icon = "size-6";

const tabs: Tab[] = [
  { to: "/muuzaji", label: "Uza", icon: <ShoppingCart className={icon} strokeWidth={1.5} /> },
  {
    to: "/muuzaji/mauzo",
    label: "Mauzo Yangu",
    icon: <ReceiptText className={icon} strokeWidth={1.5} />,
  },
  {
    to: "/muuzaji/mipangilio",
    label: "Mipangilio",
    icon: <Settings className={icon} strokeWidth={1.5} />,
  },
];

function SellerLayout() {
  return (
    <Phone>
      <Outlet />
      <TabBar tabs={tabs} />
    </Phone>
  );
}
