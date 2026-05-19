module.exports = [
"[project]/mobiledev-web/src/lib/posthog.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capture",
    ()=>capture,
    "initPostHog",
    ()=>initPostHog,
    "isPostHogConfigured",
    ()=>isPostHogConfigured
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$posthog$2d$js$2f$dist$2f$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/posthog-js/dist/module.js [app-ssr] (ecmascript)");
;
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';
const isPostHogConfigured = Boolean(key);
let initialised = false;
function initPostHog() {
    if (!key || initialised) return;
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$posthog$2d$js$2f$dist$2f$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].init(key, {
        api_host: host,
        capture_pageview: true,
        capture_pageleave: true,
        persistence: 'localStorage'
    });
    initialised = true;
}
function capture(event, properties) {
    if (!initialised) return;
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$posthog$2d$js$2f$dist$2f$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].capture(event, properties);
}
;
}),
"[project]/mobiledev-web/src/components/CookieBanner.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CookieBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$posthog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/posthog.js [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
const CONSENT_KEY = 'humble_cookie_consent';
const ORANGE = '#EA580C';
const AMBER = '#FB923C';
const BROWN = '#1C0A02';
const BROWN3 = '#9A6040';
const BG = '#FFFBF7';
const SURF = '#FFFFFF';
const BORDER = '#E8CFBA';
function CookieBanner() {
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [leaving, setLeaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            const t = setTimeout(()=>setVisible(true), 600);
            return ()=>clearTimeout(t);
        }
        if (consent === 'accepted') (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$posthog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initPostHog"])();
    }, []);
    const dismiss = (choice)=>{
        localStorage.setItem(CONSENT_KEY, choice);
        if (choice === 'accepted') (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$posthog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initPostHog"])();
        setLeaving(true);
        setTimeout(()=>setVisible(false), 350);
    };
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-live": "polite",
        "aria-label": "Cookie consent",
        style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            padding: '0 16px 16px',
            fontFamily: "'Inter', system-ui, sans-serif",
            transform: leaving ? 'translateY(110%)' : 'translateY(0)',
            opacity: leaving ? 0 : 1,
            transition: 'transform 350ms cubic-bezier(.4,0,.2,1), opacity 350ms ease',
            animation: leaving ? 'none' : 'slideUp 400ms cubic-bezier(.4,0,.2,1)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes slideUp {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: '760px',
                    margin: '0 auto',
                    backgroundColor: SURF,
                    border: `1px solid ${BORDER}`,
                    borderRadius: '16px',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    boxShadow: '0 -4px 40px rgba(92,46,10,0.12)',
                    flexWrap: 'wrap'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            backgroundColor: `${ORANGE}15`,
                            border: `1px solid ${ORANGE}30`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            flexShrink: 0
                        },
                        children: "🍪"
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: '200px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: BROWN,
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    marginBottom: '3px'
                                },
                                children: "We use cookies"
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: BROWN3,
                                    fontSize: '11px',
                                    lineHeight: 1.6,
                                    margin: 0
                                },
                                children: [
                                    "We use essential cookies to keep you signed in, and optional analytics cookies (PostHog) to understand how the product is used.",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/cookie-policy.html",
                                        style: {
                                            color: ORANGE,
                                            textDecoration: 'none'
                                        },
                                        children: "Cookie Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '8px',
                            flexShrink: 0,
                            flexWrap: 'wrap'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>dismiss('rejected'),
                                style: {
                                    backgroundColor: 'transparent',
                                    border: `1px solid ${BORDER}`,
                                    color: BROWN3,
                                    fontFamily: "'Inter', system-ui, sans-serif",
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    padding: '9px 16px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    transition: 'border-color 150ms, color 150ms',
                                    whiteSpace: 'nowrap'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.borderColor = ORANGE;
                                    e.currentTarget.style.color = BROWN;
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.borderColor = BORDER;
                                    e.currentTarget.style.color = BROWN3;
                                },
                                children: "Reject non-essential"
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>dismiss('accepted'),
                                style: {
                                    background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})`,
                                    border: 'none',
                                    color: '#fff',
                                    fontFamily: "'Inter', system-ui, sans-serif",
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    padding: '9px 16px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    transition: 'opacity 150ms',
                                    whiteSpace: 'nowrap'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.opacity = '0.88';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.opacity = '1';
                                },
                                children: "Accept all"
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/mobiledev-web/src/components/CookieBanner.jsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=mobiledev-web_src_ab2c3037._.js.map