import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { PageHeader, Section, Panel, StatCard, ListCard, Row, Pill } from "@/components/duka/shell";
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

const fmtDate = (d: Date) =>
  d.toLocaleDateString("sw-TZ", { day: "numeric", month: "short", year: "numeric" });

function Reports() {
  const [range, setRange] = useState("Wiki hii");
  const [pickOpen, setPickOpen] = useState(false);
  const [mode, setMode] = useState<"single" | "range">("single");
  const [day, setDay] = useState<Date | undefined>(undefined);
  const [rangeDates, setRangeDates] = useState<DateRange | undefined>(undefined);

  function openPicker() {
    setMode("single");
    setDay(undefined);
    setRangeDates(undefined);
    setPickOpen(true);
  }

  function apply() {
    if (mode === "single" && day) {
      setRange(fmtDate(day));
    } else if (mode === "range" && rangeDates?.from && rangeDates?.to) {
      setRange(`${fmtDate(rangeDates.from)} – ${fmtDate(rangeDates.to)}`);
    }
    setPickOpen(false);
  }

  function onRangeSelected(r: DateRange | undefined) {
    if (r?.from && r?.to && r.from.toDateString() === r.to.toDateString()) {
      // Single-day range
      setRangeDates(undefined);
      setDay(r.from);
      setMode("single");
      return;
    }
    setRangeDates(r);
  }

  function RangeButton({ r }: { r: string }) {
    const isCustom = range === r || (r === "Kipindi Maalum" && pickOpen);
    return (
      <button
        onClick={() => (r === "Kipindi Maalum" ? openPicker() : setRange(r))}
        className={`tap shrink-0 rounded-full border px-5 text-[15px] font-semibold transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] ${
          isCustom
            ? "border-primary bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
            : "border-border bg-card text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-accent hover:text-foreground"
        }`}
      >
        {r}
      </button>
    );
  }

  return (
    <>
      <PageHeader title="Ripoti" subtitle={`Kipindi: ${range}`} />

      <Section>
        <div className="flex snap-x gap-2 overflow-x-auto pb-1">
          {ranges.map((r) => (
            <RangeButton key={r} r={r} />
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

      <Dialog open={pickOpen} onOpenChange={setPickOpen}>
        <DialogContent className="max-w-[540px]">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-bold">Chagua Kipindi</DialogTitle>
            <DialogDescription className="text-[15px]">
              Chagua siku moja au muda kati ya tarehe mbili.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2">
            <button
              onClick={() => setMode("single")}
              className={`tap flex-1 rounded-full border px-4 py-2 text-[15px] font-semibold transition-[background-color,border-color] duration-150 ${
                mode === "single"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              Siku Moja
            </button>
            <button
              onClick={() => setMode("range")}
              className={`tap flex-1 rounded-full border px-4 py-2 text-[15px] font-semibold transition-[background-color,border-color] duration-150 ${
                mode === "range"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              Muda (Kuanzia–Mpaka)
            </button>
          </div>

          <div className="flex justify-center">
            {mode === "single" ? (
              <Calendar mode="single" selected={day} onSelect={setDay} required />
            ) : (
              <Calendar mode="range" selected={rangeDates} onSelect={onRangeSelected} />
            )}
          </div>

          <div className="flex items-center justify-between rounded-[22px] border border-border bg-total-soft px-4 py-3">
            <p className="text-[15px] font-bold text-total">
              {mode === "single"
                ? day
                  ? fmtDate(day)
                  : "Sijachagua"
                : rangeDates?.from && rangeDates?.to
                  ? `${fmtDate(rangeDates.from)} – ${fmtDate(rangeDates.to)}`
                  : "Sijachagua"}
            </p>
            <Pill tone="accent">{mode === "single" ? "Siku 1" : "Muda"}</Pill>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setPickOpen(false)}
              className="tap flex-1 rounded-xl text-[17px]"
            >
              Ghairi
            </Button>
            <Button
              onClick={apply}
              disabled={
                mode === "single" ? !day : !(rangeDates?.from && rangeDates?.to)
              }
              className="tap flex-1 rounded-xl text-[17px]"
            >
              Tumia
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
