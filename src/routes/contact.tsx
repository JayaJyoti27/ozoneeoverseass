import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin, CheckCircle2, ArrowRight, Lock } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { Blob, DotGrid } from "@/components/site/decor";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Ozone Overseas Consultants" },
      {
        name: "description",
        content:
          "Get in touch with Ozone Overseas. Candidates and employers reach the right coordinator — we respond within one business day.",
      },
      { property: "og:title", content: "Contact Ozone Overseas" },
      {
        property: "og:description",
        content: "One message gets you to the right person. We respond within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

type Role = "candidate" | "employer";

function ContactPage() {
  const [role, setRole] = useState<Role>("candidate");
  const [submitted, setSubmitted] = useState(false);

  const messagePlaceholder =
    role === "candidate"
      ? "Tell us the role you're looking for..."
      : "Tell us the role you're hiring for...";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-brand-lightblue/70 blur-3xl [background:radial-gradient(circle,var(--brand-lightblue),transparent_70%)]" />
        <DotGrid className="right-0 top-6 h-28 w-40" />
        <Blob className="-bottom-16 -left-16 h-64 w-64 opacity-70" />

        <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8">
          <span className="inline-flex items-center rounded-full border border-brand-blue/25 bg-brand-lightblue px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-blue">
            Get in Touch
          </span>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl">
            We Respond Within
            <br />
            <span className="text-brand-blue">One Business Day.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-slate">
            Whether you're a candidate exploring options or an employer ready to hire — one message
            gets you to the right person.
          </p>
        </div>
      </section>

      {/* Main contact block */}
      <section className="relative overflow-hidden bg-card">
        <Blob className="-right-24 top-0 h-72 w-72 opacity-60" />
        <DotGrid className="bottom-8 left-0 h-28 w-40" />

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          {/* Left — form */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Send Us a Message
            </p>

            {submitted ? (
              <ConfirmationState />
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <Field label="Full Name" htmlFor="name">
                  <input id="name" name="name" required type="text" className={inputCls} />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email Address" htmlFor="email">
                    <input id="email" name="email" required type="email" className={inputCls} />
                  </Field>
                  <Field label="Phone Number (optional)" htmlFor="phone">
                    <input id="phone" name="phone" type="tel" className={inputCls} />
                  </Field>
                </div>

                <div>
                  <span className="mb-2 block text-sm font-medium text-brand-navy">I am a:</span>
                  <div className="grid grid-cols-2 gap-3">
                    {(["candidate", "employer"] as Role[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-sm font-semibold capitalize transition-colors",
                          role === r
                            ? "border-brand-navy bg-brand-navy text-primary-foreground"
                            : "border-border bg-background text-brand-slate hover:border-brand-blue/50",
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <Field label="Subject (optional)" htmlFor="subject">
                  <input id="subject" name="subject" type="text" className={inputCls} />
                </Field>

                <Field label="Message" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder={messagePlaceholder}
                    className={cn(inputCls, "resize-none")}
                  />
                </Field>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-navy px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-gold hover:text-brand-navy"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <p className="flex items-center gap-1.5 text-xs text-brand-slate">
                  <Lock className="h-3.5 w-3.5" />
                  We don't share your information. No spam, ever.
                </p>
              </form>
            )}
          </div>

          {/* Right — details */}
          <div className="lg:pl-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Or Reach Us Directly
            </p>

            <div className="mt-6">
              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                label="Hotline"
                href="tel:+914840000000"
                detail="+91 484 000 0000"
              />
              <GoldDivider />
              <ContactRow
                icon={<MessageCircle className="h-5 w-5" />}
                label="WhatsApp"
                href="https://wa.me/914840000000"
                detail="Chat with a coordinator"
                whatsapp
              />
              <GoldDivider />
              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                href="mailto:hello@ozoneoverseas.com"
                detail="hello@ozoneoverseas.com"
              />
              <GoldDivider />
              <ContactRow
                icon={<MapPin className="h-5 w-5" />}
                label="Office"
                detail="Ozone Overseas Consultants Pvt. Ltd., 123 Recruitment House, MG Road, Kochi, Kerala 682016, India"
              />
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Ozone Overseas office location"
                src="https://www.google.com/maps?q=MG+Road,+Kochi,+Kerala+682016&output=embed"
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-gold" />
              <p className="text-xs text-muted-foreground">
                MEA License No. B-0123/KER/PER/1000+/5/8888/2009
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three-way CTA */}
      <section className="relative overflow-hidden">
        <Blob className="-bottom-20 -right-16 h-72 w-72 opacity-60" />
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="max-w-lg font-display text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            Not Sure Where to Start?
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <CtaCard
              number="01"
              variant="navy"
              title="I'm a Candidate"
              body="Browse open roles or submit your CV. Free to apply, coordinator assigned within 24 hours."
              cta="Browse Roles"
              href="/for-candidates"
              buttonStyle="gold"
            />
            <CtaCard
              number="02"
              variant="lightblue"
              title="I'm an Employer"
              body="Post a requirement. First pre-screened shortlist in 48 hours, no fee to post."
              cta="Post a Requirement"
              href="/for-employers"
              buttonStyle="navy"
            />
            <CtaCard
              number="03"
              variant="white"
              title="I Have a General Question"
              body="Check our FAQ first — most answers are already there."
              cta="View FAQ"
              href="/for-candidates#faq"
              buttonStyle="outline"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

const inputCls =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-brand-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-navy";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-sm font-medium text-brand-navy">{label}</span>
      {children}
    </label>
  );
}

function ConfirmationState() {
  return (
    <div className="mt-6 rounded-3xl border border-border bg-brand-lightblue/50 p-8 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-gold/15">
        <CheckCircle2 className="h-9 w-9 text-brand-gold" />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-brand-navy">Message received.</h3>
      <p className="mt-2 text-sm text-brand-slate">We'll be back within one business day.</p>
      <a
        href="/for-candidates"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-navy"
      >
        In the meantime, browse open roles
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function GoldDivider() {
  return <div className="my-5 h-px w-full bg-brand-gold/40" />;
}

function ContactRow({
  icon,
  label,
  detail,
  href,
  whatsapp,
}: {
  icon: React.ReactNode;
  label: string;
  detail: string;
  href?: string;
  whatsapp?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span
        className={cn(
          "mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-lightblue text-brand-navy transition-colors",
          whatsapp && "group-hover:bg-brand-whatsapp/20 group-hover:text-brand-whatsapp",
        )}
      >
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-slate">{label}</p>
        <p className="mt-1 text-sm font-medium leading-relaxed text-brand-navy">{detail}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={whatsapp ? "_blank" : undefined}
        rel={whatsapp ? "noopener noreferrer" : undefined}
        className="group block"
      >
        {content}
      </a>
    );
  }
  return <div className="group">{content}</div>;
}

function CtaCard({
  number,
  variant,
  title,
  body,
  cta,
  href,
  buttonStyle,
}: {
  number: string;
  variant: "navy" | "lightblue" | "white";
  title: string;
  body: string;
  cta: string;
  href: string;
  buttonStyle: "gold" | "navy" | "outline";
}) {
  const cardCls = {
    navy: "bg-brand-navy text-primary-foreground",
    lightblue: "bg-brand-lightblue text-brand-navy",
    white: "border border-border bg-card text-brand-navy",
  }[variant];

  const numberCls = variant === "navy" ? "text-primary-foreground/25" : "text-brand-blue/20";
  const bodyCls = variant === "navy" ? "text-primary-foreground/75" : "text-brand-slate";

  const btnCls = {
    gold: "bg-brand-gold text-brand-navy hover:bg-brand-gold/85",
    navy: "bg-brand-navy text-primary-foreground hover:bg-brand-blue",
    outline:
      "border border-brand-navy/25 text-brand-navy hover:bg-brand-navy hover:text-primary-foreground",
  }[buttonStyle];

  return (
    <div className={cn("flex flex-col rounded-3xl p-7", cardCls)}>
      <span className={cn("font-display text-4xl font-extrabold", numberCls)}>{number}</span>
      <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
      <p className={cn("mt-3 flex-1 text-sm leading-relaxed", bodyCls)}>{body}</p>
      <a
        href={href}
        className={cn(
          "mt-6 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
          btnCls,
        )}
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
