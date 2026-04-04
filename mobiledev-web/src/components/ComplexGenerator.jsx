import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSavedPrompts } from "../hooks/useSavedPrompts";
import { useGeneratedPrompts } from "../hooks/useGeneratedPrompts";
import { useProfile } from "../hooks/useProfile";
import { isSupabaseConfigured } from "../lib/supabase";
import { capture } from "../lib/posthog";
import { getStripeLink } from "../lib/stripe";
import AuthModal from "./AuthModal";
import SavedPrompts from "./SavedPrompts";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const USE_CASES = [
  { id: "mobile", label: "📱 Mobile App", icon: "📱", desc: "React Native-style mobile UI" },
  { id: "dashboard", label: "📊 Dashboard", icon: "📊", desc: "Data-rich admin interface" },
  { id: "landing", label: "🚀 Landing Page", icon: "🚀", desc: "Marketing & conversion focused" },
  { id: "saas", label: "⚙️ SaaS Product", icon: "⚙️", desc: "Full-featured web app" },
  { id: "portfolio", label: "🎨 Portfolio", icon: "🎨", desc: "Personal or agency showcase" },
  { id: "ecommerce", label: "🛍️ E-Commerce", icon: "🛍️", desc: "Product & checkout flows" },
];

const COLOR_PALETTES = [
  { name: "Midnight", colors: ["#0F0F23", "#6C63FF", "#FF6584"], desc: "Electric violet + coral" },
  { name: "Forest", colors: ["#1A2F23", "#4CAF7D", "#F5C842"], desc: "Mint green + golden yellow" },
  { name: "Ember", colors: ["#1C1410", "#E85D04", "#FFBA08"], desc: "Burnt orange + amber" },
  { name: "Ocean", colors: ["#03045E", "#0096C7", "#ADE8F4"], desc: "Ocean blue + sky teal" },
  { name: "Blush", colors: ["#2D1B2E", "#E040FB", "#F8BBD9"], desc: "Neon magenta + soft pink" },
  { name: "Slate", colors: ["#0D1117", "#58A6FF", "#3FB950"], desc: "Electric blue + neon green" },
  { name: "Sunset", colors: ["#1A0A00", "#FF6B35", "#FFE66D"], desc: "Sunset orange + lemon" },
  { name: "Arctic", colors: ["#0A1628", "#00D4FF", "#B8FFF9"], desc: "Ice blue + crystal teal" },
];

const COMPLEXITY_LEVELS = [
  { id: "simple", label: "Simple", desc: "1–2 screens, core feature only", screens: "1–2" },
  { id: "standard", label: "Standard", desc: "3–4 screens, common patterns", screens: "3–4" },
  { id: "advanced", label: "Advanced", desc: "5+ screens, full feature set", screens: "5+" },
];

const STYLE_TOKENS_BY_USECASE = {
  mobile: [
    "glassmorphism cards with frosted blur",
    "bold typography with oversized headings",
    "bottom navigation tab bar",
    "pull-to-refresh gesture hints",
    "skeleton loaders for async states",
    "haptic-style micro animations (scale bounce on press)",
    "safe-area padding for notch devices",
    "dark mode first design",
    "floating action button (FAB) for primary CTA",
    "pill-shaped buttons and tags",
    "swipeable card stacks",
    "progress rings and animated stat counters",
  ],
  dashboard: [
    "data visualization with chart placeholders",
    "collapsible sidebar navigation",
    "KPI metric cards with trend indicators",
    "sortable and filterable data tables",
    "real-time activity feed",
    "status badges with color coding",
    "date range picker for filtering",
    "sparkline mini charts inline",
    "notification bell with badge count",
    "breadcrumb navigation",
    "export/download action buttons",
    "responsive grid layout with resizable panels",
  ],
  landing: [
    "hero section with animated gradient background",
    "social proof logos strip",
    "feature comparison table",
    "testimonial carousel",
    "pricing cards with highlighted recommended tier",
    "FAQ accordion section",
    "sticky CTA header on scroll",
    "animated counter stats (10k+ users, 99.9% uptime)",
    "interactive product screenshot mockup",
    "newsletter signup with inline validation",
    "footer with multi-column links",
    "trust badges and security seals",
  ],
  saas: [
    "onboarding stepper with progress indicator",
    "settings panel with toggle switches",
    "team member invite flow",
    "usage quota progress bars",
    "activity timeline/audit log",
    "modal dialogs for confirmations",
    "inline editing with optimistic UI updates",
    "search with instant filter results",
    "keyboard shortcut hints",
    "contextual tooltips on hover",
    "empty states with onboarding CTAs",
    "notification toast system",
  ],
  portfolio: [
    "full-bleed project hero images",
    "masonry or bento grid layout",
    "hover reveal project details",
    "case study timeline",
    "skills/tech stack icon grid",
    "animated cursor or scroll indicator",
    "dark/light theme toggle",
    "smooth page scroll transitions",
    "contact form with field validation",
    "social links with icon buttons",
    "work experience accordion",
    "before/after project sliders",
  ],
  ecommerce: [
    "product image gallery with thumbnails",
    "size/variant selector with stock indicators",
    "add to cart with quantity controls",
    "sticky product details on scroll",
    "reviews section with star ratings",
    "related products horizontal scroll",
    "mini cart drawer sliding in from right",
    "promo/discount code input",
    "order summary sticky sidebar",
    "breadcrumb category navigation",
    "wishlist toggle with heart icon",
    "shipping calculator inline",
  ],
};

