import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, StatCard, ListCard, Row } from "@/components/duka/shell";
import { expenses, expensesTotal, fmt } from "@/lib/mock";

export const Route = createFileRoute("/admin/zaidi/matumizi")({
  head: () => ({
    meta: [
      { title: "Matumizi — Duka Langu" },
      { name: "description", content: "Rekodi za matumizi ya duka." },
      { property: "og:title", content: "Matumizi — Duka Langu" },
      { property: "og:description", content: "Rekodi za matumizi ya duka." },
    ],
  }),
  component: MatumiziPage,
});

function MatumiziPage() {
  return (
    <>
      <PageHeader title="Matumizi" subtitle={`${expenses.length} rekodi za matumizi`} back="/admin/zaidi" />

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Matumizi Halisi" value={fmt(expensesTotal)} accent />
          <StatCard label="Idadi ya Matumizi" value={`${expenses.length}`} />
        </div>
      </Section>

      <Section title="Matumizi yote">
        <ListCard>
          {expenses.map((e) => (
            <Row key={e.id}>
              <div>
                <p className="text-[17px]">{e.note}</p>
                <p className="text-[14px] text-muted-foreground">{e.date}</p>
              </div>
              <p className="text-[17px] font-semibold">{fmt(e.amount)}</p>
            </Row>
          ))}
        </ListCard>
      </Section>
    </>
  );
}
