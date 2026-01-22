export function getBasePath(): string {
  if (typeof window !== 'undefined') {
    // В браузере проверяем текущий путь
    const path = window.location.pathname
    if (path.startsWith('/My-tascs')) {
      return '/My-tascs'
    }
    // В разработке возвращаем пустую строку
    return ''
  }
  // На сервере (SSR) - для production используем basePath
  // Для статического экспорта это не критично, так как все рендерится на клиенте
  return ''
}
