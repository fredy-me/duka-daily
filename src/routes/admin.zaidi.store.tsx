import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { PageHeader, Section, ListCard, Row, StatCard } from "@/components/duka/shell";
import { fmt, SHOP, stockCount, stockValue } from "@/lib/mock";

export const Route = createFileRoute("/admin/zaidi/store")({
  head: () => ({
    meta: [
      { title: "Store — Duka Langu" },
      { name: "description", content: "Taarifa za duka na hisa." },
      { property: "og:title", content: "Store — Duka Langu" },
      { property: "og:description", content: "Taarifa za duka na hisa." },
    ],
  }),
  component: StorePage,
});

function StorePage() {
  return (
    <>
      <PageHeader title="Store" subtitle="Taarifa za duka" back="/admin/zaidi" />

      <Section>
        <div className="flex flex-col items-center rounded-[22px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex size-16 items-center justify-center rounded-full border border-border bg-muted">
            <Store className="size-8 text-foreground" strokeWidth={1.5} />
          </div>
          <p className="mt-3 text-[22px] font-bold tracking-tight">{SHOP.name}</p>
          <p className="text-[15px] text-muted-foreground">{SHOP.address}</p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Bidhaa Zote" value={`${stockCount}`} />
          <StatCard label="Thamani ya Hisa" value={fmt(stockValue)} accent />
        </div>
      </Section>

      <Section title="Taarifa za Duka">
        <ListCard>
          <Row>
            <p className="text-[17px]">Mmiliki</p>
            <p className="text-[17px] font-semibold">{SHOP.owner}</p>
          </Row>
          <Row>
            <p className="text-[17px]">Simu</p>
            <p className="text-[17px] font-semibold">{SHOP.phone}</p>
          </Row>
          <Row>
            <p className="text-[17px]">Anwani</p>
            <p className="text-[17px] font-semibold">{SHOP.address}</p>
          </Row>
        </ListCard>
      </Section>
    </>
  );
}
