import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Minus, Pencil, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { PageHeader, Section, StatCard, ListCard, Row, Panel, Pill } from "@/components/duka/shell";
import { fmt, stockCount, stockValue, storeHistory } from "@/lib/mock";
import {
  useStocktaking,
  updateStocktaking,
  adjustStocktaking,
  deleteStocktaking,
} from "@/lib/store";

export const Route = createFileRoute("/admin/zaidi/store")({
  head: () => ({
    meta: [
      { title: "Store — Duka Langu" },
      { name: "description", content: "Kiasi kinachopatikana leo na historia ya hisa." },
      { property: "og:title", content: "Store — Duka Langu" },
      { property: "og:description", content: "Kiasi kinachopatikana leo na historia ya hisa." },
    ],
  }),
  component: StorePage,
});

const ranges = ["Leo", "Jana", "Wiki hii", "Mwezi huu", "Kipindi Maalum", "Mwaka"];

const fmtDay = (d: Date) =>
  d.toLocaleDateString("sw-TZ", { day: "numeric", month: "short", year: "numeric" });

const weekdayName = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("sw-TZ", { weekday: "long" });

const toDate = (date: string) => new Date(`${date}T00:00:00`);

function rangeWindow(range: string, rangeDates?: DateRange | undefined): [Date, Date] {
  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);
  const dayStart = (d: Date) => {
    const n = new Date(d);
    n.setHours(0, 0, 0, 0);
    return n;
  };
  switch (range) {
    case "Leo":
      return [dayStart(today), dayStart(today)];
    case "Jana": {
      start.setDate(today.getDate() - 1);
      return [dayStart(start), dayStart(start)];
    }
    case "Wiki hii": {
      start.setDate(today.getDate() - 6);
      return [dayStart(start), dayStart(today)];
    }
    case "Mwezi huu": {
      start.setDate(1);
      return [dayStart(start), dayStart(today)];
    }
    case "Mwaka": {
      start.setMonth(0, 1);
      return [dayStart(start), dayStart(today)];
    }
    case "Kipindi Maalum":
      return rangeDates?.from && rangeDates?.to
        ? [dayStart(rangeDates.from), dayStart(rangeDates.to)]
        : [dayStart(today), dayStart(today)];
    default:
      return [dayStart(today), dayStart(today)];
  }
}

function inRange(date: string, from: Date, to: Date) {
  const d = toDate(date);
  return d >= from && d <= to;
}

