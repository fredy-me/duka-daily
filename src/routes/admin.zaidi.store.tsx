import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, StatCard } from "@/components/duka/shell";
import { fmt, stockCount, stockValue } from "@/lib/mock";

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
      <PageHeader title="Store" subtitle="Ni kiasi gani kinapatikana leo" back="/admin/zaidi" />

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Bidhaa Zilizopo Leo" value={`${stockCount}`} />
          <StatCard label="Thamani ya Hisa" value={fmt(stockValue)} accent />
        </div>
      </Section>
    </>
  );
}
