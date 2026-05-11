import { useState, useCallback } from 'react'

const ORANGE = "#EA580C"
const BROWN  = "#1C0A02"
const BROWN2 = "#5C2E0A"
const BROWN3 = "#9A6040"
const BG     = "#FFFBF7"
const SURF   = "#FFFFFF"
const SURF2  = "#FFF5EC"
const BORDER = "#E8CFBA"

// Must match the COLOR_PALETTES order in ComplexGenerator
const COLOR_PALETTES = [
  { name: "Midnight", colors: ["#0F0F23", "#6C63FF", "#FF6584"] },
  { name: "Forest",   colors: ["#1A2F23", "#4CAF7D", "#F5C842"] },
  { name: "Ember",    colors: ["#1C1410", "#E85D04", "#FFBA08"] },
  { name: "Ocean",    colors: ["#03045E", "#0096C7", "#ADE8F4"] },
  { name: "Blush",    colors: ["#2D1B2E", "#E040FB", "#F8BBD9"] },
  { name: "Slate",    colors: ["#0D1117", "#58A6FF", "#3FB950"] },
  { name: "Sunset",   colors: ["#1A0A00", "#FF6B35", "#FFE66D"] },
  { name: "Arctic",   colors: ["#0A1628", "#00D4FF", "#B8FFF9"] },
]

const USE_CASE_ICONS = {
  mobile:    "📱",
  dashboard: "📊",
  landing:   "🚀",
  saas:      "⚙️",
  portfolio: "🎨",
  ecommerce: "🛍️",
}

function relativeTime(iso) {
  const diff  = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (mins  < 1)  return 'just now'
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function SkeletonCard() {
  return (
    <div className="rounded-xl p-4 animate-pulse" style={{ border: `1px solid ${BORDER}`, backgroundColor: SURF }}>
      <div className="h-3 rounded w-2/3 mb-3" style={{ backgroundColor: BORDER }} />
      <div className="h-2 rounded w-1/2 mb-2" style={{ backgroundColor: BORDER }} />
      <div className="h-2 rounded w-4/5 mb-4" style={{ backgroundColor: BORDER }} />
      <div className="flex gap-2">
        <div className="h-7 rounded-lg flex-1" style={{ backgroundColor: BORDER }} />
        <div className="h-7 rounded-lg w-10" style={{ backgroundColor: BORDER }} />
      </div>
    </div>
  )
}

function PromptCard({ saved, onLoad, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const palette = COLOR_PALETTES[saved.palette_index] ?? COLOR_PALETTES[0]

  const handleDelete = useCallback(() => {
    if (confirmDelete) {
      onDelete(saved.id)
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
    }
  }, [confirmDelete, onDelete, saved.id])

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3 transition-all duration-150"
      style={{ border: `1px solid ${BORDER}`, backgroundColor: SURF, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold leading-snug line-clamp-2 flex-1" style={{ color: BROWN }}>{saved.name}</p>
        <span className="text-xs shrink-0" style={{ color: BROWN3 }}>{relativeTime(saved.created_at)}</span>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex">
          {palette.colors.map((c, i) => (
            <div
              key={c}
              className="w-3 h-3 rounded-full border-2"
              style={{ backgroundColor: c, borderColor: SURF, marginLeft: i > 0 ? '-3px' : 0 }}
            />
          ))}
        </div>
        <span className="text-xs" style={{ color: BROWN3 }}>{palette.name}</span>
        <span style={{ color: BORDER }}>·</span>
        <span className="text-xs" style={{ color: BROWN3 }}>
          {USE_CASE_ICONS[saved.use_case] ?? ''} {saved.use_case}
        </span>
        <span style={{ color: BORDER }}>·</span>
        <span
          className="text-xs px-1.5 py-0.5 rounded-md font-semibold"
          style={{ backgroundColor: `${ORANGE}15`, color: ORANGE }}
        >
          {saved.complexity}
        </span>
      </div>

      {/* App idea snippet */}
      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: BROWN3 }}>{saved.app_idea}</p>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto">
        <button
          onClick={() => onLoad(saved)}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95"
          style={{ backgroundColor: `${ORANGE}15`, color: ORANGE, border: 'none' }}
        >
          Load ↩
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95"
          style={{
            backgroundColor: confirmDelete ? '#ef444420' : SURF2,
            color: confirmDelete ? '#ef4444' : BROWN3,
            border: 'none',
          }}
          title={confirmDelete ? 'Click again to confirm' : 'Delete'}
        >
          {confirmDelete ? 'Sure?' : '🗑'}
        </button>
      </div>
    </div>
  )
}

export default function SavedPrompts({ prompts, loading, onLoad, onDelete }) {
  if (loading) {
    return (
      <div>
        <SectionHeader count={0} loading />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      </div>
    )
  }

  return (
    <div>
      <SectionHeader count={prompts.length} />
      {prompts.length === 0 ? (
        <div
          className="rounded-2xl flex flex-col items-center justify-center py-12 text-center mt-4"
          style={{ border: `1px dashed ${BORDER}`, fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          <span className="text-4xl mb-3">💾</span>
          <p className="text-sm font-semibold" style={{ color: BROWN3 }}>No saved prompts yet</p>
          <p className="text-xs mt-1" style={{ color: BROWN3 }}>Generate a prompt above and click Save to store it here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {prompts.map((p) => (
            <PromptCard key={p.id} saved={p} onLoad={onLoad} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

function SectionHeader({ count, loading }) {
  return (
    <div
      className="flex items-center gap-3 pb-3"
      style={{ borderBottom: `1px solid ${BORDER}`, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: BROWN3 }}>Saved Prompts</span>
      {!loading && (
        <span
          className="text-xs px-1.5 py-0.5 rounded-md font-semibold"
          style={{ backgroundColor: SURF2, color: BROWN3 }}
        >
          {count}
        </span>
      )}
    </div>
  )
}
