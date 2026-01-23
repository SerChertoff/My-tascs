// Система уведомлений (Toast)

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

let toastListeners: ((toasts: Toast[]) => void)[] = []
let toasts: Toast[] = []

export function subscribeToToasts(callback: (toasts: Toast[]) => void) {
  toastListeners.push(callback)
  callback([...toasts])
  
  return () => {
    toastListeners = toastListeners.filter(listener => listener !== callback)
  }
}

function notifyListeners() {
  toastListeners.forEach(listener => listener([...toasts]))
}

export function showToast(message: string, type: ToastType = 'info', duration: number = 3000) {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
  const toast: Toast = { id, message, type, duration }
  
  toasts.push(toast)
  notifyListeners()
  
  setTimeout(() => {
    removeToast(id)
  }, duration)
  
  return id
}

export function removeToast(id: string) {
  toasts = toasts.filter(toast => toast.id !== id)
  notifyListeners()
}

export function clearToasts() {
  toasts = []
  notifyListeners()
}

// Вспомогательные функции
export const toast = {
  success: (message: string, duration?: number) => showToast(message, 'success', duration),
  error: (message: string, duration?: number) => showToast(message, 'error', duration),
  info: (message: string, duration?: number) => showToast(message, 'info', duration),
  warning: (message: string, duration?: number) => showToast(message, 'warning', duration),
}
