(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/mobiledev-web/src/hooks/useSavedPrompts.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSavedPrompts",
    ()=>useSavedPrompts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/supabase.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useSavedPrompts(userId) {
    _s();
    const [prompts, setPrompts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchPrompts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSavedPrompts.useCallback[fetchPrompts]": async ()=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"] || !userId) {
                setPrompts([]);
                return;
            }
            setLoading(true);
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('saved_prompts').select('*').eq('user_id', userId).order('created_at', {
                ascending: false
            });
            if (!error) setPrompts(data !== null && data !== void 0 ? data : []);
            setLoading(false);
        }
    }["useSavedPrompts.useCallback[fetchPrompts]"], [
        userId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSavedPrompts.useEffect": ()=>{
            fetchPrompts();
        }
    }["useSavedPrompts.useEffect"], [
        fetchPrompts
    ]);
    const savePrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSavedPrompts.useCallback[savePrompt]": async (param)=>{
            let { name, app_idea, use_case, palette_index, complexity, extra_context, prompt_text } = param;
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"] || !userId) return;
            const row = {
                user_id: userId,
                name,
                app_idea,
                use_case,
                palette_index,
                complexity,
                extra_context: extra_context !== null && extra_context !== void 0 ? extra_context : '',
                prompt_text
            };
            // Optimistic insert with a temporary id
            const tempId = "temp-".concat(Date.now());
            setPrompts({
                "useSavedPrompts.useCallback[savePrompt]": (prev)=>[
                        {
                            ...row,
                            id: tempId,
                            created_at: new Date().toISOString()
                        },
                        ...prev
                    ]
            }["useSavedPrompts.useCallback[savePrompt]"]);
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('saved_prompts').insert(row).select().single();
            if (error) {
                // Roll back optimistic update on failure
                setPrompts({
                    "useSavedPrompts.useCallback[savePrompt]": (prev)=>prev.filter({
                            "useSavedPrompts.useCallback[savePrompt]": (p)=>p.id !== tempId
                        }["useSavedPrompts.useCallback[savePrompt]"])
                }["useSavedPrompts.useCallback[savePrompt]"]);
                throw error;
            }
            // Replace temp entry with real row from db
            setPrompts({
                "useSavedPrompts.useCallback[savePrompt]": (prev)=>prev.map({
                        "useSavedPrompts.useCallback[savePrompt]": (p)=>p.id === tempId ? data : p
                    }["useSavedPrompts.useCallback[savePrompt]"])
            }["useSavedPrompts.useCallback[savePrompt]"]);
        }
    }["useSavedPrompts.useCallback[savePrompt]"], [
        userId
    ]);
    const deletePrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSavedPrompts.useCallback[deletePrompt]": async (id)=>{
            // Optimistic removal
            setPrompts({
                "useSavedPrompts.useCallback[deletePrompt]": (prev)=>prev.filter({
                        "useSavedPrompts.useCallback[deletePrompt]": (p)=>p.id !== id
                    }["useSavedPrompts.useCallback[deletePrompt]"])
            }["useSavedPrompts.useCallback[deletePrompt]"]);
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('saved_prompts').delete().eq('id', id);
            if (error) {
                // Re-fetch to restore on failure
                fetchPrompts();
                throw error;
            }
        }
    }["useSavedPrompts.useCallback[deletePrompt]"], [
        fetchPrompts
    ]);
    return {
        prompts,
        loading,
        savePrompt,
        deletePrompt,
        refresh: fetchPrompts
    };
}
_s(useSavedPrompts, "hMivllWnRsBmlrgso4GK7wXefXA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/src/hooks/useGeneratedPrompts.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * useGeneratedPrompts — auto-logs every prompt generation to Supabase.
 *
 * Run this in Supabase SQL editor before using:
 *
 *   create table if not exists generated_prompts (
 *     id            uuid primary key default gen_random_uuid(),
 *     user_id       uuid references auth.users(id) on delete cascade,  -- nullable for demo users
 *     app_idea      text not null,
 *     use_case      text not null,
 *     palette_name  text not null,
 *     complexity    text not null,
 *     extra_context text not null default '',
 *     prompt_text   text not null,
 *     created_at    timestamptz not null default now()
 *   );
 *
 *   alter table generated_prompts enable row level security;
 *
 *   -- Authenticated users can insert/read their own rows
 *   create policy "own prompts insert" on generated_prompts
 *     for insert with check (auth.uid() = user_id);
 *
 *   create policy "own prompts select" on generated_prompts
 *     for select using (auth.uid() = user_id);
 *
 * If the table already exists with user_id NOT NULL, run:
 *   alter table generated_prompts alter column user_id drop not null;
 */ __turbopack_context__.s([
    "useGeneratedPrompts",
    ()=>useGeneratedPrompts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/supabase.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useGeneratedPrompts(userId) {
    _s();
    /**
   * Authenticated insert — uses the user's own Supabase session.
   * Skips silently when Supabase is unconfigured or no userId present.
   */ const insertPrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGeneratedPrompts.useCallback[insertPrompt]": async (param)=>{
            let { app_idea, use_case, palette_name, complexity, extra_context, prompt_text } = param;
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"] || !userId) return;
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('generated_prompts').insert({
                user_id: userId,
                app_idea,
                use_case,
                palette_name,
                complexity,
                extra_context: extra_context !== null && extra_context !== void 0 ? extra_context : '',
                prompt_text
            });
            if (error) {
                // Non-fatal — log but don't surface to the user
                console.error('[useGeneratedPrompts] insert failed:', error.message);
            }
        }
    }["useGeneratedPrompts.useCallback[insertPrompt]"], [
        userId
    ]);
    /**
   * Demo insert — POSTs to the server-side function which uses the
   * Supabase service role key. Stores user_id = null.
   * Fire-and-forget: failures are logged, never shown to the user.
   */ return {
        insertPrompt
    };
}
_s(useGeneratedPrompts, "v5GthODANEPx26qKLRzLOBDzrOw=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/src/hooks/useProfile.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * useProfile — manages the user's plan and generation count.
 *
 * Run this in Supabase SQL editor before using:
 *
 *   create table if not exists user_profiles (
 *     id               uuid primary key references auth.users(id) on delete cascade,
 *     plan             text    not null default 'free',   -- 'free' | 'monthly' | 'lifetime'
 *     generation_count integer not null default 0,
 *     mockup_count     integer not null default 0,
 *     mockup_reset_at  timestamptz not null default now(),
 *     created_at       timestamptz default now()
 *   );
 *   alter table user_profiles enable row level security;
 *   create policy "own profile select" on user_profiles for select using (auth.uid() = id);
 *   create policy "own profile insert" on user_profiles for insert with check (auth.uid() = id);
 *   create policy "own profile update" on user_profiles for update using (auth.uid() = id);
 *
 *   -- Add mockup columns if table already exists:
 *   alter table user_profiles
 *     add column if not exists mockup_count integer not null default 0,
 *     add column if not exists mockup_reset_at timestamptz not null default now();
 */ __turbopack_context__.s([
    "MOCKUP_LIMIT",
    ()=>MOCKUP_LIMIT,
    "useProfile",
    ()=>useProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/supabase.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const FREE_LIMIT = 1;
const MOCKUP_LIMIT = 200;
function useProfile(userId) {
    _s();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Boolean(userId && __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]));
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProfile.useCallback[load]": async ()=>{
            if (!userId || !__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]) {
                setProfile(null);
                setLoading(false);
                return null;
            }
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('user_profiles').select('*').eq('id', userId).single();
            let profile;
            if ((error === null || error === void 0 ? void 0 : error.code) === 'PGRST116') {
                const { data: created } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('user_profiles').insert({
                    id: userId
                }).select().single();
                profile = created;
            } else {
                profile = data;
            }
            // Claim any pending Stripe activation (guest checkout → sign-up flow)
            if ((profile === null || profile === void 0 ? void 0 : profile.plan) === 'free') {
                const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                if (user === null || user === void 0 ? void 0 : user.email) {
                    const { data: claimedPlan } = await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('claim_pending_activation', {
                        p_user_id: userId,
                        p_email: user.email
                    });
                    if (claimedPlan) {
                        profile = {
                            ...profile,
                            plan: claimedPlan
                        };
                    }
                }
            }
            setProfile(profile);
            setLoading(false);
            return profile;
        }
    }["useProfile.useCallback[load]"], [
        userId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProfile.useEffect": ()=>{
            load();
        }
    }["useProfile.useEffect"], [
        load
    ]);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProfile.useCallback[refresh]": ()=>load()
    }["useProfile.useCallback[refresh]"], [
        load
    ]);
    // Increment the generation counter for this user
    const incrementGeneration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProfile.useCallback[incrementGeneration]": async ()=>{
            if (!userId || !__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"] || !profile) return;
            var _profile_generation_count;
            const newCount = ((_profile_generation_count = profile.generation_count) !== null && _profile_generation_count !== void 0 ? _profile_generation_count : 0) + 1;
            setProfile({
                "useProfile.useCallback[incrementGeneration]": (p)=>({
                        ...p,
                        generation_count: newCount
                    })
            }["useProfile.useCallback[incrementGeneration]"]);
            await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('user_profiles').update({
                generation_count: newCount
            }).eq('id', userId);
        }
    }["useProfile.useCallback[incrementGeneration]"], [
        userId,
        profile
    ]);
    // Upgrade the user's plan (called by Stripe webhook — exposed for optimistic update if needed)
    const upgradePlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProfile.useCallback[upgradePlan]": async (plan)=>{
            if (!userId || !__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]) return;
            setProfile({
                "useProfile.useCallback[upgradePlan]": (p)=>({
                        ...p,
                        plan
                    })
            }["useProfile.useCallback[upgradePlan]"]);
            await __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('user_profiles').update({
                plan
            }).eq('id', userId);
        }
    }["useProfile.useCallback[upgradePlan]"], [
        userId
    ]);
    const isPaid = (profile === null || profile === void 0 ? void 0 : profile.plan) === 'monthly' || (profile === null || profile === void 0 ? void 0 : profile.plan) === 'lifetime';
    const isLifetime = (profile === null || profile === void 0 ? void 0 : profile.plan) === 'lifetime';
    var _profile_generation_count;
    const generationsUsed = (_profile_generation_count = profile === null || profile === void 0 ? void 0 : profile.generation_count) !== null && _profile_generation_count !== void 0 ? _profile_generation_count : 0;
    const withinLimit = loading || !profile || isPaid || generationsUsed < FREE_LIMIT;
    var _profile_mockup_count;
    const mockupCount = (_profile_mockup_count = profile === null || profile === void 0 ? void 0 : profile.mockup_count) !== null && _profile_mockup_count !== void 0 ? _profile_mockup_count : 0;
    const withinMockupLimit = loading || !profile || mockupCount < MOCKUP_LIMIT;
    return {
        profile,
        loading,
        refresh,
        isPaid,
        isLifetime,
        withinLimit,
        generationsUsed,
        upgradePlan,
        incrementGeneration,
        mockupCount,
        withinMockupLimit
    };
}
_s(useProfile, "a55XUFQgcyxBlf1xrJTQ4Us5Mss=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/src/lib/posthog.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capture",
    ()=>capture,
    "initPostHog",
    ()=>initPostHog,
    "isPostHogConfigured",
    ()=>isPostHogConfigured
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$posthog$2d$js$2f$dist$2f$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/posthog-js/dist/module.js [app-client] (ecmascript)");
;
const key = __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_POSTHOG_KEY;
var _process_env_NEXT_PUBLIC_POSTHOG_HOST;
const host = (_process_env_NEXT_PUBLIC_POSTHOG_HOST = __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_POSTHOG_HOST) !== null && _process_env_NEXT_PUBLIC_POSTHOG_HOST !== void 0 ? _process_env_NEXT_PUBLIC_POSTHOG_HOST : 'https://us.i.posthog.com';
const isPostHogConfigured = Boolean(key);
let initialised = false;
function initPostHog() {
    if (!key || initialised) return;
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$posthog$2d$js$2f$dist$2f$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init(key, {
        api_host: host,
        capture_pageview: true,
        capture_pageleave: true,
        persistence: 'localStorage'
    });
    initialised = true;
}
function capture(event, properties) {
    if (!initialised) return;
    __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$posthog$2d$js$2f$dist$2f$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].capture(event, properties);
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/mobiledev-web/src/components/SavedPrompts.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SavedPrompts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const ORANGE = "#EA580C";
const BROWN = "#1C0A02";
const BROWN2 = "#5C2E0A";
const BROWN3 = "#9A6040";
const BG = "#FFFBF7";
const SURF = "#FFFFFF";
const SURF2 = "#FFF5EC";
const BORDER = "#E8CFBA";
// Must match the COLOR_PALETTES order in ComplexGenerator
const COLOR_PALETTES = [
    {
        name: "Midnight",
        colors: [
            "#0F0F23",
            "#6C63FF",
            "#FF6584"
        ]
    },
    {
        name: "Forest",
        colors: [
            "#1A2F23",
            "#4CAF7D",
            "#F5C842"
        ]
    },
    {
        name: "Ember",
        colors: [
            "#1C1410",
            "#E85D04",
            "#FFBA08"
        ]
    },
    {
        name: "Ocean",
        colors: [
            "#03045E",
            "#0096C7",
            "#ADE8F4"
        ]
    },
    {
        name: "Blush",
        colors: [
            "#2D1B2E",
            "#E040FB",
            "#F8BBD9"
        ]
    },
    {
        name: "Slate",
        colors: [
            "#0D1117",
            "#58A6FF",
            "#3FB950"
        ]
    },
    {
        name: "Sunset",
        colors: [
            "#1A0A00",
            "#FF6B35",
            "#FFE66D"
        ]
    },
    {
        name: "Arctic",
        colors: [
            "#0A1628",
            "#00D4FF",
            "#B8FFF9"
        ]
    }
];
const USE_CASE_ICONS = {
    mobile: "📱",
    dashboard: "📊",
    landing: "🚀",
    saas: "⚙️",
    portfolio: "🎨",
    ecommerce: "🛍️"
};
function relativeTime(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);
    const days = Math.floor(diff / 86_400_000);
    if (mins < 1) return 'just now';
    if (mins < 60) return "".concat(mins, "m ago");
    if (hours < 24) return "".concat(hours, "h ago");
    return "".concat(days, "d ago");
}
function SkeletonCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl p-4 animate-pulse",
        style: {
            border: "1px solid ".concat(BORDER),
            backgroundColor: SURF
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-3 rounded w-2/3 mb-3",
                style: {
                    backgroundColor: BORDER
                }
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-2 rounded w-1/2 mb-2",
                style: {
                    backgroundColor: BORDER
                }
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-2 rounded w-4/5 mb-4",
                style: {
                    backgroundColor: BORDER
                }
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-7 rounded-lg flex-1",
                        style: {
                            backgroundColor: BORDER
                        }
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-7 rounded-lg w-10",
                        style: {
                            backgroundColor: BORDER
                        }
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c = SkeletonCard;
function PromptCard(param) {
    let { saved, onLoad, onDelete } = param;
    _s();
    const [confirmDelete, setConfirmDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    var _COLOR_PALETTES_saved_palette_index;
    const palette = (_COLOR_PALETTES_saved_palette_index = COLOR_PALETTES[saved.palette_index]) !== null && _COLOR_PALETTES_saved_palette_index !== void 0 ? _COLOR_PALETTES_saved_palette_index : COLOR_PALETTES[0];
    const handleDelete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PromptCard.useCallback[handleDelete]": ()=>{
            if (confirmDelete) {
                onDelete(saved.id);
            } else {
                setConfirmDelete(true);
                setTimeout({
                    "PromptCard.useCallback[handleDelete]": ()=>setConfirmDelete(false)
                }["PromptCard.useCallback[handleDelete]"], 3000);
            }
        }
    }["PromptCard.useCallback[handleDelete]"], [
        confirmDelete,
        onDelete,
        saved.id
    ]);
    var _USE_CASE_ICONS_saved_use_case;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl p-4 flex flex-col gap-3 transition-all duration-150",
        style: {
            border: "1px solid ".concat(BORDER),
            backgroundColor: SURF,
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold leading-snug line-clamp-2 flex-1",
                        style: {
                            color: BROWN
                        },
                        children: saved.name
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs shrink-0",
                        style: {
                            color: BROWN3
                        },
                        children: relativeTime(saved.created_at)
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex",
                        children: palette.colors.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-full border-2",
                                style: {
                                    backgroundColor: c,
                                    borderColor: SURF,
                                    marginLeft: i > 0 ? '-3px' : 0
                                }
                            }, c, false, {
                                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs",
                        style: {
                            color: BROWN3
                        },
                        children: palette.name
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: BORDER
                        },
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs",
                        style: {
                            color: BROWN3
                        },
                        children: [
                            (_USE_CASE_ICONS_saved_use_case = USE_CASE_ICONS[saved.use_case]) !== null && _USE_CASE_ICONS_saved_use_case !== void 0 ? _USE_CASE_ICONS_saved_use_case : '',
                            " ",
                            saved.use_case
                        ]
                    }, void 0, true, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: BORDER
                        },
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs px-1.5 py-0.5 rounded-md font-semibold",
                        style: {
                            backgroundColor: "".concat(ORANGE, "15"),
                            color: ORANGE
                        },
                        children: saved.complexity
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs leading-relaxed line-clamp-2",
                style: {
                    color: BROWN3
                },
                children: saved.app_idea
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mt-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onLoad(saved),
                        className: "flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95",
                        style: {
                            backgroundColor: "".concat(ORANGE, "15"),
                            color: ORANGE,
                            border: 'none'
                        },
                        children: "Load ↩"
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDelete,
                        className: "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95",
                        style: {
                            backgroundColor: confirmDelete ? '#ef444420' : SURF2,
                            color: confirmDelete ? '#ef4444' : BROWN3,
                            border: 'none'
                        },
                        title: confirmDelete ? 'Click again to confirm' : 'Delete',
                        children: confirmDelete ? 'Sure?' : '🗑'
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(PromptCard, "gLBoGQJyRXBL1tUF6xbuWkNKwKA=");
_c1 = PromptCard;
function SavedPrompts(param) {
    let { prompts, loading, onLoad, onDelete } = param;
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                    count: 0,
                    loading: true
                }, void 0, false, {
                    fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonCard, {}, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonCard, {}, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                            lineNumber: 144,
                            columnNumber: 27
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonCard, {}, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                            lineNumber: 144,
                            columnNumber: 43
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
            lineNumber: 141,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                count: prompts.length
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            prompts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl flex flex-col items-center justify-center py-12 text-center mt-4",
                style: {
                    border: "1px dashed ".concat(BORDER),
                    fontFamily: "'Inter', system-ui, sans-serif"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-4xl mb-3",
                        children: "💾"
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold",
                        style: {
                            color: BROWN3
                        },
                        children: "No saved prompts yet"
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs mt-1",
                        style: {
                            color: BROWN3
                        },
                        children: "Generate a prompt above and click Save to store it here"
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 154,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4",
                children: prompts.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PromptCard, {
                        saved: p,
                        onLoad: onLoad,
                        onDelete: onDelete
                    }, p.id, false, {
                        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                        lineNumber: 165,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 163,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_c2 = SavedPrompts;
function SectionHeader(param) {
    let { count, loading } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3 pb-3",
        style: {
            borderBottom: "1px solid ".concat(BORDER),
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs uppercase tracking-widest font-semibold",
                style: {
                    color: BROWN3
                },
                children: "Saved Prompts"
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs px-1.5 py-0.5 rounded-md font-semibold",
                style: {
                    backgroundColor: SURF2,
                    color: BROWN3
                },
                children: count
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
                lineNumber: 181,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/mobiledev-web/src/components/SavedPrompts.jsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_c3 = SectionHeader;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "SkeletonCard");
__turbopack_context__.k.register(_c1, "PromptCard");
__turbopack_context__.k.register(_c2, "SavedPrompts");
__turbopack_context__.k.register(_c3, "SectionHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/mobiledev-web/src/components/ComplexGenerator.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PromptGenerator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/hooks/useAuth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useSavedPrompts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/hooks/useSavedPrompts.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useGeneratedPrompts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/hooks/useGeneratedPrompts.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useProfile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/hooks/useProfile.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/supabase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$posthog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/posthog.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$stripe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/lib/stripe.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$components$2f$AuthModal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/components/AuthModal.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$components$2f$SavedPrompts$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mobiledev-web/src/components/SavedPrompts.jsx [app-client] (ecmascript)");
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
;
;
// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const ORANGE = "#EA580C";
const AMBER = "#FB923C";
const BROWN = "#1C0A02";
const BROWN2 = "#5C2E0A";
const BROWN3 = "#9A6040";
const BG = "#FFFBF7";
const SURF = "#FFFFFF";
const SURF2 = "#FFF5EC";
const BORDER = "#E8CFBA";
// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const USE_CASES = [
    {
        id: "mobile",
        label: "📱 Mobile App",
        icon: "📱",
        desc: "React Native-style mobile UI"
    },
    {
        id: "dashboard",
        label: "📊 Dashboard",
        icon: "📊",
        desc: "Data-rich admin interface"
    },
    {
        id: "landing",
        label: "🚀 Landing Page",
        icon: "🚀",
        desc: "Marketing & conversion focused"
    },
    {
        id: "saas",
        label: "⚙️ SaaS Product",
        icon: "⚙️",
        desc: "Full-featured web app"
    },
    {
        id: "portfolio",
        label: "🎨 Portfolio",
        icon: "🎨",
        desc: "Personal or agency showcase"
    },
    {
        id: "ecommerce",
        label: "🛍️ E-Commerce",
        icon: "🛍️",
        desc: "Product & checkout flows"
    }
];
const isValidHex = (v)=>/^#[0-9A-Fa-f]{6}$/.test(v);
const COLOR_SLOTS = [
    {
        label: "Background",
        hint: "Dark base — page & card bg"
    },
    {
        label: "Primary",
        hint: "CTAs, active states, key highlights"
    },
    {
        label: "Accent",
        hint: "Badges, secondary highlights"
    }
];
const COMPLEXITY_LEVELS = [
    {
        id: "simple",
        label: "Simple",
        desc: "1–2 screens, core feature only",
        screens: "1–2"
    },
    {
        id: "standard",
        label: "Standard",
        desc: "3–4 screens, common patterns",
        screens: "3–4"
    },
    {
        id: "advanced",
        label: "Advanced",
        desc: "5+ screens, full feature set",
        screens: "5+"
    }
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
        "progress rings and animated stat counters"
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
        "responsive grid layout with resizable panels"
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
        "trust badges and security seals"
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
        "notification toast system"
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
        "before/after project sliders"
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
        "shipping calculator inline"
    ]
};
// ─── PROMPT BUILDERS ─────────────────────────────────────────────────────────
const buildMobilePrompt = (param)=>{
    let { appIdea, palette, styles, complexity, extraContext } = param;
    return "\nYou are a senior Next.js developer with 10+ years of experience shipping production apps. Your code is architecturally clean, performant, and visually indistinguishable from a professionally designed native app.\n\n## Task\nBuild a **complete, fully functional ".concat(appIdea, "** as a Next.js App Router project with ").concat(complexity.screens, " screens. Every screen must feel like it shipped from a real product team.\n\n## Tech Stack\n- **Next.js 15** App Router — `app/` directory, Server and Client Components\n- **Tailwind CSS v4** utility classes only\n- **Lucide React** icons\n- All data hardcoded/mocked — no external APIs\n- `'use client'` directive on any component using hooks or browser APIs\n").concat(extraContext ? "\n## Additional Context\n".concat(extraContext, "\n") : "", '\n## Color Palette — "').concat(palette.name, '"\n| Token | Hex | Usage |\n|-------|-----|-------|\n| Background | `').concat(palette.colors[0], "` | App background, card bases |\n| Primary | `").concat(palette.colors[1], "` | CTAs, active states, key highlights |\n| Accent | `").concat(palette.colors[2], '` | Badges, secondary highlights |\n\nApply as inline `style` overrides when Tailwind can\'t express exact hex.\nNever use generic Tailwind color classes — every color from this palette only.\n\n## Layout & Mobile Constraints\n- Design target: **375px width** (iPhone 14 Pro)\n- Outermost wrapper: `<div className="max-w-sm mx-auto min-h-screen relative overflow-hidden">`\n- Fixed bottom navigation bar (position: fixed, bottom: 0)\n- Add `pb-20` to main content to prevent bottom nav overlap\n- All tap targets: minimum 44×44px\n- No horizontal scroll\n\n## Visual Language\n').concat(styles.map((s, i)=>"".concat(i + 1, ". ").concat(s)).join("\n"), "\n\n## Required UI Elements\n- Hero/header with gradient: `style={{ background: 'linear-gradient(135deg, ").concat(palette.colors[1], ", ").concat(palette.colors[2], ")' }}`\n- ").concat(complexity.screens, " navigable screens via bottom nav\n- Realistic mock data (real names, plausible numbers, actual dates)\n- Micro-interactions: `active:scale-95 transition-all duration-150` on every tappable element\n- At least one skeleton/loading state\n- At least one bottom sheet or modal pattern\n\n## File Structure\n```\napp/\n  layout.tsx       # Root layout with font and metadata\n  page.tsx         # Home screen (Server Component)\n  globals.css      # @import \"tailwindcss\"; minimal resets\n  [screen]/\n    page.tsx       # Each additional screen\ncomponents/        # Shared UI components (`'use client'` where needed)\n```\n\n## Output Format\nReturn **only** the complete file tree with each file's full contents. No markdown fences around the overall response.\nStart each file with a comment: `// app/page.tsx`, `// components/BottomNav.tsx`, etc.\n").trim();
};
const buildDashboardPrompt = (param)=>{
    let { appIdea, palette, styles, complexity, extraContext } = param;
    return "\nYou are a senior Next.js engineer specializing in data-dense admin interfaces. You ship dashboards that are both beautiful and functional, where every pixel earns its place.\n\n## Task\nBuild a **complete ".concat(appIdea, " dashboard** as a Next.js App Router project with ").concat(complexity.screens, " main views. Data should tell a story — not just fill a grid.\n\n## Tech Stack\n- **Next.js 15** App Router — `app/` directory, Server and Client Components\n- **Tailwind CSS v4** utility classes only\n- **Lucide React** icons\n- All data hardcoded/mocked with realistic variance and trends\n- Recharts for charts: `'use client'` components only\n- `'use client'` directive on any component using hooks or browser APIs\n").concat(extraContext ? "\n## Additional Context\n".concat(extraContext, "\n") : "", '\n## Color Palette — "').concat(palette.name, '"\n- Background: `').concat(palette.colors[0], "` — page background, card bases\n- Primary: `").concat(palette.colors[1], "` — active nav, primary actions, chart fills\n- Accent: `").concat(palette.colors[2], '` — badges, positive indicators, sparklines\n\n## Layout\n- Full viewport: `<div className="flex h-screen overflow-hidden">`\n- Left sidebar (w-64, collapsible to w-16) + main content area\n- Top bar with search, notifications bell, user avatar\n- Main content: scrollable, with `p-6` inner padding\n\n## Visual Language\n').concat(styles.map((s, i)=>"".concat(i + 1, ". ").concat(s)).join("\n"), "\n\n## Required Elements\n- Summary KPI cards row at top: 4 metrics with value, trend arrow, sparkline\n- At least 1 area/bar chart (Recharts) with realistic data points\n- A data table with sortable columns, status badges, avatar cells\n- ").concat(complexity.screens, " views switchable via sidebar nav\n- Realistic mock data: revenue figures, user counts, dates, percentages\n\n## File Structure\n```\napp/\n  layout.tsx         # Root layout with metadata\n  page.tsx           # Dashboard home (Server Component)\n  globals.css        # @import \"tailwindcss\"; minimal resets\n  [view]/page.tsx    # Each additional view\ncomponents/          # Sidebar, TopBar, KPICard, DataTable, Charts (`'use client'`)\nlib/data.ts          # Hardcoded mock data\n```\n\n## Output Format\nReturn **only** the complete file tree with each file's full contents.\nStart each file with a comment: `// app/page.tsx`, `// components/Sidebar.tsx`, etc.\n").trim();
};
const buildLandingPrompt = (param)=>{
    let { appIdea, palette, styles, complexity, extraContext } = param;
    return "\nYou are a senior conversion-focused Next.js developer. You build landing pages that look like they were designed by a top-tier agency and convert at industry-leading rates.\n\n## Task\nBuild a **complete landing page for ".concat(appIdea, "** as a Next.js App Router project. Every section must earn its place — no filler, no generic content.\n\n## Tech Stack\n- **Next.js 15** App Router — `app/` directory, Server and Client Components\n- **Tailwind CSS v4** utility classes only\n- **Lucide React** icons\n- All copy and data hardcoded with genuine, compelling product copy\n- `'use client'` only where interactivity is needed (accordion, sticky nav scroll state)\n").concat(extraContext ? "\n## Additional Context\n".concat(extraContext, "\n") : "", '\n## Color Palette — "').concat(palette.name, '"\n- Background: `').concat(palette.colors[0], "`\n- Primary: `").concat(palette.colors[1], "` — CTAs, highlights, hover states\n- Accent: `").concat(palette.colors[2], "` — badges, underlines, decorative elements\n\nHero gradient: `style={{ background: 'linear-gradient(135deg, ").concat(palette.colors[1], "22, ").concat(palette.colors[2], '22)\' }}`\n\n## Layout Sections (in order)\n1. Sticky navigation with logo + links + CTA button\n2. Hero: bold headline, subhead, dual CTA buttons, product visual (gradient mockup div)\n3. Social proof: logo strip (6 fake company names as text)\n4. Features: 3-column grid with icon, title, description\n5. How it works: numbered steps with connecting line\n6. Testimonials: 3 cards with quote, avatar (gradient circle), name, role, star rating\n7. Pricing: 3 tiers, middle one highlighted with primary color border + "Most Popular" badge\n8. FAQ: accordion with 5 questions, smooth expand/collapse animation\n9. Final CTA: full-width gradient section\n10. Footer: 4-column links + copyright\n\n## Visual Language\n').concat(styles.map((s, i)=>"".concat(i + 1, ". ").concat(s)).join("\n"), "\n\n## File Structure\n```\napp/\n  layout.tsx          # Root layout with metadata and fonts\n  page.tsx            # Server Component — composes all sections\n  globals.css         # @import \"tailwindcss\"; minimal resets\ncomponents/\n  Nav.tsx             # `'use client'` — sticky scroll state\n  Hero.tsx            # Server Component\n  FAQ.tsx             # `'use client'` — accordion state\n  Pricing.tsx         # Server Component\n  Footer.tsx          # Server Component\n```\n\n## Output Format\nReturn **only** the complete file tree with each file's full contents.\nStart each file with a comment: `// app/page.tsx`, `// components/Nav.tsx`, etc.\n").trim();
};
const buildSaaSPrompt = (param)=>{
    let { appIdea, palette, styles, complexity, extraContext } = param;
    return "\nYou are a principal Next.js engineer who has shipped multiple successful SaaS products. You build interfaces that feel like a polished B2B tool — professional, efficient, and delightfully usable.\n\n## Task\nBuild a **complete ".concat(appIdea, " SaaS application** as a Next.js App Router project with ").concat(complexity.screens, " sections/views. Think Notion, Linear, or Vercel — clean, purposeful, with a clear information hierarchy.\n\n## Tech Stack\n- **Next.js 15** App Router — `app/` directory, Server and Client Components\n- **Tailwind CSS v4** utility classes only\n- **Lucide React** icons\n- All data hardcoded/mocked\n- `'use client'` directive on any component using hooks or browser APIs\n").concat(extraContext ? "\n## Additional Context\n".concat(extraContext, "\n") : "", '\n## Color Palette — "').concat(palette.name, '"\n- Background: `').concat(palette.colors[0], "`\n- Primary: `").concat(palette.colors[1], "` — active states, primary buttons, focus rings\n- Accent: `").concat(palette.colors[2], "` — success states, highlights, badges\n\n## Layout\n- App shell: sidebar nav (left, w-56) + top bar + main content\n- Top bar: breadcrumb, search, notification icon, user avatar dropdown\n- Main area: `flex-1 overflow-auto p-6`\n\n## Visual Language\n").concat(styles.map((s, i)=>"".concat(i + 1, ". ").concat(s)).join("\n"), "\n\n## Required Elements\n- Onboarding or empty state for at least one section (icon + headline + CTA)\n- At least one modal dialog (create/edit item)\n- Settings panel with toggle switches and input fields\n- Notification toast system (auto-dismiss after 3s)\n- ").concat(complexity.screens, " distinct views via sidebar nav\n\n## File Structure\n```\napp/\n  layout.tsx              # Root layout — app shell (sidebar + top bar)\n  page.tsx                # Default view (Server Component)\n  globals.css             # @import \"tailwindcss\"; minimal resets\n  [view]/page.tsx         # Each additional view\ncomponents/\n  Sidebar.tsx             # `'use client'` — nav state\n  TopBar.tsx              # `'use client'` — search, dropdown\n  Modal.tsx               # `'use client'` — dialog state\n  Toast.tsx               # `'use client'` — auto-dismiss toasts\nlib/data.ts               # Hardcoded mock data\n```\n\n## Output Format\nReturn **only** the complete file tree with each file's full contents.\nStart each file with a comment: `// app/page.tsx`, `// components/Sidebar.tsx`, etc.\n").trim();
};
const buildPortfolioPrompt = (param)=>{
    let { appIdea, palette, styles, complexity, extraContext } = param;
    return "\nYou are a creative Next.js developer known for portfolio sites that get people hired. You build personal sites that feel like art — memorable, fast, and deeply personal.\n\n## Task\nBuild a **complete portfolio site for ".concat(appIdea, "** as a Next.js App Router project. It must feel handcrafted — like a designer built it, not a template generator.\n\n## Tech Stack\n- **Next.js 15** App Router — `app/` directory, Server and Client Components\n- **Tailwind CSS v4** utility classes only\n- **Lucide React** icons\n- All content hardcoded with real-sounding names, titles, project descriptions\n- `next/image` for any images; `next/font/google` for typography\n- `'use client'` only where interactivity is needed (theme toggle, contact form)\n").concat(extraContext ? "\n## Additional Context\n".concat(extraContext, "\n") : "", '\n## Color Palette — "').concat(palette.name, '"\n- Background: `').concat(palette.colors[0], "`\n- Primary: `").concat(palette.colors[1], "` — accents, hover states, active indicators\n- Accent: `").concat(palette.colors[2], "` — highlights, tags, decorative elements\n\n## Sections\n1. Hero: name, title, brief bio, CTA buttons (View Work / Contact), animated gradient blob background\n2. About: photo placeholder (gradient circle), bio paragraph, skills grid\n3. Work/Projects: bento grid or masonry layout, 4–6 projects with title, tags, description, mock image (gradient div)\n4. Experience: timeline with company, role, dates, bullet points\n5. Contact: email, social links, optional short contact form\n\n## Visual Language\n").concat(styles.map((s, i)=>"".concat(i + 1, ". ").concat(s)).join("\n"), "\n\n## File Structure\n```\napp/\n  layout.tsx          # Root layout — fonts, metadata\n  page.tsx            # Server Component — composes all sections\n  globals.css         # @import \"tailwindcss\"; minimal resets\ncomponents/\n  Hero.tsx            # Server Component\n  Projects.tsx        # Server Component\n  ContactForm.tsx     # `'use client'` — form state\n  ThemeToggle.tsx     # `'use client'` — dark/light state\n```\n\n## Output Format\nReturn **only** the complete file tree with each file's full contents.\nStart each file with a comment: `// app/page.tsx`, `// components/Hero.tsx`, etc.\n").trim();
};
const buildEcommercePrompt = (param)=>{
    let { appIdea, palette, styles, complexity, extraContext } = param;
    return "\nYou are a senior Next.js e-commerce engineer. You've built storefronts that convert. You know that every interaction — hover, add-to-cart, checkout — must feel effortless and trustworthy.\n\n## Task\nBuild a **complete ".concat(appIdea, " e-commerce UI** as a Next.js App Router project with ").concat(complexity.screens, " screens. Think Shopify + Apple Store aesthetics — premium, clean, conversion-optimized.\n\n## Tech Stack\n- **Next.js 15** App Router — `app/` directory, Server and Client Components\n- **Tailwind CSS v4** utility classes only\n- **Lucide React** icons\n- All product data hardcoded/mocked (realistic product names, prices, descriptions)\n- `next/image` for product images\n- `'use client'` directive on any component using hooks or browser APIs\n").concat(extraContext ? "\n## Additional Context\n".concat(extraContext, "\n") : "", '\n## Color Palette — "').concat(palette.name, '"\n- Background: `').concat(palette.colors[0], "`\n- Primary: `").concat(palette.colors[1], "` — CTAs, prices, active states\n- Accent: `").concat(palette.colors[2], "` — sale badges, wishlist, rating stars\n\n## Required Screens\n1. Product listing/catalog with filter sidebar or top filter bar — `app/page.tsx`\n2. Product detail page: gallery, variant picker, add to cart — `app/product/[id]/page.tsx`\n3. Cart drawer or cart page with quantity controls + order summary — `app/cart/page.tsx`\n").concat(complexity.id !== "simple" ? "4. Simple checkout flow (shipping + payment form mockup) — `app/checkout/page.tsx`" : "", "\n").concat(complexity.id === "advanced" ? "5. Order confirmation / thank you screen — `app/order-confirmed/page.tsx`" : "", "\n\n## Visual Language\n").concat(styles.map((s, i)=>"".concat(i + 1, ". ").concat(s)).join("\n"), "\n\n## Required Elements\n- Product cards with hover state, wishlist toggle, quick-add button\n- Cart item count badge on cart icon\n- Toast notification on add to cart\n- Realistic product data: 8+ products with names, prices, ratings, stock status\n\n## File Structure\n```\napp/\n  layout.tsx                  # Root layout — nav with cart badge\n  page.tsx                    # Product catalog (Server Component)\n  globals.css                 # @import \"tailwindcss\"; minimal resets\n  product/[id]/page.tsx       # Product detail (Server Component)\n  cart/page.tsx               # Cart page\ncomponents/\n  CartDrawer.tsx              # `'use client'` — cart state\n  ProductCard.tsx             # `'use client'` — wishlist toggle\n  Toast.tsx                   # `'use client'` — add-to-cart feedback\nlib/products.ts               # Hardcoded product data\n```\n\n## Output Format\nReturn **only** the complete file tree with each file's full contents.\nStart each file with a comment: `// app/page.tsx`, `// components/CartDrawer.tsx`, etc.\n").trim();
};
const PROMPT_BUILDERS = {
    mobile: buildMobilePrompt,
    dashboard: buildDashboardPrompt,
    landing: buildLandingPrompt,
    saas: buildSaaSPrompt,
    portfolio: buildPortfolioPrompt,
    ecommerce: buildEcommercePrompt
};
// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
const StepLabel = (param)=>{
    let { number, label, active } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 mb-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200",
                style: {
                    backgroundColor: active ? ORANGE : BORDER,
                    color: active ? "white" : BROWN3
                },
                children: number
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                lineNumber: 470,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs uppercase tracking-widest font-semibold",
                style: {
                    color: active ? BROWN : BROWN3
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                lineNumber: 476,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
        lineNumber: 469,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_c = StepLabel;
const PalettePreview = (param)=>{
    let { colors, name } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex",
                children: colors.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-4 h-4 rounded-full border-2",
                        style: {
                            backgroundColor: c,
                            borderColor: SURF,
                            marginLeft: i > 0 ? "-4px" : 0,
                            zIndex: colors.length - i
                        }
                    }, c, false, {
                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                        lineNumber: 486,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                lineNumber: 484,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs",
                style: {
                    color: BROWN3
                },
                children: name
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                lineNumber: 493,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
        lineNumber: 483,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = PalettePreview;
// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const DEMO_STORAGE_KEY = "humble-ui-demo-used";
function PromptGenerator(param) {
    let { demoMode = false, onDemoSignUp, onExitDemo } = param;
    var _USE_CASES_find, _USE_CASES_find1, _USE_CASES_find2;
    _s();
    const [appIdea, setAppIdea] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedUseCase, setSelectedUseCase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("mobile");
    const [customPalette, setCustomPalette] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "Custom",
        colors: [
            "#0D0D1A",
            "#6C63FF",
            "#FF6584"
        ]
    });
    const [selectedComplexity, setSelectedComplexity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("standard");
    const colorRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [extraContext, setExtraContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showExtraContext, setShowExtraContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [generatedPrompt, setGeneratedPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [promptGenerated, setPromptGenerated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, loading: authLoading, signIn, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { prompts, loading: promptsLoading, savePrompt, deletePrompt } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useSavedPrompts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSavedPrompts"])(user === null || user === void 0 ? void 0 : user.id);
    const { insertPrompt } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useGeneratedPrompts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGeneratedPrompts"])(user === null || user === void 0 ? void 0 : user.id);
    const { isPaid, withinLimit, generationsUsed, incrementGeneration, loading: profileLoading, profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useProfile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"])(user === null || user === void 0 ? void 0 : user.id);
    const [showAuthModal, setShowAuthModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showUpgradeModal, setShowUpgradeModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showContactModal, setShowContactModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [contactForm, setContactForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        email: "",
        message: ""
    });
    const [contactStatus, setContactStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PromptGenerator.useEffect": ()=>{
            if (demoMode && localStorage.getItem(DEMO_STORAGE_KEY) === "true") {
                setShowUpgradeModal(true);
            }
        }
    }["PromptGenerator.useEffect"], []); // eslint-disable-line react-hooks/exhaustive-deps
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PromptGenerator.useEffect": ()=>{
            if (!profile) return;
            if (localStorage.getItem('humble-ui-show-pricing') !== 'true') return;
            localStorage.removeItem('humble-ui-show-pricing');
            if (!isPaid) setShowUpgradeModal(true);
        }
    }["PromptGenerator.useEffect"], [
        profile,
        isPaid
    ]);
    const [showSaveInput, setShowSaveInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveName, setSaveName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveError, setSaveError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const saveInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleSaveClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PromptGenerator.useCallback[handleSaveClick]": ()=>{
            if (!user) {
                setShowAuthModal(true);
                return;
            }
            setSaveName(appIdea.slice(0, 60));
            setSaveError("");
            setShowSaveInput(true);
            setTimeout({
                "PromptGenerator.useCallback[handleSaveClick]": ()=>{
                    var _saveInputRef_current;
                    return (_saveInputRef_current = saveInputRef.current) === null || _saveInputRef_current === void 0 ? void 0 : _saveInputRef_current.focus();
                }
            }["PromptGenerator.useCallback[handleSaveClick]"], 50);
        }
    }["PromptGenerator.useCallback[handleSaveClick]"], [
        user,
        appIdea
    ]);
    const handleSaveConfirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PromptGenerator.useCallback[handleSaveConfirm]": async ()=>{
            if (!saveName.trim()) return;
            setSaving(true);
            setSaveError("");
            try {
                await savePrompt({
                    name: saveName.trim(),
                    app_idea: appIdea,
                    use_case: selectedUseCase,
                    palette_index: 0,
                    complexity: selectedComplexity,
                    extra_context: extraContext,
                    prompt_text: generatedPrompt
                });
                setShowSaveInput(false);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$posthog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["capture"])("prompt_saved", {
                    use_case: selectedUseCase,
                    complexity: selectedComplexity
                });
            } catch (e) {
                setSaveError("Save failed. Please try again.");
            } finally{
                setSaving(false);
            }
        }
    }["PromptGenerator.useCallback[handleSaveConfirm]"], [
        saveName,
        appIdea,
        selectedUseCase,
        selectedComplexity,
        extraContext,
        generatedPrompt,
        savePrompt
    ]);
    const handleLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PromptGenerator.useCallback[handleLoad]": (saved)=>{
            setAppIdea(saved.app_idea);
            setSelectedUseCase(saved.use_case);
            setSelectedComplexity(saved.complexity);
            var _saved_extra_context;
            setExtraContext((_saved_extra_context = saved.extra_context) !== null && _saved_extra_context !== void 0 ? _saved_extra_context : "");
            setGeneratedPrompt(saved.prompt_text);
            setPromptGenerated(true);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }["PromptGenerator.useCallback[handleLoad]"], []);
    const updateColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PromptGenerator.useCallback[updateColor]": (index, raw)=>{
            const value = raw.startsWith("#") ? raw : "#".concat(raw);
            setCustomPalette({
                "PromptGenerator.useCallback[updateColor]": (p)=>{
                    const colors = [
                        ...p.colors
                    ];
                    colors[index] = value;
                    return {
                        ...p,
                        colors
                    };
                }
            }["PromptGenerator.useCallback[updateColor]"]);
        }
    }["PromptGenerator.useCallback[updateColor]"], []);
    const palette = customPalette;
    const complexity = COMPLEXITY_LEVELS.find((c)=>c.id === selectedComplexity);
    const styleTokens = STYLE_TOKENS_BY_USECASE[selectedUseCase] || STYLE_TOKENS_BY_USECASE.mobile;
    const canGenerate = appIdea.trim().length > 0;
    const charCount = generatedPrompt.length;
    const generatePrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PromptGenerator.useCallback[generatePrompt]": async ()=>{
            if (!canGenerate) return;
            if (demoMode) {
                if (localStorage.getItem(DEMO_STORAGE_KEY) === "true") {
                    setShowUpgradeModal(true);
                    return;
                }
            } else if (user && !profile) {
                return;
            } else if (!withinLimit) {
                setShowUpgradeModal(true);
                return;
            }
            const randomStyles = [
                ...styleTokens
            ].sort({
                "PromptGenerator.useCallback[generatePrompt].randomStyles": ()=>Math.random() - 0.5
            }["PromptGenerator.useCallback[generatePrompt].randomStyles"]).slice(0, 5);
            const builder = PROMPT_BUILDERS[selectedUseCase];
            const prompt = builder({
                appIdea,
                palette,
                styles: randomStyles,
                complexity,
                extraContext
            });
            setGeneratedPrompt(prompt);
            setPromptGenerated(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$posthog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["capture"])("prompt_generated", {
                use_case: selectedUseCase,
                complexity: selectedComplexity,
                palette: palette.name,
                demo: demoMode
            });
            if (demoMode) {
                localStorage.setItem(DEMO_STORAGE_KEY, "true");
                setTimeout({
                    "PromptGenerator.useCallback[generatePrompt]": ()=>setShowUpgradeModal(true)
                }["PromptGenerator.useCallback[generatePrompt]"], 900);
            } else {
                await Promise.all([
                    incrementGeneration(),
                    insertPrompt({
                        app_idea: appIdea,
                        use_case: selectedUseCase,
                        palette_name: palette.name,
                        complexity: selectedComplexity,
                        extra_context: extraContext,
                        prompt_text: prompt
                    })
                ]);
            }
        }
    }["PromptGenerator.useCallback[generatePrompt]"], [
        appIdea,
        selectedUseCase,
        selectedComplexity,
        palette,
        complexity,
        styleTokens,
        extraContext,
        canGenerate,
        withinLimit,
        demoMode,
        incrementGeneration,
        insertPrompt
    ]);
    const copyToClipboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PromptGenerator.useCallback[copyToClipboard]": ()=>{
            navigator.clipboard.writeText(generatedPrompt);
            setCopied(true);
            setTimeout({
                "PromptGenerator.useCallback[copyToClipboard]": ()=>setCopied(false)
            }["PromptGenerator.useCallback[copyToClipboard]"], 2000);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$posthog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["capture"])("prompt_copied", {
                use_case: selectedUseCase
            });
        }
    }["PromptGenerator.useCallback[copyToClipboard]"], [
        generatedPrompt,
        selectedUseCase
    ]);
    const inputStyle = {
        backgroundColor: SURF,
        border: "1px solid ".concat(BORDER),
        color: BROWN,
        colorScheme: 'light',
        fontFamily: "'Inter', system-ui, sans-serif"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        style: {
            backgroundColor: BG,
            color: BROWN,
            fontFamily: "'Inter', system-ui, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-3 flex items-center justify-between sticky top-0 z-10",
                style: {
                    borderBottom: "1px solid ".concat(BORDER),
                    backgroundColor: BG,
                    backdropFilter: 'blur(14px)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            demoMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onExitDemo,
                                className: "text-xs transition-colors mr-1",
                                style: {
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    color: BROWN3
                                },
                                children: "← Back"
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 646,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-red-400 opacity-80"
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 655,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-yellow-400 opacity-80"
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 656,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full bg-green-400 opacity-80"
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 657,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 654,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                style: {
                                    color: BROWN3,
                                    fontFamily: "'IBM Plex Mono', monospace"
                                },
                                children: "prompt-generator.jsx"
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 659,
                                columnNumber: 11
                            }, this),
                            demoMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs px-2 py-0.5 rounded-full font-semibold",
                                style: {
                                    backgroundColor: "".concat(ORANGE, "15"),
                                    color: ORANGE
                                },
                                children: "Demo · 1 free generation"
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 661,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                        lineNumber: 644,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"] && (authLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-4 h-4 rounded-full border-2 animate-spin",
                            style: {
                                borderColor: BORDER,
                                borderTopColor: ORANGE
                            }
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 669,
                            columnNumber: 15
                        }, this) : user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs hidden sm:inline truncate max-w-[140px]",
                                    style: {
                                        color: BROWN3
                                    },
                                    children: user.email
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 672,
                                    columnNumber: 17
                                }, this),
                                isPaid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs px-2 py-0.5 rounded-full font-semibold",
                                    style: {
                                        backgroundColor: "".concat(ORANGE, "15"),
                                        color: ORANGE
                                    },
                                    children: "Pro"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 674,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowUpgradeModal(true),
                                    className: "text-xs px-2 py-0.5 rounded-full font-semibold transition-colors hover:opacity-80",
                                    style: {
                                        backgroundColor: SURF2,
                                        color: BROWN3
                                    },
                                    title: "".concat(generationsUsed, "/1 free generation used"),
                                    children: [
                                        "Free · ",
                                        generationsUsed,
                                        "/1"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 678,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        var _user_email;
                                        setContactForm({
                                            name: "",
                                            email: (_user_email = user === null || user === void 0 ? void 0 : user.email) !== null && _user_email !== void 0 ? _user_email : "",
                                            message: ""
                                        });
                                        setContactStatus("idle");
                                        setShowContactModal(true);
                                    },
                                    className: "text-xs px-2.5 py-1 rounded-lg transition-all duration-150",
                                    style: {
                                        border: "1px solid ".concat(BORDER),
                                        color: BROWN3,
                                        background: 'none'
                                    },
                                    children: "Contact"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 687,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: signOut,
                                    className: "text-xs px-2.5 py-1 rounded-lg transition-all duration-150",
                                    style: {
                                        border: "1px solid ".concat(BORDER),
                                        color: BROWN3,
                                        background: 'none'
                                    },
                                    children: "Sign out"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 694,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowAuthModal(true),
                            className: "text-xs px-3 py-1.5 rounded-lg font-semibold transition-all duration-150 active:scale-95 text-white",
                            style: {
                                background: "linear-gradient(135deg, ".concat(ORANGE, ", ").concat(AMBER, ")")
                            },
                            children: "Sign in"
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 703,
                            columnNumber: 15
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                        lineNumber: 666,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                lineNumber: 640,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl leading-tight",
                                        style: {
                                            fontFamily: "'Instrument Sans', sans-serif",
                                            fontWeight: 500,
                                            color: BROWN
                                        },
                                        children: "HumbleUI Prompt Generator"
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 720,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm mt-1",
                                        style: {
                                            color: BROWN3
                                        },
                                        children: "Generate senior-level dev prompts for any use case"
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 723,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 719,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepLabel, {
                                        number: "1",
                                        label: "Use Case",
                                        active: true
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 728,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: USE_CASES.map((uc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedUseCase(uc.id),
                                                className: "p-3 rounded-xl text-left transition-all duration-150 active:scale-95",
                                                style: {
                                                    border: "1px solid ".concat(selectedUseCase === uc.id ? ORANGE : BORDER),
                                                    backgroundColor: selectedUseCase === uc.id ? "".concat(ORANGE, "08") : SURF
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-base mb-0.5",
                                                        children: uc.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                        lineNumber: 740,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-semibold",
                                                        style: {
                                                            color: BROWN
                                                        },
                                                        children: uc.label.split(" ").slice(1).join(" ")
                                                    }, void 0, false, {
                                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                        lineNumber: 741,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs leading-tight mt-0.5",
                                                        style: {
                                                            color: BROWN3
                                                        },
                                                        children: uc.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                        lineNumber: 742,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, uc.id, true, {
                                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                lineNumber: 731,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 729,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 727,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepLabel, {
                                        number: "2",
                                        label: "Describe Your App",
                                        active: !!appIdea
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 750,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: appIdea,
                                        onChange: (e)=>setAppIdea(e.target.value),
                                        placeholder: "e.g. ".concat(selectedUseCase === "mobile" ? "a habit tracker with streaks and reminders" : selectedUseCase === "dashboard" ? "a SaaS analytics dashboard for a B2B startup" : selectedUseCase === "landing" ? "a project management tool for remote teams" : selectedUseCase === "saas" ? "a team collaboration and task management app" : selectedUseCase === "portfolio" ? "a UX designer with 5 years of experience" : "a premium sneaker store with limited drops"),
                                        rows: 3,
                                        className: "w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors",
                                        style: {
                                            ...inputStyle,
                                            borderColor: appIdea ? ORANGE : BORDER
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 751,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowExtraContext(!showExtraContext),
                                        className: "mt-2 text-xs flex items-center gap-1 transition-colors",
                                        style: {
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            cursor: 'pointer',
                                            color: BROWN3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: showExtraContext ? "▾" : "▸"
                                            }, void 0, false, {
                                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                lineNumber: 771,
                                                columnNumber: 15
                                            }, this),
                                            showExtraContext ? "Hide" : "Add",
                                            " extra context (optional)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 766,
                                        columnNumber: 13
                                    }, this),
                                    showExtraContext && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: extraContext,
                                        onChange: (e)=>setExtraContext(e.target.value),
                                        placeholder: "Target audience, specific features, brand tone, technical constraints...",
                                        rows: 2,
                                        className: "mt-2 w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors",
                                        style: inputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 775,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 749,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepLabel, {
                                        number: "3",
                                        label: "Complexity",
                                        active: true
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 788,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: COMPLEXITY_LEVELS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedComplexity(c.id),
                                                className: "flex-1 p-3 rounded-xl text-center transition-all duration-150 active:scale-95",
                                                style: {
                                                    border: "1px solid ".concat(selectedComplexity === c.id ? ORANGE : BORDER),
                                                    backgroundColor: selectedComplexity === c.id ? "".concat(ORANGE, "08") : SURF
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-semibold",
                                                        style: {
                                                            color: BROWN
                                                        },
                                                        children: c.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                        lineNumber: 800,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs mt-0.5",
                                                        style: {
                                                            color: BROWN3
                                                        },
                                                        children: [
                                                            c.screens,
                                                            " screens"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                        lineNumber: 801,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, c.id, true, {
                                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                lineNumber: 791,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 789,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 787,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepLabel, {
                                        number: "4",
                                        label: "Color Palette",
                                        active: true
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 809,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: COLOR_SLOTS.map((param, index)=>{
                                            let { label, hint } = param;
                                            const value = customPalette.colors[index];
                                            const valid = isValidHex(value);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            var _colorRefs_current_index;
                                                            return (_colorRefs_current_index = colorRefs.current[index]) === null || _colorRefs_current_index === void 0 ? void 0 : _colorRefs_current_index.click();
                                                        },
                                                        className: "shrink-0 w-10 h-10 rounded-lg border-2 transition-all duration-150 active:scale-95",
                                                        style: {
                                                            backgroundColor: valid ? value : BORDER,
                                                            borderColor: valid ? value : BORDER,
                                                            boxShadow: valid ? "0 0 0 2px ".concat(value, "30") : "none"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                        lineNumber: 816,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        ref: (el)=>colorRefs.current[index] = el,
                                                        type: "color",
                                                        value: valid ? value : "#000000",
                                                        onChange: (e)=>updateColor(index, e.target.value),
                                                        className: "sr-only"
                                                    }, void 0, false, {
                                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                        lineNumber: 825,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-semibold mb-1",
                                                                style: {
                                                                    color: BROWN
                                                                },
                                                                children: label
                                                            }, void 0, false, {
                                                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                                lineNumber: 833,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: value,
                                                                onChange: (e)=>updateColor(index, e.target.value),
                                                                placeholder: "#000000",
                                                                maxLength: 7,
                                                                spellCheck: false,
                                                                className: "w-full rounded-lg px-3 py-1.5 text-xs focus:outline-none transition-colors",
                                                                style: {
                                                                    backgroundColor: SURF,
                                                                    border: "1px solid ".concat(valid ? "".concat(value, "90") : BORDER),
                                                                    color: BROWN,
                                                                    fontFamily: "'IBM Plex Mono', monospace",
                                                                    colorScheme: "light"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                                lineNumber: 834,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs mt-0.5",
                                                                style: {
                                                                    color: BROWN3
                                                                },
                                                                children: hint
                                                            }, void 0, false, {
                                                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                                lineNumber: 850,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                        lineNumber: 832,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                lineNumber: 815,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 810,
                                        columnNumber: 13
                                    }, this),
                                    customPalette.colors.every(isValidHex) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 rounded-xl overflow-hidden flex h-6",
                                        style: {
                                            border: "1px solid ".concat(BORDER)
                                        },
                                        children: customPalette.colors.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                style: {
                                                    backgroundColor: c
                                                }
                                            }, i, false, {
                                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                lineNumber: 859,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 857,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 808,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: generatePrompt,
                                disabled: !canGenerate || !!user && profileLoading,
                                className: "w-full py-4 rounded-xl font-semibold text-sm text-white transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed",
                                style: {
                                    background: "linear-gradient(135deg, ".concat(ORANGE, ", ").concat(AMBER, ")")
                                },
                                children: !withinLimit ? "🔒 Upgrade to Generate More" : promptGenerated ? "→ Generate New Prompt" : "→ Generate Prompt"
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 866,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                        lineNumber: 718,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: generatedPrompt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl overflow-hidden flex flex-col h-full",
                            style: {
                                border: "1px solid ".concat(BORDER)
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between px-4 py-3 shrink-0",
                                    style: {
                                        backgroundColor: SURF2,
                                        borderBottom: "1px solid ".concat(BORDER)
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PalettePreview, {
                                                    colors: palette.colors,
                                                    name: palette.name
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 888,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-px h-4",
                                                    style: {
                                                        backgroundColor: BORDER
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 889,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs",
                                                    style: {
                                                        color: BROWN3
                                                    },
                                                    children: [
                                                        (_USE_CASES_find = USE_CASES.find((u)=>u.id === selectedUseCase)) === null || _USE_CASES_find === void 0 ? void 0 : _USE_CASES_find.label,
                                                        " · ",
                                                        complexity.label
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 890,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                            lineNumber: 887,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs",
                                                    style: {
                                                        color: BROWN3
                                                    },
                                                    children: [
                                                        charCount.toLocaleString(),
                                                        " chars"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 895,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: copyToClipboard,
                                                    className: "text-xs px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 font-semibold text-white",
                                                    style: {
                                                        backgroundColor: copied ? "#16a34a" : ORANGE
                                                    },
                                                    children: copied ? "✓ Copied!" : "Copy"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 896,
                                                    columnNumber: 19
                                                }, this),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleSaveClick,
                                                    className: "text-xs px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 font-semibold",
                                                    style: {
                                                        border: "1px solid ".concat(BORDER),
                                                        color: BROWN3,
                                                        background: 'none'
                                                    },
                                                    children: "💾 Save"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 904,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                            lineNumber: 894,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 883,
                                    columnNumber: 15
                                }, this),
                                showSaveInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-3 flex flex-col gap-2",
                                    style: {
                                        backgroundColor: SURF2,
                                        borderBottom: "1px solid ".concat(BORDER)
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    ref: saveInputRef,
                                                    type: "text",
                                                    value: saveName,
                                                    onChange: (e)=>setSaveName(e.target.value),
                                                    onKeyDown: (e)=>{
                                                        if (e.key === "Enter") handleSaveConfirm();
                                                        if (e.key === "Escape") setShowSaveInput(false);
                                                    },
                                                    placeholder: "Name this prompt…",
                                                    maxLength: 80,
                                                    className: "flex-1 rounded-lg px-3 py-1.5 text-xs focus:outline-none transition-colors",
                                                    style: {
                                                        ...inputStyle,
                                                        fontSize: '12px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 919,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleSaveConfirm,
                                                    disabled: saving || !saveName.trim(),
                                                    className: "text-xs px-3 py-1.5 rounded-lg font-semibold transition-all duration-150 active:scale-95 disabled:opacity-40 text-white",
                                                    style: {
                                                        backgroundColor: "#16a34a"
                                                    },
                                                    children: saving ? "…" : "Save ✓"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 930,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowSaveInput(false),
                                                    className: "text-sm px-1 transition-colors",
                                                    style: {
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: BROWN3
                                                    },
                                                    children: "✕"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 938,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                            lineNumber: 918,
                                            columnNumber: 19
                                        }, this),
                                        saveError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs",
                                            style: {
                                                color: '#DC2626'
                                            },
                                            children: saveError
                                        }, void 0, false, {
                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                            lineNumber: 946,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 917,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    className: "p-5 text-xs whitespace-pre-wrap leading-relaxed overflow-y-auto flex-1 max-h-[calc(100vh-50px)]",
                                    style: {
                                        backgroundColor: BROWN,
                                        color: '#F5E6D3',
                                        fontFamily: "'IBM Plex Mono', monospace"
                                    },
                                    children: generatedPrompt
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 951,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-2.5 shrink-0",
                                    style: {
                                        backgroundColor: SURF2,
                                        borderTop: "1px solid ".concat(BORDER)
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs",
                                        style: {
                                            color: BROWN3
                                        },
                                        children: [
                                            "Paste into ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: BROWN2
                                                },
                                                children: "Claude Code"
                                            }, void 0, false, {
                                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                lineNumber: 961,
                                                columnNumber: 30
                                            }, this),
                                            ", Claude.ai, or any frontier model → get production-ready code"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                        lineNumber: 960,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 959,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 881,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl flex-1 flex flex-col items-center justify-center p-12 text-center",
                            style: {
                                border: "1px dashed ".concat(BORDER)
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl mb-4",
                                    children: ((_USE_CASES_find1 = USE_CASES.find((u)=>u.id === selectedUseCase)) === null || _USE_CASES_find1 === void 0 ? void 0 : _USE_CASES_find1.icon) || "✨"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 970,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold mb-1",
                                    style: {
                                        color: BROWN3
                                    },
                                    children: (_USE_CASES_find2 = USE_CASES.find((u)=>u.id === selectedUseCase)) === null || _USE_CASES_find2 === void 0 ? void 0 : _USE_CASES_find2.label
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 973,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs",
                                    style: {
                                        color: BROWN3
                                    },
                                    children: "Fill in the details on the left and hit Generate"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 976,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex flex-col gap-1.5 text-left",
                                    children: [
                                        "Use case → tailored style tokens",
                                        "Complexity → screen count",
                                        "Your hex codes → exact brand colors",
                                        "Context → sharper output"
                                    ].map((tip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-xs",
                                            style: {
                                                color: BROWN3
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: ORANGE
                                                    },
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 982,
                                                    columnNumber: 21
                                                }, this),
                                                " ",
                                                tip
                                            ]
                                        }, tip, true, {
                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                            lineNumber: 981,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 979,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 966,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                        lineNumber: 879,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                lineNumber: 715,
                columnNumber: 7
            }, this),
            __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"] && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto px-4 pb-12 pt-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$components$2f$SavedPrompts$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    prompts: prompts,
                    loading: promptsLoading,
                    onLoad: handleLoad,
                    onDelete: deletePrompt
                }, void 0, false, {
                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                    lineNumber: 994,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                lineNumber: 993,
                columnNumber: 9
            }, this),
            showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$components$2f$AuthModal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setShowAuthModal(false),
                onSignIn: signIn
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                lineNumber: 1005,
                columnNumber: 9
            }, this),
            showContactModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center px-4",
                style: {
                    backgroundColor: "rgba(28,10,2,0.55)",
                    backdropFilter: "blur(6px)"
                },
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setShowContactModal(false);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl p-8 max-w-md w-full relative",
                    style: {
                        backgroundColor: SURF,
                        border: "1px solid ".concat(BORDER),
                        boxShadow: '0 24px 60px rgba(92,46,10,0.18)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowContactModal(false),
                            className: "absolute top-4 right-4 transition-colors text-lg leading-none",
                            style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: BROWN3
                            },
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 1019,
                            columnNumber: 13
                        }, this),
                        contactStatus === "sent" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-3xl mb-3",
                                    children: "✉️"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 1027,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-lg mb-2",
                                    style: {
                                        color: BROWN,
                                        fontFamily: "'Instrument Sans', sans-serif"
                                    },
                                    children: "Message sent!"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 1028,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    style: {
                                        color: BROWN3
                                    },
                                    children: "We'll get back to you as soon as possible."
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 1029,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowContactModal(false),
                                    className: "mt-6 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 active:scale-95",
                                    style: {
                                        background: "linear-gradient(135deg, ".concat(ORANGE, ", ").concat(AMBER, ")")
                                    },
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 1030,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 1026,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-lg mb-1",
                                    style: {
                                        color: BROWN,
                                        fontFamily: "'Instrument Sans', sans-serif"
                                    },
                                    children: "Contact us"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 1038,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mb-6",
                                    style: {
                                        color: BROWN3
                                    },
                                    children: "We read every message."
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 1039,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs mb-1.5",
                                                    style: {
                                                        color: BROWN3
                                                    },
                                                    children: "Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1042,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: contactForm.name,
                                                    onChange: (e)=>setContactForm((f)=>({
                                                                ...f,
                                                                name: e.target.value
                                                            })),
                                                    placeholder: "Your name",
                                                    className: "w-full rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors",
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1043,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                            lineNumber: 1041,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs mb-1.5",
                                                    style: {
                                                        color: BROWN3
                                                    },
                                                    children: "Email"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1053,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    value: contactForm.email,
                                                    onChange: (e)=>setContactForm((f)=>({
                                                                ...f,
                                                                email: e.target.value
                                                            })),
                                                    placeholder: "you@example.com",
                                                    className: "w-full rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors",
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1054,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                            lineNumber: 1052,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs mb-1.5",
                                                    style: {
                                                        color: BROWN3
                                                    },
                                                    children: "Message"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1064,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    value: contactForm.message,
                                                    onChange: (e)=>setContactForm((f)=>({
                                                                ...f,
                                                                message: e.target.value
                                                            })),
                                                    placeholder: "How can we help?",
                                                    rows: 4,
                                                    className: "w-full rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors resize-none",
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1065,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                            lineNumber: 1063,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 1040,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;
                                        const subject = encodeURIComponent("Humble-UI — message from ".concat(contactForm.name));
                                        const body = encodeURIComponent("Name: ".concat(contactForm.name, "\nEmail: ").concat(contactForm.email, "\n\n").concat(contactForm.message));
                                        window.location.href = "mailto:support@humble-ui.com?subject=".concat(subject, "&body=").concat(body);
                                        setContactStatus("sent");
                                    },
                                    disabled: !contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim(),
                                    className: "mt-6 w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",
                                    style: {
                                        background: "linear-gradient(135deg, ".concat(ORANGE, ", ").concat(AMBER, ")")
                                    },
                                    children: "Send message →"
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 1075,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                    lineNumber: 1018,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                lineNumber: 1013,
                columnNumber: 9
            }, this),
            showUpgradeModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center px-4",
                style: {
                    backgroundColor: "rgba(28,10,2,0.55)",
                    backdropFilter: "blur(6px)"
                },
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setShowUpgradeModal(false);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl p-8 max-w-md w-full relative",
                    style: {
                        backgroundColor: SURF,
                        border: "1px solid ".concat(BORDER),
                        boxShadow: '0 24px 60px rgba(92,46,10,0.18)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowUpgradeModal(false),
                            className: "absolute top-4 right-4 transition-colors text-lg leading-none",
                            style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: BROWN3
                            },
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 1103,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                            style: {
                                backgroundColor: "".concat(ORANGE, "15")
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: ORANGE,
                                    fontSize: 18
                                },
                                children: "🔒"
                            }, void 0, false, {
                                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                lineNumber: 1110,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 1109,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-lg mb-1",
                            style: {
                                color: BROWN,
                                fontFamily: "'Instrument Sans', sans-serif"
                            },
                            children: demoMode ? "Enjoyed the demo?" : "You've used your free generation"
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 1112,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mb-6",
                            style: {
                                color: BROWN3
                            },
                            children: demoMode ? "Create a free account to get 1 more generation — then onto a paid plan for unlimited." : "Upgrade to keep generating unlimited prompts for any use case."
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 1115,
                            columnNumber: 13
                        }, this),
                        demoMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                localStorage.setItem('humble-ui-show-pricing', 'true');
                                setShowUpgradeModal(false);
                                onDemoSignUp === null || onDemoSignUp === void 0 ? void 0 : onDemoSignUp();
                            },
                            className: "w-full py-2.5 rounded-xl font-semibold text-sm text-white mb-4 transition-all duration-150 active:scale-95",
                            style: {
                                background: "linear-gradient(135deg, ".concat(ORANGE, ", ").concat(AMBER, ")")
                            },
                            children: "Create free account →"
                        }, void 0, false, {
                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                            lineNumber: 1121,
                            columnNumber: 15
                        }, this),
                        !demoMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-5 rounded-xl flex flex-col",
                                            style: {
                                                border: "1px solid ".concat(BORDER),
                                                backgroundColor: SURF2
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs uppercase tracking-widest mb-3",
                                                    style: {
                                                        color: BROWN3
                                                    },
                                                    children: "Monthly"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-2xl font-semibold",
                                                            style: {
                                                                color: BROWN,
                                                                fontFamily: "'Instrument Sans', sans-serif"
                                                            },
                                                            children: "$9.99"
                                                        }, void 0, false, {
                                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                            lineNumber: 1137,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs",
                                                            style: {
                                                                color: BROWN3
                                                            },
                                                            children: " /mo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                            lineNumber: 1138,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1136,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs mb-5",
                                                    style: {
                                                        color: BROWN3
                                                    },
                                                    children: "Cancel anytime."
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1140,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$posthog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["capture"])("plan_upgraded", {
                                                            plan: "monthly"
                                                        });
                                                        const link = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$stripe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStripeLink"])("monthly", user);
                                                        if (link) window.location.href = link;
                                                    },
                                                    className: "mt-auto w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 active:scale-95",
                                                    style: {
                                                        border: "1px solid ".concat(ORANGE, "60"),
                                                        color: ORANGE,
                                                        background: "none"
                                                    },
                                                    children: "Upgrade Monthly ↗"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1141,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                            lineNumber: 1134,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-5 rounded-xl flex flex-col relative overflow-hidden",
                                            style: {
                                                border: "2px solid ".concat(ORANGE),
                                                background: "linear-gradient(135deg, ".concat(ORANGE, "10, ").concat(BG, ")")
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full text-white",
                                                    style: {
                                                        backgroundColor: ORANGE
                                                    },
                                                    children: "Best value"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1152,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs uppercase tracking-widest mb-3",
                                                    style: {
                                                        color: ORANGE
                                                    },
                                                    children: "Lifetime"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1155,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl font-semibold",
                                                        style: {
                                                            color: BROWN,
                                                            fontFamily: "'Instrument Sans', sans-serif"
                                                        },
                                                        children: "$49.99"
                                                    }, void 0, false, {
                                                        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                        lineNumber: 1157,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1156,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs mb-5",
                                                    style: {
                                                        color: BROWN3
                                                    },
                                                    children: "One-time. Forever."
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1159,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$posthog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["capture"])("plan_upgraded", {
                                                            plan: "lifetime"
                                                        });
                                                        const link = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$lib$2f$stripe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStripeLink"])("lifetime", user);
                                                        if (link) window.location.href = link;
                                                    },
                                                    className: "mt-auto w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-150 active:scale-95",
                                                    style: {
                                                        background: "linear-gradient(135deg, ".concat(ORANGE, ", ").concat(AMBER, ")")
                                                    },
                                                    children: "Get Lifetime ↗"
                                                }, void 0, false, {
                                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                                    lineNumber: 1160,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                            lineNumber: 1151,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 1132,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-center text-xs mt-5",
                                    style: {
                                        color: BROWN3
                                    },
                                    children: "Secure checkout via Stripe. Cancel monthly anytime."
                                }, void 0, false, {
                                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                                    lineNumber: 1170,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                    lineNumber: 1102,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
                lineNumber: 1097,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/mobiledev-web/src/components/ComplexGenerator.jsx",
        lineNumber: 638,
        columnNumber: 5
    }, this);
}
_s(PromptGenerator, "RWskInV6D8Orm/SjLc2xGEiuLPU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useSavedPrompts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSavedPrompts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useGeneratedPrompts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGeneratedPrompts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$mobiledev$2d$web$2f$src$2f$hooks$2f$useProfile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"]
    ];
});
_c2 = PromptGenerator;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "StepLabel");
__turbopack_context__.k.register(_c1, "PalettePreview");
__turbopack_context__.k.register(_c2, "PromptGenerator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=mobiledev-web_src_f1d71e01._.js.map