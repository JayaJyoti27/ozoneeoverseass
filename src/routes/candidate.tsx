import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent, useEffect } from "react";
import { ShieldCheck, ArrowRight, Mail, ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/footer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  sendCandidateOtp,
  verifyCandidateOtp,
  getCurrentProfile,
} from "@/lib/supabase";
import { completeCandidateSignup } from "@/lib/candidate/api";

export const Route = createFileRoute("/candidate")({
  head: () => ({
    meta: [{ title: "Candidate Login — Ozone Overseas" }],
  }),
  component: CandidateAuthPage,
});

const Blob = ({
  className = "",
  color = "var(--blue-soft)",
}: {
  className?: string;
  color?: string;
}) => (
  <svg viewBox="0 0 600 600" className={className} aria-hidden>
    <path
      fill={color}
      d="M421,318Q406,386,343,418Q280,450,213,420Q146,390,116,325Q86,260,121,196Q156,132,222,108Q288,84,353,113Q418,142,431,201Q444,250,421,318Z"
    />
  </svg>
);

const DotGrid = ({ className = "" }: { className?: string }) => (
  <div className={`dot-grid ${className}`} aria-hidden />
);

type Step = "email" | "otp";

function CandidateAuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Already logged in as a candidate — bounce straight to the dashboard.
  useEffect(() => {
    getCurrentProfile().then((profile) => {
      if (profile?.role === "candidate") {
        navigate({ to: "/Candidates/dashboard" });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  async function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await sendCandidateOtp(email.trim());
      setStep("otp");
      setResendCooldown(30);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send the code. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0 || submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      await sendCandidateOtp(email.trim());
      setResendCooldown(30);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't resend the code.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await verifyCandidateOtp(email.trim(), code.trim());

      // First time we've seen this candidate? Create their profile row.
      const { isNewProfile } = await completeCandidateSignup();

      navigate({
        to: isNewProfile ? "/Candidates/profile" : "/Candidates/dashboard",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "That code didn't work. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />

      <section className="relative overflow-hidden px-6 py-24">
        <Blob
          className="absolute -top-32 -left-32 h-[420px] w-[420px] opacity-60"
          color="var(--blue-wash)"
        />
        <Blob
          className="absolute -bottom-32 -right-24 h-[360px] w-[360px] opacity-60"
          color="var(--blue-soft)"
        />
        <DotGrid className="absolute top-16 right-16 h-24 w-24 opacity-70" />

        <div className="relative mx-auto max-w-md">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> Candidate Portal
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
              {step === "email" ? (
                <>
                  Sign in or <span className="text-blue">register</span>
                </>
              ) : (
                <>
                  Enter your <span className="text-blue">code</span>
                </>
              )}
            </h1>
            <p className="mt-3 text-sm text-ink">
              {step === "email"
                ? "New here or returning — just enter your email to get started."
                : `We sent a 6-digit code to ${email}.`}
            </p>
          </div>

          {step === "email" ? (
            <form
              onSubmit={handleSendOtp}
              className="mt-8 rounded-[28px] border border-border bg-white p-8 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.3)]"
            >
              <div className="mb-5">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy">
                  Email
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-blue-wash/40 px-4 py-3 focus-within:border-blue">
                  <Mail className="h-4 w-4 text-blue" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-ink/50"
                  />
                </div>
              </div>

              {error && (
                <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !email.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue disabled:opacity-60"
              >
                {submitting ? "Sending code..." : "Send Code"}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleVerifyOtp}
              className="mt-8 rounded-[28px] border border-border bg-white p-8 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.3)]"
            >
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError(null);
                }}
                className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-ink hover:text-navy"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Use a different email
              </button>

              <div className="mb-5 flex justify-center">
                <InputOTP maxLength={6} value={code} onChange={setCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || code.trim().length < 6}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue disabled:opacity-60"
              >
                {submitting ? "Verifying..." : "Verify & Continue"}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0 || submitting}
                className="mt-4 w-full text-center text-xs font-semibold text-blue disabled:text-ink/40"
              >
                {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-ink">
            Are you an employer or admin?{" "}
            <a href="/Login" className="font-semibold text-blue">
              Sign in here
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
