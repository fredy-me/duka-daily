import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, ListCard, Row, Panel, Pill } from "@/components/duka/shell";
import { fmt, saleTotal, todaySales, todayTotal } from "@/lib/mock";

export const Route = createFileRoute("/admin/mauzo")({
  head: () => ({
    meta: [
      { title: "Mauzo ya Leo — Duka Langu" },
      { name: "description", content: "Orodha ya mauzo yote yaliyorekodiwa leo na wauzaji." },
      { property: "og:title", content: "Mauzo ya Leo — Duka Langu" },
      { property: "og:description", content: "Mauzo yote yaliyorekodiwa leo na wauzaji." },
    ],
  }),
  component: TodaySales,
});

function TodaySales() {
  return (
    <>
      <PageHeader title="Mauzo ya Leo" subtitle="Alhamisi, 27 Agosti 2026" />

      <Section>
        <Panel accent>
          <p className="text-[15px] text-muted-foreground">Jumla ya Mauzo ya Leo</p>
          <p className="mt-1 text-[30px] font-bold text-total">{fmt(todayTotal)}</p>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {todaySales.length} mauzo · Juma na Neema
          </p>
        </Panel>
      </Section>

      <Section title="Mauzo Moja Moja">
        <ListCard>
          {todaySales
            .slice()
            .reverse()
            .map((s) => (
              <Row key={s.id}>
                <div>
                  <p className="text-[17px] font-medium">{s.product}</p>
                  <p className="mt-0.5 text-[14px] text-muted-foreground">
                    {s.qty} × {fmt(s.price)} · {s.time}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-[17px] font-semibold">{fmt(saleTotal(s))}</p>
                  <Pill>{s.seller}</Pill>
                </div>
              </Row>
            ))}
        </ListCard>
        <p className="mt-3 px-1 text-[14px] text-muted-foreground">
          Ukurasa huu ni wa kuangalia tu — hauwezi kubadilishwa hapa.
        </p>
      </Section>
    </>
  );
}
