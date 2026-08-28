import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PageHeader, Section, Panel, StatCard, ListCard, Row, Pill } from "@/components/duka/shell";
import { fmt, wakalaAgents, currentMonth } from "@/lib/mock";
import { useWakala, setWakalaFloat, setWakalaCommission } from "@/lib/store";

export const Route = createFileRoute("/admin/zaidi/wakala")({
  head: () => ({
    meta: [
      { title: "Wakala — Duka Langu" },
      { name: "description", content: "Float na tume za wakala wa pesa za simu kwa mwezi." },
      { property: "og:title", content: "Wakala — Duka Langu" },
      { property: "og:description", content: "Float na tume za wakala kwa mwezi." },
    ],
  }),
  component: WakalaPage,
});

const pct = (c: number, f: number) => (f > 0 ? Math.round((c / f) * 100 * 10) / 10 : 0);

const months = [currentMonth, "Jul 2026", "Jun 2026"];

function NumericDialog({
  open,
  onClose,
  title,
  label,
  value,
  onChange,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[min(360px,calc(100vw-40px))] gap-4 rounded-[22px] p-6">
        <DialogHeader>
          <DialogTitle className="text-[18px] font-bold">{title}</DialogTitle>
          <DialogDescription className="text-[15px]">{label}</DialogDescription>
        </DialogHeader>
        <Input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 rounded-xl px-4 text-[17px]"
        />
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="tap flex-1 rounded-xl text-[17px]">
            Ghairi
          </Button>
          <Button onClick={onSave} className="tap flex-1 rounded-xl text-[17px]">
            Hifadhi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function WakalaPage() {
  const rows = useWakala();
  const [edit, setEdit] = useState<null | {
    agentId: string;
    agentName: string;
    type: "float" | "commission";
    value: string;
  }>(null);

  const current = rows.filter((w) => w.month === currentMonth);
  const totalFloat = current.reduce((a, w) => a + w.float, 0);
  const totalCommission = current.reduce((a, w) => a + w.commission, 0);
  const overallPct = pct(totalCommission, totalFloat);

  const agent = (id: string) => wakalaAgents.find((a) => a.id === id);

  function openFloat(id: string, name: string, value: number) {
    setEdit({ agentId: id, agentName: name, type: "float", value: `${value}` });
  }
  function openCommission(id: string, name: string, value: number) {
    setEdit({ agentId: id, agentName: name, type: "commission", value: `${value}` });
  }
  function saveEdit() {
    if (!edit) return;
    const num = Number(edit.value);
    if (!Number.isFinite(num) || num < 0) return;
    if (edit.type === "float") {
      setWakalaFloat(edit.agentId, currentMonth, num);
    } else {
      setWakalaCommission(edit.agentId, currentMonth, num);
    }
    setEdit(null);
  }

  return (
    <>
      <PageHeader title="Wakala" subtitle={`Float na tume — ${currentMonth}`} back="/admin/zaidi" />

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Jumla ya Float" value={fmt(totalFloat)} />
          <StatCard label="Jumla ya Tume" value={fmt(totalCommission)} accent />
        </div>
        <Panel className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[14px] text-muted-foreground">Tume kama asilimia ya float</p>
            <p className="mt-1 text-[16px] font-semibold">
              {fmt(totalCommission)} · {overallPct}% ya {fmt(totalFloat)}
            </p>
          </div>
          <Pill tone="accent">{overallPct}%</Pill>
        </Panel>
      </Section>

      <Section title="Mwezi huu — kwa kila wakala">
        <div className="space-y-3">
          {wakalaAgents.map((a) => {
            const r = current.find((w) => w.agentId === a.id) ?? {
              float: 0,
              commission: 0,
            };
            const p = pct(r.commission, r.float);
            return (
              <Panel key={a.id}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-full border border-border bg-muted">
                      <Wallet className="size-4 text-foreground" strokeWidth={1.5} />
                    </div>
                    <p className="text-[17px] font-semibold">{a.name}</p>
                  </div>
                  <Pill tone="accent">{p}%</Pill>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-2xl border border-border bg-background px-2 py-3">
                    <p className="text-[12px] text-muted-foreground">Float</p>
                    <p className="mt-1 text-[15px] font-bold">{fmt(r.float)}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-2 py-3">
                    <p className="text-[12px] text-muted-foreground">Tume</p>
                    <p className="mt-1 text-[15px] font-bold text-total">{fmt(r.commission)}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-2 py-3">
                    <p className="text-[12px] text-muted-foreground">% ya float</p>
                    <p className="mt-1 text-[15px] font-bold">{p}%</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="tap flex-1 rounded-xl"
                    onClick={() => openFloat(a.id, a.name, r.float)}
                  >
                    <Pencil className="mr-1.5 size-4" strokeWidth={2} /> Float
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="tap flex-1 rounded-xl border-total/25 bg-total-soft text-total hover:bg-total/10"
                    onClick={() => openCommission(a.id, a.name, r.commission)}
                  >
                    Andika Commission
                  </Button>
                </div>
              </Panel>
            );
          })}
        </div>
      </Section>

      {months
        .filter((m) => m !== currentMonth)
        .map((m) => {
          const monthRows = rows.filter((w) => w.month === m);
          return (
            <Section key={m} title={`${m} (iliyopita)`}>
              <ListCard>
                {monthRows.map((w) => {
                  const p = pct(w.commission, w.float);
                  return (
                    <Row key={w.id}>
                      <div>
                        <p className="text-[17px]">{agent(w.agentId)?.name ?? w.agentId}</p>
                        <p className="text-[14px] text-muted-foreground">
                          Float {fmt(w.float)} · Tume {fmt(w.commission)}
                        </p>
                      </div>
                      <p className="text-[17px] font-semibold">{p}%</p>
                    </Row>
                  );
                })}
              </ListCard>
            </Section>
          );
        })}

      <NumericDialog
        open={!!edit && edit.type === "float"}
        onClose={() => setEdit(null)}
        title={edit?.type === "float" ? "Badilisha Float" : "Float"}
        label={edit ? `${edit.agentName} · ${currentMonth}` : ""}
        value={edit?.type === "float" ? edit.value : ""}
        onChange={(v) => setEdit((s) => (s ? { ...s, value: v } : s))}
        onSave={saveEdit}
      />
      <NumericDialog
        open={!!edit && edit.type === "commission"}
        onClose={() => setEdit(null)}
        title="Andika Commission"
        label={edit ? `${edit.agentName} · tume ya ${currentMonth}` : ""}
        value={edit?.type === "commission" ? edit.value : ""}
        onChange={(v) => setEdit((s) => (s ? { ...s, value: v } : s))}
        onSave={saveEdit}
      />
    </>
  );
}
