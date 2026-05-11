import { useState } from "react";
import { track } from "@vercel/analytics";
import {
  Check, Copy, Palette, PenLine, Sparkles, Zap, ArrowRight, X,
  AlertTriangle, FileCode2, Brain, Smartphone, Monitor, Globe,
  ShoppingBag, Briefcase,
} from "lucide-react";
import example1 from "../assets/example1.png";
import example2 from "../assets/example2.png";
import example3 from "../assets/example3.png";
import example4 from "../assets/example4.png";
import news1 from "../assets/Screenshot 2026-03-25 at 14.27.42.png";
import news2 from "../assets/Screenshot 2026-03-25 at 14.28.12.png";
import news3 from "../assets/Screenshot 2026-03-25 at 14.28.36.png";
import news4 from "../assets/Screenshot 2026-03-25 at 14.28.59.png";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const ORANGE  = "#EA580C";   // primary accent
const AMBER   = "#FB923C";   // secondary accent
const BROWN   = "#1C0A02";   // dark brown — headlines, logo bg
const BROWN2  = "#5C2E0A";   // medium brown — body text
const BROWN3  = "#9A6040";   // muted — secondary text
const BG      = "#FFFBF7";   // warm cream page background
const SURF    = "#FFFFFF";   // card surface
const SURF2   = "#FFF5EC";   // alternate section tint
const BORDER  = "#E8CFBA";   // warm border

// ─── DATA ────────────────────────────────────────────────────────────────────

const APP_TYPES = [
  {
    id: "mobile", label: "Mobile App", Icon: Smartphone,
    prompt:
`SCREENS: Home (weekly summary + streak), Activity (run history, pace charts), Live Tracker (GPS map, real-time stats), Profile (achievements, goals)

PALETTE: Midnight — bg #0D0D1A · surface #111128 · accent #6C63FF · highlight #FF6584

STACK: React Native, Expo, Recharts

COMPONENTS: Bottom tab nav, glassmorphic cards, streak badge, animated progress bars, avatar ring

STYLE: Mobile-first · 8px radius system · Inter · smooth transitions`,
  },
  {
    id: "dashboard", label: "Dashboard", Icon: Monitor,
    prompt:
`SCREENS: Overview (KPI cards, revenue chart, user growth), Users (table + detail drawer), Reports (date picker, export), Settings

PALETTE: Slate — bg #0A0A12 · surface #111120 · accent #6C63FF · text #E2E8F0

STACK: React, Recharts, Tailwind CSS

COMPONENTS: Collapsible sidebar, metric cards, line/bar/donut charts, paginated data table, date range picker

STYLE: Desktop-first · 6px radius · clean grid layout · smooth hover transitions`,
  },
  {
    id: "landing", label: "Landing Page", Icon: Globe,
    prompt:
`SECTIONS: Nav (logo, links, CTA), Hero (headline, sub, screenshot), Features (3-col icon grid), Pricing (2-tier cards), Testimonials, CTA band, Footer

PALETTE: Ocean — bg #0A0F1E · surface #0D1628 · accent #3B82F6 · secondary #60A5FA

STACK: React, Framer Motion, Tailwind

COMPONENTS: Sticky blurred nav, gradient hero text, feature icon cards, pricing toggle, testimonial cards with avatars

STYLE: Fully responsive · scroll-triggered animations · gradient accents`,
  },
  {
    id: "saas", label: "SaaS App", Icon: Zap,
    prompt:
`SCREENS: Dashboard (project overview, activity), Kanban (drag-drop: Todo / In Progress / Review / Done), Team (members, roles, invite modal), Settings

PALETTE: Forest — bg #0A1409 · surface #0F1C0E · accent #4ADE80 · secondary #22C55E

STACK: React, @dnd-kit, Tailwind

COMPONENTS: Collapsible app shell, kanban cards with tags + priority, modal system, notification bell, status badge system

STYLE: Dense information layout · compact spacing · smooth drag animations`,
  },
  {
    id: "ecommerce", label: "E-commerce", Icon: ShoppingBag,
    prompt:
`SCREENS: Home (hero banner, featured grid), Product (gallery, size picker, add-to-cart), Cart (items, order summary, checkout), Wishlist

PALETTE: Ember — bg #0F0A07 · surface #1A100A · accent #F97316 · secondary #FB923C

STACK: React, Tailwind, Zustand for cart state

COMPONENTS: Full-bleed hero, product card with quick-add, size selector pills, slide-out cart drawer, image zoom gallery

STYLE: Bold product-first layout · orange accents · smooth cart animations`,
  },
  {
    id: "portfolio", label: "Portfolio", Icon: Briefcase,
    prompt:
`SECTIONS: Nav, Hero (name, role, tagline, CTA), Work (project grid with hover preview), About (bio, skills grid, timeline), Contact (form + social links)

PALETTE: Blush — bg #0F0A0D · surface #1A0F16 · accent #EC4899 · secondary #F472B6

STACK: React, GSAP, Tailwind

COMPONENTS: Animated hero text, tilt-effect project cards, skill badge grid, timeline component, floating-label contact form

STYLE: Creative · animation-forward · smooth page transitions`,
  },
];

