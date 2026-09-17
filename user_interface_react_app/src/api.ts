import type { ApiEnvelope } from './types'

export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { headers: { Accept: 'application/json' }, cache: 'no-store', signal })
  if (!response.ok) throw new Error(`API ${response.status}`)
  const payload = (await response.json()) as T | ApiEnvelope<T>
  if (payload && typeof payload === 'object' && 'data' in payload && payload.data !== undefined) return payload.data
  if (payload && typeof payload === 'object' && 'rows' in payload && payload.rows !== undefined) return payload.rows
  return payload as T
}
