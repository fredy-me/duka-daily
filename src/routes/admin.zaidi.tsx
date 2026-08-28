import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/zaidi")({
  component: ZaidiLayout,
});

function ZaidiLayout() {
  return <Outlet />;
}
