import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageHeader, Section, Panel, Pill } from "@/components/duka/shell";
import { fmt, products } from "@/lib/mock";

export const Route = createFileRoute("/muuzaji/")({
  head: () => ({
    meta: [
      { title: "Uza — Duka La Amani" },
      {
        name: "description",
        content: "Rekodi mauzo kwa haraka: tafuta bidhaa, weka idadi, kamilisha.",
      },
      { property: "og:title", content: "Uza — Duka La Amani" },
      { property: "og:description", content: "Rekodi mauzo." },
    ],
  }),
  component: SellPage,
});

type CartItem = { id: string; name: string; price: number; qty: number };

function SellPage() {
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const list = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  const add = (id: string) =>
    setCart((c) => {
      const existing = c.find((i) => i.id === id);
      if (existing) {
        return c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      const p = products.find((x) => x.id === id)!;
      return [...c, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });

  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);

  return (
    <>
      <PageHeader title="Uza" subtitle="Rekodi mauzo kwa haraka" />

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
        <div className="grid grid-cols-2 gap-4">
          {list.map((p) => (
            <button
              key={p.id}
              onClick={() => add(p.id)}
              className="tap rounded-[22px] border border-border bg-card p-5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <p className="text-[16px] font-semibold">{p.name}</p>
              <p className="mt-1 text-[16px] font-bold">{fmt(p.price)}</p>
              <p className="mt-2 text-[13px] text-muted-foreground">
                Hisa: {p.stock} {p.unit}
              </p>
            </button>
          ))}
          {list.length === 0 ? (
            <p className="col-span-2 px-1 text-[16px] text-muted-foreground">
              Hakuna bidhaa iliyopatikana.
            </p>
          ) : null}
        </div>
      </Section>

      {cart.length > 0 ? (
        <Section title={`Rafu yako (${cart.reduce((a, i) => a + i.qty, 0)})`}>
          <Panel>
            {cart.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between border-b border-border py-3 last:border-0"
              >
                <div>
                  <p className="text-[16px] font-medium">{i.name}</p>
                  <p className="text-[14px] text-muted-foreground">
                    {i.qty} × {fmt(i.price)}
                  </p>
                </div>
                <p className="text-[16px] font-semibold">{fmt(i.qty * i.price)}</p>
              </div>
            ))}
          </Panel>
          <div className="mt-4 flex items-center justify-between rounded-[22px] bg-primary px-5 py-4 text-primary-foreground">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-6" strokeWidth={1.5} />
              <p className="text-[15px]">Kamilisha Mauzo</p>
            </div>
            <p className="text-[22px] font-bold">{fmt(total)}</p>
          </div>
          <p className="mt-3 px-1 text-[14px] text-muted-foreground">
            <Pill tone="muted">Demo</Pill> Hakuna hundi halisi — kila kitu ni taarifa za mfano.
          </p>
        </Section>
      ) : null}
    </>
  );
}
