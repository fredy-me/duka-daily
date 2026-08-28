import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[430px] flex-col bg-background">
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  back,
}: {
  title: string;
  subtitle?: string | undefined;
  back?: string | undefined;
}) {
  return (
    <header className="sticky top-0 z-20 bg-background/90 px-5 pt-6 pb-4 backdrop-blur-md">
      {back ? (
        <Link
          to={back}
          className="tap -ml-2 mb-3 inline-flex rounded-xl px-2 text-[15px] text-muted-foreground transition-[background-color,color,transform] duration-150 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          ← Nyuma
        </Link>
      ) : null}
      <h1 className="text-[30px] leading-tight font-bold tracking-tight">{title}</h1>
      {subtitle ? <p className="mt-1 text-[15px] text-muted-foreground">{subtitle}</p> : null}
    </header>
  );
}

export function Section({
  title,
  children,
  action,
}: {
  title?: string | undefined;
  children: ReactNode;
  action?: ReactNode | undefined;
}) {
  return (
    <section className="px-5 py-3">
      {title ? (
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[19px] font-semibold">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Panel({
  children,
  className,
  accent,
}: {
  children: ReactNode;
  className?: string | undefined;
  accent?: boolean | undefined;
}) {
  return (
    <div
      className={cn(
        "rounded-[22px] border border-border bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        accent && "border-total/25 bg-total-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string | undefined;
  accent?: boolean | undefined;
}) {
  return (
    <Panel accent={accent} className="p-5">
      <p className="text-[14px] leading-snug text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-2 text-[22px] leading-tight font-bold tracking-tight",
          accent && "text-total",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-[13px] text-muted-foreground">{hint}</p> : null}
    </Panel>
  );
}

export function Row({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "tap flex items-center justify-between gap-3 border-b border-border px-5 py-4 last:border-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ListCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {children}
    </div>
  );
}

export function Pill({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "accent" | "dark" | undefined;
}) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-[13px] font-medium whitespace-nowrap",
        tone === "muted" && "bg-muted text-muted-foreground",
        tone === "accent" && "bg-total-soft text-total",
        tone === "dark" && "bg-primary text-primary-foreground",
      )}
    >
      {children}
    </span>
  );
}

export type Tab = { to: string; label: string; icon: ReactNode };

export function TabBar({ tabs }: { tabs: Tab[] }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="sticky bottom-0 z-30 mt-auto w-full border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      <ul className="flex">
        {tabs.map((t) => {
          const active = t.to === pathname || (t.to !== "/" && pathname.startsWith(t.to + "/"));
          return (
            <li key={t.to} className="flex-1">
              <Link
                to={t.to}
                className={cn(
                  "tap mx-1 flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-[12px] font-medium transition-[background-color,color,transform] duration-150 hover:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {t.icon}
                <span>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
