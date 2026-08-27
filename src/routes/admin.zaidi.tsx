import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, ListCard, Row, Panel, StatCard, Pill } from "@/components/duka/shell";
import { corrections, expenses, expensesTotal, fmt, handovers, users, wakala } from "@/lib/mock";

export const Route = createFileRoute("/admin/zaidi")({
  head: () => ({
    meta: [
      { title: "Zaidi — Duka Langu" },
      {
        name: "description",
        content: "Bajeti, wakala, marekebisho, makabidhiano na watumiaji wa duka.",
      },
      { property: "og:title", content: "Zaidi — Duka Langu" },
      { property: "og:description", content: "Zana za ziada za usimamizi wa duka." },
    ],
  }),
  component: MorePage,
});

const pending = corrections.filter((c) => c.status === "Inasubiri").length;
const wakalaTotal = wakala.reduce((a, w) => a + w.commission, 0);
const statusTone: Record<string, "accent" | "muted" | "dark"> = {
  Inasubiri: "accent",
  Imekubaliwa: "dark",
  Imekataliwa: "muted",
};

function MorePage() {
  return (
    <>
      <PageHeader title="Zaidi" subtitle="Zana za ziada za duka" />

      <Section title="Bajeti — Mwezi huu">
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Matumizi Halisi" value={fmt(expensesTotal)} accent />
          <StatCard label="Idadi ya Matumizi" value={`${expenses.length}`} />
        </div>
        <div className="mt-4">
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
        </div>
      </Section>

      <Section title="Wakala">
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

      <Section title={`Marekebisho (${pending} ijayo)`}>
        <ListCard>
          {corrections.map((c) => (
            <Row key={c.id}>
              <div className="min-w-0 pb-2">
                <p className="text-[16px] font-medium">{c.seller}</p>
                <p className="mt-0.5 truncate text-[14px] text-muted-foreground">{c.record}</p>
                <p className="mt-0.5 text-[13px] text-muted-foreground">{c.date}</p>
              </div>
              <Pill tone={statusTone[c.status]}>{c.status}</Pill>
            </Row>
          ))}
        </ListCard>
      </Section>

      <Section title="Makabidhiano">
        <ListCard>
          {handovers.map((h) => (
            <Row key={h.id}>
              <div>
                <p className="text-[16px] font-medium">
                  {h.from} → {h.to}
                </p>
                <p className="mt-0.5 text-[14px] text-muted-foreground">{h.date}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-[16px] font-semibold">{fmt(h.expected)}</p>
                <p
                  className={`text-[13px] ${
                    h.expected === h.counted ? "text-muted-foreground" : "text-total"
                  }`}
                >
                  {h.expected === h.counted
                    ? "Imelingana"
                    : `+/− ${fmt(Math.abs(h.expected - h.counted))}`}
                </p>
              </div>
            </Row>
          ))}
        </ListCard>
      </Section>

      <Section title="Watumiaji">
        <ListCard>
          {users.map((u) => (
            <Row key={u.id}>
              <div>
                <p className="text-[17px] font-medium">{u.name}</p>
                <p className="text-[14px] text-muted-foreground">{u.phone}</p>
              </div>
              <Pill tone={u.role === "Admin" ? "dark" : "muted"}>{u.role}</Pill>
            </Row>
          ))}
        </ListCard>
      </Section>
    </>
  );
}
