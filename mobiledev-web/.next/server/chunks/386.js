"use strict";exports.id=386,exports.ids=[386,902],exports.modules={4456:(a,b,c)=>{c.d(b,{Fg:()=>i,LJ:()=>h});var d=c(7196);let e=process.env.NEXT_PUBLIC_POSTHOG_KEY,f=process.env.NEXT_PUBLIC_POSTHOG_HOST??"https://us.i.posthog.com",g=!1;function h(){e&&!g&&(d.Ay.init(e,{api_host:f,capture_pageview:!0,capture_pageleave:!0,persistence:"localStorage"}),g=!0)}function i(a,b){g&&d.Ay.capture(a,b)}},7386:(a,b,c)=>{c.r(b),c.d(b,{default:()=>M});var d=c(1124),e=c(8301),f=c(8218),g=c(6692),h=c(4456),i=c(1199),j=c(8902);let k="#EA580C",l="#9A6040",m="#FFFFFF",n="#FFF5EC",o="#E8CFBA",p=[{name:"Midnight",colors:["#0F0F23","#6C63FF","#FF6584"]},{name:"Forest",colors:["#1A2F23","#4CAF7D","#F5C842"]},{name:"Ember",colors:["#1C1410","#E85D04","#FFBA08"]},{name:"Ocean",colors:["#03045E","#0096C7","#ADE8F4"]},{name:"Blush",colors:["#2D1B2E","#E040FB","#F8BBD9"]},{name:"Slate",colors:["#0D1117","#58A6FF","#3FB950"]},{name:"Sunset",colors:["#1A0A00","#FF6B35","#FFE66D"]},{name:"Arctic",colors:["#0A1628","#00D4FF","#B8FFF9"]}],q={mobile:"\uD83D\uDCF1",dashboard:"\uD83D\uDCCA",landing:"\uD83D\uDE80",saas:"⚙️",portfolio:"\uD83C\uDFA8",ecommerce:"\uD83D\uDECD️"};function r(){return(0,d.jsxs)("div",{className:"rounded-xl p-4 animate-pulse",style:{border:`1px solid ${o}`,backgroundColor:m},children:[(0,d.jsx)("div",{className:"h-3 rounded w-2/3 mb-3",style:{backgroundColor:o}}),(0,d.jsx)("div",{className:"h-2 rounded w-1/2 mb-2",style:{backgroundColor:o}}),(0,d.jsx)("div",{className:"h-2 rounded w-4/5 mb-4",style:{backgroundColor:o}}),(0,d.jsxs)("div",{className:"flex gap-2",children:[(0,d.jsx)("div",{className:"h-7 rounded-lg flex-1",style:{backgroundColor:o}}),(0,d.jsx)("div",{className:"h-7 rounded-lg w-10",style:{backgroundColor:o}})]})]})}function s({saved:a,onLoad:b,onDelete:c}){let[f,g]=(0,e.useState)(!1),h=p[a.palette_index]??p[0],i=(0,e.useCallback)(()=>{f?c(a.id):(g(!0),setTimeout(()=>g(!1),3e3))},[f,c,a.id]);return(0,d.jsxs)("div",{className:"rounded-xl p-4 flex flex-col gap-3 transition-all duration-150",style:{border:`1px solid ${o}`,backgroundColor:m,fontFamily:"'Inter', system-ui, sans-serif"},children:[(0,d.jsxs)("div",{className:"flex items-start justify-between gap-2",children:[(0,d.jsx)("p",{className:"text-xs font-semibold leading-snug line-clamp-2 flex-1",style:{color:"#1C0A02"},children:a.name}),(0,d.jsx)("span",{className:"text-xs shrink-0",style:{color:l},children:function(a){let b=Date.now()-new Date(a).getTime(),c=Math.floor(b/6e4),d=Math.floor(b/36e5),e=Math.floor(b/864e5);return c<1?"just now":c<60?`${c}m ago`:d<24?`${d}h ago`:`${e}d ago`}(a.created_at)})]}),(0,d.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,d.jsx)("div",{className:"flex",children:h.colors.map((a,b)=>(0,d.jsx)("div",{className:"w-3 h-3 rounded-full border-2",style:{backgroundColor:a,borderColor:m,marginLeft:b>0?"-3px":0}},a))}),(0,d.jsx)("span",{className:"text-xs",style:{color:l},children:h.name}),(0,d.jsx)("span",{style:{color:o},children:"\xb7"}),(0,d.jsxs)("span",{className:"text-xs",style:{color:l},children:[q[a.use_case]??""," ",a.use_case]}),(0,d.jsx)("span",{style:{color:o},children:"\xb7"}),(0,d.jsx)("span",{className:"text-xs px-1.5 py-0.5 rounded-md font-semibold",style:{backgroundColor:`${k}15`,color:k},children:a.complexity})]}),(0,d.jsx)("p",{className:"text-xs leading-relaxed line-clamp-2",style:{color:l},children:a.app_idea}),(0,d.jsxs)("div",{className:"flex items-center gap-2 mt-auto",children:[(0,d.jsx)("button",{onClick:()=>b(a),className:"flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95",style:{backgroundColor:`${k}15`,color:k,border:"none"},children:"Load ↩"}),(0,d.jsx)("button",{onClick:i,className:"px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95",style:{backgroundColor:f?"#ef444420":n,color:f?"#ef4444":l,border:"none"},title:f?"Click again to confirm":"Delete",children:f?"Sure?":"\uD83D\uDDD1"})]})]})}function t({prompts:a,loading:b,onLoad:c,onDelete:e}){return b?(0,d.jsxs)("div",{children:[(0,d.jsx)(u,{count:0,loading:!0}),(0,d.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4",children:[(0,d.jsx)(r,{}),(0,d.jsx)(r,{}),(0,d.jsx)(r,{})]})]}):(0,d.jsxs)("div",{children:[(0,d.jsx)(u,{count:a.length}),0===a.length?(0,d.jsxs)("div",{className:"rounded-2xl flex flex-col items-center justify-center py-12 text-center mt-4",style:{border:`1px dashed ${o}`,fontFamily:"'Inter', system-ui, sans-serif"},children:[(0,d.jsx)("span",{className:"text-4xl mb-3",children:"\uD83D\uDCBE"}),(0,d.jsx)("p",{className:"text-sm font-semibold",style:{color:l},children:"No saved prompts yet"}),(0,d.jsx)("p",{className:"text-xs mt-1",style:{color:l},children:"Generate a prompt above and click Save to store it here"})]}):(0,d.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4",children:a.map(a=>(0,d.jsx)(s,{saved:a,onLoad:c,onDelete:e},a.id))})]})}function u({count:a,loading:b}){return(0,d.jsxs)("div",{className:"flex items-center gap-3 pb-3",style:{borderBottom:`1px solid ${o}`,fontFamily:"'Inter', system-ui, sans-serif"},children:[(0,d.jsx)("span",{className:"text-xs uppercase tracking-widest font-semibold",style:{color:l},children:"Saved Prompts"}),!b&&(0,d.jsx)("span",{className:"text-xs px-1.5 py-0.5 rounded-md font-semibold",style:{backgroundColor:n,color:l},children:a})]})}let v="#EA580C",w="#FB923C",x="#1C0A02",y="#9A6040",z="#FFFBF7",A="#FFFFFF",B="#FFF5EC",C="#E8CFBA",D=[{id:"mobile",label:"\uD83D\uDCF1 Mobile App",icon:"\uD83D\uDCF1",desc:"React Native-style mobile UI"},{id:"dashboard",label:"\uD83D\uDCCA Dashboard",icon:"\uD83D\uDCCA",desc:"Data-rich admin interface"},{id:"landing",label:"\uD83D\uDE80 Landing Page",icon:"\uD83D\uDE80",desc:"Marketing & conversion focused"},{id:"saas",label:"⚙️ SaaS Product",icon:"⚙️",desc:"Full-featured web app"},{id:"portfolio",label:"\uD83C\uDFA8 Portfolio",icon:"\uD83C\uDFA8",desc:"Personal or agency showcase"},{id:"ecommerce",label:"\uD83D\uDECD️ E-Commerce",icon:"\uD83D\uDECD️",desc:"Product & checkout flows"}],E=a=>/^#[0-9A-Fa-f]{6}$/.test(a),F=[{label:"Background",hint:"Dark base — page & card bg"},{label:"Primary",hint:"CTAs, active states, key highlights"},{label:"Accent",hint:"Badges, secondary highlights"}],G=[{id:"simple",label:"Simple",desc:"1–2 screens, core feature only",screens:"1–2"},{id:"standard",label:"Standard",desc:"3–4 screens, common patterns",screens:"3–4"},{id:"advanced",label:"Advanced",desc:"5+ screens, full feature set",screens:"5+"}],H={mobile:["glassmorphism cards with frosted blur","bold typography with oversized headings","bottom navigation tab bar","pull-to-refresh gesture hints","skeleton loaders for async states","haptic-style micro animations (scale bounce on press)","safe-area padding for notch devices","dark mode first design","floating action button (FAB) for primary CTA","pill-shaped buttons and tags","swipeable card stacks","progress rings and animated stat counters"],dashboard:["data visualization with chart placeholders","collapsible sidebar navigation","KPI metric cards with trend indicators","sortable and filterable data tables","real-time activity feed","status badges with color coding","date range picker for filtering","sparkline mini charts inline","notification bell with badge count","breadcrumb navigation","export/download action buttons","responsive grid layout with resizable panels"],landing:["hero section with animated gradient background","social proof logos strip","feature comparison table","testimonial carousel","pricing cards with highlighted recommended tier","FAQ accordion section","sticky CTA header on scroll","animated counter stats (10k+ users, 99.9% uptime)","interactive product screenshot mockup","newsletter signup with inline validation","footer with multi-column links","trust badges and security seals"],saas:["onboarding stepper with progress indicator","settings panel with toggle switches","team member invite flow","usage quota progress bars","activity timeline/audit log","modal dialogs for confirmations","inline editing with optimistic UI updates","search with instant filter results","keyboard shortcut hints","contextual tooltips on hover","empty states with onboarding CTAs","notification toast system"],portfolio:["full-bleed project hero images","masonry or bento grid layout","hover reveal project details","case study timeline","skills/tech stack icon grid","animated cursor or scroll indicator","dark/light theme toggle","smooth page scroll transitions","contact form with field validation","social links with icon buttons","work experience accordion","before/after project sliders"],ecommerce:["product image gallery with thumbnails","size/variant selector with stock indicators","add to cart with quantity controls","sticky product details on scroll","reviews section with star ratings","related products horizontal scroll","mini cart drawer sliding in from right","promo/discount code input","order summary sticky sidebar","breadcrumb category navigation","wishlist toggle with heart icon","shipping calculator inline"]},I={mobile:({appIdea:a,palette:b,styles:c,complexity:d,techStack:e,extraContext:f})=>`
You are a senior React mobile developer with 10+ years of experience shipping production apps. Your code is architecturally clean, performant at 60fps, and visually indistinguishable from a professionally designed native app.

