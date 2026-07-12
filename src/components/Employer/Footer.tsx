import { Blob } from "@/components/site/decor";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-[color:var(--navy)] text-white/80">
      <Blob
        className="pointer-events-none absolute -top-40 left-1/2 h-[220px] w-[1400px] -translate-x-1/2
        color=var(--lightblue)
        opacity={0.08}
        flip"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-8 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--gold)] font-display text-lg font-bold text-[color:var(--navy)]">
              O
            </span>
            <span className="font-display text-base font-bold text-white">Ozone Overseas</span>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Global manpower recruitment for construction, energy, healthcare and hospitality.
            Trusted by 200+ employers across the GCC and beyond.
          </p>
          <p className="mt-4 text-xs text-white/40">
            MEA Licensed · Ministry of External Affairs, Govt. of India
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold text-white">Employers</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>
              <Link to="/">Post a Requirement</Link>
            </li>
            <li>
              <Link to="/Employer/candidate">Search Candidates</Link>
            </li>
            <li>
              <Link to="/Employer/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold text-white">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>About Us</li>
            <li>Sectors</li>
            <li>Success Stories</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold text-white">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>hello@ozoneoverseas.com</li>
            <li>+91 22 4000 0000</li>
            <li>Mumbai · Dubai · Riyadh</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-8 py-5 text-xs text-white/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Ozone Overseas. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  );
}
