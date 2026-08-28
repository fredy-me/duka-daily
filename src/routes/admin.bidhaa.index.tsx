import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader, Section, Pill } from "@/components/duka/shell";
import { fmt, products } from "@/lib/mock";

export const Route = createFileRoute("/admin/bidhaa/")({
  head: () => ({
    meta: [
      { title: "Bidhaa — Duka Langu" },
      { name: "description", content: "Orodha ya bidhaa zote, hisa zilizopo na bei za kuuzia." },
      { property: "og:title", content: "Bidhaa — Duka Langu" },
      { property: "og:description", content: "Bidhaa zote, hisa zilizopo na bei za kuuzia." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [kipimo, setKipimo] = useState("");
  const [idadi, setIdadi] = useState("");
  const [beiYaKununulia, setBeiYaKununulia] = useState("");
  const [beiYaKuuza, setBeiYaKuuza] = useState("");

  const today = new Date().toLocaleDateString("sw-TZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const idadiNum = parseInt(idadi, 10) || 0;
  const beiNum = parseInt(beiYaKununulia, 10) || 0;
  const jumla = idadiNum * beiNum;

  const list = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  function resetForm() {
    setName("");
    setSupplier("");
    setKipimo("");
    setIdadi("");
    setBeiYaKununulia("");
    setBeiYaKuuza("");
  }

  return (
    <>
      <PageHeader title="Bidhaa" subtitle={`${products.length} bidhaa zimesajiliwa`} />

      <Section>
        <div className="relative">
          <Search
            className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.5}
          />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tafuta bidhaa"
            className="tap h-14 rounded-xl pl-12 text-[17px]"
          />
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-4">
          {list.map((p) => (
            <Link
              key={p.id}
              to="/admin/bidhaa/$id"
              params={{ id: p.id }}
              className="tap flex items-center justify-between rounded-[22px] border border-border bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow,transform] duration-150 hover:border-foreground/20 hover:shadow-[0_5px_14px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <div>
                <p className="text-[18px] font-semibold">{p.name}</p>
                <p className="mt-1 text-[15px] text-muted-foreground">
                  Hisa: {p.stock} {p.unit}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-[18px] font-semibold">{fmt(p.price)}</p>
                {p.stock <= p.lowAt ? <Pill tone="accent">Hisa ndogo</Pill> : null}
              </div>
            </Link>
          ))}
          {list.length === 0 ? (
            <p className="px-1 text-[16px] text-muted-foreground">Hakuna bidhaa iliyopatikana.</p>
          ) : null}
        </div>
      </Section>

      <button
        onClick={() => setOpen(true)}
        className="tap fixed right-6 bottom-24 z-40 flex size-14 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-[box-shadow,transform] duration-150 hover:shadow-[0_6px_20px_rgba(0,0,0,0.35)] active:scale-95"
      >
        <Plus className="size-6" strokeWidth={2.5} />
      </button>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) resetForm();
        }}
      >
        <DialogContent className="gap-0 p-0 sm:max-w-lg">
          <DialogHeader className="border-b border-border px-6 pt-6 pb-4">
            <DialogTitle className="text-[20px] font-bold">Ongeza Bidhaa Mpya</DialogTitle>
            <DialogDescription className="text-[15px]">
              Jaza taarifa za bidhaa unayotaka kuisajili.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5 px-6 py-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-[15px]">
                Jina la Bidhaa
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="mf. Sukari 2kg"
                className="tap h-12 rounded-xl text-[17px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-[15px]">Tarehe</Label>
              <Input
                readOnly
                value={today}
                className="tap h-12 rounded-xl text-[17px] text-muted-foreground"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="supplier" className="text-[15px]">
                Jina la Msambazaji
              </Label>
              <Input
                id="supplier"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="mf. Mwanaheri Supplies"
                className="tap h-12 rounded-xl text-[17px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-[15px]">Kipimo</Label>
              <Select value={kipimo} onValueChange={setKipimo}>
                <SelectTrigger className="tap h-12 rounded-xl text-[17px]">
                  <SelectValue placeholder="Chagua kipimo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kilo">Kilo</SelectItem>
                  <SelectItem value="lita">Lita</SelectItem>
                  <SelectItem value="pakiti">Pakiti</SelectItem>
                  <SelectItem value="mfuko">Mfuko</SelectItem>
                  <SelectItem value="chupa">Chupa</SelectItem>
                  <SelectItem value="kipande">Kipande</SelectItem>
                  <SelectItem value="dezani">Dezani</SelectItem>
                  <SelectItem value="sanduku">Sanduku</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="idadi" className="text-[15px]">
                Idadi ya Bidhaa
              </Label>
              <Input
                id="idadi"
                type="number"
                min="1"
                value={idadi}
                onChange={(e) => setIdadi(e.target.value)}
                placeholder="0"
                className="tap h-12 rounded-xl text-[17px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="bei" className="text-[15px]">
                Bei ya Kununulia (kwa kipimo)
              </Label>
              <Input
                id="bei"
                type="number"
                min="0"
                value={beiYaKununulia}
                onChange={(e) => setBeiYaKununulia(e.target.value)}
                placeholder="0"
                className="tap h-12 rounded-xl text-[17px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-[15px]">Jumla ya Kununulia</Label>
              <div className="flex h-12 items-center rounded-xl border border-border bg-total-soft px-4">
                <p className="text-[17px] font-bold text-total">{fmt(jumla)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="sell" className="text-[15px]">
                Bei ya Kuuza (kwa kipimo)
              </Label>
              <Input
                id="sell"
                type="number"
                min="0"
                value={beiYaKuuza}
                onChange={(e) => setBeiYaKuuza(e.target.value)}
                placeholder="0"
                className="tap h-12 rounded-xl text-[17px]"
              />
            </div>
          </div>

          <div className="flex gap-3 border-t border-border px-6 py-4">
            <DialogClose asChild>
              <Button variant="outline" className="tap flex-1 rounded-xl text-[17px]">
                Ghairi
              </Button>
            </DialogClose>
            <Button className="tap flex-1 rounded-xl text-[17px]" disabled={!name || !kipimo || !idadi || !beiYaKununulia || !beiYaKuuza}>
              Usajili
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
