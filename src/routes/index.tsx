import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "@/components/duka/shell";
import { SHOP } from "@/lib/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Duka Langu — Usimamizi wa Duka" },
      {
        name: "description",
        content:
          "Duka Langu: app rahisi ya kusimamia mauzo, bidhaa, hisa na ripoti za duka lako la kila siku.",
      },
      { property: "og:title", content: "Duka Langu — Usimamizi wa Duka" },
      {
        property: "og:description",
        content: "Simamia mauzo, bidhaa, hisa na ripoti za duka lako kwa urahisi.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const [role, setRole] = useState<"admin" | "muuzaji" | null>(null);
  const navigate = useNavigate();

  return (
    <Phone>
      <div className="flex min-h-screen flex-col justify-between px-6 pt-16 pb-10">
        <div>
          <div className="flex flex-col items-center text-center">
            <div className="flex size-20 items-center justify-center rounded-[26px] border border-border bg-card">
              <Store className="size-9" strokeWidth={1.5} />
            </div>
            <h1 className="mt-6 text-[32px] font-bold tracking-tight">Duka Langu</h1>
            <p className="mt-2 text-[16px] text-muted-foreground">{SHOP.name}</p>
          </div>

          {!role ? (
            <div className="mt-14 space-y-4">
              <Button
                size="lg"
                className="tap h-14 w-full rounded-full text-[18px]"
                onClick={() => setRole("admin")}
              >
                Ingia kama Admin
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="tap h-14 w-full rounded-full text-[18px]"
                onClick={() => setRole("muuzaji")}
              >
                Ingia kama Muuzaji
              </Button>
            </div>
          ) : (
            <form
              className="mt-12 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: role === "admin" ? "/admin" : "/muuzaji" });
              }}
            >
              <p className="text-center text-[16px] text-muted-foreground">
                Unaingia kama {role === "admin" ? "Admin" : "Muuzaji"}
              </p>
              <div className="space-y-2">
                <Label htmlFor="simu" className="text-[16px]">
                  Namba ya Simu
                </Label>
                <Input
                  id="simu"
                  inputMode="tel"
                  defaultValue={role === "admin" ? "0754 112 233" : "0765 445 128"}
                  className="tap h-14 rounded-xl text-[18px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pin" className="text-[16px]">
                  Namba ya Siri (PIN)
                </Label>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  defaultValue="1234"
                  className="tap h-14 rounded-xl text-[18px]"
                />
              </div>
              <Button type="submit" size="lg" className="tap h-14 w-full rounded-full text-[18px]">
                Ingia
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="tap w-full rounded-full text-[16px]"
                onClick={() => setRole(null)}
              >
                Badilisha jukumu
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-[14px] text-muted-foreground">
          Toleo la mfano · Data ni ya majaribio
        </p>
      </div>
    </Phone>
  );
}
