// Система аутентификации: localStorage или бэкенд (см. authApi.ts)

export interface User {
  email: string
  password?: string
  name?: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
}

const STORAGE_KEY = 'task-sync-users'
const CURRENT_USER_KEY = 'task-sync-current-user'

// Получить всех зарегистрированных пользователей
export function getUsers(): User[] {
  if (typeof window === 'undefined') return []
  try {
    const usersJson = localStorage.getItem(STORAGE_KEY)
    return usersJson ? JSON.parse(usersJson) : []
  } catch {
    return []
  }
}

// Сохранить пользователя
export function saveUser(user: User): void {
  if (typeof window === 'undefined') return
  const users = getUsers()
  const existingUserIndex = users.findIndex(u => u.email === user.email)
  
  if (existingUserIndex >= 0) {
    users[existingUserIndex] = user
  } else {
    users.push(user)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

// Регистрация нового пользователя (локально)
export function register(
  email: string,
  password: string,
  options?: { name?: string; firstName?: string; lastName?: string; avatarUrl?: string }
): boolean {
  if (!email || !password) return false
  
  const users = getUsers()
  const existingUser = users.find(u => u.email === email)
  
  if (existingUser) {
    return false
  }
  
  const name = options?.name ?? ([options?.firstName, options?.lastName].filter(Boolean).join(' ').trim() || undefined)
  saveUser({ email, password, name, firstName: options?.firstName, lastName: options?.lastName, avatarUrl: options?.avatarUrl })
  return true
}

// Вход пользователя
export function login(email: string, password: string): boolean {
  if (!email || !password) return false
  
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  
  if (user) {
    if (typeof window !== 'undefined') {
      const session = { email: user.email, name: user.name, firstName: user.firstName, lastName: user.lastName, avatarUrl: user.avatarUrl }
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(session))
    }
    return true
  }
  
  return false
}

// Выход
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

// Получить текущего пользователя (для отображения в приложении)
export function getCurrentUser(): { email: string; name?: string; firstName?: string; lastName?: string; avatarUrl?: string } | null {
  if (typeof window === 'undefined') return null
  try {
    const userJson = localStorage.getItem(CURRENT_USER_KEY)
    return userJson ? JSON.parse(userJson) : null
  } catch {
    return null
  }
}

// Отображаемое имя: name или "firstName lastName"
export function getDisplayName(user: { name?: string; firstName?: string; lastName?: string; email?: string } | null): string {
  if (!user) return ''
  if (user.name) return user.name
  const full = [user.firstName, user.lastName].filter(Boolean).join(' ').trim()
  if (full) return full
  return user.email || ''
}

// Проверить, авторизован ли пользователь
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

// Обновить данные пользователя (локально)
export function updateUser(updates: { name?: string; firstName?: string; lastName?: string; avatarUrl?: string | null }): void {
  if (typeof window === 'undefined') return
  const currentUser = getCurrentUser()
  if (currentUser) {
    const updatedUser = { ...currentUser }
    if (updates.name !== undefined) updatedUser.name = updates.name
    if (updates.firstName !== undefined) updatedUser.firstName = updates.firstName
    if (updates.lastName !== undefined) updatedUser.lastName = updates.lastName
    if (updates.avatarUrl !== undefined) {
      if (updates.avatarUrl === null || updates.avatarUrl === '') delete updatedUser.avatarUrl
      else updatedUser.avatarUrl = updates.avatarUrl
    }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
    const users = getUsers()
    const idx = users.findIndex(u => u.email === currentUser.email)
    if (idx >= 0) {
      if (updates.name !== undefined) users[idx].name = updates.name
      if (updates.firstName !== undefined) users[idx].firstName = updates.firstName
      if (updates.lastName !== undefined) users[idx].lastName = updates.lastName
      if (updates.avatarUrl !== undefined) {
        if (updates.avatarUrl === null || updates.avatarUrl === '') delete users[idx].avatarUrl
        else users[idx].avatarUrl = updates.avatarUrl
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    }
  }
}
