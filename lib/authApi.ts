/**
 * API-клиент авторизации для работы с бэкендом.
 * Используется, если задан NEXT_PUBLIC_API_URL.
 * Ожидаемые эндпоинты см. в BACKEND_API.md
 */

const CURRENT_USER_KEY = 'task-sync-current-user'
const AUTH_TOKEN_KEY = 'task-sync-auth-token'

function getApiUrl(): string {
  if (typeof window === 'undefined') return ''
  return (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')
}

export function isApiAuthEnabled(): boolean {
  return Boolean(getApiUrl())
}

export type ApiUser = {
  email: string
  name?: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
}

export type RegisterBody = {
  email: string
  password: string
  firstName?: string
  lastName?: string
  name?: string
  avatarUrl?: string
}

async function request<T>(
  path: string,
  options: Omit<RequestInit, 'body'> & { body?: unknown } = {}
): Promise<T> {
  const base = getApiUrl()
  if (!base) throw new Error('NEXT_PUBLIC_API_URL is not set')
  const { body, ...rest } = options
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(rest.headers as Record<string, string>),
  }
  const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${base}${path}`, {
    ...rest,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error((err as { message?: string }).message || `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function apiRegister(data: RegisterBody): Promise<{ user: ApiUser; token?: string }> {
  const result = await request<{ user: ApiUser; token?: string }>('/auth/register', {
    method: 'POST',
    body: data,
  })
  if (result.token && typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN_KEY, result.token)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user))
  }
  return result
}

export async function apiLogin(email: string, password: string): Promise<{ user: ApiUser; token?: string }> {
  const result = await request<{ user: ApiUser; token?: string }>('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
  if (result.token && typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN_KEY, result.token)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user))
  }
  return result
}

/** URL для редиректа на вход через Google (бэкенд отдаёт редирект на OAuth) */
export function getGoogleAuthUrl(): string {
  const base = getApiUrl()
  return base ? `${base}/auth/google` : ''
}

/** После редиректа с Google бэкенд редиректит сюда с ?token=... или отдаёт user; сохраняем в localStorage */
export function setSessionFromOAuth(user: ApiUser, token?: string): void {
  if (typeof window === 'undefined') return
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

export async function apiGetMe(): Promise<ApiUser> {
  const user = await request<ApiUser>('/auth/me', { method: 'GET' })
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  }
  return user
}

export async function apiUpdateProfile(updates: Partial<ApiUser>): Promise<ApiUser> {
  const user = await request<ApiUser>('/auth/profile', {
    method: 'PATCH',
    body: updates,
  })
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  }
  return user
}

export function apiLogout(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(CURRENT_USER_KEY)
}