const TECH_OPTIONS = [
  { id: "react-tailwind", label: "React + Tailwind", default: true },
  { id: "react-css", label: "React + CSS Modules" },
  { id: "html-vanilla", label: "HTML + Vanilla JS" },
  { id: "nextjs", label: "Next.js + Tailwind" },
];

// ─── PROMPT BUILDERS ─────────────────────────────────────────────────────────

const buildMobilePrompt = ({ appIdea, palette, styles, complexity, techStack, extraContext }) => `
You are a senior React mobile developer with 10+ years of experience shipping production apps. Your code is architecturally clean, performant at 60fps, and visually indistinguishable from a professionally designed native app.

## Task
Build a **complete, fully functional ${appIdea}** as a single self-contained React JSX file with ${complexity.screens} screens. Every screen must feel like it shipped from a real product team.

## Tech Stack
- **React** with hooks: useState, useEffect, useCallback, useMemo, useRef
- **Tailwind CSS** utility classes only
- **Lucide React** icons
- All data hardcoded/mocked — no fetch, no APIs
${extraContext ? `\n## Additional Context\n${extraContext}\n` : ""}
## Color Palette — "${palette.name}"
| Token | Hex | Usage |
|-------|-----|-------|
| Background | \`${palette.colors[0]}\` | App background, card bases |
| Primary | \`${palette.colors[1]}\` | CTAs, active states, key highlights |
| Accent | \`${palette.colors[2]}\` | Badges, secondary highlights |

Apply as inline \`style\` overrides when Tailwind can't express exact hex.
Never use generic Tailwind color classes — every color from this palette only.

## Layout & Mobile Constraints
- Design target: **375px width** (iPhone 14 Pro)
- Outermost wrapper: \`<div className="max-w-sm mx-auto min-h-screen relative overflow-hidden">\`
- Fixed bottom navigation bar (position: fixed, bottom: 0)
- Add \`pb-20\` to main content to prevent bottom nav overlap
- All tap targets: minimum 44×44px
- No horizontal scroll

## Visual Language
${styles.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Required UI Elements
- Hero/header with gradient: \`style={{ background: 'linear-gradient(135deg, ${palette.colors[1]}, ${palette.colors[2]})' }}\`
- ${complexity.screens} navigable screens via bottom nav
- Realistic mock data (real names, plausible numbers, actual dates)
- Micro-interactions: \`active:scale-95 transition-all duration-150\` on every tappable element
- At least one skeleton/loading state with useEffect + setTimeout
- At least one bottom sheet or modal pattern

## Component Architecture
1. Imports → 2. Constants & mock data → 3. Atomic sub-components → 4. Screen components → 5. Layout components → 6. Default export App

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin directly with \`import { useState, ... } from 'react'\`.
`.trim();

const buildDashboardPrompt = ({ appIdea, palette, styles, complexity, extraContext }) => `
You are a senior frontend engineer specializing in data-dense admin interfaces. You ship dashboards that are both beautiful and functional, where every pixel earns its place.

## Task
Build a **complete ${appIdea} dashboard** as a single self-contained React JSX file with ${complexity.screens} main views. Data should tell a story — not just fill a grid.

## Tech Stack
- React with hooks: useState, useEffect, useCallback, useMemo
- Tailwind CSS utility classes only
- Lucide React icons
- All data hardcoded/mocked with realistic variance and trends
- Recharts for any charts: \`import { AreaChart, BarChart, ... } from 'recharts'\`
${extraContext ? `\n## Additional Context\n${extraContext}\n` : ""}
## Color Palette — "${palette.name}"
- Background: \`${palette.colors[0]}\` — page background, card bases
- Primary: \`${palette.colors[1]}\` — active nav, primary actions, chart fills
- Accent: \`${palette.colors[2]}\` — badges, positive indicators, sparklines

## Layout
- Full viewport: \`<div className="flex h-screen overflow-hidden">\`
- Left sidebar (w-64, collapsible to w-16) + main content area
- Top bar with search, notifications bell, user avatar
- Main content: scrollable, with \`p-6\` inner padding

## Visual Language
${styles.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Required Elements
- Summary KPI cards row at top: 4 metrics with value, trend arrow, sparkline
- At least 1 area/bar chart (Recharts) with realistic data points
- A data table with sortable columns, status badges, avatar cells
- ${complexity.screens} views switchable via sidebar nav
- Realistic mock data: revenue figures, user counts, dates, percentages

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin with \`import { useState, ... } from 'react'\`.
`.trim();

