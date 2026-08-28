import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, ListCard, Row, Pill } from "@/components/duka/shell";
import { corrections } from "@/lib/mock";

export const Route = createFileRoute("/admin/zaidi/marekebisho")({
  head: () => ({
    meta: [
      { title: "Marekebisho — Duka Langu" },
      { name: "description", content: "Maombi ya marekebisho ya mauzo." },
      { property: "og:title", content: "Marekebisho — Duka Langu" },
      { property: "og:description", content: "Maombi ya marekebisho ya mauzo." },
    ],
  }),
  component: MarekebishoPage,
});

const statusTone: Record<string, "accent" | "muted" | "dark"> = {
  Inasubiri: "accent",
  Imekubaliwa: "dark",
  Imekataliwa: "muted",
};

function MarekebishoPage() {
  const pending = corrections.filter((c) => c.status === "Inasubiri").length;

  return (
    <>
      <PageHeader title="Marekebisho" subtitle={`${pending} yanasubiri`} back="/admin/zaidi" />

      <Section>
        <ListCard>
          {corrections.map((c) => (
            <div key={c.id} className="border-b border-border px-5 py-4 last:border-0">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[17px] font-semibold">{c.seller}</p>
                <Pill tone={statusTone[c.status]}>{c.status}</Pill>
              </div>
              <p className="mt-0.5 text-[15px] text-muted-foreground">{c.record}</p>
              <p className="mt-2 text-[14px] text-muted-foreground">{c.note}</p>
              <div className="mt-2 rounded-xl border border-border bg-muted/40 px-3 py-2">
                <p className="text-[13px] text-muted-foreground line-through">{c.before}</p>
                <p className="mt-1 text-[14px] font-semibold">{c.after}</p>
              </div>
              <p className="mt-2 text-[13px] text-muted-foreground">{c.date}</p>
            </div>
          ))}
        </ListCard>
      </Section>
    </>
  );
}
