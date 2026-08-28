import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PackagePlus, Pencil, Trash2 } from "lucide-react";
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
import { PageHeader, Section, Panel, StatCard, Pill } from "@/components/duka/shell";
import { fmt, products } from "@/lib/mock";

export const Route = createFileRoute("/admin/bidhaa/$id")({
  head: () => ({
    meta: [
      { title: "Historia ya Bidhaa — Duka Langu" },
      {
        name: "description",
        content: "Historia ya usajili, nyongeza za hisa na mabadiliko ya bei.",
      },
      { property: "og:title", content: "Historia ya Bidhaa — Duka Langu" },
      { property: "og:description", content: "Usajili, nyongeza za hisa na mabadiliko ya bei." },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const router = useRouter();
  const p = products.find((x) => x.id === id) ?? products[0]!;

  const headerAction = (
    <>
      <button
        onClick={() => router.navigate({ to: "/admin/bidhaa/$id/Ongeza", params: { id: p.id } })}
        aria-label="Ongeza hisa"
        className="tap flex size-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-foreground/20 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        <PackagePlus className="size-5" strokeWidth={1.75} />
      </button>
      <button
        onClick={() => router.navigate({ to: "/admin/bidhaa/$id/Hariri", params: { id: p.id } })}
        aria-label="Hariri bidhaa"
        className="tap flex size-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-foreground/20 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        <Pencil className="size-5" strokeWidth={1.75} />
      </button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            aria-label="Futa bidhaa"
            className="tap flex size-12 items-center justify-center rounded-full border border-total/25 bg-total-soft text-total shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-total/40 hover:bg-total/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            <Trash2 className="size-5" strokeWidth={1.75} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[min(360px,calc(100vw-40px))] rounded-[22px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[18px] font-bold">Futa {p.name}?</AlertDialogTitle>
            <AlertDialogDescription className="text-[15px]">
              Una uhakika unataka kufuta "{p.name}"? Kitendo hiki hakiwezi kutenduliwa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="tap flex-1 rounded-xl text-[15px]">
              Ghairi
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.navigate({ to: "/admin/bidhaa" })}
              className="tap flex-1 rounded-xl border-transparent bg-destructive text-destructive-foreground text-[15px] hover:bg-destructive/90"
            >
              Futa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );

  return (
    <>
      <PageHeader
        title={p.name}
        subtitle={`Ilisajiliwa ${p.registered}`}
        back="/admin/bidhaa"
        action={headerAction}
      />

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Hisa iliyopo" value={`${p.stock} ${p.unit}`} />
          <StatCard label="Bei ya kuuzia" value={fmt(p.price)} />
          <StatCard label="Bei ya kununulia" value={fmt(p.buyPrice)} />
          <StatCard
            label="Thamani ya hisa"
            value={fmt(p.stock * p.buyPrice)}
            accent={p.stock <= p.lowAt}
          />
        </div>
      </Section>

      <Section title="Historia">
        <Panel>
          <ol className="space-y-6">
            {p.events.map((e, i) => (
              <li key={i} className="relative pl-7">
                <span className="absolute top-2 left-0 size-3 rounded-full bg-foreground" />
                {i < p.events.length - 1 ? (
                  <span className="absolute top-5 left-[5px] h-full w-px bg-border" />
                ) : null}
                <div className="flex items-center gap-2">
                  <p className="text-[15px] text-muted-foreground">{e.date}</p>
                  {e.type === "bei" ? <Pill tone="accent">Bei</Pill> : null}
                </div>
                <p className="mt-1 text-[17px] font-medium">{e.note}</p>
              </li>
            ))}
          </ol>
        </Panel>
      </Section>
    </>
  );
}
