import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Languages, KeyRound, LogOut, Bell, ChevronRight } from "lucide-react";
import { PageHeader, Section, ListCard, Row } from "@/components/duka/shell";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/zaidi/mpangilio")({
  head: () => ({
    meta: [
      { title: "Mpangilio — Duka Langu" },
      { name: "description", content: "Mpangilio wa duka: lugha, arifa, akaunti na zaidi." },
      { property: "og:title", content: "Mpangilio — Duka Langu" },
      { property: "og:description", content: "Mpangilio wa duka." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [lang, setLang] = useState("sw");
  const [notifications, setNotifications] = useState(true);
  const icon = "size-6";

  return (
    <>
      <PageHeader title="Mpangilio" subtitle="Mpangilio wa duka" back="/admin/zaidi" />

      <Section title="Lugha">
        <ListCard>
          <Row>
            <div className="flex w-full items-center gap-4">
              <Languages className={icon} strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-[17px] font-medium">Lugha</p>
                <p className="text-[14px] text-muted-foreground">
                  {lang === "sw" ? "Kiswahili (chaguo-msingi)" : "English"}
                </p>
              </div>
            </div>
          </Row>
          <div className="flex gap-2 border-b border-border px-5 py-4">
            <button
              onClick={() => setLang("sw")}
              className={`tap flex-1 rounded-full border px-4 py-2 text-[15px] font-semibold transition-[background-color,border-color] duration-150 ${
                lang === "sw"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              Kiswahili
            </button>
            <button
              onClick={() => setLang("en")}
              className={`tap flex-1 rounded-full border px-4 py-2 text-[15px] font-semibold transition-[background-color,border-color] duration-150 ${
                lang === "en"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              English
            </button>
          </div>
        </ListCard>
      </Section>

      <Section title="Mpangilio">
        <ListCard>
          <Row>
            <div className="flex w-full items-center gap-4">
              <Bell className={icon} strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-[17px] font-medium">Arifa za hisa ndogo</p>
                <p className="text-[14px] text-muted-foreground">Nijulishe ninapokamilika hisa</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </Row>
          <Row>
            <div className="flex w-full items-center gap-4">
              <KeyRound className={icon} strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-[17px] font-medium">Badilisha PIN</p>
                <p className="text-[14px] text-muted-foreground">Akaunti & usalama</p>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </div>
          </Row>
        </ListCard>
      </Section>

      <Section>
        <ListCard>
          <Row>
            <Link
              to="/"
              className="tap -mx-5 flex w-full items-center gap-4 rounded-xl px-5 py-4 text-total transition-[background-color,transform] duration-150 hover:bg-total-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <LogOut className={icon} strokeWidth={1.5} />
              <p className="text-[17px] font-medium">Toka</p>
            </Link>
          </Row>
        </ListCard>
      </Section>
    </>
  );
}
