import { useState } from "react";
import { track } from "@vercel/analytics";
import { Check, Copy, Palette, PenLine, Sparkles, Zap, ArrowRight, X, AlertTriangle, FileCode2, Brain } from "lucide-react";
import example1 from "../assets/example1.png";
import example2 from "../assets/example2.png";
import example3 from "../assets/example3.png";
import example4 from "../assets/example4.png";
import news1 from "../assets/Screenshot 2026-03-25 at 14.27.42.png";
import news2 from "../assets/Screenshot 2026-03-25 at 14.28.12.png";
import news3 from "../assets/Screenshot 2026-03-25 at 14.28.36.png";
import news4 from "../assets/Screenshot 2026-03-25 at 14.28.59.png";

const PURPLE = "#6C63FF";
const CORAL = "#FF6584";

const STEPS = [
  {
    icon: PenLine,
    number: "01",
    title: "Enter your basic prompt",
    desc: "Describe what you want to build. A habit tracker, a sneaker store, a SaaS dashboard — anything goes.",
    example: '"a fitness tracking app with streaks and progress charts"',
  },
  {
    icon: Palette,
    number: "02",
    title: "Pick a color scheme",
    desc: "Choose from 8 curated dark-mode palettes. Exact hex values get baked directly into your prompt.",
    example: "Midnight · Forest · Ember · Ocean · Blush · Slate · Sunset · Arctic",
  },
  {
    icon: Copy,
    number: "03",
    title: "Copy the generated prompt",
    desc: "Hit Generate. One click copies a complete, senior-engineer-level prompt to your clipboard.",
    example: "~1,200 chars of structured, production-grade instructions",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Receive a stunning mockup",
    desc: "Paste into Claude, GPT-4, Lovable or any frontier model. Get a full, pixel-perfect React UI in seconds.",
    example: "Production-ready · Mobile-first · No cleanup needed",
  },
];

const MONTHLY_FEATURES = [
  "All 6 use cases (mobile, dashboard, landing, SaaS, portfolio, e-commerce)",
  "8 curated color palettes",
  "Simple, Standard & Advanced complexity",
  "Unlimited prompt generations",
  "Cancel anytime",
];

const LIFETIME_FEATURES = [
  "Everything in Monthly",
  "All future use cases & palettes",
  "Developer support ",
  "Priority feature requests",
  "No recurring charges — ever",
  "One-time payment",
];

const EXAMPLES = [
  { img: example1, label: "Home",     desc: "Weekly summary & recent runs" },
  { img: example2, label: "Activity", desc: "Full run history with stats"   },
  { img: example3, label: "Track",    desc: "Live GPS run tracker"           },
  { img: example4, label: "Profile",  desc: "Achievements & goals"          },
];

const APP_GALLERY = [
  {
    name: "Running Tracker",
    prompt: '"a fitness tracking app with home dashboard, activity history, live GPS run tracker, and achievements — Midnight palette"',
    palette: "Midnight",
    screens: [
      { img: example1, label: "Home" },
      { img: example2, label: "Activity" },
      { img: example3, label: "Track" },
      { img: example4, label: "Profile" },
    ],
  },
  {
    name: "News Reader",
    prompt: '"a news reader app with sentiment-filtered feed, trending explore page, and saved bookmarks — Forest palette"',
    palette: "Forest",
    screens: [
      { img: news1, label: "Hard News" },
      { img: news2, label: "Good News" },
      { img: news3, label: "Explore" },
      { img: news4, label: "Saved" },
    ],
  },
];

