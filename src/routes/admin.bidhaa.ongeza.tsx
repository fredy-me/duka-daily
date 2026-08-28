import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader, Section } from "@/components/duka/shell";
import { fmt } from "@/lib/mock";

export const Route = createFileRoute("/admin/bidhaa/ongeza")({
  head: () => ({
    meta: [
      { title: "Ongeza Bidhaa — Duka Langu" },
      { name: "description", content: "Sajili bidhaa mpya kwa kuweka jina, msambazaji na bei." },
      { property: "og:title", content: "Ongeza Bidhaa — Duka Langu" },
      { property: "og:description", content: "Sajili bidhaa mpya kwenye duka." },
    ],
  }),
  component: AddProductPage,
});

function AddProductPage() {
  const router = useRouter();
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

  const valid =
    name.trim() !== "" &&
    kipimo !== "" &&
    idadi !== "" &&
    beiYaKununulia !== "" &&
    beiYaKuuza !== "";

  function goBack() {
    router.navigate({ to: "/admin/bidhaa" });
  }

  return (
    <>
      <PageHeader
        title="Ongeza Bidhaa"
        subtitle="Jaza taarifa za bidhaa mpya."
        back="/admin/bidhaa"
      />

      <Section>
        <div className="flex flex-col gap-5">
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

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={goBack}
              className="tap flex-1 rounded-xl text-[17px]"
            >
              Ghairi
            </Button>
            <Button
              onClick={goBack}
              disabled={!valid}
              className="tap flex-1 rounded-xl text-[17px]"
            >
              Usajili
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
