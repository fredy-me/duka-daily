import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Panel, StatCard, Pill } from "@/components/duka/shell";
import { fmt, products } from "@/lib/mock";

export const Route = createFileRoute("/admin/bidhaa/$id")({
  head: () => ({
    meta: [
      { title: "Historia ya Bidhaa — Duka Langu" },
      {
        name: "description",
        content: "Historia ya usajili, nyongeza za hisa na mabadiliko ya bei.",
      },
      { property: "og:title", content: "Historia ya Bidhaa — Duka Langu" },
      { property: "og:description", content: "Usajili, nyongeza za hisa na mabadiliko ya bei." },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const p = products.find((x) => x.id === id) ?? products[0]!;

  return (
    <>
      <PageHeader title={p.name} subtitle={`Ilisajiliwa ${p.registered}`} back="/admin/bidhaa" />

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Hisa iliyopo" value={`${p.stock} ${p.unit}`} />
          <StatCard label="Bei ya kuuzia" value={fmt(p.price)} />
          <StatCard label="Bei ya kununulia" value={fmt(p.buyPrice)} />
          <StatCard
            label="Thamani ya hisa"
            value={fmt(p.stock * p.buyPrice)}
            accent={p.stock <= p.lowAt}
          />
        </div>
      </Section>

      <Section title="Historia">
        <Panel>
          <ol className="space-y-6">
            {p.events.map((e, i) => (
              <li key={i} className="relative pl-7">
                <span className="absolute top-2 left-0 size-3 rounded-full bg-foreground" />
                {i < p.events.length - 1 ? (
                  <span className="absolute top-5 left-[5px] h-full w-px bg-border" />
                ) : null}
                <div className="flex items-center gap-2">
                  <p className="text-[15px] text-muted-foreground">{e.date}</p>
                  {e.type === "bei" ? <Pill tone="accent">Bei</Pill> : null}
                </div>
                <p className="mt-1 text-[17px] font-medium">{e.note}</p>
              </li>
            ))}
          </ol>
        </Panel>
      </Section>
    </>
  );
}
