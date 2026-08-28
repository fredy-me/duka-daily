import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section, ListCard, Row, Panel, Pill } from "@/components/duka/shell";
import { fmt, saleTotal, todaySales, todayTotal } from "@/lib/mock";

export const Route = createFileRoute("/muuzaji/mauzo")({
  head: () => ({
    meta: [
      { title: "Mauzo Yangu — Duka La Amani" },
      { name: "description", content: "Mauzo niliyorekodi mimi, leo na wiki hii." },
      { property: "og:title", content: "Mauzo Yangu — Duka La Amani" },
      { property: "og:description", content: "Mauzo niliyorekodi mimi." },
    ],
  }),
  component: MySales,
});

const ranges = ["Leo", "Wiki hii"];

function MySales() {
  const [range, setRange] = useState("Leo");
  const mySales = todaySales.filter((s) => s.seller === "Juma");
  const myTotal = mySales.reduce((a, s) => a + saleTotal(s), 0);

  return (
    <>
      <PageHeader title="Mauzo Yangu" subtitle="Orodha ya mauzo niliyorekodi" />

      <Section>
        <div className="flex gap-2">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`tap flex-1 rounded-full border px-5 py-2 text-[16px] font-semibold transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] ${
                range === r
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
                  : "border-border bg-card text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-accent hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </Section>

      <Section>
        <Panel accent>
          <p className="text-[15px] text-muted-foreground">
            Jumla Yangu — {range === "Leo" ? "Leo" : "Wiki hii"}
          </p>
          <p className="mt-1 text-[30px] font-bold text-total">
            {range === "Leo" ? fmt(myTotal) : fmt(myTotal + 318500)}
          </p>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {range === "Leo" ? mySales.length : 23} mauzo
          </p>
        </Panel>
      </Section>

      <Section title="Mauzo Moja Moja">
        <ListCard>
          {mySales
            .slice()
            .reverse()
            .map((s) => (
              <Row key={s.id}>
                <div>
                  <p className="text-[17px] font-medium">{s.product}</p>
                  <p className="mt-0.5 text-[14px] text-muted-foreground">
                    {s.qty} × {fmt(s.price)} · {s.time}
                  </p>
                </div>
                <p className="text-[17px] font-semibold">{fmt(saleTotal(s))}</p>
              </Row>
            ))}
        </ListCard>
        <p className="mt-3 px-1 text-[14px] text-muted-foreground">
          Ukurasa huu ni wa kuangalia tu — hauwezi kubadilishwa hapa.
        </p>
      </Section>
    </>
  );
}
