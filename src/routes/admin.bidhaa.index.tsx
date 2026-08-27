import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  const list = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

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
              className="tap flex items-center justify-between rounded-[22px] border border-border bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
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
    </>
  );
}
