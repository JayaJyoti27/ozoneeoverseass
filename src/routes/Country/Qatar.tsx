import { createFileRoute } from "@tanstack/react-router";
import { CountryPageLayout } from "@/components/CountryLayout";
import { getCountryBySlug } from "@/data/countries";

const country = getCountryBySlug("qatar")!;

export const Route = createFileRoute("/Country/Qatar")({
  head: () => ({
    meta: [
      { title: country.metaTitle },
      { name: "description", content: country.metaDescription },
      { property: "og:title", content: country.metaTitle },
      { property: "og:description", content: country.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/countries/${country.slug}` },
      { property: "og:image", content: country.heroImageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: country.heroImageUrl },
    ],
    links: [{ rel: "canonical", href: `/countries/${country.slug}` }],
  }),
  component: () => <CountryPageLayout country={country} />,
});