const buildLandingPrompt = ({ appIdea, palette, styles, complexity, extraContext }) => `
You are a senior conversion-focused frontend developer. You build landing pages that look like they were designed by a top-tier agency and convert at industry-leading rates.

## Task
Build a **complete landing page for ${appIdea}** as a single self-contained React JSX file. Every section must earn its place — no filler, no generic content.

## Tech Stack
- React with hooks
- Tailwind CSS utility classes only
- Lucide React icons
- All copy and data hardcoded with genuine, compelling product copy
${extraContext ? `\n## Additional Context\n${extraContext}\n` : ""}
## Color Palette — "${palette.name}"
- Background: \`${palette.colors[0]}\`
- Primary: \`${palette.colors[1]}\` — CTAs, highlights, hover states
- Accent: \`${palette.colors[2]}\` — badges, underlines, decorative elements

Hero gradient: \`style={{ background: 'linear-gradient(135deg, ${palette.colors[1]}22, ${palette.colors[2]}22)' }}\`

## Layout Sections (in order)
1. Sticky navigation with logo + links + CTA button
2. Hero: bold headline, subhead, dual CTA buttons, product visual (gradient mockup div)
3. Social proof: logo strip (6 fake company names as text)
4. Features: 3-column grid with icon, title, description
5. How it works: numbered steps with connecting line
6. Testimonials: 3 cards with quote, avatar (gradient circle), name, role, star rating
7. Pricing: 3 tiers, middle one highlighted with primary color border + "Most Popular" badge
8. FAQ: accordion with 5 questions, smooth expand/collapse animation
9. Final CTA: full-width gradient section
10. Footer: 4-column links + copyright

## Visual Language
${styles.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin with \`import { useState, ... } from 'react'\`.
`.trim();

const buildSaaSPrompt = ({ appIdea, palette, styles, complexity, extraContext }) => `
You are a principal engineer who has shipped multiple successful SaaS products. You build interfaces that feel like a polished B2B tool — professional, efficient, and delightfully usable.

## Task
Build a **complete ${appIdea} SaaS application** as a single self-contained React JSX file with ${complexity.screens} sections/views. Think Notion, Linear, or Vercel — clean, purposeful, with a clear information hierarchy.

## Tech Stack
- React with hooks: useState, useEffect, useCallback, useMemo, useRef
- Tailwind CSS utility classes only
- Lucide React icons
- All data hardcoded/mocked
${extraContext ? `\n## Additional Context\n${extraContext}\n` : ""}
## Color Palette — "${palette.name}"
- Background: \`${palette.colors[0]}\`
- Primary: \`${palette.colors[1]}\` — active states, primary buttons, focus rings
- Accent: \`${palette.colors[2]}\` — success states, highlights, badges

## Layout
- App shell: sidebar nav (left, w-56) + top bar + main content
- Top bar: breadcrumb, search, notification icon, user avatar dropdown
- Main area: \`flex-1 overflow-auto p-6\`

## Visual Language
${styles.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Required Elements
- Onboarding or empty state for at least one section (icon + headline + CTA)
- At least one modal dialog (create/edit item)
- Settings panel with toggle switches and input fields
- Notification toast system (auto-dismiss after 3s)
- ${complexity.screens} distinct views via sidebar nav

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin with \`import { useState, ... } from 'react'\`.
`.trim();

const buildPortfolioPrompt = ({ appIdea, palette, styles, complexity, extraContext }) => `
You are a creative frontend developer known for portfolio sites that get people hired. You build personal sites that feel like art — memorable, fast, and deeply personal.

## Task
Build a **complete portfolio site for ${appIdea}** as a single self-contained React JSX file. It must feel handcrafted — like a designer built it, not a template generator.

## Tech Stack
- React with hooks
- Tailwind CSS utility classes only
- Lucide React icons
- All content hardcoded with real-sounding names, titles, project descriptions
${extraContext ? `\n## Additional Context\n${extraContext}\n` : ""}
## Color Palette — "${palette.name}"
- Background: \`${palette.colors[0]}\`
- Primary: \`${palette.colors[1]}\` — accents, hover states, active indicators
- Accent: \`${palette.colors[2]}\` — highlights, tags, decorative elements

## Sections
1. Hero: name, title, brief bio, CTA buttons (View Work / Contact), animated gradient blob background
2. About: photo placeholder (gradient circle), bio paragraph, skills grid
3. Work/Projects: bento grid or masonry layout, 4–6 projects with title, tags, description, mock image (gradient div)
4. Experience: timeline with company, role, dates, bullet points
5. Contact: email, social links, optional short contact form

## Visual Language
${styles.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin with \`import { useState, ... } from 'react'\`.
`.trim();

