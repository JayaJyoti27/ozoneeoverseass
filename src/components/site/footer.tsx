import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

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

// TODO: replace with real company details
const CONTACT = {
  addressLines: [
    "Ozone Overseas Consultants Pvt. Ltd.",
    "1st Floor, Metro Tower,",
    "MG Road, Kochi, Kerala 682001, India",
  ],
  emails: ["info@ozoneoverseas.com", "careers@ozoneoverseas.com"],
  phones: ["+91 484 123 4567", "+91 484 765 4321"],
  whatsapp: { display: "+91 98765 43210", href: "https://wa.me/919876543210" },
  linkedin: "https://linkedin.com/company/ozoneoverseas",
  facebook: "https://facebook.com/ozoneoverseas",
  mapsEmbedUrl: "https://www.google.com/maps?q=MG+Road+Kochi+Kerala&output=embed",
  mapsLinkUrl: "https://maps.google.com/?q=MG+Road+Kochi+Kerala",
  licenseNo: "B-0123/KER/PER/1000+/5/8888/2009",
};

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

            {/* Contact details */}
            <div className="mt-6 space-y-3 text-sm text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[color:var(--gold)]" />
                <a
                  href={CONTACT.mapsLinkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  {CONTACT.addressLines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-[color:var(--gold)]" />
                <div className="flex flex-col">
                  {CONTACT.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="hover:text-white">
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-[color:var(--gold)]" />
                <div className="flex flex-col">
                  {CONTACT.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="hover:text-white"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle size={16} className="mt-0.5 shrink-0 text-[color:var(--gold)]" />
                <a
                  href={CONTACT.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp: {CONTACT.whatsapp.display}
                </a>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              >
                <Facebook size={15} />
              </a>
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

        {/* Google Maps embed */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="Office location"
            src={CONTACT.mapsEmbedUrl}
            width="100%"
            height="220"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block grayscale invert-[0.9]"
          />
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/55">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              Recruitment Licence No. <span className="text-white/80">{CONTACT.licenseNo}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <span className="text-white/25">·</span>
              <a href="#" className="hover:text-white">
                Terms &amp; Conditions
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
