import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useSavedPrompts(userId) {
  const [prompts, setPrompts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchPrompts = useCallback(async () => {
    if (!supabase || !userId) { setPrompts([]); return }
    setLoading(true)
    const { data, error } = await supabase
      .from('saved_prompts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (!error) setPrompts(data ?? [])
    setLoading(false)
  }, [userId])

  useEffect(() => { fetchPrompts() }, [fetchPrompts])

  const savePrompt = useCallback(async ({ name, app_idea, use_case, palette_index, complexity, extra_context, prompt_text }) => {
    if (!supabase || !userId) return
    const row = { user_id: userId, name, app_idea, use_case, palette_index, complexity, extra_context: extra_context ?? '', prompt_text }
    // Optimistic insert with a temporary id
    const tempId = `temp-${Date.now()}`
    setPrompts((prev) => [{ ...row, id: tempId, created_at: new Date().toISOString() }, ...prev])
    const { data, error } = await supabase.from('saved_prompts').insert(row).select().single()
    if (error) {
      // Roll back optimistic update on failure
      setPrompts((prev) => prev.filter((p) => p.id !== tempId))
      throw error
    }
    // Replace temp entry with real row from db
    setPrompts((prev) => prev.map((p) => (p.id === tempId ? data : p)))
  }, [userId])

  const deletePrompt = useCallback(async (id) => {
    // Optimistic removal
    setPrompts((prev) => prev.filter((p) => p.id !== id))
    const { error } = await supabase.from('saved_prompts').delete().eq('id', id)
    if (error) {
      // Re-fetch to restore on failure
      fetchPrompts()
      throw error
    }
  }, [fetchPrompts])

  return { prompts, loading, savePrompt, deletePrompt, refresh: fetchPrompts }
}