const buildEcommercePrompt = ({ appIdea, palette, styles, complexity, extraContext }) => `
You are a senior e-commerce frontend engineer. You've built storefronts that convert. You know that every interaction — hover, add-to-cart, checkout — must feel effortless and trustworthy.

## Task
Build a **complete ${appIdea} e-commerce UI** as a single self-contained React JSX file with ${complexity.screens} screens. Think Shopify + Apple Store aesthetics — premium, clean, conversion-optimized.

## Tech Stack
- React with hooks: useState, useEffect, useCallback, useMemo
- Tailwind CSS utility classes only
- Lucide React icons
- All product data hardcoded/mocked (realistic product names, prices, descriptions)
${extraContext ? `\n## Additional Context\n${extraContext}\n` : ""}
## Color Palette — "${palette.name}"
- Background: \`${palette.colors[0]}\`
- Primary: \`${palette.colors[1]}\` — CTAs, prices, active states
- Accent: \`${palette.colors[2]}\` — sale badges, wishlist, rating stars

## Required Screens
1. Product listing/catalog with filter sidebar or top filter bar
2. Product detail page: gallery, variant picker, add to cart
3. Cart drawer or cart page with quantity controls + order summary
${complexity.id !== "simple" ? "4. Simple checkout flow (shipping + payment form mockup)" : ""}
${complexity.id === "advanced" ? "5. Order confirmation / thank you screen" : ""}

## Visual Language
${styles.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Required Elements
- Product cards with hover state, wishlist toggle, quick-add button
- Cart item count badge on cart icon
- Toast notification on add to cart
- Realistic product data: 8+ products with names, prices, ratings, stock status

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin with \`import { useState, ... } from 'react'\`.
`.trim();

