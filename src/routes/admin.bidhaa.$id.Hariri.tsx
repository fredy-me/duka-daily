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
import { fmt, products } from "@/lib/mock";

export const Route = createFileRoute("/admin/bidhaa/$id/Hariri")({
  head: () => ({
    meta: [
      { title: "Hariri Bidhaa — Duka Langu" },
      { name: "description", content: "Badilisha taarifa za bidhaa." },
      { property: "og:title", content: "Hariri Bidhaa — Duka Langu" },
      { property: "og:description", content: "Badilisha taarifa za bidhaa." },
    ],
  }),
  component: EditProductPage,
});

function EditProductPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const p = products.find((x) => x.id === id) ?? products[0]!;

  const [name, setName] = useState(p.name);
  const [supplier, setSupplier] = useState("");
  const [kipimo, setKipimo] = useState(p.unit);
  const [idadi, setIdadi] = useState(String(p.stock));
  const [beiYaKununulia, setBeiYaKununulia] = useState(String(p.buyPrice));
  const [beiYaKuuza, setBeiYaKuuza] = useState(String(p.price));

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
    router.navigate({ to: "/admin/bidhaa/$id", params: { id: p.id } });
  }

  return (
    <>
      <PageHeader
        title="Hariri Bidhaa"
        subtitle="Badilisha taarifa za bidhaa."
        back="/admin/bidhaa/$id"
        params={{ id: p.id }}
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
              className="tap h-12 rounded-xl text-[17px]"
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
                <SelectValue />
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
              Hifadhi
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
