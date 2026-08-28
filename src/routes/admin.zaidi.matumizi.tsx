import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { PageHeader, Section, StatCard, ListCard, Row } from "@/components/duka/shell";
import { fmt } from "@/lib/mock";
import {
  useExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  type BudgetCategory,
} from "@/lib/store";

export const Route = createFileRoute("/admin/zaidi/matumizi")({
  head: () => ({
    meta: [
      { title: "Matumizi — Duka Langu" },
      { name: "description", content: "Rekodi za matumizi ya duka." },
      { property: "og:title", content: "Matumizi — Duka Langu" },
      { property: "og:description", content: "Rekodi za matumizi ya duka." },
    ],
  }),
  component: MatumiziPage,
});

const todayLabel = () =>
  new Date().toLocaleDateString("sw-TZ", { day: "numeric", month: "short", year: "numeric" });

type FormState = { note: string; amount: string; target: string; date: string };

const emptyForm: FormState = { note: "", amount: "", target: "", date: todayLabel() };

function MatumiziPage() {
  const expenses = useExpenses();
  const total = expenses.reduce((a, e) => a + e.amount, 0);
  const [editing, setEditing] = useState<null | BudgetCategory>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setAdding(true);
  }
  function openEdit(e: BudgetCategory) {
    setEditing(e);
    setForm({ note: e.note, amount: `${e.amount}`, target: `${e.target}`, date: e.date });
    setAdding(true);
  }

  function save() {
    const amount = Number(form.amount);
    const target = Number(form.target);
    if (!form.note.trim() || !Number.isFinite(amount) || amount < 0) return;
    const targetVal = Number.isFinite(target) && target >= 0 ? target : amount;
    if (editing) {
      updateExpense(editing.id, {
        note: form.note.trim(),
        amount,
        target: targetVal,
        date: form.date,
      });
    } else {
      addExpense({ note: form.note.trim(), amount, target: targetVal, date: form.date });
    }
    setAdding(false);
    setEditing(null);
  }

  const headerAction = (
    <button
      onClick={openAdd}
      aria-label="Ongeza matumizi"
      className="tap flex size-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-foreground/20 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
    >
      <Plus className="size-5" strokeWidth={1.75} />
    </button>
  );

  return (
    <>
      <PageHeader
        title="Matumizi"
        subtitle={`${expenses.length} rekodi za matumizi`}
        back="/admin/zaidi"
        action={headerAction}
      />

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Matumizi Halisi" value={fmt(total)} accent />
          <StatCard label="Idadi ya Matumizi" value={`${expenses.length}`} />
        </div>
      </Section>

      <Section title="Matumizi yote">
        <ListCard>
          {expenses.map((e) => (
            <div key={e.id} className="border-b border-border px-5 py-4 last:border-0">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[17px] font-medium">{e.note}</p>
                  <p className="text-[14px] text-muted-foreground">{e.date}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <p className="mr-1 text-[17px] font-semibold">{fmt(e.amount)}</p>
                  <button
                    onClick={() => openEdit(e)}
                    aria-label="Hariri"
                    className="tap flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent active:scale-[0.96]"
                  >
                    <Pencil className="size-4" strokeWidth={2} />
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
                          Futa {e.note}?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[15px]">
                          Una uhakika unataka kuondoa matumizi haya?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="tap flex-1 rounded-xl text-[15px]">
                          Ghairi
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteExpense(e.id)}
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
      </Section>

      <Dialog open={adding} onOpenChange={(o) => !o && setAdding(false)}>
        <DialogContent className="w-[min(360px,calc(100vw-40px))] gap-4 rounded-[22px] p-6">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold">
              {editing ? "Hariri Matumizi" : "Ongeza Matumizi"}
            </DialogTitle>
            <DialogDescription className="text-[15px]">
              Andika maelezo na kiasi cha matumizi.
            </DialogDescription>
          </DialogHeader>
          <label className="block">
            <span className="mb-1.5 block text-[14px] text-muted-foreground">Maelezo</span>
            <Input
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="mf. Umeme (LUKU)"
              className="h-12 rounded-xl px-4 text-[17px]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[14px] text-muted-foreground">Kiasi (TZS)</span>
            <Input
              type="number"
              min={0}
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="h-12 rounded-xl px-4 text-[17px]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[14px] text-muted-foreground">
              Kiasi cha Bajeti (Target)
            </span>
            <Input
              type="number"
              min={0}
              value={form.target}
              onChange={(e) => setForm({ ...form, target: e.target.value })}
              className="h-12 rounded-xl px-4 text-[17px]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[14px] text-muted-foreground">Tarehe</span>
            <Input
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="h-12 rounded-xl px-4 text-[17px]"
            />
          </label>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setAdding(false)}
              className="tap flex-1 rounded-xl text-[17px]"
            >
              Ghairi
            </Button>
            <Button onClick={save} className="tap flex-1 rounded-xl text-[17px]">
              Hifadhi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
