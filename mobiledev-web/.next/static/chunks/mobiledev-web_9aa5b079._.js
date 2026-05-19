(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/mobiledev-web/src/lib/supabase.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSupabaseConfigured",
    ()=>isSupabaseConfigured,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const url = __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_URL;
const key = __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = url && key ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, key) : null;
const isSupabaseConfigured = Boolean(url && key);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/src/hooks/useAuth.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/supabase.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useAuth() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then({
                "useAuth.useEffect": (param)=>{
                    let { data: { session } } = param;
                    var _session_user;
                    setUser((_session_user = session === null || session === void 0 ? void 0 : session.user) !== null && _session_user !== void 0 ? _session_user : null);
                    setLoading(false);
                }
            }["useAuth.useEffect"]);
            const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "useAuth.useEffect": (_event, session)=>{
                    var _session_user;
                    setUser((_session_user = session === null || session === void 0 ? void 0 : session.user) !== null && _session_user !== void 0 ? _session_user : null);
                    setLoading(false);
                }
            }["useAuth.useEffect"]);
            return ({
                "useAuth.useEffect": ()=>subscription.unsubscribe()
            })["useAuth.useEffect"];
        }
    }["useAuth.useEffect"], []);
    // NEXT_PUBLIC_APP_URL is set at build time; fall back to origin at runtime.
    const getAppUrl = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_APP_URL || (("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable");
    // signIn: shouldCreateUser:false errors if the email has no account,
    // preventing accidental account creation via the sign-in form.
    const signIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[signIn]": async (email)=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]) throw new Error('Auth is not configured.');
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: getAppUrl(),
                    shouldCreateUser: false
                }
            });
            if (error) throw new Error('No account found for this email. Please sign up first using the Free Demo button.');
        }
    }["useAuth.useCallback[signIn]"], []);
    // signUp: checks for existing account via RPC first, errors if found, otherwise creates.
    const signUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[signUp]": async (email)=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]) throw new Error('Auth is not configured.');
            const { data: exists, error: checkError } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('email_exists', {
                check_email: email
            });
            if (checkError) throw checkError;
            if (exists) throw new Error('An account with this email already exists. Please sign in instead.');
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: getAppUrl(),
                    shouldCreateUser: true
                }
            });
            if (error) throw error;
        }
    }["useAuth.useCallback[signUp]"], []);
    const signOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[signOut]": async ()=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]) return;
            await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        }
    }["useAuth.useCallback[signOut]"], []);
    return {
        user,
        loading,
        signIn,
        signUp,
        signOut
    };
}
_s(useAuth, "beNUd/1CMRHgTxj+OJMkIwLS62I=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/src/lib/stripe.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStripeLink",
    ()=>getStripeLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function getStripeLink(plan, user) {
    const base = plan === 'monthly' ? __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_STRIPE_MONTHLY_LINK : __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_STRIPE_LIFETIME_LINK;
    if (!base) return null;
    const url = new URL(base);
    if (user === null || user === void 0 ? void 0 : user.id) url.searchParams.set('client_reference_id', user.id);
    if (user === null || user === void 0 ? void 0 : user.email) url.searchParams.set('prefilled_email', user.email);
    return url.toString();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/src/assets/example1.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/example1.bd623846.png");}),
"[project]/mobiledev-web/src/assets/example1.png.mjs { IMAGE => \"[project]/mobiledev-web/src/assets/example1.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example1$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/assets/example1.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example1$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 522,
    height: 1525,
    blurWidth: 3,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAZklEQVR42iXITQpAUBiF4W8JVzEhP5GfRO69ZAcGzISJKBP7sRqWd3wxeDqdl7Q6kCUb8mwGLeONaXiwdheoKk7U+Y427UFh2MBxStiMgkDDdSVT//E8CZ8DmWYKy2K8ZIgYQkSfFys4JYXJ1BE9AAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/src/assets/example2.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/example2.19a1b9b8.png");}),
"[project]/mobiledev-web/src/assets/example2.png.mjs { IMAGE => \"[project]/mobiledev-web/src/assets/example2.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example2$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/assets/example2.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example2$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 545,
    height: 1549,
    blurWidth: 3,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAT0lEQVR42k2KQQqAMBAD+wiFRror68GT2O5FD/7/XbELCj0kMMkks5vIzpwrk+rFzR4CHtCoq7NI/SAi7QenxBMVw6D1p3QNOIjl5DztfAHIQiHK+pdaBAAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/src/assets/example3.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/example3.00664ed7.png");}),
"[project]/mobiledev-web/src/assets/example3.png.mjs { IMAGE => \"[project]/mobiledev-web/src/assets/example3.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example3$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/assets/example3.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example3$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 544,
    height: 1552,
    blurWidth: 3,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAXklEQVR42lWJOwqEMBQA3w0SxE2W3USMqIUKfkAQbPy03v8646ezGIZhxPmO2DaYX4vY/4DLF775hvikZ5oPkjBex9aEdMWYCtG6wLud26JUQKns4R1aZ8SfiigqOQGwfCCdLLhPxgAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/src/assets/example4.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/example4.4d7b0487.png");}),
"[project]/mobiledev-web/src/assets/example4.png.mjs { IMAGE => \"[project]/mobiledev-web/src/assets/example4.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example4$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/assets/example4.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example4$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 550,
    height: 1546,
    blurWidth: 3,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAW0lEQVR42h3MuQ2AQAwAQfeAMLa5SwgQ6HjEE9EC/dezPOlqNdLGieuB6oK0fjENN24HEr6S0074jLgXcl5J6dui0HUnZgWxZvyr6ojU9fDXqupfwOZXmvDYeACw5iE3V43ITwAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/app/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/hooks/useAuth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$stripe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/stripe.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/@vercel/analytics/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example1$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example1$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/mobiledev-web/src/assets/example1.png.mjs { IMAGE => "[project]/mobiledev-web/src/assets/example1.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example2$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example2$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/mobiledev-web/src/assets/example2.png.mjs { IMAGE => "[project]/mobiledev-web/src/assets/example2.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example3$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example3$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/mobiledev-web/src/assets/example3.png.mjs { IMAGE => "[project]/mobiledev-web/src/assets/example3.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example4$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example4$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/mobiledev-web/src/assets/example4.png.mjs { IMAGE => "[project]/mobiledev-web/src/assets/example4.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const LandingPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/mobiledev-web/src/components/LandingPage.jsx [app-client] (ecmascript, async loader)"));
_c = LandingPage;
const PromptGenerator = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/mobiledev-web/src/components/ComplexGenerator.jsx [app-client] (ecmascript, async loader)"));
_c1 = PromptGenerator;
const AuthModal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/mobiledev-web/src/components/AuthModal.jsx [app-client] (ecmascript, async loader)"));
_c2 = AuthModal;
const CookieBanner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/mobiledev-web/src/components/CookieBanner.jsx [app-client] (ecmascript, async loader)"));
_c3 = CookieBanner;
const EXAMPLES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example1$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example1$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example2$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example2$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example3$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example3$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example4$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example4$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"]
];
const BG = '#FFFBF7';
const BORDER = '#E8CFBA';
const BROWN3 = '#9A6040';
function AppSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen animate-pulse",
        style: {
            backgroundColor: BG,
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-3 flex items-center justify-between",
                style: {
                    borderBottom: "1px solid ".concat(BORDER)
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/mobiledev-web/app/page.jsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-3 w-36 rounded",
                                style: {
                                    backgroundColor: BORDER
                                }
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/app/page.jsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/mobiledev-web/app/page.jsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-3 w-12 rounded",
                        style: {
                            backgroundColor: BORDER
                        }
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/app/page.jsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/app/page.jsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-7 w-52 rounded-lg",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-4 w-72 rounded",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 42,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/mobiledev-web/app/page.jsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: Array.from({
                                    length: 6
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-16 rounded-xl",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, i, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/app/page.jsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-20 rounded-xl",
                                style: {
                                    backgroundColor: BORDER
                                }
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/app/page.jsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: Array.from({
                                    length: 3
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 h-14 rounded-xl",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, i, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/app/page.jsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: Array.from({
                                    length: 4
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-12 rounded-xl",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, i, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/app/page.jsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-12 rounded-xl",
                                style: {
                                    backgroundColor: BORDER
                                }
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/app/page.jsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/mobiledev-web/app/page.jsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[500px] rounded-2xl",
                        style: {
                            backgroundColor: BORDER
                        }
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/app/page.jsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/app/page.jsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/mobiledev-web/app/page.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c4 = AppSkeleton;
function ExamplesGallery() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-4 py-12",
        style: {
            backgroundColor: BG,
            borderTop: "1px solid ".concat(BORDER),
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs uppercase tracking-widest font-semibold mb-1 text-center",
                    style: {
                        color: BROWN3
                    },
                    children: "Example outputs"
                }, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-center mb-6",
                    style: {
                        color: BROWN3
                    },
                    children: "Built with prompts generated above"
                }, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
                    children: EXAMPLES.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02]",
                            style: {
                                border: "1px solid ".concat(BORDER)
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: typeof src === 'object' ? src.src : src,
                                alt: "Example app output ".concat(i + 1),
                                className: "w-full h-auto block",
                                loading: "lazy",
                                decoding: "async"
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/app/page.jsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this)
                        }, i, false, {
                            fileName: "[project]/mobiledev-web/app/page.jsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/mobiledev-web/app/page.jsx",
            lineNumber: 71,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/mobiledev-web/app/page.jsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_c5 = ExamplesGallery;
function Home() {
    _s();
    const { user, loading, signIn, signUp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [showAuthModal, setShowAuthModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authMode, setAuthMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('signin');
    const [isDemoMode, setIsDemoMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(("TURBOPACK compile-time value", "development") === 'development');
    const openAuth = (mode)=>{
        setAuthMode(mode);
        setShowAuthModal(true);
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppSkeleton, {}, void 0, false, {
        fileName: "[project]/mobiledev-web/app/page.jsx",
        lineNumber: 109,
        columnNumber: 23
    }, this);
    if (!user) {
        if (isDemoMode) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppSkeleton, {}, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 114,
                    columnNumber: 29
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PromptGenerator, {
                        demoMode: true,
                        onDemoSignUp: ()=>openAuth('signup'),
                        onExitDemo: ()=>setIsDemoMode(false)
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/app/page.jsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: null,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthModal, {
                            onClose: ()=>setShowAuthModal(false),
                            onSignIn: authMode === 'signup' ? signUp : signIn,
                            mode: authMode
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/app/page.jsx",
                            lineNumber: 122,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/app/page.jsx",
                        lineNumber: 121,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: null,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CookieBanner, {}, void 0, false, {
                            fileName: "[project]/mobiledev-web/app/page.jsx",
                            lineNumber: 129,
                            columnNumber: 37
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/app/page.jsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/app/page.jsx",
                lineNumber: 114,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen",
                style: {
                    backgroundColor: BG
                }
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/app/page.jsx",
                lineNumber: 135,
                columnNumber: 27
            }, void 0),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LandingPage, {
                    onSignIn: ()=>openAuth('signin'),
                    onGetStarted: ()=>openAuth('signup'),
                    onDemo: ()=>openAuth('signup'),
                    onSubscribe: (plan)=>{
                        const link = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$stripe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStripeLink"])(plan, user);
                        if (link) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])('stripe_redirect', {
                                plan
                            });
                            window.location.href = link;
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this),
                showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthModal, {
                        onClose: ()=>setShowAuthModal(false),
                        onSignIn: authMode === 'signup' ? signUp : signIn,
                        mode: authMode
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/app/page.jsx",
                        lineNumber: 150,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 149,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CookieBanner, {}, void 0, false, {
                        fileName: "[project]/mobiledev-web/app/page.jsx",
                        lineNumber: 157,
                        columnNumber: 35
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/mobiledev-web/app/page.jsx",
            lineNumber: 135,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppSkeleton, {}, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 164,
                    columnNumber: 27
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PromptGenerator, {}, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/app/page.jsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExamplesGallery, {}, void 0, false, {
                fileName: "[project]/mobiledev-web/app/page.jsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CookieBanner, {}, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 168,
                    columnNumber: 33
                }, this)
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/app/page.jsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/mobiledev-web/app/page.jsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
_s(Home, "1uIMjmFSpUW1pAYwJKzAYK1LwI4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c6 = Home;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "LandingPage");
__turbopack_context__.k.register(_c1, "PromptGenerator");
__turbopack_context__.k.register(_c2, "AuthModal");
__turbopack_context__.k.register(_c3, "CookieBanner");
__turbopack_context__.k.register(_c4, "AppSkeleton");
__turbopack_context__.k.register(_c5, "ExamplesGallery");
__turbopack_context__.k.register(_c6, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=mobiledev-web_9aa5b079._.js.map