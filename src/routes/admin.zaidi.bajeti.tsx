import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { PageHeader, Section, Panel, ListCard, Row, Pill } from "@/components/duka/shell";
import { fmt } from "@/lib/mock";
import {
  useBudget,
  updateBudgetCategory,
  deleteBudgetCategory,
  type BudgetCategory,
} from "@/lib/store";

export const Route = createFileRoute("/admin/zaidi/bajeti")({
  head: () => ({
    meta: [
      { title: "Bajeti — Duka Langu" },
      { name: "description", content: "Bajeti ya matumizi, kiasi kilichotumika na kilichobaki." },
      { property: "og:title", content: "Bajeti — Duka Langu" },
      { property: "og:description", content: "Bajeti ya matumizi na kiasi kilichobaki." },
    ],
  }),
  component: BajetiPage,
});

const pct = (used: number, target: number) => (target > 0 ? Math.round((used / target) * 100) : 0);

function ProgressBar({ usedPct }: { usedPct: number }) {
  const clamped = Math.min(100, Math.max(0, usedPct));
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

function BudgetPanel({ cats }: { cats: BudgetCategory[] }) {
  const used = cats.reduce((a, c) => a + c.amount, 0);
  const target = cats.reduce((a, c) => a + c.target, 0);
  const remaining = target - used;
  const usedPct = pct(used, target);
  return (
    <Panel>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[14px] text-muted-foreground">Bajeti ya Mwezi</p>
          <p className="mt-0.5 text-[22px] font-bold tracking-tight">{fmt(target)}</p>
        </div>
        <div className="text-right">
          <p className="text-[14px] text-muted-foreground">Imetumika</p>
          <p className="mt-0.5 text-[18px] font-bold text-total">{usedPct}%</p>
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar usedPct={usedPct} />
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl border border-border bg-background px-2 py-3">
            <p className="text-[12px] text-muted-foreground">Imetengwa</p>
            <p className="mt-1 text-[15px] font-bold">{fmt(target)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-background px-2 py-3">
            <p className="text-[12px] text-muted-foreground">Imetumika</p>
            <p className="mt-1 text-[15px] font-bold text-total">{fmt(used)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-background px-2 py-3">
            <p className="text-[12px] text-muted-foreground">Imebaki</p>
            <p className="mt-1 text-[15px] font-bold">{fmt(remaining)}</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function EditDialog({
  open,
  onClose,
  editing,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  editing: null | { label: string; target: string; amount: string };
  onSave: (target: number, amount: number) => void;
}) {
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editing) {
      setTarget(editing.target);
      setAmount(editing.amount);
    } else {
      setTarget("");
      setAmount("");
    }
  }, [editing]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[min(360px,calc(100vw-40px))] gap-4 rounded-[22px] p-6">
        <DialogHeader>
          <DialogTitle className="text-[18px] font-bold">Hariri Bajeti</DialogTitle>
          <DialogDescription className="text-[15px]">{editing?.label}</DialogDescription>
        </DialogHeader>
        <label className="block">
          <span className="mb-1.5 block text-[14px] text-muted-foreground">
            Kiasi kilichotengwa (Target)
          </span>
          <Input
            type="number"
            min={0}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="h-12 rounded-xl px-4 text-[17px]"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[14px] text-muted-foreground">
            Kiasi kilichotumika
          </span>
          <Input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-12 rounded-xl px-4 text-[17px]"
          />
        </label>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="tap flex-1 rounded-xl text-[17px]">
            Ghairi
          </Button>
          <Button
            onClick={() => {
              onSave(Number(target), Number(amount));
              setTarget("");
              setAmount("");
            }}
            className="tap flex-1 rounded-xl text-[17px]"
          >
            Hifadhi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BajetiPage() {
  const cats = useBudget();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<null | BudgetCategory>(null);

  const sorted = [...cats].sort((a, b) => pct(b.amount, b.target) - pct(a.amount, a.target));

  const headerAction = (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            aria-label="Futa bajeti"
            className="tap flex size-12 items-center justify-center rounded-full border border-total/25 bg-total-soft text-total shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-total/40 hover:bg-total/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            <Trash2 className="size-5" strokeWidth={1.75} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[min(360px,calc(100vw-40px))] rounded-[22px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[18px] font-bold">Futa Bajeti?</AlertDialogTitle>
            <AlertDialogDescription className="text-[15px]">
              Una uhakika unataka kuondoa bajeti yote ya mwezi huu? Kitendo hiki hakiwezi
              kutenduliwa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="tap flex-1 rounded-xl text-[15px]">
              Ghairi
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cats.forEach((c) => deleteBudgetCategory(c.id))}
              className="tap flex-1 rounded-xl border-transparent bg-destructive text-destructive-foreground text-[15px] hover:bg-destructive/90"
            >
              Futa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );

  return (
    <>
      <PageHeader
        title="Bajeti"
        subtitle="Mwezi huu · matumizi na kiasi kilichobaki"
        back="/admin/zaidi"
        action={headerAction}
      />

      <Section>
        <BudgetPanel cats={cats} />
      </Section>

      <Section title="Nini kinatumia bajeti kubwa">
        <ListCard>
          {sorted.map((c) => {
            const usedPct = pct(c.amount, c.target);
            const remaining = c.target - c.amount;
            const open = expanded === c.id;
            return (
              <div key={c.id}>
                <button
                  onClick={() => setExpanded(open ? null : c.id)}
                  className="tap flex w-full items-center justify-between gap-3 border-b border-border bg-card px-5 py-4 text-left last:border-0 transition hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[17px] font-medium">{c.note}</p>
                      <Pill tone="accent">{usedPct}%</Pill>
                    </div>
                    <div className="mt-2">
                      <ProgressBar usedPct={usedPct} />
                    </div>
                  </div>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
                {open ? (
                  <div className="border-b border-border bg-background px-5 py-4 last:border-0">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-2xl border border-border bg-card px-2 py-3">
                        <p className="text-[12px] text-muted-foreground">Kimetengwa</p>
                        <p className="mt-1 text-[15px] font-bold">{fmt(c.target)}</p>
                      </div>
                      <div className="rounded-2xl border border-border bg-card px-2 py-3">
                        <p className="text-[12px] text-muted-foreground">Kimetumika</p>
                        <p className="mt-1 text-[15px] font-bold text-total">{fmt(c.amount)}</p>
                      </div>
                      <div className="rounded-2xl border border-border bg-card px-2 py-3">
                        <p className="text-[12px] text-muted-foreground">Kimebaki</p>
                        <p className="mt-1 text-[15px] font-bold">{fmt(remaining)}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="tap flex-1 rounded-xl"
                        onClick={() => setEditing(c)}
                      >
                        <Pencil className="mr-1.5 size-4" strokeWidth={2} /> Hariri
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="tap flex-1 rounded-xl border-total/25 bg-total-soft text-total hover:bg-total/10"
                          >
                            <Trash2 className="mr-1.5 size-4" strokeWidth={2} /> Futa
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[min(360px,calc(100vw-40px))] rounded-[22px]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-[18px] font-bold">
                              Futa {c.note}?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-[15px]">
                              Una uhakika unataka kuondoa aina hii ya matumizi kwenye bajeti?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="tap flex-1 rounded-xl text-[15px]">
                              Ghairi
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteBudgetCategory(c.id)}
                              className="tap flex-1 rounded-xl border-transparent bg-destructive text-destructive-foreground text-[15px] hover:bg-destructive/90"
                            >
                              Futa
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </ListCard>
      </Section>

      <EditDialog
        open={!!editing}
        onClose={() => setEditing(null)}
        editing={
          editing
            ? {
                label: `Hariri ${editing.note}`,
                target: `${editing.target}`,
                amount: `${editing.amount}`,
              }
            : null
        }
        onSave={(target, amount) => {
          if (editing) {
            updateBudgetCategory(editing.id, { target, amount });
          }
          setEditing(null);
        }}
      />
    </>
  );
}
