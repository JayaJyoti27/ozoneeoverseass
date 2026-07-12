import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const columns: { title: string; links: { label: string; to?: string }[] }[] = [
  {
    title: "Candidates",
    links: [
      { label: "Browse Jobs" },
      { label: "How It Works" },
      { label: "Documentation" },
      { label: "Success Stories" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Post a Requirement" },
      { label: "Talent Pool" },
      { label: "Process" },
      { label: "Compliance" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "About" }, { label: "Careers" }, { label: "Press" }, { label: "Contact" }],
  },
  {
    title: "Sectors",
    links: [
      { label: "Healthcare" },
      { label: "Construction" },
      { label: "Oil & Gas" },
      { label: "Facilities" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Saudi Arabia" },
      { label: "UAE" },
      { label: "Qatar" },
      { label: "Kuwait & Bahrain" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[color:var(--navy)] text-white">
      {/* Wave divider at top edge */}
      <div
        aria-hidden
        className="absolute -top-px left-0 right-0 h-10 overflow-hidden leading-none"
      >
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0,60 C300,10 900,80 1200,20 L1200,0 L0,0 Z" fill="#EAF2FC" />
        </svg>
      </div>
      <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 font-[family-name:var(--font-display)] text-sm font-bold">
                O
              </span>
              <div className="font-[family-name:var(--font-display)] text-lg font-bold">
                Ozone Overseas
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Verified overseas talent for healthcare, construction, and technical sectors across
              the GCC and beyond.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="font-[family-name:var(--font-display)] text-sm font-semibold text-white">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href="#" className="transition hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/55">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              MEA License No.{" "}
              <span className="text-white/80">B-0123/KER/PER/1000+/5/8888/2009</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <span className="text-white/25">·</span>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <span className="text-white/25">·</span>
              <span>© 2025 Ozone Overseas Consultants Pvt. Ltd.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