function StorePage() {
  const stocktaking = useStocktaking();
  const [range, setRange] = useState("Leo");
  const [rangeDates, setRangeDates] = useState<DateRange | undefined>(undefined);
  const [pickOpen, setPickOpen] = useState(false);
  const [mode, setMode] = useState<"single" | "range">("single");
  const [day, setDay] = useState<Date | undefined>(undefined);
  const [editing, setEditing] = useState<null | { id: string; product: string; qty: string }>(null);
  const [detail, setDetail] = useState<null | (typeof storeHistory)[number]>(null);

  const [from, to] = rangeWindow(range, rangeDates);
  const filtered = stocktaking.filter((s) => inRange(s.date, from, to));

  function openPicker() {
    setMode("single");
    setDay(undefined);
    setRangeDates(undefined);
    setPickOpen(true);
  }

  function apply() {
    if (mode === "single" && day) {
      setRangeDates({ from: day, to: day });
      setRange("Kipindi Maalum");
    } else if (mode === "range" && rangeDates?.from && rangeDates?.to) {
      setRange("Kipindi Maalum");
    }
    setPickOpen(false);
  }

  function onRangeSelected(r: DateRange | undefined) {
    if (r?.from && r?.to && r.from.toDateString() === r.to.toDateString()) {
      setRangeDates(undefined);
      setDay(r.from);
      setMode("single");
      return;
    }
    setRangeDates(r);
  }

  function saveEdit() {
    if (!editing) return;
    const qty = Number(editing.qty);
    if (Number.isFinite(qty) && qty >= 0) {
      updateStocktaking(editing.id, { qty });
    }
    setEditing(null);
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
      <PageHeader title="Store" subtitle="Ni kiasi gani kinapatikana leo" back="/admin/zaidi" />

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Bidhaa Zilizopo Leo" value={`${stockCount}`} />
          <StatCard label="Thamani ya Hisa" value={fmt(stockValue)} accent />
        </div>
      </Section>

      <Section title="Stock">
        <div className="flex snap-x gap-2 overflow-x-auto pb-1">
          {ranges.map((r) => (
            <RangeButton key={r} r={r} />
          ))}
        </div>
      </Section>

      <Section>
        <Tabs defaultValue="stocktaking">
          <TabsList className="tap h-14 w-full rounded-full bg-muted p-1">
            <TabsTrigger value="stocktaking" className="h-12 flex-1 rounded-full text-[16px]">
              Stocktaking
            </TabsTrigger>
            <TabsTrigger value="history" className="h-12 flex-1 rounded-full text-[16px]">
              Store History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stocktaking" className="mt-5 space-y-4">
            {filtered.length === 0 ? (
              <Panel className="py-10 text-center">
                <p className="text-[16px] font-medium text-muted-foreground">
                  Hakuna rekodi za hisa kwa kipindi hiki.
                </p>
              </Panel>
            ) : (
              <ListCard>
                {filtered.map((s) => (
                  <div
                    key={s.id}
                    className="border-b border-border px-5 py-4 last:border-0"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-[17px] font-medium">{s.product}</p>
                        <p className="mt-0.5 text-[14px] text-muted-foreground">
                          Quantity {s.qty} {s.unit} · {fmtDay(toDate(s.date))}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          onClick={() => adjustStocktaking(s.id, -1)}
                          aria-label="Punguza"
                          className="tap flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent active:scale-[0.96]"
                        >
                          <Minus className="size-4" strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => setEditing({ id: s.id, product: s.product, qty: `${s.qty}` })}
                          aria-label="Hariri"
                          className="tap flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent active:scale-[0.96]"
                        >
                          <Pencil className="size-4" strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => adjustStocktaking(s.id, 1)}
                          aria-label="Ongeza"
                          className="tap flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent active:scale-[0.96]"
                        >
                          <Plus className="size-4" strokeWidth={2} />
                        </button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              aria-label="Futa"
                              className="tap flex size-9 items-center justify-center rounded-full border border-total/25 bg-total-soft text-total transition hover:bg-total/10 active:scale-[0.96]"
                            >
                              <Trash2 className="size-4" strokeWidth={2} />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="w-[min(360px,calc(100vw-40px))] rounded-[22px]">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-[18px] font-bold">
                                Futa {s.product}?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-[15px]">
                                Una uhakika unataka kuondoa rekodi hii ya {fmtDay(toDate(s.date))}?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="tap flex-1 rounded-xl text-[15px]">
                                Ghairi
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteStocktaking(s.id)}
                                className="tap flex-1 rounded-xl border-transparent bg-destructive text-destructive-foreground text-[15px] hover:bg-destructive/90"
                              >
                                Futa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </ListCard>
            )}
            <p className="px-2 text-[13px] text-muted-foreground">
              Rekodi {filtered.length} · Weka idadi kwa +/−, hariri au futa.
            </p>
          </TabsContent>

          <TabsContent value="history" className="mt-5 space-y-4">
            <ListCard>
              {storeHistory.map((h) => (
                <Row key={h.id}>
                  <button
                    onClick={() => setDetail(h)}
                    className="tap w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <p className="text-[17px] font-medium">
                      {fmtDay(toDate(h.openDate))} → {fmtDay(toDate(h.closeDate))}
                    </p>
                    <p className="mt-0.5 text-[14px] text-muted-foreground">
                      Fungua {fmt(h.openBalance)} · Funga {fmt(h.closeBalance)}
                    </p>
                  </button>
                </Row>
              ))}
            </ListCard>
          </TabsContent>
        </Tabs>
      </Section>

      <Dialog open={pickOpen} onOpenChange={setPickOpen}>
        <DialogContent className="max-h-[min(720px,calc(100dvh-96px))] w-[min(380px,calc(100vw-40px))] gap-4 overflow-y-auto rounded-[22px] p-6">
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
                  ? fmtDay(day)
                  : "Sijachagua"
                : rangeDates?.from && rangeDates?.to
                  ? `${fmtDay(rangeDates.from)} – ${fmtDay(rangeDates.to)}`
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
              disabled={mode === "single" ? !day : !(rangeDates?.from && rangeDates?.to)}
              className="tap flex-1 rounded-xl text-[17px]"
            >
              Tumia
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="w-[min(360px,calc(100vw-40px))] gap-4 rounded-[22px] p-6">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold">Hariri Hisa</DialogTitle>
            <DialogDescription className="text-[15px]">
              Badilisha idadi ya {editing?.product}.
            </DialogDescription>
          </DialogHeader>
          <label className="block">
            <span className="mb-1.5 block text-[14px] text-muted-foreground">Idadi</span>
            <Input
              type="number"
              min={0}
              value={editing?.qty ?? ""}
              onChange={(e) => setEditing((s) => (s ? { ...s, qty: e.target.value } : s))}
              className="h-12 rounded-xl px-4 text-[17px]"
            />
          </label>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setEditing(null)} className="tap flex-1 rounded-xl text-[17px]">
              Ghairi
            </Button>
            <Button onClick={saveEdit} className="tap flex-1 rounded-xl text-[17px]">
              Hifadhi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="w-[min(380px,calc(100vw-40px))] gap-4 rounded-[22px] p-6">
          {detail ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-[20px] font-bold">Maelezo ya Hisa</DialogTitle>
                <DialogDescription className="text-[15px]">
                  Salio la ufunguzi na kufunga kwa kipindi hiki.
                </DialogDescription>
              </DialogHeader>

              <Panel className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[14px] text-muted-foreground">Siku ya Kufungua</p>
                    <p className="text-[17px] font-semibold">
                      {fmtDay(toDate(detail.openDate))}
                    </p>
                    <p className="text-[14px] text-muted-foreground">{weekdayName(detail.openDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] text-muted-foreground">Saa</p>
                    <p className="text-[17px] font-bold">{detail.openTime}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[14px] text-muted-foreground">Siku ya Kufunga</p>
                    <p className="text-[17px] font-semibold">
                      {fmtDay(toDate(detail.closeDate))}
                    </p>
                    <p className="text-[14px] text-muted-foreground">{weekdayName(detail.closeDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] text-muted-foreground">Saa</p>
                    <p className="text-[17px] font-bold">{detail.closeTime}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
                  <p className="text-[14px] text-muted-foreground">Salio la Kufungua</p>
                  <p className="text-[17px] font-semibold">{fmt(detail.openBalance)}</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[14px] text-muted-foreground">Salio la Kufunga</p>
                  <p className="text-[17px] font-bold text-total">{fmt(detail.closeBalance)}</p>
                </div>
              </Panel>

              <Button variant="outline" onClick={() => setDetail(null)} className="tap flex-1 rounded-xl text-[17px]">
                Funga
              </Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