const PROMPT_BUILDERS = {
  mobile: buildMobilePrompt,
  dashboard: buildDashboardPrompt,
  landing: buildLandingPrompt,
  saas: buildSaaSPrompt,
  portfolio: buildPortfolioPrompt,
  ecommerce: buildEcommercePrompt,
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const StepLabel = ({ number, label, active }) => (
  <div className="flex items-center gap-2 mb-3">
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200"
      style={{ backgroundColor: active ? "#6C63FF" : "#1f2937", color: active ? "white" : "#6b7280" }}
    >
      {number}
    </div>
    <span className={`text-xs uppercase tracking-widest font-semibold ${active ? "text-white" : "text-gray-500"}`}>
      {label}
    </span>
  </div>
);

const PalettePreview = ({ colors, name }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {colors.map((c, i) => (
        <div
          key={c}
          className="w-4 h-4 rounded-full border-2 border-gray-900"
          style={{ backgroundColor: c, marginLeft: i > 0 ? "-4px" : 0, zIndex: colors.length - i }}
        />
      ))}
    </div>
    <span className="text-xs text-gray-400">{name}</span>
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const DEMO_STORAGE_KEY = "humble-ui-demo-used";

export default function PromptGenerator({ demoMode = false, onDemoSignUp, onExitDemo }) {
  const [appIdea, setAppIdea] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("mobile");
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [selectedComplexity, setSelectedComplexity] = useState("standard");
  const [extraContext, setExtraContext] = useState("");
  const [showExtraContext, setShowExtraContext] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [promptGenerated, setPromptGenerated] = useState(false);

  // Auth & save state
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { prompts, loading: promptsLoading, savePrompt, deletePrompt } = useSavedPrompts(user?.id);
  const { insertPrompt, logDemoPrompt } = useGeneratedPrompts(user?.id);
  const { isPaid, withinLimit, generationsUsed, incrementGeneration, refresh: refreshProfile } = useProfile(user?.id);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState("idle");
  const [paymentBanner, setPaymentBanner] = useState(null);

  // Handle ?payment=success redirect from Stripe
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") !== "success") return;
    setPaymentBanner("pending");
    history.replaceState(null, "", window.location.pathname);
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      const latest = await refreshProfile();
      const paid = latest?.plan === "monthly" || latest?.plan === "lifetime";
      if (paid || attempts >= 10) {
        clearInterval(interval);
        setPaymentBanner(paid ? "done" : null);
        if (paid) setTimeout(() => setPaymentBanner(null), 4000);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Demo mode: if they've already used their one free generation, show paywall immediately
  useEffect(() => {
    if (demoMode && localStorage.getItem(DEMO_STORAGE_KEY) === "true") {
      setShowUpgradeModal(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [showSaveInput, setShowSaveInput] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const saveInputRef = useRef(null);

  const handleSaveClick = useCallback(() => {
    if (!user) { setShowAuthModal(true); return; }
    setSaveName(appIdea.slice(0, 60));
    setSaveError("");
    setShowSaveInput(true);
    setTimeout(() => saveInputRef.current?.focus(), 50);
  }, [user, appIdea]);

  const handleSaveConfirm = useCallback(async () => {
    if (!saveName.trim()) return;
    setSaving(true);
    setSaveError("");
    try {
      await savePrompt({
        name: saveName.trim(),
        app_idea: appIdea,
        use_case: selectedUseCase,
        palette_index: selectedPalette,
        complexity: selectedComplexity,
        extra_context: extraContext,
        prompt_text: generatedPrompt,
      });
      setShowSaveInput(false);
      capture("prompt_saved", { use_case: selectedUseCase, complexity: selectedComplexity });
    } catch {
      setSaveError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [saveName, appIdea, selectedUseCase, selectedPalette, selectedComplexity, extraContext, generatedPrompt, savePrompt]);

  const handleLoad = useCallback((saved) => {
    setAppIdea(saved.app_idea);
    setSelectedUseCase(saved.use_case);
    setSelectedPalette(saved.palette_index);
    setSelectedComplexity(saved.complexity);
    setExtraContext(saved.extra_context ?? "");
    setGeneratedPrompt(saved.prompt_text);
    setPromptGenerated(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const palette = COLOR_PALETTES[selectedPalette];
  const complexity = COMPLEXITY_LEVELS.find((c) => c.id === selectedComplexity);
  const styleTokens = STYLE_TOKENS_BY_USECASE[selectedUseCase] || STYLE_TOKENS_BY_USECASE.mobile;
  const canGenerate = appIdea.trim().length > 0;
  const charCount = generatedPrompt.length;

  const generatePrompt = useCallback(async () => {
    if (!canGenerate) return;

    if (demoMode) {
      if (localStorage.getItem(DEMO_STORAGE_KEY) === "true") { setShowUpgradeModal(true); return; }
    } else if (!withinLimit) {
      setShowUpgradeModal(true); return;
    }

    const randomStyles = [...styleTokens].sort(() => Math.random() - 0.5).slice(0, 5);
    const builder = PROMPT_BUILDERS[selectedUseCase];
    const prompt = builder({ appIdea, palette, styles: randomStyles, complexity, extraContext });
    setGeneratedPrompt(prompt);
    setPromptGenerated(true);
    capture("prompt_generated", {
      use_case: selectedUseCase,
      complexity: selectedComplexity,
      palette: palette.name,
      demo: demoMode,
    });

    if (demoMode) {
      localStorage.setItem(DEMO_STORAGE_KEY, "true");
      // Log the demo generation server-side (fire-and-forget — don't await)
      logDemoPrompt({
        app_idea: appIdea,
        use_case: selectedUseCase,
        palette_name: palette.name,
        complexity: selectedComplexity,
        extra_context: extraContext,
        prompt_text: prompt,
      });
      // Show paywall after a beat so the user can see their generated prompt first
      setTimeout(() => setShowUpgradeModal(true), 900);
    } else {
      await Promise.all([
        incrementGeneration(),
        insertPrompt({
          app_idea: appIdea,
          use_case: selectedUseCase,
          palette_name: palette.name,
          complexity: selectedComplexity,
          extra_context: extraContext,
          prompt_text: prompt,
        }),
      ]);
    }
  }, [appIdea, selectedUseCase, selectedComplexity, palette, complexity, styleTokens, extraContext, canGenerate, withinLimit, demoMode, incrementGeneration, insertPrompt, logDemoPrompt]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    capture("prompt_copied", { use_case: selectedUseCase });
  }, [generatedPrompt, selectedUseCase]);

  return (
    <div className="min-h-screen bg-gray-950 text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {/* Payment success banner */}
      {paymentBanner && (
        <div className="w-full px-4 py-3 text-sm font-semibold text-center" style={{ backgroundColor: paymentBanner === "done" ? "#166534" : "#14532d", color: "#86efac" }}>
          {paymentBanner === "done" ? "✓ Plan activated! Enjoy unlimited generations." : "Payment successful! Activating your plan…"}
        </div>
      )}

      {/* Top bar */}
      <div className="border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 bg-gray-950 z-10">
        <div className="flex items-center gap-3">
          {demoMode && (
            <button
              onClick={onExitDemo}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors mr-1"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              ← Back
            </button>
          )}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
          </div>
          <span className="text-gray-500 text-xs">prompt-generator.jsx</span>
          {demoMode && (
            <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "#6C63FF20", color: "#6C63FF" }}>
              Demo · 1 free generation
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isSupabaseConfigured && (
            authLoading ? (
              <div className="w-4 h-4 rounded-full border-2 border-gray-700 border-t-gray-400 animate-spin" />
            ) : user ? (
              <>
                <span className="text-gray-500 text-xs hidden sm:inline truncate max-w-[140px]">{user.email}</span>
                {isPaid ? (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "#6C63FF20", color: "#6C63FF" }}>
                    Pro
                  </span>
                ) : (
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="text-xs px-2 py-0.5 rounded-full font-bold transition-colors hover:opacity-80"
                    style={{ backgroundColor: "#1f2937", color: "#6b7280" }}
                    title={`${generationsUsed}/1 free generation used`}
                  >
                    Free · {generationsUsed}/1
                  </button>
                )}
                <button
                  onClick={() => { setContactForm({ name: "", email: user?.email ?? "", message: "" }); setContactStatus("idle"); setShowContactModal(true); }}
                  className="text-xs px-2.5 py-1 rounded-lg border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-150"
                >
                  Contact
                </button>
                <button
                  onClick={signOut}
                  className="text-xs px-2.5 py-1 rounded-lg border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-150"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-xs px-3 py-1.5 rounded-lg font-bold transition-all duration-150 active:scale-95"
                style={{ backgroundColor: "#6C63FF", color: "white" }}
              >
                Sign in
              </button>
            )
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT COLUMN — CONFIG */}
        <div className="space-y-7">
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">HumbleUI Prompt Generator</h1>
            <p className="text-gray-500 text-sm mt-1">Generate senior-level dev prompts for any use case</p>
          </div>

          {/* Step 1: Use Case */}
          <div>
            <StepLabel number="1" label="Use Case" active={true} />
            <div className="grid grid-cols-2 gap-2">
              {USE_CASES.map((uc) => (
                <button
                  key={uc.id}
                  onClick={() => setSelectedUseCase(uc.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-150 active:scale-95 ${
                    selectedUseCase === uc.id
                      ? "border-transparent text-white"
                      : "border-gray-800 bg-gray-900 hover:border-gray-700 text-gray-400"
                  }`}
                  style={selectedUseCase === uc.id ? { backgroundColor: "#6C63FF20", borderColor: "#6C63FF" } : {}}
                >
                  <div className="text-base mb-0.5">{uc.icon}</div>
                  <div className="text-xs font-bold text-white">{uc.label.split(" ").slice(1).join(" ")}</div>
                  <div className="text-xs text-gray-500 leading-tight mt-0.5">{uc.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: App Idea */}
          <div>
            <StepLabel number="2" label="Describe Your App" active={!!appIdea} />
            <textarea
              value={appIdea}
              onChange={(e) => setAppIdea(e.target.value)}
              placeholder={`e.g. ${
                selectedUseCase === "mobile" ? "a habit tracker with streaks and reminders" :
                selectedUseCase === "dashboard" ? "a SaaS analytics dashboard for a B2B startup" :
                selectedUseCase === "landing" ? "a project management tool for remote teams" :
                selectedUseCase === "saas" ? "a team collaboration and task management app" :
                selectedUseCase === "portfolio" ? "a UX designer with 5 years of experience" :
                "a premium sneaker store with limited drops"
              }`}
              rows={3}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 text-sm resize-none"
            />
            <button
              onClick={() => setShowExtraContext(!showExtraContext)}
              className="mt-2 text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              <span>{showExtraContext ? "▾" : "▸"}</span>
              {showExtraContext ? "Hide" : "Add"} extra context (optional)
            </button>
            {showExtraContext && (
              <textarea
                value={extraContext}
                onChange={(e) => setExtraContext(e.target.value)}
                placeholder="Target audience, specific features, brand tone, technical constraints..."
                rows={2}
                className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 text-sm resize-none"
              />
            )}
          </div>

          {/* Step 3: Complexity */}
          <div>
            <StepLabel number="3" label="Complexity" active={true} />
            <div className="flex gap-2">
              {COMPLEXITY_LEVELS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedComplexity(c.id)}
                  className={`flex-1 p-3 rounded-xl border text-center transition-all duration-150 active:scale-95 ${
                    selectedComplexity === c.id
                      ? "border-transparent text-white"
                      : "border-gray-800 bg-gray-900 hover:border-gray-700"
                  }`}
                  style={selectedComplexity === c.id ? { backgroundColor: "#6C63FF20", borderColor: "#6C63FF" } : {}}
                >
                  <div className="text-xs font-bold text-white">{c.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{c.screens} screens</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Color Palette */}
          <div>
            <StepLabel number="4" label="Color Palette" active={true} />
            <div className="grid grid-cols-2 gap-2">
              {COLOR_PALETTES.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedPalette(i)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-150 active:scale-95 text-left ${
                    selectedPalette === i
                      ? "border-white bg-gray-800"
                      : "border-gray-800 bg-gray-900 hover:border-gray-700"
                  }`}
                >
                  <div className="flex shrink-0">
                    {p.colors.map((c, ci) => (
                      <div
                        key={c}
                        className="w-3.5 h-3.5 rounded-full border-2 border-gray-900"
                        style={{ backgroundColor: c, marginLeft: ci > 0 ? "-3px" : 0 }}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{p.name}</div>
                    <div className="text-xs text-gray-500 leading-tight">{p.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePrompt}
            disabled={withinLimit && !canGenerate}
            className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ backgroundColor: (!withinLimit || canGenerate) ? "#6C63FF" : "#374151", color: "white" }}
          >
            {!withinLimit
              ? "🔒 Upgrade to Generate More"
              : promptGenerated ? "↻ Regenerate Prompt" : "→ Generate Prompt"}
          </button>
        </div>

        {/* RIGHT COLUMN — OUTPUT */}
        <div className="flex flex-col">
          {generatedPrompt ? (
            <div className="border border-gray-800 rounded-2xl overflow-hidden flex flex-col h-full">
              {/* Output header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800 shrink-0">
                <div className="flex items-center gap-3">
                  <PalettePreview colors={palette.colors} name={palette.name} />
                  <div className="w-px h-4 bg-gray-700" />
                  <span className="text-xs text-gray-500">
                    {USE_CASES.find(u => u.id === selectedUseCase)?.label} · {complexity.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">{charCount.toLocaleString()} chars</span>
                  <button
                    onClick={copyToClipboard}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 font-bold"
                    style={{ backgroundColor: copied ? "#3FB950" : "#6C63FF", color: "white" }}
                  >
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                  {isSupabaseConfigured && (
                    <button
                      onClick={handleSaveClick}
                      className="text-xs px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 font-bold border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
                    >
                      💾 Save
                    </button>
                  )}
                </div>
              </div>

              {/* Inline save name input */}
              {showSaveInput && (
                <div className="px-4 py-3 bg-gray-900 border-b border-gray-800 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      ref={saveInputRef}
                      type="text"
                      value={saveName}
                      onChange={(e) => setSaveName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSaveConfirm(); if (e.key === "Escape") setShowSaveInput(false); }}
                      placeholder="Name this prompt…"
                      maxLength={80}
                      className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-3 py-1.5 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 text-xs"
                    />
                    <button
                      onClick={handleSaveConfirm}
                      disabled={saving || !saveName.trim()}
                      className="text-xs px-3 py-1.5 rounded-lg font-bold transition-all duration-150 active:scale-95 disabled:opacity-40"
                      style={{ backgroundColor: "#3FB950", color: "white" }}
                    >
                      {saving ? "…" : "Save ✓"}
                    </button>
                    <button
                      onClick={() => setShowSaveInput(false)}
                      className="text-gray-500 hover:text-gray-300 transition-colors text-sm px-1"
                    >
                      ✕
                    </button>
                  </div>
                  {saveError && <p className="text-xs text-red-400">{saveError}</p>}
                </div>
              )}

              {/* Prompt content */}
              <pre className="p-5 text-xs text-gray-300 whitespace-pre-wrap leading-relaxed bg-gray-950 overflow-y-auto flex-1 max-h-[calc(100vh-50px)]">
                {generatedPrompt}
              </pre>

              {/* Footer hint */}
              <div className="px-4 py-2.5 bg-gray-900 border-t border-gray-800 shrink-0">
                <p className="text-xs text-gray-600">
                  Paste into <span className="text-gray-400">Claude Code</span>, Claude.ai, or any frontier model → get production-ready code
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-800 rounded-2xl flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="text-5xl mb-4">
                {USE_CASES.find(u => u.id === selectedUseCase)?.icon || "✨"}
              </div>
              <p className="text-gray-500 text-sm font-bold mb-1">
                {USE_CASES.find(u => u.id === selectedUseCase)?.label}
              </p>
              <p className="text-gray-600 text-xs">
                Fill in the details on the left and hit Generate
              </p>
              <div className="mt-6 flex flex-col gap-1.5 text-left">
                {["Use case → tailored style tokens", "Complexity → screen count", "Palette → exact hex colors", "Context → sharper output"].map((tip) => (
                  <div key={tip} className="flex items-center gap-2 text-xs text-gray-600">
                    <span style={{ color: "#6C63FF" }}>→</span> {tip}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Saved Prompts */}
      {isSupabaseConfigured && user && (
        <div className="max-w-5xl mx-auto px-4 pb-12 pt-2">
          <SavedPrompts
            prompts={prompts}
            loading={promptsLoading}
            onLoad={handleLoad}
            onDelete={deletePrompt}
          />
        </div>
      )}

      {/* Auth modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSignIn={signIn}
        />
      )}

      {/* Contact modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowContactModal(false); }}
        >
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-lg leading-none"
            >✕</button>

            {contactStatus === "sent" ? (
              <div className="text-center py-6">
                <div className="text-3xl mb-3">✉️</div>
                <h3 className="text-white font-bold text-lg mb-2">Message sent!</h3>
                <p className="text-gray-400 text-sm">We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="mt-6 px-5 py-2 rounded-lg text-sm font-bold text-white transition-all duration-150 active:scale-95"
                  style={{ backgroundColor: "#6C63FF" }}
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
                <button
                  onClick={() => {
                    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;
                    const subject = encodeURIComponent(`Humble-UI — message from ${contactForm.name}`);
                    const body = encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`);
                    window.location.href = `mailto:support@humble-ui.com?subject=${subject}&body=${body}`;
                    setContactStatus("sent");
                  }}
                  disabled={!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()}
                  className="mt-6 w-full py-2.5 rounded-lg font-bold text-sm text-white transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#6C63FF" }}
                >
                  Send message →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Upgrade modal */}
      {showUpgradeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowUpgradeModal(false); }}
        >
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-lg leading-none"
            >✕</button>

            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#6C63FF20" }}>
              <span style={{ color: "#6C63FF", fontSize: 18 }}>🔒</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">
              {demoMode ? "Enjoyed the demo?" : "You've used your free generation"}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {demoMode
                ? "Create a free account to get 1 more generation — then onto a paid plan for unlimited."
                : "Upgrade to keep generating unlimited prompts for any use case."}
            </p>
            {demoMode && (
              <button
                onClick={() => { setShowUpgradeModal(false); onDemoSignUp?.(); }}
                className="w-full py-2.5 rounded-xl font-bold text-sm text-white mb-4 transition-all duration-150 active:scale-95"
                style={{ backgroundColor: "#3FB950" }}
              >
                Create free account →
              </button>
            )}

            {!demoMode && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {/* Monthly */}
                  <div className="p-5 rounded-xl border border-gray-700 bg-gray-950 flex flex-col">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Monthly</p>
                    <div className="mb-1">
                      <span className="text-2xl font-bold text-white">$9.99</span>
                      <span className="text-gray-500 text-xs"> /mo</span>
                    </div>
                    <p className="text-gray-600 text-xs mb-5">Cancel anytime.</p>
                    <button
                      onClick={() => { capture("plan_upgraded", { plan: "monthly" }); const link = getStripeLink("monthly", user); if (link) window.location.href = link; }}
                      className="mt-auto w-full py-2.5 rounded-lg font-bold text-sm transition-all duration-150 active:scale-95 border"
                      style={{ borderColor: "#6C63FF60", color: "#6C63FF", background: "none" }}
                    >
                      Upgrade Monthly ↗
                    </button>
                  </div>

                  {/* Lifetime */}
                  <div className="p-5 rounded-xl flex flex-col relative overflow-hidden" style={{ border: "2px solid #6C63FF", background: "linear-gradient(135deg, #6C63FF12, #0F0F23)" }}>
                    <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#6C63FF", color: "white" }}>
                      Best value
                    </div>
                    <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#6C63FF" }}>Lifetime</p>
                    <div className="mb-1">
                      <span className="text-2xl font-bold text-white">$49.99</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-5">One-time. Forever.</p>
                    <button
                      onClick={() => { capture("plan_upgraded", { plan: "lifetime" }); const link = getStripeLink("lifetime", user); if (link) window.location.href = link; }}
                      className="mt-auto w-full py-2.5 rounded-lg font-bold text-sm text-white transition-all duration-150 active:scale-95"
                      style={{ backgroundColor: "#6C63FF" }}
                    >
                      Get Lifetime ↗
                    </button>
                  </div>
                </div>

                <p className="text-center text-xs text-gray-700 mt-5">
                  Secure checkout via Stripe. Cancel monthly anytime.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
