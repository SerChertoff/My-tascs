// Простая система аутентификации с использованием localStorage

export interface User {
  email: string
  password: string
  name?: string
}

const STORAGE_KEY = 'task-sync-users'
const CURRENT_USER_KEY = 'task-sync-current-user'

// Получить всех зарегистрированных пользователей
export function getUsers(): User[] {
  if (typeof window === 'undefined') return []
  const usersJson = localStorage.getItem(STORAGE_KEY)
  return usersJson ? JSON.parse(usersJson) : []
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

// Регистрация нового пользователя
export function register(email: string, password: string, name?: string): boolean {
  if (!email || !password) return false
  
  const users = getUsers()
  const existingUser = users.find(u => u.email === email)
  
  if (existingUser) {
    return false // Пользователь уже существует
  }
  
  saveUser({ email, password, name })
  return true
}

// Вход пользователя
export function login(email: string, password: string): boolean {
  if (!email || !password) return false
  
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  
  if (user) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ email: user.email, name: user.name }))
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

// Получить текущего пользователя
export function getCurrentUser(): { email: string; name?: string } | null {
  if (typeof window === 'undefined') return null
  const userJson = localStorage.getItem(CURRENT_USER_KEY)
  return userJson ? JSON.parse(userJson) : null
}

// Проверить, авторизован ли пользователь
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
