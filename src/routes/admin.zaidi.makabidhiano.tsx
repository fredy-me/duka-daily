import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, ListCard, Row, Pill } from "@/components/duka/shell";
import { fmt, handovers } from "@/lib/mock";

export const Route = createFileRoute("/admin/zaidi/makabidhiano")({
  head: () => ({
    meta: [
      { title: "Makabidhiano — Duka Langu" },
      { name: "description", content: "Rekodi za makabidhiano ya fedha." },
      { property: "og:title", content: "Makabidhiano — Duka Langu" },
      { property: "og:description", content: "Rekodi za makabidhiano ya fedha." },
    ],
  }),
  component: MakabidhianoPage,
});

function MakabidhianoPage() {
  return (
    <>
      <PageHeader title="Makabidhiano" subtitle={`${handovers.length} makabidhiano`} back="/admin/zaidi" />

      <Section>
        <ListCard>
          {handovers.map((h) => {
            const ok = h.expected === h.counted;
            return (
              <Row key={h.id}>
                <div>
                  <p className="text-[17px] font-semibold">
                    {h.from} → {h.to}
                  </p>
                  <p className="mt-0.5 text-[14px] text-muted-foreground">{h.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-[17px] font-semibold">{fmt(h.expected)}</p>
                  {ok ? (
                    <Pill tone="dark">Imelingana</Pill>
                  ) : (
                    <span className="rounded-full bg-total-soft px-2.5 py-1 text-[13px] font-medium text-total">
                      +/− {fmt(Math.abs(h.expected - h.counted))}
                    </span>
                  )}
                </div>
              </Row>
            );
          })}
        </ListCard>
      </Section>
    </>
  );
}
