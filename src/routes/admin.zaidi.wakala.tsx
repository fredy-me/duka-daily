import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, StatCard, Panel, ListCard, Row } from "@/components/duka/shell";
import { fmt, wakala } from "@/lib/mock";

export const Route = createFileRoute("/admin/zaidi/wakala")({
  head: () => ({
    meta: [
      { title: "Wakala — Duka Langu" },
      { name: "description", content: "Tume za wakala wa pesa za simu." },
      { property: "og:title", content: "Wakala — Duka Langu" },
      { property: "og:description", content: "Tume za wakala wa pesa za simu." },
    ],
  }),
  component: WakalaPage,
});

function WakalaPage() {
  const total = wakala.reduce((a, w) => a + w.commission, 0);

  return (
    <>
      <PageHeader title="Wakala" subtitle="Tume za wakala wa pesa za simu" back="/admin/zaidi" />

      <Section>
        <StatCard label="Tume Jumla ya Mwezi" value={fmt(total)} accent />
      </Section>

      <Section title="Kwa wakala">
        <div className="grid grid-cols-2 gap-4">
          {wakala.map((w) => (
            <Panel key={w.id}>
              <p className="text-[15px] font-medium">{w.name}</p>
              <p className="mt-1 text-[20px] font-bold">{fmt(w.commission)}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">tume ya mwezi</p>
            </Panel>
          ))}
        </div>
      </Section>

      {wakala.map((w) => (
        <Section key={w.id} title={w.name}>
          <ListCard>
            {w.entries.map((e) => (
              <Row key={e.date}>
                <p className="text-[17px]">{e.date}</p>
                <p className="text-[17px] font-semibold">{fmt(e.amount)}</p>
              </Row>
            ))}
          </ListCard>
        </Section>
      ))}
    </>
  );
}
