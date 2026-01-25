// Простая система аутентификации с использованием localStorage

export interface User {
  email: string
  password: string
  name?: string
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
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ email: user.email, name: user.name, avatarUrl: user.avatarUrl }))
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
export function getCurrentUser(): { email: string; name?: string; avatarUrl?: string } | null {
  if (typeof window === 'undefined') return null
  try {
    const userJson = localStorage.getItem(CURRENT_USER_KEY)
    return userJson ? JSON.parse(userJson) : null
  } catch {
    return null
  }
}

// Проверить, авторизован ли пользователь
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

// Обновить данные пользователя
export function updateUser(updates: { name?: string; avatarUrl?: string }): void {
  if (typeof window === 'undefined') return
  const currentUser = getCurrentUser()
  if (currentUser) {
    const updatedUser: { email: string; name?: string; avatarUrl?: string } = { ...currentUser }
    
    // Обновляем поля
    if (updates.name !== undefined) {
      updatedUser.name = updates.name
    }
    if (updates.avatarUrl !== undefined) {
      if (updates.avatarUrl === null || updates.avatarUrl === '') {
        delete updatedUser.avatarUrl
      } else {
        updatedUser.avatarUrl = updates.avatarUrl
      }
    }
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
    
    // Также обновляем в списке пользователей
    const users = getUsers()
    const userIndex = users.findIndex(u => u.email === currentUser.email)
    if (userIndex >= 0) {
      if (updates.name !== undefined) {
        users[userIndex].name = updates.name
      }
      if (updates.avatarUrl !== undefined) {
        if (updates.avatarUrl === null || updates.avatarUrl === '') {
          delete users[userIndex].avatarUrl
        } else {
          users[userIndex].avatarUrl = updates.avatarUrl
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    }
  }
}
