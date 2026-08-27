import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, Section, Panel, StatCard, ListCard, Row } from "@/components/duka/shell";
import { expenses, expensesTotal, fmt, products, todayTotal, weekTrend } from "@/lib/mock";

export const Route = createFileRoute("/admin/ripoti")({
  head: () => ({
    meta: [
      { title: "Ripoti — Duka Langu" },
      {
        name: "description",
        content: "Ripoti za mauzo, matumizi na hisa kwa kipindi unachochagua.",
      },
      { property: "og:title", content: "Ripoti — Duka Langu" },
      { property: "og:description", content: "Ripoti za mauzo, matumizi na hisa." },
    ],
  }),
  component: Reports,
});

const ranges = ["Leo", "Jana", "Wiki hii", "Mwezi huu", "Kipindi Maalum", "Mwaka"];

const chartTip = {
  borderRadius: 14,
  border: "1px solid var(--border)",
  fontSize: 13,
};

function Reports() {
  const [range, setRange] = useState("Wiki hii");

  return (
    <>
      <PageHeader title="Ripoti" subtitle={`Kipindi: ${range}`} />

      <Section>
        <div className="flex snap-x gap-2 overflow-x-auto pb-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`tap shrink-0 rounded-full border px-5 text-[15px] font-medium ${
                range === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </Section>

      <Section>
        <Tabs defaultValue="mauzo">
          <TabsList className="tap h-14 w-full rounded-full bg-muted p-1">
            <TabsTrigger value="mauzo" className="h-12 flex-1 rounded-full text-[16px]">
              Mauzo
            </TabsTrigger>
            <TabsTrigger value="matumizi" className="h-12 flex-1 rounded-full text-[16px]">
              Matumizi
            </TabsTrigger>
            <TabsTrigger value="hisa" className="h-12 flex-1 rounded-full text-[16px]">
              Hisa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mauzo" className="mt-5 space-y-4">
            <Panel>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weekTrend}>
                    <XAxis
                      dataKey="day"
                      tickFormatter={(v: string) => v.slice(0, 3)}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    />
                    <Tooltip formatter={(v) => fmt(Number(v))} contentStyle={chartTip} />
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
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Jumla ya Mauzo" value={fmt(846000)} accent />
              <StatCard label="Mauzo ya Leo" value={fmt(todayTotal)} />
            </div>
            <ListCard>
              {weekTrend.map((d) => (
                <Row key={d.day}>
                  <p className="text-[17px]">{d.day}</p>
                  <p className="text-[17px] font-semibold">{fmt(d.mauzo)}</p>
                </Row>
              ))}
            </ListCard>
          </TabsContent>

          <TabsContent value="matumizi" className="mt-5 space-y-4">
            <Panel>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenses.slice().reverse()}>
                    <XAxis
                      dataKey="date"
                      tickFormatter={(v: string) => v.slice(0, 2)}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    />
                    <Tooltip formatter={(v) => fmt(Number(v))} contentStyle={chartTip} />
                    <Bar dataKey="amount" fill="var(--foreground)" radius={8} barSize={22} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Jumla ya Matumizi" value={fmt(expensesTotal)} accent />
              <StatCard label="Idadi ya Matumizi" value={`${expenses.length}`} />
            </div>
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
          </TabsContent>

          <TabsContent value="hisa" className="mt-5 space-y-4">
            <Panel>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={products.slice(0, 6)}>
                    <XAxis
                      dataKey="name"
                      tickFormatter={(v: string) => v.split(" ")[0] ?? ""}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    />
                    <Tooltip contentStyle={chartTip} />
                    <Bar dataKey="stock" fill="var(--foreground)" radius={8} barSize={22} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Bidhaa Zote" value={`${products.length}`} />
              <StatCard
                label="Bidhaa zenye hisa ndogo"
                value={`${products.filter((p) => p.stock <= p.lowAt).length}`}
                accent
              />
            </div>
            <ListCard>
              {products.map((p) => (
                <Row key={p.id}>
                  <div>
                    <p className="text-[17px]">{p.name}</p>
                    <p className="text-[14px] text-muted-foreground">
                      {p.stock} {p.unit}
                    </p>
                  </div>
                  <p className="text-[17px] font-semibold">{fmt(p.stock * p.buyPrice)}</p>
                </Row>
              ))}
            </ListCard>
          </TabsContent>
        </Tabs>
      </Section>
    </>
  );
}
