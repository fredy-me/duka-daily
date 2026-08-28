import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Languages, KeyRound, LogOut, ChevronRight } from "lucide-react";
import { PageHeader, Section, ListCard, Row } from "@/components/duka/shell";

export const Route = createFileRoute("/muuzaji/mipangilio")({
  head: () => ({
    meta: [
      { title: "Mipangilio — Duka La Amani" },
      { name: "description", content: "Mipangilio yangu: lugha, akaunti na kutoka." },
      { property: "og:title", content: "Mipangilio — Duka La Amani" },
      { property: "og:description", content: "Mipangilio yangu." },
    ],
  }),
  component: SellerSettings,
});

const icon = "size-6";

function SellerSettings() {
  return (
    <>
      <PageHeader title="Mipangilio" subtitle="Mipangilio yangu" />

      <Section>
        <ListCard>
          <Row>
            <div className="flex w-full items-center gap-4">
              <Languages className={icon} strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-[17px] font-medium">Lugha</p>
              </div>
              <p className="text-[15px] text-muted-foreground">Kiswahili</p>
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
