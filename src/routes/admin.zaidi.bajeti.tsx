import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, StatCard, Panel, ListCard, Row, Pill } from "@/components/duka/shell";
import { expensesTotal, fmt, monthIncome, monthProfit } from "@/lib/mock";

export const Route = createFileRoute("/admin/zaidi/bajeti")({
  head: () => ({
    meta: [
      { title: "Bajeti — Duka Langu" },
      { name: "description", content: "Bajeti na faida ya duka." },
      { property: "og:title", content: "Bajeti — Duka Langu" },
      { property: "og:description", content: "Bajeti na faida ya duka." },
    ],
  }),
  component: BajetiPage,
});

function BajetiPage() {
  const mapato = monthIncome;
  const matumizi = expensesTotal;
  const faida = monthProfit;
  const salio = mapato - matumizi;

  return (
    <>
      <PageHeader title="Bajeti" subtitle="Mwezi huu" back="/admin/zaidi" />

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Mapato ya Mwezi" value={fmt(mapato)} />
          <StatCard label="Matumizi" value={fmt(matumizi)} accent />
          <StatCard label="Faida" value={fmt(faida)} />
          <StatCard label="Salio" value={fmt(salio)} />
        </div>
      </Section>

      <Section title="Muhtasari wa Bajeti">
        <Panel>
          <ListCard>
            <Row>
              <p className="text-[17px]">Mapato yote</p>
              <p className="text-[17px] font-semibold">{fmt(mapato)}</p>
            </Row>
            <Row>
              <p className="text-[17px]">Matumizi yote</p>
              <p className="text-[17px] font-semibold text-total">{fmt(matumizi)}</p>
            </Row>
            <Row>
              <p className="text-[17px]">Faida (mapato − matumizi)</p>
              <p className="text-[17px] font-bold">{fmt(faida)}</p>
            </Row>
          </ListCard>
          <div className="mt-4 flex items-center gap-2">
            <Pill tone="muted">Mwezi huu</Pill>
            <p className="text-[14px] text-muted-foreground">
              Takwimu za mfano kwa ajili ya onyesho la demo.
            </p>
          </div>
        </Panel>
      </Section>
    </>
  );
}
