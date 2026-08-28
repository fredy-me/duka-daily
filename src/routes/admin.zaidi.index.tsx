import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  CircleDollarSign,
  Landmark,
  Package,
  Receipt,
  Settings,
  Store,
  Users,
  Wrench,
} from "lucide-react";
import { PageHeader, Section } from "@/components/duka/shell";
import { corrections, expenses, expensesTotal, fmt, handovers, users, wakala } from "@/lib/mock";

export const Route = createFileRoute("/admin/zaidi/")({
  head: () => ({
    meta: [
      { title: "Zaidi — Duka Langu" },
      {
        name: "description",
        content:
          "Bajeti, matumizi, wakala, duka, watumiaji, marekebisho, makabidhiano na mpangilio.",
      },
      { property: "og:title", content: "Zaidi — Duka Langu" },
      { property: "og:description", content: "Zana za ziada za usimamizi wa duka." },
    ],
  }),
  component: MorePage,
});

const pending = corrections.filter((c) => c.status === "Inasubiri").length;
const wakalaTotal = wakala.reduce((a, w) => a + w.commission, 0);

type MoreItem = {
  to: string;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  badge?: string;
  tone?: "accent" | "muted" | "dark";
};

function MorePage() {
  const items: MoreItem[] = [
    {
      to: "/admin/zaidi/bajeti",
      label: "Bajeti",
      subtitle: "Bajeti na faida",
      icon: <CircleDollarSign className="size-6" strokeWidth={1.5} />,
    },
    {
      to: "/admin/zaidi/matumizi",
      label: "Matumizi",
      subtitle: `${expenses.length} rekodi · ${fmt(expensesTotal)}`,
      icon: <Receipt className="size-6" strokeWidth={1.5} />,
    },
    {
      to: "/admin/zaidi/wakala",
      label: "Wakala",
      subtitle: `Tume jumla · ${fmt(wakalaTotal)}`,
      icon: <Landmark className="size-6" strokeWidth={1.5} />,
    },
    {
      to: "/admin/zaidi/store",
      label: "Store",
      subtitle: "Taarifa za duka",
      icon: <Store className="size-6" strokeWidth={1.5} />,
    },
    {
      to: "/admin/zaidi/watumiaji",
      label: "Watumiaji",
      subtitle: `${users.length} watumiaji`,
      icon: <Users className="size-6" strokeWidth={1.5} />,
    },
    {
      to: "/admin/zaidi/marekebisho",
      label: "Marekebisho",
      subtitle: "Maombi ya marekebisho",
      icon: <Wrench className="size-6" strokeWidth={1.5} />,
      badge: `${pending}`,
      tone: pending > 0 ? "accent" : "muted",
    },
    {
      to: "/admin/zaidi/makabidhiano",
      label: "Makabidhiano",
      subtitle: `${handovers.length} makabidhiano`,
      icon: <Package className="size-6" strokeWidth={1.5} />,
    },
    {
      to: "/admin/zaidi/mpangilio",
      label: "Mpangilio",
      subtitle: "Lugha, nenosiri na zaidi",
      icon: <Settings className="size-6" strokeWidth={1.5} />,
    },
  ];

  return (
    <>
      <PageHeader title="Zaidi" subtitle="Zana za ziada za duka" />

      <Section>
        <div className="overflow-hidden rounded-[22px] border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="tap flex items-center justify-between gap-3 border-b border-border px-5 py-4 last:border-0 transition-[background-color] duration-150 hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="flex shrink-0 items-center justify-center rounded-full border border-border bg-background p-2 text-foreground">
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[17px] font-semibold">{item.label}</p>
                <p className="mt-0.5 truncate text-[14px] text-muted-foreground">{item.subtitle}</p>
              </div>
              {item.badge ? (
                <span
                  className={`rounded-full px-2.5 py-1 text-[13px] font-medium ${
                    item.tone === "accent"
                      ? "bg-total-soft text-total"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
