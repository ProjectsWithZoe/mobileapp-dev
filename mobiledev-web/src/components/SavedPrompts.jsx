import { useState, useCallback } from 'react'

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
  const diff = Date.now() - new Date(iso).getTime()
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
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 animate-pulse">
      <div className="h-3 bg-gray-800 rounded w-2/3 mb-3" />
      <div className="h-2 bg-gray-800 rounded w-1/2 mb-2" />
      <div className="h-2 bg-gray-800 rounded w-4/5 mb-4" />
      <div className="flex gap-2">
        <div className="h-7 bg-gray-800 rounded-lg flex-1" />
        <div className="h-7 bg-gray-800 rounded-lg w-10" />
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
      className="rounded-xl border border-gray-800 bg-gray-900 p-4 flex flex-col gap-3 transition-all duration-150 hover:border-gray-700"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-white text-xs font-bold leading-snug line-clamp-2 flex-1">{saved.name}</p>
        <span className="text-gray-600 text-xs shrink-0">{relativeTime(saved.created_at)}</span>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Palette dots */}
        <div className="flex">
          {palette.colors.map((c, i) => (
            <div
              key={c}
              className="w-3 h-3 rounded-full border-2 border-gray-900"
              style={{ backgroundColor: c, marginLeft: i > 0 ? '-3px' : 0 }}
            />
          ))}
        </div>
        <span className="text-gray-600 text-xs">{palette.name}</span>
        <span className="text-gray-800">·</span>
        <span className="text-gray-500 text-xs">
          {USE_CASE_ICONS[saved.use_case] ?? ''} {saved.use_case}
        </span>
        <span className="text-gray-800">·</span>
        <span
          className="text-xs px-1.5 py-0.5 rounded-md font-semibold"
          style={{ backgroundColor: '#6C63FF20', color: '#6C63FF' }}
        >
          {saved.complexity}
        </span>
      </div>

      {/* App idea snippet */}
      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{saved.app_idea}</p>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto">
        <button
          onClick={() => onLoad(saved)}
          className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 active:scale-95"
          style={{ backgroundColor: '#6C63FF20', color: '#6C63FF' }}
        >
          Load ↩
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 active:scale-95"
          style={{
            backgroundColor: confirmDelete ? '#ef444420' : '#1f2937',
            color: confirmDelete ? '#ef4444' : '#6b7280',
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
          className="border border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center py-12 text-center mt-4"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <span className="text-4xl mb-3">💾</span>
          <p className="text-gray-500 text-sm font-bold">No saved prompts yet</p>
          <p className="text-gray-700 text-xs mt-1">Generate a prompt above and click Save to store it here</p>
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
      className="flex items-center gap-3 border-b border-gray-800 pb-3"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <span className="text-xs uppercase tracking-widest font-semibold text-gray-500">Saved Prompts</span>
      {!loading && (
        <span
          className="text-xs px-1.5 py-0.5 rounded-md font-bold"
          style={{ backgroundColor: '#1f2937', color: '#6b7280' }}
        >
          {count}
        </span>
      )}
    </div>
  )
}
