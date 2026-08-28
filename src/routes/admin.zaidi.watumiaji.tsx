import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Trash2, UserPlus } from "lucide-react";
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
import { PageHeader, Section, ListCard, Row, Pill } from "@/components/duka/shell";
import { useUsers, inviteUser, updateUser, deleteUser } from "@/lib/store";
import type { User } from "@/lib/mock";

export const Route = createFileRoute("/admin/zaidi/watumiaji")({
  head: () => ({
    meta: [
      { title: "Watumiaji — Duka Langu" },
      { name: "description", content: "Orodha ya watumiaji wa duka." },
      { property: "og:title", content: "Watumiaji — Duka Langu" },
      { property: "og:description", content: "Orodha ya watumiaji wa duka." },
    ],
  }),
  component: WatumiajiPage,
});

const roles: Array<"Admin" | "Muuzaji"> = ["Admin", "Muuzaji"];

type FormState = { name: string; phone: string; role: "Admin" | "Muuzaji" };
const emptyForm: FormState = { name: "", phone: "", role: "Muuzaji" };

function WatumiajiPage() {
  const users = useUsers();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<null | User>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  function openInvite() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }
  function openEdit(u: User) {
    setEditing(u);
    setForm({ name: u.name, phone: u.phone, role: u.role });
    setOpen(true);
  }

  function save() {
    const name = form.name.trim();
    if (!name) return;
    if (editing) {
      updateUser(editing.id, { name, phone: form.phone.trim(), role: form.role });
    } else {
      inviteUser({ name, phone: form.phone.trim(), role: form.role });
    }
    setOpen(false);
    setEditing(null);
  }

  const headerAction = (
    <button
      onClick={openInvite}
      aria-label="Ongeza kwa mwaliko"
      className="tap flex size-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-foreground/20 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
    >
      <Plus className="size-5" strokeWidth={1.75} />
    </button>
  );

  return (
    <>
      <PageHeader
        title="Watumiaji"
        subtitle={`${users.length} watumiaji`}
        back="/admin/zaidi"
        action={headerAction}
      />

      <Section>
        <ListCard>
          {users.map((u) => (
            <div key={u.id} className="border-b border-border px-5 py-4 last:border-0">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[17px] font-medium">{u.name}</p>
                    {u.status === "Ametumwa" ? <Pill tone="muted">Mwaliko umetumwa</Pill> : null}
                  </div>
                  <p className="text-[14px] text-muted-foreground">{u.phone}</p>
                </div>
                <Pill tone={u.role === "Admin" ? "dark" : "muted"}>{u.role}</Pill>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => openEdit(u)}
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
                          Futa {u.name}?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[15px]">
                          Una uhakika unataka kumwondoa mtumiaji huyu kwenye duka?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="tap flex-1 rounded-xl text-[15px]">
                          Ghairi
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteUser(u.id)}
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

      <Dialog open={open} onOpenChange={(o) => !o && setOpen(false)}>
        <DialogContent className="w-[min(360px,calc(100vw-40px))] gap-4 rounded-[22px] p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[18px] font-bold">
              <UserPlus className="size-5" strokeWidth={1.75} />
              {editing ? "Hariri Mtumiaji" : "Ongeza kwa Mwaliko"}
            </DialogTitle>
            <DialogDescription className="text-[15px]">
              {editing ? "Badilisha taarifa za mtumiaji." : "Mwaliko utatumwa kwa namba ya simu."}
            </DialogDescription>
          </DialogHeader>
          <label className="block">
            <span className="mb-1.5 block text-[14px] text-muted-foreground">Jina</span>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="mf. Hassan"
              className="h-12 rounded-xl px-4 text-[17px]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[14px] text-muted-foreground">Namba ya Simu</span>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="07XXXXXXXX"
              className="h-12 rounded-xl px-4 text-[17px]"
            />
          </label>
          <div>
            <span className="mb-1.5 block text-[14px] text-muted-foreground">Jukumu</span>
            <div className="flex gap-2">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setForm({ ...form, role: r })}
                  className={`tap flex-1 rounded-full border px-4 py-2.5 text-[15px] font-semibold transition-[background-color,border-color] duration-150 ${
                    form.role === r
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="tap flex-1 rounded-xl text-[17px]"
            >
              Ghairi
            </Button>
            <Button onClick={save} className="tap flex-1 rounded-xl text-[17px]">
              {editing ? "Hifadhi" : "Tuma Mwaliko"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
