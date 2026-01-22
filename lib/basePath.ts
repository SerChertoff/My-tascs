export function getBasePath(): string {
  if (typeof window !== 'undefined') {
    // В браузере проверяем текущий путь
    const path = window.location.pathname
    if (path.startsWith('/My-tascs')) {
      return '/My-tascs'
    }
  }
  // На сервере или в разработке
  return process.env.NODE_ENV === 'production' ? '/My-tascs' : ''
}