const STEPS = [
  { Icon: PenLine,  number: "01", title: "Describe your idea",  tag: "30 seconds",   desc: "Type what you want to build. A habit tracker, sneaker store, SaaS dashboard — anything." },
  { Icon: Palette,  number: "02", title: "Pick your palette",   tag: "8 palettes",   desc: "Choose from 8 curated dark-mode palettes. Hex values get baked directly into your prompt." },
  { Icon: Copy,     number: "03", title: "Get your prompt",     tag: "~1,200 chars", desc: "Hit Generate. One click copies a complete, senior-engineer-level prompt to your clipboard." },
  { Icon: Sparkles, number: "04", title: "Ship the mockup",     tag: "First gen ✓",  desc: "Paste into Claude, GPT-4, or Lovable. Get a pixel-perfect React UI on the first generation." },
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
  "Developer support",
  "Priority feature requests",
  "No recurring charges — ever",
  "One-time payment",
];

const APP_GALLERY = [
  {
    name: "Running Tracker", palette: "Midnight", color: "#6C63FF",
    prompt: '"a fitness tracking app with home dashboard, activity history, live GPS run tracker, and achievements — Midnight palette"',
    screens: [
      { img: example1, label: "Home" }, { img: example2, label: "Activity" },
      { img: example3, label: "Track" }, { img: example4, label: "Profile" },
    ],
  },
  {
    name: "News Reader", palette: "Forest", color: "#4ade80",
    prompt: '"a news reader app with sentiment-filtered feed, trending explore page, and saved bookmarks — Forest palette"',
    screens: [
      { img: news1, label: "Hard News" }, { img: news2, label: "Good News" },
      { img: news3, label: "Explore" },   { img: news4, label: "Saved" },
    ],
  },
];

const FLOAT_CLASSES = ["float-a", "float-b", "float-c", "float-d"];

