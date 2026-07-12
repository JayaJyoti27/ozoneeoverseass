import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacypolicy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/privacypolicy"!</div>;
}
