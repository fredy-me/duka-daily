import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageHeader, Section, Panel } from "@/components/duka/shell";
import { fmt } from "@/lib/mock";
import { useProducts, restockProduct } from "@/lib/store";

export const Route = createFileRoute("/admin/bidhaa/$id/Ongeza")({
  head: () => ({
    meta: [
      { title: "Ongeza Hisa — Duka Langu" },
      { name: "description", content: "Ongeza hisa kwenye bidhaa iliyopo." },
      { property: "og:title", content: "Ongeza Hisa — Duka Langu" },
      { property: "og:description", content: "Ongeza hisa kwenye bidhaa iliyopo." },
    ],
  }),
  component: RestockPage,
});

function RestockPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const products = useProducts();
  const p = products.find((x) => x.id === id) ?? products[0]!;

  const [supplier, setSupplier] = useState("");
  const [idadi, setIdadi] = useState("");
  const [beiYaKununulia, setBeiYaKununulia] = useState("");

  const idadiNum = parseInt(idadi, 10) || 0;
  const beiNum = parseInt(beiYaKununulia, 10) || 0;
  const jumla = idadiNum * beiNum;
  const hisaMpya = p.stock + idadiNum;

  const valid = idadi !== "" && beiYaKununulia !== "";

  function goBack() {
    router.navigate({ to: "/admin/bidhaa/$id", params: { id: p.id } });
  }

  function save() {
    const today = new Date().toLocaleDateString("sw-TZ", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    restockProduct(id, idadiNum, Number(beiYaKununulia), today);
    goBack();
  }

  return (
    <>
      <PageHeader
        title="Ongeza Hisa"
        subtitle="Ongeza bidhaa kwenye hisa iliyopo."
        back="/admin/bidhaa/$id"
        params={{ id: p.id }}
      />

      <Section>
        <Panel className="p-5">
          <p className="text-[14px] leading-snug text-muted-foreground">Bidhaa</p>
          <p className="mt-1 text-[20px] font-bold tracking-tight">{p.name}</p>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3">
            <span className="text-[15px] text-muted-foreground">Hisa iliyopo</span>
            <span className="text-[17px] font-semibold">
              {p.stock} {p.unit}
            </span>
          </div>
          {idadiNum > 0 ? (
            <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-total/25 bg-total-soft px-4 py-3">
              <span className="text-[15px] text-total">Hisa baada ya nyongeza</span>
              <span className="text-[17px] font-bold text-total">
                {hisaMpya} {p.unit}
              </span>
            </div>
          ) : null}
        </Panel>
      </Section>

      <Section>
        <div className="flex flex-col gap-5">
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
            <Label htmlFor="idadi" className="text-[15px]">
              Idadi ya Bidhaa (ya kuongeza)
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

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={goBack}
              className="tap flex-1 rounded-xl text-[17px]"
            >
              Ghairi
            </Button>
            <Button onClick={save} disabled={!valid} className="tap flex-1 rounded-xl text-[17px]">
              Hifadhi Nyongeza
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