## Task
Build a **complete, fully functional ${a}** as a single self-contained React JSX file with ${d.screens} screens. Every screen must feel like it shipped from a real product team.

## Tech Stack
- **React** with hooks: useState, useEffect, useCallback, useMemo, useRef
- **Tailwind CSS** utility classes only
- **Lucide React** icons
- All data hardcoded/mocked — no fetch, no APIs
${f?`
## Additional Context
${f}
`:""}
## Color Palette — "${b.name}"
| Token | Hex | Usage |
|-------|-----|-------|
| Background | \`${b.colors[0]}\` | App background, card bases |
| Primary | \`${b.colors[1]}\` | CTAs, active states, key highlights |
| Accent | \`${b.colors[2]}\` | Badges, secondary highlights |

Apply as inline \`style\` overrides when Tailwind can't express exact hex.
Never use generic Tailwind color classes — every color from this palette only.

## Layout & Mobile Constraints
- Design target: **375px width** (iPhone 14 Pro)
- Outermost wrapper: \`<div className="max-w-sm mx-auto min-h-screen relative overflow-hidden">\`
- Fixed bottom navigation bar (position: fixed, bottom: 0)
- Add \`pb-20\` to main content to prevent bottom nav overlap
- All tap targets: minimum 44\xd744px
- No horizontal scroll

## Visual Language
${c.map((a,b)=>`${b+1}. ${a}`).join("\n")}

## Required UI Elements
- Hero/header with gradient: \`style={{ background: 'linear-gradient(135deg, ${b.colors[1]}, ${b.colors[2]})' }}\`
- ${d.screens} navigable screens via bottom nav
- Realistic mock data (real names, plausible numbers, actual dates)
- Micro-interactions: \`active:scale-95 transition-all duration-150\` on every tappable element
- At least one skeleton/loading state with useEffect + setTimeout
- At least one bottom sheet or modal pattern

## Component Architecture
1. Imports → 2. Constants & mock data → 3. Atomic sub-components → 4. Screen components → 5. Layout components → 6. Default export App

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin directly with \`import { useState, ... } from 'react'\`.
`.trim(),dashboard:({appIdea:a,palette:b,styles:c,complexity:d,extraContext:e})=>`
You are a senior frontend engineer specializing in data-dense admin interfaces. You ship dashboards that are both beautiful and functional, where every pixel earns its place.

## Task
Build a **complete ${a} dashboard** as a single self-contained React JSX file with ${d.screens} main views. Data should tell a story — not just fill a grid.

## Tech Stack
- React with hooks: useState, useEffect, useCallback, useMemo
- Tailwind CSS utility classes only
- Lucide React icons
- All data hardcoded/mocked with realistic variance and trends
- Recharts for any charts: \`import { AreaChart, BarChart, ... } from 'recharts'\`
${e?`
## Additional Context
${e}
`:""}
## Color Palette — "${b.name}"
- Background: \`${b.colors[0]}\` — page background, card bases
- Primary: \`${b.colors[1]}\` — active nav, primary actions, chart fills
- Accent: \`${b.colors[2]}\` — badges, positive indicators, sparklines

## Layout
- Full viewport: \`<div className="flex h-screen overflow-hidden">\`
- Left sidebar (w-64, collapsible to w-16) + main content area
- Top bar with search, notifications bell, user avatar
- Main content: scrollable, with \`p-6\` inner padding

## Visual Language
${c.map((a,b)=>`${b+1}. ${a}`).join("\n")}

## Required Elements
- Summary KPI cards row at top: 4 metrics with value, trend arrow, sparkline
- At least 1 area/bar chart (Recharts) with realistic data points
- A data table with sortable columns, status badges, avatar cells
- ${d.screens} views switchable via sidebar nav
- Realistic mock data: revenue figures, user counts, dates, percentages

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin with \`import { useState, ... } from 'react'\`.
`.trim(),landing:({appIdea:a,palette:b,styles:c,complexity:d,extraContext:e})=>`
You are a senior conversion-focused frontend developer. You build landing pages that look like they were designed by a top-tier agency and convert at industry-leading rates.

## Task
Build a **complete landing page for ${a}** as a single self-contained React JSX file. Every section must earn its place — no filler, no generic content.

## Tech Stack
- React with hooks
- Tailwind CSS utility classes only
- Lucide React icons
- All copy and data hardcoded with genuine, compelling product copy
${e?`
## Additional Context
${e}
`:""}
## Color Palette — "${b.name}"
- Background: \`${b.colors[0]}\`
- Primary: \`${b.colors[1]}\` — CTAs, highlights, hover states
- Accent: \`${b.colors[2]}\` — badges, underlines, decorative elements

Hero gradient: \`style={{ background: 'linear-gradient(135deg, ${b.colors[1]}22, ${b.colors[2]}22)' }}\`

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
${c.map((a,b)=>`${b+1}. ${a}`).join("\n")}

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin with \`import { useState, ... } from 'react'\`.
`.trim(),saas:({appIdea:a,palette:b,styles:c,complexity:d,extraContext:e})=>`
You are a principal engineer who has shipped multiple successful SaaS products. You build interfaces that feel like a polished B2B tool — professional, efficient, and delightfully usable.

## Task
Build a **complete ${a} SaaS application** as a single self-contained React JSX file with ${d.screens} sections/views. Think Notion, Linear, or Vercel — clean, purposeful, with a clear information hierarchy.

## Tech Stack
- React with hooks: useState, useEffect, useCallback, useMemo, useRef
- Tailwind CSS utility classes only
- Lucide React icons
- All data hardcoded/mocked
${e?`
## Additional Context
${e}
`:""}
## Color Palette — "${b.name}"
- Background: \`${b.colors[0]}\`
- Primary: \`${b.colors[1]}\` — active states, primary buttons, focus rings
- Accent: \`${b.colors[2]}\` — success states, highlights, badges

## Layout
- App shell: sidebar nav (left, w-56) + top bar + main content
- Top bar: breadcrumb, search, notification icon, user avatar dropdown
- Main area: \`flex-1 overflow-auto p-6\`

## Visual Language
${c.map((a,b)=>`${b+1}. ${a}`).join("\n")}

## Required Elements
- Onboarding or empty state for at least one section (icon + headline + CTA)
- At least one modal dialog (create/edit item)
- Settings panel with toggle switches and input fields
- Notification toast system (auto-dismiss after 3s)
- ${d.screens} distinct views via sidebar nav

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin with \`import { useState, ... } from 'react'\`.
`.trim(),portfolio:({appIdea:a,palette:b,styles:c,complexity:d,extraContext:e})=>`
You are a creative frontend developer known for portfolio sites that get people hired. You build personal sites that feel like art — memorable, fast, and deeply personal.

## Task
Build a **complete portfolio site for ${a}** as a single self-contained React JSX file. It must feel handcrafted — like a designer built it, not a template generator.

## Tech Stack
- React with hooks
- Tailwind CSS utility classes only
- Lucide React icons
- All content hardcoded with real-sounding names, titles, project descriptions
${e?`
## Additional Context
${e}
`:""}
## Color Palette — "${b.name}"
- Background: \`${b.colors[0]}\`
- Primary: \`${b.colors[1]}\` — accents, hover states, active indicators
- Accent: \`${b.colors[2]}\` — highlights, tags, decorative elements

## Sections
1. Hero: name, title, brief bio, CTA buttons (View Work / Contact), animated gradient blob background
2. About: photo placeholder (gradient circle), bio paragraph, skills grid
3. Work/Projects: bento grid or masonry layout, 4–6 projects with title, tags, description, mock image (gradient div)
4. Experience: timeline with company, role, dates, bullet points
5. Contact: email, social links, optional short contact form

## Visual Language
${c.map((a,b)=>`${b+1}. ${a}`).join("\n")}

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin with \`import { useState, ... } from 'react'\`.
`.trim(),ecommerce:({appIdea:a,palette:b,styles:c,complexity:d,extraContext:e})=>`
You are a senior e-commerce frontend engineer. You've built storefronts that convert. You know that every interaction — hover, add-to-cart, checkout — must feel effortless and trustworthy.

## Task
Build a **complete ${a} e-commerce UI** as a single self-contained React JSX file with ${d.screens} screens. Think Shopify + Apple Store aesthetics — premium, clean, conversion-optimized.

## Tech Stack
- React with hooks: useState, useEffect, useCallback, useMemo
- Tailwind CSS utility classes only
- Lucide React icons
- All product data hardcoded/mocked (realistic product names, prices, descriptions)
${e?`
## Additional Context
${e}
`:""}
## Color Palette — "${b.name}"
- Background: \`${b.colors[0]}\`
- Primary: \`${b.colors[1]}\` — CTAs, prices, active states
- Accent: \`${b.colors[2]}\` — sale badges, wishlist, rating stars

## Required Screens
1. Product listing/catalog with filter sidebar or top filter bar
2. Product detail page: gallery, variant picker, add to cart
3. Cart drawer or cart page with quantity controls + order summary
${"simple"!==d.id?"4. Simple checkout flow (shipping + payment form mockup)":""}
${"advanced"===d.id?"5. Order confirmation / thank you screen":""}

## Visual Language
${c.map((a,b)=>`${b+1}. ${a}`).join("\n")}

## Required Elements
- Product cards with hover state, wishlist toggle, quick-add button
- Cart item count badge on cart icon
- Toast notification on add to cart
- Realistic product data: 8+ products with names, prices, ratings, stock status

## Output Format
Return **only** the complete JSX. No markdown fences, no explanation.
Begin with \`import { useState, ... } from 'react'\`.
`.trim()},J=({number:a,label:b,active:c})=>(0,d.jsxs)("div",{className:"flex items-center gap-2 mb-3",children:[(0,d.jsx)("div",{className:"w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200",style:{backgroundColor:c?v:C,color:c?"white":y},children:a}),(0,d.jsx)("span",{className:"text-xs uppercase tracking-widest font-semibold",style:{color:c?x:y},children:b})]}),K=({colors:a,name:b})=>(0,d.jsxs)("div",{className:"flex items-center gap-2",children:[(0,d.jsx)("div",{className:"flex",children:a.map((b,c)=>(0,d.jsx)("div",{className:"w-4 h-4 rounded-full border-2",style:{backgroundColor:b,borderColor:A,marginLeft:c>0?"-4px":0,zIndex:a.length-c}},b))}),(0,d.jsx)("span",{className:"text-xs",style:{color:y},children:b})]}),L="humble-ui-demo-used";function M({demoMode:a=!1,onDemoSignUp:b,onExitDemo:c}){var k;let[l,m]=(0,e.useState)(""),[n,o]=(0,e.useState)("mobile"),[p,q]=(0,e.useState)({name:"Custom",colors:["#0D0D1A","#6C63FF","#FF6584"]}),[r,s]=(0,e.useState)("standard"),u=(0,e.useRef)([]),[M,N]=(0,e.useState)(""),[O,P]=(0,e.useState)(!1),[Q,R]=(0,e.useState)(""),[S,T]=(0,e.useState)(!1),[U,V]=(0,e.useState)(!1),{user:W,loading:X,signIn:Y,signOut:Z}=(0,f.A)(),{prompts:$,loading:_,savePrompt:aa,deletePrompt:ab}=function(a){let[b,c]=(0,e.useState)([]),[d,f]=(0,e.useState)(!1),h=(0,e.useCallback)(async()=>{if(!g.N||!a)return void c([]);f(!0);let{data:b,error:d}=await g.N.from("saved_prompts").select("*").eq("user_id",a).order("created_at",{ascending:!1});d||c(b??[]),f(!1)},[a]);return{prompts:b,loading:d,savePrompt:(0,e.useCallback)(async({name:b,app_idea:d,use_case:e,palette_index:f,complexity:h,extra_context:i,prompt_text:j})=>{if(!g.N||!a)return;let k={user_id:a,name:b,app_idea:d,use_case:e,palette_index:f,complexity:h,extra_context:i??"",prompt_text:j},l=`temp-${Date.now()}`;c(a=>[{...k,id:l,created_at:new Date().toISOString()},...a]);let{data:m,error:n}=await g.N.from("saved_prompts").insert(k).select().single();if(n)throw c(a=>a.filter(a=>a.id!==l)),n;c(a=>a.map(a=>a.id===l?m:a))},[a]),deletePrompt:(0,e.useCallback)(async a=>{c(b=>b.filter(b=>b.id!==a));let{error:b}=await g.N.from("saved_prompts").delete().eq("id",a);if(b)throw h(),b},[h]),refresh:h}}(W?.id),{insertPrompt:ac}=(k=W?.id,{insertPrompt:(0,e.useCallback)(async({app_idea:a,use_case:b,palette_name:c,complexity:d,extra_context:e,prompt_text:f})=>{if(!g.N||!k)return;let{error:h}=await g.N.from("generated_prompts").insert({user_id:k,app_idea:a,use_case:b,palette_name:c,complexity:d,extra_context:e??"",prompt_text:f});h&&console.error("[useGeneratedPrompts] insert failed:",h.message)},[k])}),{isPaid:ad,withinLimit:ae,generationsUsed:af,incrementGeneration:ag,loading:ah,profile:ai}=function(a){let[b,c]=(0,e.useState)(null),[d,f]=(0,e.useState)(!!(a&&g.N)),h=(0,e.useCallback)(async()=>{let b;if(!a||!g.N)return c(null),f(!1),null;let{data:d,error:e}=await g.N.from("user_profiles").select("*").eq("id",a).single();if(e?.code==="PGRST116"){let{data:c}=await g.N.from("user_profiles").insert({id:a}).select().single();b=c}else b=d;if(b?.plan==="free"){let{data:{user:c}}=await g.N.auth.getUser();if(c?.email){let{data:d}=await g.N.rpc("claim_pending_activation",{p_user_id:a,p_email:c.email});d&&(b={...b,plan:d})}}return c(b),f(!1),b},[a]),i=(0,e.useCallback)(()=>h(),[h]),j=(0,e.useCallback)(async()=>{if(!a||!g.N||!b)return;let d=(b.generation_count??0)+1;c(a=>({...a,generation_count:d})),await g.N.from("user_profiles").update({generation_count:d}).eq("id",a)},[a,b]),k=(0,e.useCallback)(async b=>{a&&g.N&&(c(a=>({...a,plan:b})),await g.N.from("user_profiles").update({plan:b}).eq("id",a))},[a]),l=b?.plan==="monthly"||b?.plan==="lifetime",m=b?.plan==="lifetime",n=b?.generation_count??0,o=d||!b||l||n<1,p=b?.mockup_count??0,q=d||!b||p<200;return{profile:b,loading:d,refresh:i,isPaid:l,isLifetime:m,withinLimit:o,generationsUsed:n,upgradePlan:k,incrementGeneration:j,mockupCount:p,withinMockupLimit:q}}(W?.id),[aj,ak]=(0,e.useState)(!1),[al,am]=(0,e.useState)(!1),[an,ao]=(0,e.useState)(!1),[ap,aq]=(0,e.useState)({name:"",email:"",message:""}),[ar,as]=(0,e.useState)("idle"),[at,au]=(0,e.useState)(!1),[av,aw]=(0,e.useState)(""),[ax,ay]=(0,e.useState)(!1),[az,aA]=(0,e.useState)(""),aB=(0,e.useRef)(null),aC=(0,e.useCallback)(()=>{if(!W)return void ak(!0);aw(l.slice(0,60)),aA(""),au(!0),setTimeout(()=>aB.current?.focus(),50)},[W,l]),aD=(0,e.useCallback)(async()=>{if(av.trim()){ay(!0),aA("");try{await aa({name:av.trim(),app_idea:l,use_case:n,palette_index:0,complexity:r,extra_context:M,prompt_text:Q}),au(!1),(0,h.Fg)("prompt_saved",{use_case:n,complexity:r})}catch{aA("Save failed. Please try again.")}finally{ay(!1)}}},[av,l,n,selectedPalette,r,M,Q,aa]),aE=(0,e.useCallback)(a=>{m(a.app_idea),o(a.use_case),s(a.complexity),N(a.extra_context??""),R(a.prompt_text),V(!0),window.scrollTo({top:0,behavior:"smooth"})},[]),aF=(0,e.useCallback)((a,b)=>{let c=b.startsWith("#")?b:`#${b}`;q(b=>{let d=[...b.colors];return d[a]=c,{...b,colors:d}})},[]),aG=G.find(a=>a.id===r),aH=H[n]||H.mobile,aI=l.trim().length>0,aJ=Q.length,aK=(0,e.useCallback)(async()=>{if(!aI)return;if(a){if("true"===localStorage.getItem(L))return void am(!0)}else if(W&&!ai)return;else if(!ae)return void am(!0);let b=[...aH].sort(()=>Math.random()-.5).slice(0,5),c=(0,I[n])({appIdea:l,palette:p,styles:b,complexity:aG,extraContext:M});R(c),V(!0),(0,h.Fg)("prompt_generated",{use_case:n,complexity:r,palette:p.name,demo:a}),a?(localStorage.setItem(L,"true"),setTimeout(()=>am(!0),900)):await Promise.all([ag(),ac({app_idea:l,use_case:n,palette_name:p.name,complexity:r,extra_context:M,prompt_text:c})])},[l,n,r,p,aG,aH,M,aI,ae,a,ag,ac]),aL=(0,e.useCallback)(()=>{navigator.clipboard.writeText(Q),T(!0),setTimeout(()=>T(!1),2e3),(0,h.Fg)("prompt_copied",{use_case:n})},[Q,n]),aM={backgroundColor:A,border:`1px solid ${C}`,color:x,colorScheme:"light",fontFamily:"'Inter', system-ui, sans-serif"};return(0,d.jsxs)("div",{className:"min-h-screen",style:{backgroundColor:z,color:x,fontFamily:"'Inter', system-ui, sans-serif"},children:[(0,d.jsxs)("div",{className:"px-6 py-3 flex items-center justify-between sticky top-0 z-10",style:{borderBottom:`1px solid ${C}`,backgroundColor:z,backdropFilter:"blur(14px)"},children:[(0,d.jsxs)("div",{className:"flex items-center gap-3",children:[a&&(0,d.jsx)("button",{onClick:c,className:"text-xs transition-colors mr-1",style:{background:"none",border:"none",padding:0,cursor:"pointer",color:y},children:"← Back"}),(0,d.jsxs)("div",{className:"flex gap-1.5",children:[(0,d.jsx)("div",{className:"w-3 h-3 rounded-full bg-red-400 opacity-80"}),(0,d.jsx)("div",{className:"w-3 h-3 rounded-full bg-yellow-400 opacity-80"}),(0,d.jsx)("div",{className:"w-3 h-3 rounded-full bg-green-400 opacity-80"})]}),(0,d.jsx)("span",{className:"text-xs",style:{color:y,fontFamily:"'IBM Plex Mono', monospace"},children:"prompt-generator.jsx"}),a&&(0,d.jsx)("span",{className:"text-xs px-2 py-0.5 rounded-full font-semibold",style:{backgroundColor:`${v}15`,color:v},children:"Demo \xb7 1 free generation"})]}),(0,d.jsx)("div",{className:"flex items-center gap-2",children:g.$&&(X?(0,d.jsx)("div",{className:"w-4 h-4 rounded-full border-2 animate-spin",style:{borderColor:C,borderTopColor:v}}):W?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("span",{className:"text-xs hidden sm:inline truncate max-w-[140px]",style:{color:y},children:W.email}),ad?(0,d.jsx)("span",{className:"text-xs px-2 py-0.5 rounded-full font-semibold",style:{backgroundColor:`${v}15`,color:v},children:"Pro"}):(0,d.jsxs)("button",{onClick:()=>am(!0),className:"text-xs px-2 py-0.5 rounded-full font-semibold transition-colors hover:opacity-80",style:{backgroundColor:B,color:y},title:`${af}/1 free generation used`,children:["Free \xb7 ",af,"/1"]}),(0,d.jsx)("button",{onClick:()=>{aq({name:"",email:W?.email??"",message:""}),as("idle"),ao(!0)},className:"text-xs px-2.5 py-1 rounded-lg transition-all duration-150",style:{border:`1px solid ${C}`,color:y,background:"none"},children:"Contact"}),(0,d.jsx)("button",{onClick:Z,className:"text-xs px-2.5 py-1 rounded-lg transition-all duration-150",style:{border:`1px solid ${C}`,color:y,background:"none"},children:"Sign out"})]}):(0,d.jsx)("button",{onClick:()=>ak(!0),className:"text-xs px-3 py-1.5 rounded-lg font-semibold transition-all duration-150 active:scale-95 text-white",style:{background:`linear-gradient(135deg, ${v}, ${w})`},children:"Sign in"}))})]}),(0,d.jsxs)("div",{className:"max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,d.jsxs)("div",{className:"space-y-7",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h1",{className:"text-2xl leading-tight",style:{fontFamily:"'Instrument Sans', sans-serif",fontWeight:500,color:x},children:"HumbleUI Prompt Generator"}),(0,d.jsx)("p",{className:"text-sm mt-1",style:{color:y},children:"Generate senior-level dev prompts for any use case"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(J,{number:"1",label:"Use Case",active:!0}),(0,d.jsx)("div",{className:"grid grid-cols-2 gap-2",children:D.map(a=>(0,d.jsxs)("button",{onClick:()=>o(a.id),className:"p-3 rounded-xl text-left transition-all duration-150 active:scale-95",style:{border:`1px solid ${n===a.id?v:C}`,backgroundColor:n===a.id?`${v}08`:A},children:[(0,d.jsx)("div",{className:"text-base mb-0.5",children:a.icon}),(0,d.jsx)("div",{className:"text-xs font-semibold",style:{color:x},children:a.label.split(" ").slice(1).join(" ")}),(0,d.jsx)("div",{className:"text-xs leading-tight mt-0.5",style:{color:y},children:a.desc})]},a.id))})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(J,{number:"2",label:"Describe Your App",active:!!l}),(0,d.jsx)("textarea",{value:l,onChange:a=>m(a.target.value),placeholder:`e.g. ${"mobile"===n?"a habit tracker with streaks and reminders":"dashboard"===n?"a SaaS analytics dashboard for a B2B startup":"landing"===n?"a project management tool for remote teams":"saas"===n?"a team collaboration and task management app":"portfolio"===n?"a UX designer with 5 years of experience":"a premium sneaker store with limited drops"}`,rows:3,className:"w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors",style:{...aM,borderColor:l?v:C}}),(0,d.jsxs)("button",{onClick:()=>P(!O),className:"mt-2 text-xs flex items-center gap-1 transition-colors",style:{background:"none",border:"none",padding:0,cursor:"pointer",color:y},children:[(0,d.jsx)("span",{children:O?"▾":"▸"}),O?"Hide":"Add"," extra context (optional)"]}),O&&(0,d.jsx)("textarea",{value:M,onChange:a=>N(a.target.value),placeholder:"Target audience, specific features, brand tone, technical constraints...",rows:2,className:"mt-2 w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors",style:aM})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(J,{number:"3",label:"Complexity",active:!0}),(0,d.jsx)("div",{className:"flex gap-2",children:G.map(a=>(0,d.jsxs)("button",{onClick:()=>s(a.id),className:"flex-1 p-3 rounded-xl text-center transition-all duration-150 active:scale-95",style:{border:`1px solid ${r===a.id?v:C}`,backgroundColor:r===a.id?`${v}08`:A},children:[(0,d.jsx)("div",{className:"text-xs font-semibold",style:{color:x},children:a.label}),(0,d.jsxs)("div",{className:"text-xs mt-0.5",style:{color:y},children:[a.screens," screens"]})]},a.id))})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(J,{number:"4",label:"Color Palette",active:!0}),(0,d.jsx)("div",{className:"space-y-3",children:F.map(({label:a,hint:b},c)=>{let e=p.colors[c],f=E(e);return(0,d.jsxs)("div",{className:"flex items-center gap-3",children:[(0,d.jsx)("button",{onClick:()=>u.current[c]?.click(),className:"shrink-0 w-10 h-10 rounded-lg border-2 transition-all duration-150 active:scale-95",style:{backgroundColor:f?e:C,borderColor:f?e:C,boxShadow:f?`0 0 0 2px ${e}30`:"none"}}),(0,d.jsx)("input",{ref:a=>u.current[c]=a,type:"color",value:f?e:"#000000",onChange:a=>aF(c,a.target.value),className:"sr-only"}),(0,d.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,d.jsx)("div",{className:"text-xs font-semibold mb-1",style:{color:x},children:a}),(0,d.jsx)("input",{type:"text",value:e,onChange:a=>aF(c,a.target.value),placeholder:"#000000",maxLength:7,spellCheck:!1,className:"w-full rounded-lg px-3 py-1.5 text-xs focus:outline-none transition-colors",style:{backgroundColor:A,border:`1px solid ${f?`${e}90`:C}`,color:x,fontFamily:"'IBM Plex Mono', monospace",colorScheme:"light"}}),(0,d.jsx)("div",{className:"text-xs mt-0.5",style:{color:y},children:b})]})]},a)})}),p.colors.every(E)&&(0,d.jsx)("div",{className:"mt-3 rounded-xl overflow-hidden flex h-6",style:{border:`1px solid ${C}`},children:p.colors.map((a,b)=>(0,d.jsx)("div",{className:"flex-1",style:{backgroundColor:a}},b))})]}),(0,d.jsx)("button",{onClick:aK,disabled:!aI||!!W&&ah,className:"w-full py-4 rounded-xl font-semibold text-sm text-white transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed",style:{background:`linear-gradient(135deg, ${v}, ${w})`},children:ae?U?"→ Generate New Prompt":"→ Generate Prompt":"\uD83D\uDD12 Upgrade to Generate More"})]}),(0,d.jsx)("div",{className:"flex flex-col",children:Q?(0,d.jsxs)("div",{className:"rounded-2xl overflow-hidden flex flex-col h-full",style:{border:`1px solid ${C}`},children:[(0,d.jsxs)("div",{className:"flex items-center justify-between px-4 py-3 shrink-0",style:{backgroundColor:B,borderBottom:`1px solid ${C}`},children:[(0,d.jsxs)("div",{className:"flex items-center gap-3",children:[(0,d.jsx)(K,{colors:p.colors,name:p.name}),(0,d.jsx)("div",{className:"w-px h-4",style:{backgroundColor:C}}),(0,d.jsxs)("span",{className:"text-xs",style:{color:y},children:[D.find(a=>a.id===n)?.label," \xb7 ",aG.label]})]}),(0,d.jsxs)("div",{className:"flex items-center gap-2",children:[(0,d.jsxs)("span",{className:"text-xs",style:{color:y},children:[aJ.toLocaleString()," chars"]}),(0,d.jsx)("button",{onClick:aL,className:"text-xs px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 font-semibold text-white",style:{backgroundColor:S?"#16a34a":v},children:S?"✓ Copied!":"Copy"}),g.$&&(0,d.jsx)("button",{onClick:aC,className:"text-xs px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 font-semibold",style:{border:`1px solid ${C}`,color:y,background:"none"},children:"\uD83D\uDCBE Save"})]})]}),at&&(0,d.jsxs)("div",{className:"px-4 py-3 flex flex-col gap-2",style:{backgroundColor:B,borderBottom:`1px solid ${C}`},children:[(0,d.jsxs)("div",{className:"flex items-center gap-2",children:[(0,d.jsx)("input",{ref:aB,type:"text",value:av,onChange:a=>aw(a.target.value),onKeyDown:a=>{"Enter"===a.key&&aD(),"Escape"===a.key&&au(!1)},placeholder:"Name this prompt…",maxLength:80,className:"flex-1 rounded-lg px-3 py-1.5 text-xs focus:outline-none transition-colors",style:{...aM,fontSize:"12px"}}),(0,d.jsx)("button",{onClick:aD,disabled:ax||!av.trim(),className:"text-xs px-3 py-1.5 rounded-lg font-semibold transition-all duration-150 active:scale-95 disabled:opacity-40 text-white",style:{backgroundColor:"#16a34a"},children:ax?"…":"Save ✓"}),(0,d.jsx)("button",{onClick:()=>au(!1),className:"text-sm px-1 transition-colors",style:{background:"none",border:"none",cursor:"pointer",color:y},children:"✕"})]}),az&&(0,d.jsx)("p",{className:"text-xs",style:{color:"#DC2626"},children:az})]}),(0,d.jsx)("pre",{className:"p-5 text-xs whitespace-pre-wrap leading-relaxed overflow-y-auto flex-1 max-h-[calc(100vh-50px)]",style:{backgroundColor:x,color:"#F5E6D3",fontFamily:"'IBM Plex Mono', monospace"},children:Q}),(0,d.jsx)("div",{className:"px-4 py-2.5 shrink-0",style:{backgroundColor:B,borderTop:`1px solid ${C}`},children:(0,d.jsxs)("p",{className:"text-xs",style:{color:y},children:["Paste into ",(0,d.jsx)("span",{style:{color:"#5C2E0A"},children:"Claude Code"}),", Claude.ai, or any frontier model → get production-ready code"]})})]}):(0,d.jsxs)("div",{className:"rounded-2xl flex-1 flex flex-col items-center justify-center p-12 text-center",style:{border:`1px dashed ${C}`},children:[(0,d.jsx)("div",{className:"text-5xl mb-4",children:D.find(a=>a.id===n)?.icon||"✨"}),(0,d.jsx)("p",{className:"text-sm font-semibold mb-1",style:{color:y},children:D.find(a=>a.id===n)?.label}),(0,d.jsx)("p",{className:"text-xs",style:{color:y},children:"Fill in the details on the left and hit Generate"}),(0,d.jsx)("div",{className:"mt-6 flex flex-col gap-1.5 text-left",children:["Use case → tailored style tokens","Complexity → screen count","Your hex codes → exact brand colors","Context → sharper output"].map(a=>(0,d.jsxs)("div",{className:"flex items-center gap-2 text-xs",style:{color:y},children:[(0,d.jsx)("span",{style:{color:v},children:"→"})," ",a]},a))})]})})]}),g.$&&W&&(0,d.jsx)("div",{className:"max-w-5xl mx-auto px-4 pb-12 pt-2",children:(0,d.jsx)(t,{prompts:$,loading:_,onLoad:aE,onDelete:ab})}),aj&&(0,d.jsx)(j.default,{onClose:()=>ak(!1),onSignIn:Y}),an&&(0,d.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center px-4",style:{backgroundColor:"rgba(28,10,2,0.55)",backdropFilter:"blur(6px)"},onClick:a=>{a.target===a.currentTarget&&ao(!1)},children:(0,d.jsxs)("div",{className:"rounded-2xl p-8 max-w-md w-full relative",style:{backgroundColor:A,border:`1px solid ${C}`,boxShadow:"0 24px 60px rgba(92,46,10,0.18)"},children:[(0,d.jsx)("button",{onClick:()=>ao(!1),className:"absolute top-4 right-4 transition-colors text-lg leading-none",style:{background:"none",border:"none",cursor:"pointer",color:y},children:"✕"}),"sent"===ar?(0,d.jsxs)("div",{className:"text-center py-6",children:[(0,d.jsx)("div",{className:"text-3xl mb-3",children:"✉️"}),(0,d.jsx)("h3",{className:"font-semibold text-lg mb-2",style:{color:x,fontFamily:"'Instrument Sans', sans-serif"},children:"Message sent!"}),(0,d.jsx)("p",{className:"text-sm",style:{color:y},children:"We'll get back to you as soon as possible."}),(0,d.jsx)("button",{onClick:()=>ao(!1),className:"mt-6 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 active:scale-95",style:{background:`linear-gradient(135deg, ${v}, ${w})`},children:"Close"})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("h3",{className:"font-semibold text-lg mb-1",style:{color:x,fontFamily:"'Instrument Sans', sans-serif"},children:"Contact us"}),(0,d.jsx)("p",{className:"text-sm mb-6",style:{color:y},children:"We read every message."}),(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{className:"block text-xs mb-1.5",style:{color:y},children:"Name"}),(0,d.jsx)("input",{type:"text",value:ap.name,onChange:a=>aq(b=>({...b,name:a.target.value})),placeholder:"Your name",className:"w-full rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors",style:aM})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{className:"block text-xs mb-1.5",style:{color:y},children:"Email"}),(0,d.jsx)("input",{type:"email",value:ap.email,onChange:a=>aq(b=>({...b,email:a.target.value})),placeholder:"you@example.com",className:"w-full rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors",style:aM})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{className:"block text-xs mb-1.5",style:{color:y},children:"Message"}),(0,d.jsx)("textarea",{value:ap.message,onChange:a=>aq(b=>({...b,message:a.target.value})),placeholder:"How can we help?",rows:4,className:"w-full rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors resize-none",style:aM})]})]}),(0,d.jsx)("button",{onClick:()=>{if(!ap.name.trim()||!ap.email.trim()||!ap.message.trim())return;let a=encodeURIComponent(`Humble-UI — message from ${ap.name}`),b=encodeURIComponent(`Name: ${ap.name}
Email: ${ap.email}

${ap.message}`);window.location.href=`mailto:support@humble-ui.com?subject=${a}&body=${b}`,as("sent")},disabled:!ap.name.trim()||!ap.email.trim()||!ap.message.trim(),className:"mt-6 w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",style:{background:`linear-gradient(135deg, ${v}, ${w})`},children:"Send message →"})]})]})}),al&&(0,d.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center px-4",style:{backgroundColor:"rgba(28,10,2,0.55)",backdropFilter:"blur(6px)"},onClick:a=>{a.target===a.currentTarget&&am(!1)},children:(0,d.jsxs)("div",{className:"rounded-2xl p-8 max-w-md w-full relative",style:{backgroundColor:A,border:`1px solid ${C}`,boxShadow:"0 24px 60px rgba(92,46,10,0.18)"},children:[(0,d.jsx)("button",{onClick:()=>am(!1),className:"absolute top-4 right-4 transition-colors text-lg leading-none",style:{background:"none",border:"none",cursor:"pointer",color:y},children:"✕"}),(0,d.jsx)("div",{className:"w-10 h-10 rounded-xl flex items-center justify-center mb-4",style:{backgroundColor:`${v}15`},children:(0,d.jsx)("span",{style:{color:v,fontSize:18},children:"\uD83D\uDD12"})}),(0,d.jsx)("h3",{className:"font-semibold text-lg mb-1",style:{color:x,fontFamily:"'Instrument Sans', sans-serif"},children:a?"Enjoyed the demo?":"You've used your free generation"}),(0,d.jsx)("p",{className:"text-sm mb-6",style:{color:y},children:a?"Create a free account to get 1 more generation — then onto a paid plan for unlimited.":"Upgrade to keep generating unlimited prompts for any use case."}),a&&(0,d.jsx)("button",{onClick:()=>{localStorage.setItem("humble-ui-show-pricing","true"),am(!1),b?.()},className:"w-full py-2.5 rounded-xl font-semibold text-sm text-white mb-4 transition-all duration-150 active:scale-95",style:{background:`linear-gradient(135deg, ${v}, ${w})`},children:"Create free account →"}),!a&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,d.jsxs)("div",{className:"p-5 rounded-xl flex flex-col",style:{border:`1px solid ${C}`,backgroundColor:B},children:[(0,d.jsx)("p",{className:"text-xs uppercase tracking-widest mb-3",style:{color:y},children:"Monthly"}),(0,d.jsxs)("div",{className:"mb-1",children:[(0,d.jsx)("span",{className:"text-2xl font-semibold",style:{color:x,fontFamily:"'Instrument Sans', sans-serif"},children:"$9.99"}),(0,d.jsx)("span",{className:"text-xs",style:{color:y},children:" /mo"})]}),(0,d.jsx)("p",{className:"text-xs mb-5",style:{color:y},children:"Cancel anytime."}),(0,d.jsx)("button",{onClick:()=>{(0,h.Fg)("plan_upgraded",{plan:"monthly"});let a=(0,i.a)("monthly",W);a&&(window.location.href=a)},className:"mt-auto w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 active:scale-95",style:{border:`1px solid ${v}60`,color:v,background:"none"},children:"Upgrade Monthly ↗"})]}),(0,d.jsxs)("div",{className:"p-5 rounded-xl flex flex-col relative overflow-hidden",style:{border:`2px solid ${v}`,background:`linear-gradient(135deg, ${v}10, ${z})`},children:[(0,d.jsx)("div",{className:"absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full text-white",style:{backgroundColor:v},children:"Best value"}),(0,d.jsx)("p",{className:"text-xs uppercase tracking-widest mb-3",style:{color:v},children:"Lifetime"}),(0,d.jsx)("div",{className:"mb-1",children:(0,d.jsx)("span",{className:"text-2xl font-semibold",style:{color:x,fontFamily:"'Instrument Sans', sans-serif"},children:"$49.99"})}),(0,d.jsx)("p",{className:"text-xs mb-5",style:{color:y},children:"One-time. Forever."}),(0,d.jsx)("button",{onClick:()=>{(0,h.Fg)("plan_upgraded",{plan:"lifetime"});let a=(0,i.a)("lifetime",W);a&&(window.location.href=a)},className:"mt-auto w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-150 active:scale-95",style:{background:`linear-gradient(135deg, ${v}, ${w})`},children:"Get Lifetime ↗"})]})]}),(0,d.jsx)("p",{className:"text-center text-xs mt-5",style:{color:y},children:"Secure checkout via Stripe. Cancel monthly anytime."})]})]})})]})}},8902:(a,b,c)=>{c.r(b),c.d(b,{default:()=>l});var d=c(1124),e=c(8301);let f="#EA580C",g="#1C0A02",h="#5C2E0A",i="#9A6040",j="#E8CFBA",k={signup:{eyebrow:"Get started",heading:"Create your account",sub:"Enter your email — we'll send a magic link to get you in.",button:"Create Account →"},signin:{eyebrow:"Sign in",heading:"Welcome back",sub:"Enter your email — we'll send a one-click sign-in link.",button:"Send Magic Link →"}};function l({onClose:a,onSignIn:b,mode:c="signin",onOtpSent:l,hasPendingPlan:m=!1}){let n=k[c]??k.signin,[o,p]=(0,e.useState)(""),[q,r]=(0,e.useState)(!1),[s,t]=(0,e.useState)(!1),[u,v]=(0,e.useState)(""),w=(0,e.useCallback)(async a=>{if(a.preventDefault(),o.trim()){t(!0),v("");try{await b(o.trim()),r(!0),l?.(o.trim())}catch(a){v(a.message??"Something went wrong. Please try again.")}finally{t(!1)}}},[o,b,l]);return(0,d.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",style:{backgroundColor:"rgba(28,10,2,0.55)",backdropFilter:"blur(6px)"},onClick:b=>{b.target===b.currentTarget&&a()},children:(0,d.jsxs)("div",{className:"relative w-full max-w-sm rounded-2xl p-7",style:{backgroundColor:"#FFFFFF",border:`1px solid ${j}`,boxShadow:"0 24px 60px rgba(92,46,10,0.18)",fontFamily:"'Inter', system-ui, sans-serif"},children:[(0,d.jsx)("button",{onClick:a,className:"absolute top-4 right-4 transition-colors",style:{background:"none",border:"none",cursor:"pointer",color:i,fontSize:"18px",lineHeight:1},"aria-label":"Close",children:"✕"}),q?(0,d.jsxs)("div",{className:"flex flex-col items-center text-center py-4 gap-4",children:[(0,d.jsx)("div",{className:"w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold",style:{backgroundColor:`${f}15`,color:f},children:"✓"}),(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{className:"font-semibold text-sm",style:{color:g},children:"Check your inbox"}),m?(0,d.jsxs)("p",{className:"text-xs mt-1 leading-relaxed",style:{color:i},children:["The payment page is opening now."," ",(0,d.jsxs)("span",{style:{color:h},children:["Also check ",o]})," — click the magic link to activate your account after paying."]}):(0,d.jsxs)("p",{className:"text-xs mt-1 leading-relaxed",style:{color:i},children:["We sent a magic link to ",(0,d.jsx)("span",{style:{color:h},children:o}),". Click it to sign in — no password needed."]})]}),(0,d.jsx)("button",{onClick:a,className:"text-xs transition-colors hover:underline",style:{background:"none",border:"none",cursor:"pointer",color:i},children:"Close"})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"mb-6",children:[(0,d.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,d.jsx)("div",{className:"w-2 h-2 rounded-full animate-pulse",style:{backgroundColor:f}}),(0,d.jsx)("span",{className:"text-xs uppercase tracking-widest font-semibold",style:{color:f},children:n.eyebrow})]}),(0,d.jsx)("h2",{className:"text-lg leading-tight mb-1",style:{color:g,fontFamily:"'Instrument Sans', sans-serif",fontWeight:500},children:n.heading}),(0,d.jsx)("p",{className:"text-xs leading-relaxed",style:{color:i},children:n.sub})]}),(0,d.jsxs)("form",{onSubmit:w,className:"flex flex-col gap-3",children:[(0,d.jsx)("input",{type:"email",value:o,onChange:a=>p(a.target.value),placeholder:"you@example.com",required:!0,autoFocus:!0,className:"w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors",style:{backgroundColor:"#FFFBF7",border:`1px solid ${j}`,color:g,colorScheme:"light",fontFamily:"'Inter', system-ui, sans-serif"}}),u&&(0,d.jsx)("p",{className:"text-xs",style:{color:"#DC2626"},children:u}),(0,d.jsx)("button",{type:"submit",disabled:s||!o.trim(),className:"w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",style:{background:`linear-gradient(135deg, ${f}, #FB923C)`},children:s?"Sending…":n.button})]})]})]})})}}};