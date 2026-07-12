import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { services } from "@/lib/services-data";

const data = services["nursing-recruitment"];

export const Route = createFileRoute("/Services/Nursing-rec")({
  head: () => ({
    meta: [
      { title: `${data.serviceName} — Ozone Overseas` },
      { name: "description", content: data.subtext },
      { property: "og:title", content: `${data.serviceName} — Ozone Overseas` },
      { property: "og:description", content: data.subtext },
      { property: "og:image", content: data.photo },
      { name: "twitter:image", content: data.photo },
    ],
  }),
  component: () => <ServicePage data={data} />,
});
