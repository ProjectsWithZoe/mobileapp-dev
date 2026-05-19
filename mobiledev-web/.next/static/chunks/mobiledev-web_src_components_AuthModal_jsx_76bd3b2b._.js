(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/mobiledev-web/src/components/AuthModal.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const ORANGE = "#EA580C";
const AMBER = "#FB923C";
const BROWN = "#1C0A02";
const BROWN2 = "#5C2E0A";
const BROWN3 = "#9A6040";
const BG = "#FFFBF7";
const SURF = "#FFFFFF";
const BORDER = "#E8CFBA";
const COPY = {
    signup: {
        eyebrow: 'Get started',
        heading: 'Create your account',
        sub: "Enter your email — we'll send a magic link to get you in.",
        button: 'Create Account →'
    },
    signin: {
        eyebrow: 'Sign in',
        heading: 'Welcome back',
        sub: "Enter your email — we'll send a one-click sign-in link.",
        button: 'Send Magic Link →'
    }
};
function AuthModal(param) {
    let { onClose, onSignIn, mode = 'signin', onOtpSent, hasPendingPlan = false } = param;
    _s();
    var _COPY_mode;
    const copy = (_COPY_mode = COPY[mode]) !== null && _COPY_mode !== void 0 ? _COPY_mode : COPY.signin;
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sent, setSent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthModal.useCallback[handleSubmit]": async (e)=>{
            e.preventDefault();
            if (!email.trim()) return;
            setLoading(true);
            setError('');
            try {
                await onSignIn(email.trim());
                setSent(true);
                onOtpSent === null || onOtpSent === void 0 ? void 0 : onOtpSent(email.trim());
            } catch (err) {
                var _err_message;
                setError((_err_message = err.message) !== null && _err_message !== void 0 ? _err_message : 'Something went wrong. Please try again.');
            } finally{
                setLoading(false);
            }
        }
    }["AuthModal.useCallback[handleSubmit]"], [
        email,
        onSignIn,
        onOtpSent
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: {
            backgroundColor: 'rgba(28,10,2,0.55)',
            backdropFilter: 'blur(6px)'
        },
        onClick: (e)=>{
            if (e.target === e.currentTarget) onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-sm rounded-2xl p-7",
            style: {
                backgroundColor: SURF,
                border: "1px solid ".concat(BORDER),
                boxShadow: '0 24px 60px rgba(92,46,10,0.18)',
                fontFamily: "'Inter', system-ui, sans-serif"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-4 right-4 transition-colors",
                    style: {
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: BROWN3,
                        fontSize: '18px',
                        lineHeight: 1
                    },
                    "aria-label": "Close",
                    children: "✕"
                }, void 0, false, {
                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                sent ? /* ── Success state ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center text-center py-4 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold",
                            style: {
                                backgroundColor: "".concat(ORANGE, "15"),
                                color: ORANGE
                            },
                            children: "✓"
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-sm",
                                    style: {
                                        color: BROWN
                                    },
                                    children: "Check your inbox"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this),
                                hasPendingPlan ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs mt-1 leading-relaxed",
                                    style: {
                                        color: BROWN3
                                    },
                                    children: [
                                        "The payment page is opening now.",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: BROWN2
                                            },
                                            children: [
                                                "Also check ",
                                                email
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                            lineNumber: 91,
                                            columnNumber: 19
                                        }, this),
                                        " — click the magic link to activate your account after paying."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                    lineNumber: 89,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs mt-1 leading-relaxed",
                                    style: {
                                        color: BROWN3
                                    },
                                    children: [
                                        "We sent a magic link to ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: BROWN2
                                            },
                                            children: email
                                        }, void 0, false, {
                                            fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                            lineNumber: 95,
                                            columnNumber: 43
                                        }, this),
                                        ". Click it to sign in — no password needed."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                    lineNumber: 94,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-xs transition-colors hover:underline",
                            style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: BROWN3
                            },
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this) : /* ── Sign-in form ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full animate-pulse",
                                            style: {
                                                backgroundColor: ORANGE
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs uppercase tracking-widest font-semibold",
                                            style: {
                                                color: ORANGE
                                            },
                                            children: copy.eyebrow
                                        }, void 0, false, {
                                            fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg leading-tight mb-1",
                                    style: {
                                        color: BROWN,
                                        fontFamily: "'Instrument Sans', sans-serif",
                                        fontWeight: 500
                                    },
                                    children: copy.heading
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs leading-relaxed",
                                    style: {
                                        color: BROWN3
                                    },
                                    children: copy.sub
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                            lineNumber: 111,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    placeholder: "you@example.com",
                                    required: true,
                                    autoFocus: true,
                                    className: "w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors",
                                    style: {
                                        backgroundColor: BG,
                                        border: "1px solid ".concat(BORDER),
                                        color: BROWN,
                                        colorScheme: 'light',
                                        fontFamily: "'Inter', system-ui, sans-serif"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs",
                                    style: {
                                        color: '#DC2626'
                                    },
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                    lineNumber: 142,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading || !email.trim(),
                                    className: "w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",
                                    style: {
                                        background: "linear-gradient(135deg, ".concat(ORANGE, ", ").concat(AMBER, ")")
                                    },
                                    children: loading ? 'Sending…' : copy.button
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/mobiledev-web/src/components/AuthModal.jsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(AuthModal, "mEPSAUGQQNh7m5537Y8a9OwQUcM=");
_c = AuthModal;
var _c;
__turbopack_context__.k.register(_c, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=mobiledev-web_src_components_AuthModal_jsx_76bd3b2b._.js.map