// ─── PHONE MOCKUP ─────────────────────────────────────────────────────────────
function PhoneMockup({ src, label, floatClass, offset, accent = ORANGE }) {
  return (
    <div
      className={`flex flex-col items-center gap-3 ${floatClass}`}
      style={{ transform: offset ? "translateY(24px)" : "translateY(0)" }}
    >
      <div
        className="relative w-full rounded-[2.2rem] overflow-hidden"
        style={{
          border: `1.5px solid ${BORDER}`,
          background: "#f5ede4",
          boxShadow: `0 24px 60px rgba(92,46,10,0.18), 0 0 40px ${accent}14`,
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 rounded-b-2xl z-10"
          style={{ backgroundColor: "#f5ede4" }} />
        <img src={src} alt={label} className="w-full block" />
      </div>
      <span className="text-xs font-bold px-3 py-1 rounded-full"
        style={{ backgroundColor: `${accent}15`, color: accent }}>
        {label}
      </span>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
export default function LandingPage({ onSignIn, onSubscribe, onDemo }) {
  const [selectedType, setSelectedType]   = useState(0);
  const [showContact, setShowContact]     = useState(false);
  const [contactForm, setContactForm]     = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState("idle");

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
            ...(anonKey ? { Authorization: `Bearer ${anonKey}` } : {}),
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

  const active = APP_TYPES[selectedType];

  return (
    <>
      {/* ── ANIMATIONS ── */}
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(24px)} 50%{transform:translateY(14px)}  }
        @keyframes floatC { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-8px)}  }
        @keyframes floatD { 0%,100%{transform:translateY(24px)} 50%{transform:translateY(16px)}  }
        @keyframes orbPulse { 0%,100%{opacity:.2;transform:scale(1)} 50%{opacity:.35;transform:scale(1.06)} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

        .float-a{animation:floatA 4.2s ease-in-out infinite}
        .float-b{animation:floatB 4.2s ease-in-out infinite;animation-delay:.7s}
        .float-c{animation:floatC 4.2s ease-in-out infinite;animation-delay:1.4s}
        .float-d{animation:floatD 4.2s ease-in-out infinite;animation-delay:2.1s}

        .orb  {animation:orbPulse 7s ease-in-out infinite}
        .orb2 {animation:orbPulse 7s ease-in-out infinite;animation-delay:3.5s}

        .fade-up{animation:fadeUp .5s ease both}
        .d1{animation-delay:.08s} .d2{animation-delay:.16s}
        .d3{animation-delay:.24s} .d4{animation-delay:.32s} .d5{animation-delay:.40s}

        .cursor::after{content:'|';animation:blink 1s step-end infinite;color:#EA580C}

        .pill{transition:all .18s ease}
        .pill:hover{border-color:#EA580C!important;background:rgba(234,88,12,.08)!important;color:#EA580C!important}

        .card{transition:transform .2s ease,box-shadow .2s ease}
        .card:hover{transform:translateY(-3px);box-shadow:0 20px 50px rgba(92,46,10,.14),0 0 24px rgba(234,88,12,.12)}

        .btn-p{transition:all .15s ease}
        .btn-p:hover{filter:brightness(1.08);transform:translateY(-1px);box-shadow:0 8px 24px rgba(234,88,12,.35)}
        .btn-p:active{transform:scale(.97)}

        .btn-o{transition:all .15s ease}
        .btn-o:hover{background:rgba(234,88,12,.06)!important}
        .btn-o:active{transform:scale(.97)}

        .nav-glass{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
        .no-scroll{scrollbar-width:none}
        .no-scroll::-webkit-scrollbar{display:none}

        h1,h2,h3{font-family:'Instrument Sans',sans-serif;font-weight:500;letter-spacing:-0.025em}
        code,pre,.font-mono{font-family:'IBM Plex Mono',monospace!important}
      `}</style>

      <div className="min-h-screen" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400, color: BROWN }}>

        {/* ── NAV ─────────────────────────────────────────────────────────── */}
        <nav
          className="nav-glass sticky top-0 z-50 border-b px-6 py-4 flex items-center justify-between"
          style={{ borderColor: BORDER, backgroundColor: "rgba(255,251,247,0.92)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}>
              <Sparkles size={15} color="white" />
            </div>
            <span className="font-bold text-sm tracking-tight" style={{ color: BROWN }}>Humble-UI</span>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {[["#how", "How it works"], ["#gallery", "Examples"], ["#pricing", "Pricing"]].map(([href, label]) => (
              <a key={href} href={href}
                className="text-sm transition-colors hover:opacity-100"
                style={{ color: BROWN3, textDecoration: "none", opacity: 0.8 }}>
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setContactForm({ name: "", email: "", message: "" }); setContactStatus("idle"); setShowContact(true); }}
              className="hidden sm:block text-xs transition-colors"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: BROWN3 }}
            >Contact</button>
            <button
              onClick={onSignIn}
              className="text-xs transition-colors"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: BROWN2 }}
            >Sign in</button>
            <button
              onClick={() => { track("demo_open"); onDemo?.(); }}
              className="btn-p text-xs font-bold px-4 py-2 rounded-lg text-white"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}
            >Free Demo</button>
          </div>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* Warm orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="orb absolute -top-48 -left-48 w-[480px] h-[480px] rounded-full"
              style={{ background: `radial-gradient(circle, ${ORANGE}35, transparent 70%)` }} />
            <div className="orb2 absolute -bottom-32 -right-32 w-96 h-96 rounded-full"
              style={{ background: `radial-gradient(circle, ${AMBER}28, transparent 70%)` }} />
            <div className="absolute inset-0"
              style={{ backgroundImage: `radial-gradient(${ORANGE}08 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
            {/* Badge */}
            <div className="fade-up inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full border mb-8"
              style={{ borderColor: `${ORANGE}40`, backgroundColor: `${ORANGE}10`, color: ORANGE }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ORANGE }} />
              Prompt engineering · Before you build
            </div>

            {/* Headline */}
            <h1 className="fade-up d1 text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-4"
              style={{ color: BROWN }}>
              What will you build?
            </h1>
            <p className="fade-up d2 text-xl md:text-2xl font-semibold mb-6"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, ${BROWN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Write the perfect prompt first.
            </p>
            <p className="fade-up d3 text-base max-w-lg mx-auto leading-relaxed mb-12"
              style={{ color: BROWN3 }}>
              Humble-UI scripts production-grade prompts for your AI. Describe your app once — get a prompt that actually builds something worth shipping.
            </p>

            {/* App type pills */}
            <div className="fade-up d4 flex flex-wrap gap-2 justify-center mb-8">
              {APP_TYPES.map((type, idx) => {
                const TypeIcon = type.Icon;
                const isActive = selectedType === idx;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(idx)}
                    className="pill flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-bold"
                    style={{
                      borderColor:     isActive ? ORANGE : BORDER,
                      backgroundColor: isActive ? `${ORANGE}12` : SURF,
                      color:           isActive ? ORANGE : BROWN3,
                      cursor: "pointer",
                    }}
                  >
                    <TypeIcon size={12} />
                    {type.label}
                  </button>
                );
              })}
            </div>

            {/* Live prompt preview — dark brown terminal */}
            <div className="fade-up d5 max-w-3xl mx-auto mb-12">
              <div className="rounded-2xl overflow-hidden text-left"
                style={{ border: `1.5px solid ${BORDER}`, boxShadow: `0 8px 32px rgba(92,46,10,0.14)` }}>
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "#2C1108" }}>
                  <div className="flex gap-1.5">
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                      <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span className="text-xs ml-2 font-mono" style={{ color: "#C4895A" }}>
                    humble-ui · {active.id}-prompt.txt
                  </span>
                  <div className="ml-auto flex items-center gap-1.5 text-xs" style={{ color: ORANGE }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ORANGE }} />
                    generated
                  </div>
                </div>
                {/* Prompt body */}
                <div className="p-5 no-scroll overflow-y-auto max-h-52" style={{ backgroundColor: "#1C0A02" }}>
                  <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono m-0" style={{ color: "#E8C9A8" }}>
                    <span style={{ color: ORANGE }}>$ </span>
                    <span style={{ color: "#4ade80" }}>humble-ui generate</span>
                    <span style={{ color: "#9A6040" }}>{" "}--type={active.id}{"\n\n"}</span>
                    {active.prompt}
                    <span className="cursor" />
                  </pre>
                </div>
              </div>
              <p className="text-center text-xs mt-3" style={{ color: BROWN3 }}>
                Select a category above to preview its generated prompt
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => { track("pricing_cta_click", { plan: "lifetime" }); onSubscribe?.("lifetime"); }}
                className="btn-p w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}
              >
                Get Lifetime Access — $49.99 <ArrowRight size={16} />
              </button>
              <button
                onClick={() => { track("demo_open"); onDemo?.(); }}
                className="btn-o w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border"
                style={{ borderColor: BORDER, color: BROWN2, background: SURF }}
              >
                Try free demo
              </button>
            </div>
            <p className="text-xs mt-4" style={{ color: BROWN3 }}>
              No card required for demo · Monthly from $9.99
            </p>
          </div>
        </section>

        {/* ── SOCIAL PROOF STRIP ───────────────────────────────────────────── */}
        <div className="border-y" style={{ borderColor: BORDER, backgroundColor: SURF2 }}>
          <div className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap gap-8 justify-center items-center">
            {[
              { value: "1,200+",    label: "Prompts generated" },
              { value: "First gen", label: "Production-ready output" },
              { value: "6",         label: "App types" },
              { value: "8",         label: "Curated palettes" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="font-bold text-sm" style={{ color: ORANGE }}>{value}</span>
                <span className="text-xs" style={{ color: BROWN3 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHY PROMPTS MATTER ───────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>The real bottleneck</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BROWN }}>
              Good output starts with<br />a good prompt.
            </h2>
            <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: BROWN3 }}>
              Most builders skip this step and wonder why their AI-generated UI looks generic.
              Prompt scripting is the craft that separates a $10 asset from a production mockup.
            </p>
          </div>

          {/* Bad vs Good */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {/* Bad */}
            <div className="card p-7 rounded-2xl border" style={{ borderColor: "#FECACA", backgroundColor: "#FFF5F5" }}>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#FEE2E2" }}>
                  <AlertTriangle size={14} style={{ color: "#DC2626" }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#DC2626" }}>Vague prompt</span>
              </div>
              <div className="rounded-xl px-4 py-3 text-xs mb-5 border font-mono" style={{ borderColor: "#FECACA", backgroundColor: "#FEF2F2", color: "#7F1D1D" }}>
                "make a fitness app"
              </div>
              <ul className="space-y-2.5">
                {[
                  "Generic layout with no visual identity",
                  "Missing key screens and flows",
                  "No color system, spacing, or typography",
                  "Requires 10+ revision passes",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "#7C2D12" }}>
                    <span style={{ color: "#DC2626" }} className="shrink-0">×</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Good */}
            <div className="card p-7 rounded-2xl border" style={{ borderColor: `${ORANGE}40`, backgroundColor: "#FFF7ED" }}>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${ORANGE}15` }}>
                  <FileCode2 size={14} style={{ color: ORANGE }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>Scripted prompt</span>
              </div>
              <div className="rounded-xl px-4 py-3 text-xs mb-5 border font-mono leading-relaxed" style={{ borderColor: `${ORANGE}30`, backgroundColor: "#FFFBF5", color: BROWN2 }}>
                "a fitness tracking app: home with weekly summary, activity history, live GPS tracker,
                profile with achievements. Midnight palette — deep navy #0D0D1A, accent #6C63FF…"
              </div>
              <ul className="space-y-2.5">
                {[
                  "Exact screens, flows, and data states defined",
                  "Hex-accurate color palette baked in",
                  "Mobile-first layout with spacing system",
                  "Production-ready on first generation",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs" style={{ color: BROWN2 }}>
                    <Check size={12} className="shrink-0 mt-0.5" style={{ color: ORANGE }} />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3 insight cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { Icon: Brain,    title: "Specificity beats creativity",     body: "AI doesn't guess well. The more precise your prompt — screens, states, colors, components — the less it has to invent." },
              { Icon: FileCode2, title: "Structure unlocks quality",       body: "Senior engineers know the UI questions to ask before touching code. Your prompt should answer those questions upfront." },
              { Icon: Zap,      title: "One great prompt > ten revisions", body: "Rebuilding from a bad prompt wastes hours. A well-scripted prompt ships the right result on the first try." },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="card p-6 rounded-2xl border" style={{ borderColor: BORDER, backgroundColor: SURF }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${ORANGE}12` }}>
                  <Icon size={16} style={{ color: ORANGE }} />
                </div>
                <h3 className="text-xs font-bold mb-2" style={{ color: BROWN }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: BROWN3 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────────── */}
        <section className="px-6 py-24" style={{ backgroundColor: SURF2 }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>The numbers</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BROWN }}>
                The cost of a bad prompt is real.
              </h2>
              <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: BROWN3 }}>
                Most AI-generated UI fails not because of the model — but because of what you gave it.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { stat: "3+ hrs", label: "lost per feature",         detail: "Average rework time from a vague prompt.",      bg: "#FFF5F5", border: "#FECACA", statColor: "#DC2626" },
                { stat: "10×",   label: "more revision passes",      detail: "Back-and-forth cycles without structure.",       bg: "#FFF5F5", border: "#FECACA", statColor: "#DC2626" },
                { stat: "68%",   label: "of output rewritten",       detail: "Nearly 7 in 10 screens need manual cleanup.",    bg: "#FFF5F5", border: "#FECACA", statColor: "#DC2626" },
                { stat: "1",     label: "generation with Humble-UI", detail: "Scripted prompts ship right on the first gen.",  bg: "#FFF7ED", border: `${ORANGE}40`, statColor: ORANGE },
              ].map(({ stat, label, detail, bg, border, statColor }) => (
                <div key={label} className="card p-6 rounded-2xl border flex flex-col gap-3"
                  style={{ borderColor: border, backgroundColor: bg }}>
                  <div>
                    <span className="text-4xl font-semibold" style={{ color: statColor }}>{stat}</span>
                    <p className="text-xs font-bold mt-1" style={{ color: BROWN2 }}>{label}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: BROWN3 }}>{detail}</p>
                </div>
              ))}
            </div>

            {/* Time breakdown bar */}
            <div className="rounded-2xl border p-7" style={{ borderColor: BORDER, backgroundColor: SURF }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: ORANGE }}>
                Where your time goes — without a structured prompt
              </p>
              <div className="space-y-4">
                {[
                  { label: "Fixing AI hallucinations",                pct: 38, color: "#DC2626" },
                  { label: "Rewriting layout & component structure",  pct: 27, color: "#D97706" },
                  { label: "Re-prompting for missing screens",        pct: 21, color: "#7C3AED" },
                  { label: "Actual feature work",                     pct: 14, color: ORANGE },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs" style={{ color: BROWN2 }}>{label}</span>
                      <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#EDD9C8" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-6" style={{ color: BROWN3 }}>
                A scripted prompt flips this — 86% of your time goes to building, not fixing.
              </p>
            </div>
          </div>
        </section>

        {/* ── APP GALLERY ──────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-24" id="gallery">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Built with scripted prompts</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BROWN }}>
              This is what one good prompt produces.
            </h2>
            <p className="text-sm max-w-lg mx-auto leading-relaxed" style={{ color: BROWN3 }}>
              Each app below was generated from a single Humble-UI prompt — no manual cleanup, no extra passes.
            </p>
          </div>

          <div className="space-y-28">
            {APP_GALLERY.map((app, appIdx) => (
              <div key={app.name}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
                  <div className="shrink-0">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: app.color }}>
                      App {appIdx + 1}
                    </span>
                    <h3 className="font-bold text-xl mt-1" style={{ color: BROWN }}>{app.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                      style={{ backgroundColor: `${app.color}15`, color: app.color }}>
                      {app.palette} palette
                    </span>
                  </div>
                  <div className="rounded-xl border px-5 py-3 text-xs font-mono leading-relaxed flex-1 max-w-2xl"
                    style={{ borderColor: BORDER, backgroundColor: SURF2, color: BROWN3 }}>
                    <span style={{ color: app.color }}>prompt </span>{app.prompt}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 items-start">
                  {app.screens.map((screen, i) => (
                    <PhoneMockup
                      key={screen.label}
                      src={screen.img}
                      label={screen.label}
                      floatClass={FLOAT_CLASSES[i]}
                      offset={i % 2 !== 0}
                      accent={app.color}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section className="px-6 py-24" style={{ backgroundColor: SURF2 }} id="how">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>How it works</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: BROWN }}>
                Four steps to a perfect mockup.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map((step, i) => {
                const StepIcon = step.Icon;
                return (
                  <div key={step.number} className="card p-6 rounded-2xl border relative overflow-hidden"
                    style={{ borderColor: BORDER, backgroundColor: SURF }}>
                    <span className="absolute top-3 right-4 text-7xl font-bold select-none pointer-events-none"
                      style={{ color: `${BROWN}06`, lineHeight: 1 }}>
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${ORANGE}12` }}>
                      <StepIcon size={18} style={{ color: ORANGE }} />
                    </div>
                    <h3 className="font-bold text-sm mb-2" style={{ color: BROWN }}>{step.title}</h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: BROWN3 }}>{step.desc}</p>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold"
                      style={{ backgroundColor: `${ORANGE}10`, color: ORANGE }}>
                      {step.tag}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full items-center justify-center"
                        style={{ backgroundColor: SURF2, border: `1px solid ${BORDER}` }}>
                        <ArrowRight size={11} style={{ color: BROWN3 }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 py-24" id="pricing">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: BROWN }}>Simple. No surprises.</h2>
            <p className="text-sm" style={{ color: BROWN3 }}>Two options. Pick what suits you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Monthly */}
            <div className="card p-8 rounded-2xl border flex flex-col" style={{ borderColor: BORDER, backgroundColor: SURF }}>
              <p className="text-xs uppercase tracking-widest mb-5" style={{ color: BROWN3 }}>Monthly</p>
              <div className="mb-1">
                <span className="text-5xl font-semibold" style={{ color: BROWN }}>$9.99</span>
                <span className="text-sm" style={{ color: BROWN3 }}> / month</span>
              </div>
              <p className="text-xs mb-7" style={{ color: BROWN3 }}>Billed monthly. Cancel anytime.</p>
              <ul className="space-y-3 flex-1 mb-8">
                {MONTHLY_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-xs" style={{ color: BROWN2 }}>
                    <Check size={13} className="shrink-0 mt-0.5" style={{ color: ORANGE }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { track("pricing_cta_click", { plan: "monthly" }); onSubscribe?.("monthly"); }}
                className="btn-o w-full py-3.5 rounded-xl font-bold text-sm border"
                style={{ borderColor: `${ORANGE}50`, color: ORANGE, background: "none" }}
              >Start Monthly Plan</button>
            </div>

            {/* Lifetime */}
            <div className="card p-8 rounded-2xl flex flex-col relative overflow-hidden"
              style={{ border: `2px solid ${ORANGE}`, background: `linear-gradient(135deg, ${ORANGE}10, #FFF7ED)` }}>
              <div className="absolute top-5 right-5 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: ORANGE, color: "white" }}>
                Best value
              </div>
              <div className="flex items-center gap-2 mb-5">
                <Zap size={14} style={{ color: ORANGE }} />
                <p className="text-xs uppercase tracking-widest font-bold" style={{ color: ORANGE }}>Lifetime</p>
              </div>
              <div className="mb-1">
                <span className="text-5xl font-semibold" style={{ color: BROWN }}>$49.99</span>
              </div>
              <p className="text-xs mb-7" style={{ color: BROWN2 }}>One-time payment. Yours forever.</p>
              <ul className="space-y-3 flex-1 mb-8">
                {LIFETIME_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-xs" style={{ color: BROWN2 }}>
                    <Check size={13} className="shrink-0 mt-0.5" style={{ color: ORANGE }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { track("pricing_cta_click", { plan: "lifetime" }); onSubscribe?.("lifetime"); }}
                className="btn-p w-full py-3.5 rounded-xl font-bold text-sm text-white"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}
              >Get Lifetime Access →</button>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA — rich dark brown ──────────────────────────────────── */}
        <section className="px-6 py-24">
          <div className="max-w-3xl mx-auto text-center rounded-3xl px-10 py-20 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, #2C1108, #1C0A02)` }}>
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full"
              style={{ background: `radial-gradient(circle, ${ORANGE}35, transparent 70%)` }} />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Get the prompt right.<br />Then build.
              </h2>
              <p className="text-sm mb-10 max-w-sm mx-auto leading-relaxed" style={{ color: "#C4895A" }}>
                Stop generating mediocre output. Let Humble-UI write the prompt that makes your AI produce something worth shipping.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => { track("pricing_cta_click", { plan: "lifetime" }); onSubscribe?.("lifetime"); }}
                  className="btn-p flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white"
                  style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}
                >
                  Get started today <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => { track("demo_open"); onDemo?.(); }}
                  className="btn-o flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border"
                  style={{ borderColor: "rgba(255,255,255,0.2)", color: "#E8C9A8", background: "none" }}
                >
                  Try free demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="border-t px-6 py-8" style={{ borderColor: BORDER }}>
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}>
                <Sparkles size={11} color="white" />
              </div>
              <span className="text-xs font-bold" style={{ color: BROWN }}>Humble-UI</span>
            </div>
            <p className="text-xs text-center" style={{ color: BROWN3 }}>
              © {new Date().getFullYear()} Humble-UI. All rights reserved.{" "}
              <a href="/privacy.html" className="hover:underline" style={{ color: BROWN3 }}>Privacy</a>
              {" · "}
              <a href="/terms.html" className="hover:underline" style={{ color: BROWN3 }}>Terms</a>
              {" · "}
              <a href="/cookie-policy.html" className="hover:underline" style={{ color: BROWN3 }}>Cookies</a>
            </p>
            <button
              onClick={() => { setContactForm({ name: "", email: "", message: "" }); setContactStatus("idle"); setShowContact(true); }}
              className="text-xs transition-colors hover:underline"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: BROWN3 }}
            >Contact us</button>
          </div>
        </footer>

        {/* ── CONTACT MODAL ────────────────────────────────────────────────── */}
        {showContact && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: "rgba(28,10,2,0.6)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowContact(false); }}
          >
            <div className="rounded-2xl p-8 max-w-md w-full relative"
              style={{ backgroundColor: SURF, border: `1px solid ${BORDER}`, boxShadow: "0 24px 60px rgba(92,46,10,0.2)" }}>
              <button onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 transition-colors"
                style={{ background: "none", border: "none", cursor: "pointer", color: BROWN3 }}>
                <X size={18} />
              </button>

              {contactStatus === "sent" ? (
                <div className="text-center py-6">
                  <div className="text-3xl mb-3">✉️</div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: BROWN }}>Message sent!</h3>
                  <p className="text-sm" style={{ color: BROWN3 }}>We'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setShowContact(false)}
                    className="btn-p mt-6 px-5 py-2.5 rounded-lg text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}
                  >Close</button>
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-lg mb-1" style={{ color: BROWN }}>Contact us</h3>
                  <p className="text-sm mb-6" style={{ color: BROWN3 }}>We read every message.</p>
                  <div className="space-y-4">
                    {[
                      { key: "name",  label: "Name",  type: "text",  placeholder: "Your name" },
                      { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label className="block text-xs mb-1.5" style={{ color: BROWN3 }}>{label}</label>
                        <input
                          type={type}
                          value={contactForm[key]}
                          onChange={(e) => setContactForm(f => ({ ...f, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
                          style={{
                            backgroundColor: BG,
                            border: `1px solid ${BORDER}`,
                            color: BROWN,
                            colorScheme: 'light',
                          }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: BROWN3 }}>Message</label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="How can we help?"
                        rows={4}
                        className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors resize-none"
                        style={{
                          backgroundColor: BG,
                          border: `1px solid ${BORDER}`,
                          color: BROWN,
                        }}
                      />
                    </div>
                  </div>
                  {contactStatus === "error" && (
                    <p className="text-xs mt-3" style={{ color: "#DC2626" }}>Something went wrong. Please try again.</p>
                  )}
                  <button
                    onClick={handleContactSend}
                    disabled={contactStatus === "sending" || !contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()}
                    className="btn-p mt-6 w-full py-3 rounded-xl font-bold text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}
                  >
                    {contactStatus === "sending" ? "Sending…" : "Send message →"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