// ─── MAIN LANDING PAGE ────────────────────────────────────────────────────────
export default function LandingPage({ onSignIn, onGetStarted, onSubscribe, onDemo }) {
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState("idle"); // idle | sending | sent | error

  const handleContactSend = async () => {
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;
    setContactStatus("sending");
    try {
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
        ?? import.meta.env.VITE_SUPABASE_ANON_KEY;
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(anonKey ? { "Authorization": `Bearer ${anonKey}` } : {}),
          },
          body: JSON.stringify(contactForm),
        }
      );
      if (!res.ok) throw new Error();
      setContactStatus("sent");
    } catch {
      setContactStatus("error");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-950 text-white"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {/* ── NAV ── */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950 z-10">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: PURPLE }}
          >
            <Sparkles size={14} color="white" />
          </div>
          <span className="text-white font-bold text-sm">Humble-UI</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => { setContactForm({ name: "", email: "", message: "" }); setContactStatus("idle"); setShowContact(true); }}
            className="text-gray-400 hover:text-white text-xs transition-colors"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            Contact
          </button>
          <button
            onClick={onSignIn}
            className="text-gray-400 hover:text-white text-xs transition-colors"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            Sign in
          </button>
          
          <button
            onClick={() => { track('demo_open'); onDemo?.(); }}
            className="text-xs font-bold px-4 py-2 rounded-lg text-white transition-all duration-150 active:scale-95"
            style={{ backgroundColor: PURPLE }}
          >
            Free Demo
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border mb-8"
          style={{ borderColor: `${PURPLE}50`, backgroundColor: `${PURPLE}10`, color: PURPLE }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: PURPLE }} />
          Prompt engineering · Before you build
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
          The prompt comes first.{" "}
          <span
            className="inline-block"
            style={{
              background: `linear-gradient(135deg, ${PURPLE}, ${CORAL})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Then the mockup.
          </span>
        </h1>
        <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed mb-12">
          AI can build stunning UI — but only if you give it the right instructions.
          Humble-UI scripts production-grade prompts so your output is actually good.
        </p>

        {/* Phone examples */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 items-start">
          {EXAMPLES.map((ex, i) => (
            <div
              key={ex.label}
              className="flex flex-col items-center gap-3"
              style={{ transform: i % 2 === 0 ? "translateY(0px)" : "translateY(20px)" }}
            >
              <div
                className="relative w-full rounded-[2rem] overflow-hidden border-2"
                style={{
                  borderColor: "#1f2937",
                  background: "#0a0a14",
                  boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px #ffffff08`,
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 rounded-b-xl z-10"
                  style={{ backgroundColor: "#0a0a14" }} />
                <img src={ex.img} alt={`${ex.label} screen`} className="w-full block" />
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${PURPLE}20`, color: PURPLE }}
              >
                {ex.label}
              </span>
            </div>
          ))}
        </div>

        {/* Prompt callout */}
        <div className="max-w-lg mx-auto mb-10">
          <div
            className="rounded-xl border px-5 py-3 text-center"
            style={{ borderColor: "#1f2937", backgroundColor: "#0a0a14" }}
          >
            <p className="text-gray-600 text-xs mb-1">Scripted prompt → production mockup</p>
            <p className="text-gray-400 text-xs">
              <span style={{ color: PURPLE }}>"</span>
              a running tracker with home dashboard, activity history, live GPS tracking, and achievements
              <span style={{ color: PURPLE }}>"</span>
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button
            onClick={() => { track('pricing_cta_click', { plan: 'lifetime' }); onSubscribe?.("lifetime"); }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
            style={{ backgroundColor: PURPLE }}
          >
            Get Lifetime Access – $49.99
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => { track('pricing_cta_click', { plan: 'monthly' }); onSubscribe?.("monthly"); }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-150 active:scale-95 border"
            style={{ borderColor: `${PURPLE}60`, color: PURPLE, background: "none" }}
          >
            Monthly – $9.99 / mo
          </button>
        </div>
        <p className="text-gray-600 text-xs mt-4">No credit card demos · Cancel monthly anytime</p>
      </section>

      {/* ── WHY PROMPTS MATTER ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: CORAL }}>
            The real bottleneck
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Good output starts with a good prompt.
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            Most builders skip this step — and wonder why their AI-generated UI looks generic.
            Prompt scripting is the craft that separates a $10 asset from a production mockup.
          </p>
        </div>

        {/* Bad vs Good comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {/* Bad prompt */}
          <div
            className="p-6 rounded-2xl border"
            style={{ borderColor: "#ef444430", backgroundColor: "#0f0f0f" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#ef444420" }}
              >
                <AlertTriangle size={14} style={{ color: "#ef4444" }} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#ef4444" }}>
                Vague prompt
              </span>
            </div>
            <div
              className="rounded-lg px-4 py-3 text-xs mb-4 border font-mono leading-relaxed"
              style={{ borderColor: "#ef444420", backgroundColor: "#1a0808", color: "#9ca3af" }}
            >
              "make a fitness app"
            </div>
            <ul className="space-y-2">
              {[
                "Generic layout with no visual identity",
                "Missing key screens and flows",
                "No color system, spacing, or typography",
                "Requires 10+ revision passes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                  <span style={{ color: "#ef4444" }} className="shrink-0">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Good prompt */}
          <div
            className="p-6 rounded-2xl border"
            style={{ borderColor: `${PURPLE}40`, backgroundColor: "#0a0a14" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${PURPLE}20` }}
              >
                <FileCode2 size={14} style={{ color: PURPLE }} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: PURPLE }}>
                Scripted prompt
              </span>
            </div>
            <div
              className="rounded-lg px-4 py-3 text-xs mb-4 border font-mono leading-relaxed"
              style={{ borderColor: `${PURPLE}20`, backgroundColor: "#0d0d1a", color: "#9ca3af" }}
            >
              "a fitness tracking app: home with weekly summary, activity history, live GPS run tracker,
              profile with achievements. Midnight palette — deep navy #0D0D1A, accent #6C63FF…"
            </div>
            <ul className="space-y-2">
              {[
                "Exact screens, flows, and data states defined",
                "Hex-accurate color palette baked in",
                "Mobile-first layout with spacing system",
                "Production-ready on first generation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-gray-300">
                  <Check size={12} className="shrink-0 mt-0.5" style={{ color: PURPLE }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3 insight pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Brain,
              title: "Specificity beats creativity",
              body: "AI doesn't guess well. The more precise your prompt — screens, states, colors, components — the less it has to invent.",
            },
            {
              icon: FileCode2,
              title: "Structure unlocks quality",
              body: "Senior engineers know the UI questions to ask before touching code. Your prompt should answer those questions upfront.",
            },
            {
              icon: Zap,
              title: "One great prompt > ten revisions",
              body: "Rebuilding from a bad prompt wastes hours. A well-scripted prompt ships the right result on the first try.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="p-5 rounded-2xl border border-gray-800 bg-gray-900"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${PURPLE}15` }}
              >
                <Icon size={15} style={{ color: PURPLE }} />
              </div>
              <h3 className="text-white text-xs font-bold mb-1.5">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── APP GALLERY ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PURPLE }}>
            Built with scripted prompts
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            This is what one good prompt produces.
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            Each app below was generated from a single Humble-UI prompt — no manual cleanup, no extra passes.
          </p>
        </div>

        <div className="space-y-20">
          {APP_GALLERY.map((app, appIdx) => (
            <div key={app.name}>
              {/* App label row */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-8">
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: appIdx === 0 ? PURPLE : "#4ade80" }}
                  >
                    App {appIdx + 1}
                  </span>
                  <h3 className="text-white font-bold text-lg mt-0.5">{app.name}</h3>
                </div>
                <div
                  className="sm:ml-4 rounded-xl border px-4 py-2 text-xs font-mono text-gray-400 leading-relaxed flex-1 max-w-xl"
                  style={{
                    borderColor: appIdx === 0 ? `${PURPLE}25` : "#4ade8025",
                    backgroundColor: "#0a0a14",
                  }}
                >
                  <span style={{ color: appIdx === 0 ? PURPLE : "#4ade80" }}>prompt </span>
                  {app.prompt}
                </div>
              </div>

              {/* Screens */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
                {app.screens.map((screen, i) => (
                  <div
                    key={screen.label}
                    className="flex flex-col items-center gap-3"
                    style={{ transform: i % 2 === 0 ? "translateY(0px)" : "translateY(20px)" }}
                  >
                    <div
                      className="relative w-full rounded-[2rem] overflow-hidden border-2"
                      style={{
                        borderColor: "#1f2937",
                        background: "#0a0a14",
                        boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px #ffffff08`,
                      }}
                    >
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 rounded-b-xl z-10"
                        style={{ backgroundColor: "#0a0a14" }}
                      />
                      <img src={screen.img} alt={`${screen.label} screen`} className="w-full block" />
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: appIdx === 0 ? `${PURPLE}20` : "#4ade8015",
                        color: appIdx === 0 ? PURPLE : "#4ade80",
                      }}
                    >
                      {screen.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PURPLE }}>
            How it works
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            It&apos;s quick and easy. Four steps.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 rounded-2xl border border-gray-800 bg-gray-900 relative overflow-hidden"
              >
                <span
                  className="absolute top-3 right-5 text-6xl font-bold select-none pointer-events-none"
                  style={{ color: "#ffffff08" }}
                >
                  {step.number}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${PURPLE}20` }}
                >
                  <Icon size={18} style={{ color: PURPLE }} />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">{step.desc}</p>
                <div
                  className="text-xs px-3 py-2 rounded-lg border"
                  style={{ borderColor: "#1f2937", backgroundColor: "#0a0a14", color: "#6b7280" }}
                >
                  <span style={{ color: `${PURPLE}90` }}>eg.</span> {step.example}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={14} className="text-gray-700" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="max-w-3xl mx-auto px-6 py-20" id="pricing">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PURPLE }}>
            Pricing
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Simple. No surprises.</h2>
          <p className="text-gray-500 text-sm mt-3">Two options. Pick what suits you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Monthly */}
          <div className="p-7 rounded-2xl border border-gray-800 bg-gray-900 flex flex-col">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Monthly</p>
            <div className="mb-1">
              <span className="text-4xl font-bold text-white">$9.99</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>
            <p className="text-gray-600 text-xs mb-7">Billed monthly. Cancel anytime.</p>
            <ul className="space-y-3 flex-1 mb-8">
              {MONTHLY_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <Check size={13} className="shrink-0 mt-0.5" style={{ color: PURPLE }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => { track('pricing_cta_click', { plan: 'monthly' }); onSubscribe?.("monthly"); }}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-150 active:scale-95 border"
              style={{ borderColor: `${PURPLE}60`, color: PURPLE, background: "none" }}
            >
              Start Monthly Plan
            </button>
          </div>

          {/* Lifetime */}
          <div
            className="p-7 rounded-2xl flex flex-col relative overflow-hidden"
            style={{
              border: `2px solid ${PURPLE}`,
              background: `linear-gradient(135deg, ${PURPLE}12, #0F0F23)`,
            }}
          >
            <div
              className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: PURPLE, color: "white" }}
            >
              Best value
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} style={{ color: PURPLE }} />
              <p className="text-xs uppercase tracking-widest" style={{ color: PURPLE }}>
                Lifetime
              </p>
            </div>
            <div className="mb-1">
              <span className="text-4xl font-bold text-white">$49.99</span>
            </div>
            <p className="text-gray-400 text-xs mb-7">One-time payment. Yours forever.</p>
            <ul className="space-y-3 flex-1 mb-8">
              {LIFETIME_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-xs text-gray-200">
                  <Check size={13} className="shrink-0 mt-0.5" style={{ color: PURPLE }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => { track('pricing_cta_click', { plan: 'lifetime' }); onSubscribe?.("lifetime"); }}
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
              style={{ backgroundColor: PURPLE }}
            >
              Get Lifetime Access →
            </button>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-20">
        <div
          className="max-w-2xl mx-auto text-center rounded-2xl px-8 py-14"
          style={{
            background: `linear-gradient(135deg, ${PURPLE}20, ${CORAL}10)`,
            border: `1px solid ${PURPLE}30`,
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Get the prompt right. Then build.
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
            Stop generating mediocre output. Let Humble-UI write the prompt
            that makes your AI actually produce something worth shipping.
          </p>
          <button
            onClick={() => { track('pricing_cta_click', { plan: 'lifetime' }); onSubscribe?.("lifetime"); }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
            style={{ backgroundColor: PURPLE }}
          >
            Get started today <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center"
            style={{ backgroundColor: PURPLE }}
          >
            <Sparkles size={10} color="white" />
          </div>
          <span className="text-white text-xs font-bold">Humble-UI</span>
        </div>
        <p className="text-gray-700 text-xs">
          © {new Date().getFullYear()} Humble-UI. All rights reserved.
        </p>
      </footer>

      {/* Contact modal */}
      {showContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowContact(false); }}
        >
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {contactStatus === "sent" ? (
              <div className="text-center py-6">
                <div className="text-3xl mb-3">✉️</div>
                <h3 className="text-white font-bold text-lg mb-2">Message sent!</h3>
                <p className="text-gray-400 text-sm">We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setShowContact(false)}
                  className="mt-6 px-5 py-2 rounded-lg text-sm font-bold text-white transition-all duration-150 active:scale-95"
                  style={{ backgroundColor: PURPLE }}
                >Close</button>
              </div>
            ) : (
              <>
                <h3 className="text-white font-bold text-lg mb-1">Contact us</h3>
                <p className="text-gray-400 text-sm mb-6">We read every message.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Message</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="How can we help?"
                      rows={4}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors resize-none"
                    />
                  </div>
                </div>

                {contactStatus === "error" && (
                  <p className="text-red-400 text-xs mt-3">Something went wrong. Please try again.</p>
                )}

                <button
                  onClick={handleContactSend}
                  disabled={contactStatus === "sending" || !contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()}
                  className="mt-6 w-full py-2.5 rounded-lg font-bold text-sm text-white transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: PURPLE }}
                >
                  {contactStatus === "sending" ? "Sending…" : "Send message →"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
