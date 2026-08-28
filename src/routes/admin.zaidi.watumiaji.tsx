import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, ListCard, Row, Pill } from "@/components/duka/shell";
import { users } from "@/lib/mock";

export const Route = createFileRoute("/admin/zaidi/watumiaji")({
  head: () => ({
    meta: [
      { title: "Watumiaji — Duka Langu" },
      { name: "description", content: "Orodha ya watumiaji wa duka." },
      { property: "og:title", content: "Watumiaji — Duka Langu" },
      { property: "og:description", content: "Orodha ya watumiaji wa duka." },
    ],
  }),
  component: WatumiajiPage,
});

function WatumiajiPage() {
  return (
    <>
      <PageHeader title="Watumiaji" subtitle={`${users.length} watumiaji`} back="/admin/zaidi" />

      <Section>
        <ListCard>
          {users.map((u) => (
            <Row key={u.id}>
              <div>
                <p className="text-[17px] font-medium">{u.name}</p>
                <p className="text-[14px] text-muted-foreground">{u.phone}</p>
              </div>
              <Pill tone={u.role === "Admin" ? "dark" : "muted"}>{u.role}</Pill>
            </Row>
          ))}
        </ListCard>
      </Section>
    </>
  );
}
