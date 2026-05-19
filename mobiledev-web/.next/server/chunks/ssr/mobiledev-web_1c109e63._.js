module.exports = [
"[project]/mobiledev-web/src/lib/supabase.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSupabaseConfigured",
    ()=>isSupabaseConfigured,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = url && key ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, key) : null;
const isSupabaseConfigured = Boolean(url && key);
}),
"[project]/mobiledev-web/src/hooks/useAuth.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/supabase.js [app-ssr] (ecmascript)");
;
;
function useAuth() {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"]));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"]) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then(({ data: { session } })=>{
            setUser(session?.user ?? null);
            setLoading(false);
        });
        const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange((_event, session)=>{
            setUser(session?.user ?? null);
            setLoading(false);
        });
        return ()=>subscription.unsubscribe();
    }, []);
    // NEXT_PUBLIC_APP_URL is set at build time; fall back to origin at runtime.
    const getAppUrl = ()=>process.env.NEXT_PUBLIC_APP_URL || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'https://humble-ui.com');
    // signIn: shouldCreateUser:false errors if the email has no account,
    // preventing accidental account creation via the sign-in form.
    const signIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email)=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"]) throw new Error('Auth is not configured.');
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: getAppUrl(),
                shouldCreateUser: false
            }
        });
        if (error) throw new Error('No account found for this email. Please sign up first using the Free Demo button.');
    }, []);
    // signUp: checks for existing account via RPC first, errors if found, otherwise creates.
    const signUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email)=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"]) throw new Error('Auth is not configured.');
        const { data: exists, error: checkError } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('email_exists', {
            check_email: email
        });
        if (checkError) throw checkError;
        if (exists) throw new Error('An account with this email already exists. Please sign in instead.');
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: getAppUrl(),
                shouldCreateUser: true
            }
        });
        if (error) throw error;
    }, []);
    const signOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
    }, []);
    return {
        user,
        loading,
        signIn,
        signUp,
        signOut
    };
}
}),
"[project]/mobiledev-web/src/lib/stripe.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStripeLink",
    ()=>getStripeLink
]);
function getStripeLink(plan, user) {
    const base = plan === 'monthly' ? process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LINK : process.env.NEXT_PUBLIC_STRIPE_LIFETIME_LINK;
    if (!base) return null;
    const url = new URL(base);
    if (user?.id) url.searchParams.set('client_reference_id', user.id);
    if (user?.email) url.searchParams.set('prefilled_email', user.email);
    return url.toString();
}
}),
"[project]/mobiledev-web/src/assets/example1.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/example1.bd623846.png");}),
"[project]/mobiledev-web/src/assets/example1.png.mjs { IMAGE => \"[project]/mobiledev-web/src/assets/example1.png (static in ecmascript)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/mobiledev-web/src/assets/example2.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/example2.19a1b9b8.png");}),
"[project]/mobiledev-web/src/assets/example2.png.mjs { IMAGE => \"[project]/mobiledev-web/src/assets/example2.png (static in ecmascript)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/mobiledev-web/src/assets/example3.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/example3.00664ed7.png");}),
"[project]/mobiledev-web/src/assets/example3.png.mjs { IMAGE => \"[project]/mobiledev-web/src/assets/example3.png (static in ecmascript)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/mobiledev-web/src/assets/example4.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/example4.4d7b0487.png");}),
"[project]/mobiledev-web/src/assets/example4.png.mjs { IMAGE => \"[project]/mobiledev-web/src/assets/example4.png (static in ecmascript)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/mobiledev-web/app/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/hooks/useAuth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$stripe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/stripe.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/@vercel/analytics/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example1$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example1$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/mobiledev-web/src/assets/example1.png.mjs { IMAGE => "[project]/mobiledev-web/src/assets/example1.png (static in ecmascript)" } [app-ssr] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example2$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example2$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/mobiledev-web/src/assets/example2.png.mjs { IMAGE => "[project]/mobiledev-web/src/assets/example2.png (static in ecmascript)" } [app-ssr] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example3$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example3$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/mobiledev-web/src/assets/example3.png.mjs { IMAGE => "[project]/mobiledev-web/src/assets/example3.png (static in ecmascript)" } [app-ssr] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example4$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example4$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/mobiledev-web/src/assets/example4.png.mjs { IMAGE => "[project]/mobiledev-web/src/assets/example4.png (static in ecmascript)" } [app-ssr] (structured image object with data url, ecmascript)');
'use client';
;
;
;
;
;
;
;
;
;
const LandingPage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/mobiledev-web/src/components/LandingPage.jsx [app-ssr] (ecmascript, async loader)"));
const PromptGenerator = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/mobiledev-web/src/components/ComplexGenerator.jsx [app-ssr] (ecmascript, async loader)"));
const AuthModal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/mobiledev-web/src/components/AuthModal.jsx [app-ssr] (ecmascript, async loader)"));
const CookieBanner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/mobiledev-web/src/components/CookieBanner.jsx [app-ssr] (ecmascript, async loader)"));
const EXAMPLES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example1$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example1$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example2$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example2$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example3$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example3$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example4$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$mobiledev$2d$web$2f$src$2f$assets$2f$example4$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"]
];
const BG = '#FFFBF7';
const BORDER = '#E8CFBA';
const BROWN3 = '#9A6040';
function AppSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen animate-pulse",
        style: {
            backgroundColor: BG,
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-3 flex items-center justify-between",
                style: {
                    borderBottom: `1px solid ${BORDER}`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-7 w-52 rounded-lg",
                                        style: {
                                            backgroundColor: BORDER
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/app/page.jsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: Array.from({
                                    length: 6
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-20 rounded-xl",
                                style: {
                                    backgroundColor: BORDER
                                }
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/app/page.jsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: Array.from({
                                    length: 3
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: Array.from({
                                    length: 4
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
function ExamplesGallery() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-4 py-12",
        style: {
            backgroundColor: BG,
            borderTop: `1px solid ${BORDER}`,
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
                    children: EXAMPLES.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02]",
                            style: {
                                border: `1px solid ${BORDER}`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: typeof src === 'object' ? src.src : src,
                                alt: `Example app output ${i + 1}`,
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
function Home() {
    const { user, loading, signIn, signUp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [showAuthModal, setShowAuthModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authMode, setAuthMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('signin');
    const [isDemoMode, setIsDemoMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(("TURBOPACK compile-time value", "development") === 'development');
    const openAuth = (mode)=>{
        setAuthMode(mode);
        setShowAuthModal(true);
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppSkeleton, {}, void 0, false, {
        fileName: "[project]/mobiledev-web/app/page.jsx",
        lineNumber: 109,
        columnNumber: 23
    }, this);
    if (!user) {
        if (isDemoMode) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppSkeleton, {}, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 114,
                    columnNumber: 29
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PromptGenerator, {
                        demoMode: true,
                        onDemoSignUp: ()=>openAuth('signup'),
                        onExitDemo: ()=>setIsDemoMode(false)
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/app/page.jsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: null,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthModal, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: null,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CookieBanner, {}, void 0, false, {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LandingPage, {
                    onSignIn: ()=>openAuth('signin'),
                    onGetStarted: ()=>openAuth('signup'),
                    onDemo: ()=>openAuth('signup'),
                    onSubscribe: (plan)=>{
                        const link = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$stripe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStripeLink"])(plan, user);
                        if (link) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["track"])('stripe_redirect', {
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
                showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthModal, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CookieBanner, {}, void 0, false, {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppSkeleton, {}, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 164,
                    columnNumber: 27
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PromptGenerator, {}, void 0, false, {
                    fileName: "[project]/mobiledev-web/app/page.jsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/app/page.jsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExamplesGallery, {}, void 0, false, {
                fileName: "[project]/mobiledev-web/app/page.jsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CookieBanner, {}, void 0, false, {
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
}),
];

//# sourceMappingURL=mobiledev-web_1c109e63._.js.map