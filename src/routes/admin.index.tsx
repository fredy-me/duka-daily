import { createFileRoute } from "@tanstack/react-router";
import { Line, LineChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { PageHeader, Section, StatCard, ListCard, Row, Panel } from "@/components/duka/shell";
import { fmt, todaySales, saleTotal, weekTrend } from "@/lib/mock";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Mwanzo — Duka Langu" },
      {
        name: "description",
        content: "Muhtasari wa salio, hisa na mauzo ya leo katika duka lako.",
      },
      { property: "og:title", content: "Mwanzo — Duka Langu" },
      { property: "og:description", content: "Muhtasari wa salio, hisa na mauzo ya leo." },
    ],
  }),
  component: Dashboard,
});

const fmtDayDate = (d: Date) =>
  d.toLocaleDateString("sw-TZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function Dashboard() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return (
    <>
      <PageHeader title="Mwanzo" subtitle="Alhamisi, 27 Agosti 2026" />

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Salio la Kufunga Jana"
            value={fmt(200000)}
            hint={fmtDayDate(yesterday)}
          />
          <StatCard label="Salio la Kufungua Leo" value={fmt(200000)} hint={fmtDayDate(today)} />
          <StatCard label="Jumla ya Bidhaa Zilizopo" value="217" hint={fmt(2500500)} />
          <StatCard
            label="Bidhaa zilizo kwenye hatari ya kuisha"
            value="34"
            accent
            hint="Hisa ndogo"
          />
        </div>
      </Section>

      <Section title="Mwenendo wa Mauzo (siku 7)">
        <Panel>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekTrend} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="day"
                  tickFormatter={(v: string) => v.slice(0, 3)}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  formatter={(v) => fmt(Number(v))}
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid var(--border)",
                    fontSize: 13,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mauzo"
                  stroke="var(--foreground)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </Section>

      <Section title="Shughuli za Karibuni">
        <ListCard>
          {todaySales
            .slice()
            .reverse()
            .slice(0, 5)
            .map((s) => (
              <Row key={s.id}>
                <div>
                  <p className="text-[17px] font-medium">{s.product}</p>
                  <p className="text-[14px] text-muted-foreground">
                    {s.qty} × {fmt(s.price)} · {s.seller} · {s.time}
                  </p>
                </div>
                <p className="text-[17px] font-semibold">{fmt(saleTotal(s))}</p>
              </Row>
            ))}
        </ListCard>
      </Section>
    </>
  );
}
