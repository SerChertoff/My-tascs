// Настройки Pomodoro

const POMODORO_SETTINGS_KEY = 'task-sync-pomodoro-settings'

export interface PomodoroSettings {
  workInterval: number // в минутах
  intervalCount: number // количество интервалов
  breakInterval: number // в минутах
}

const defaultSettings: PomodoroSettings = {
  workInterval: 25,
  intervalCount: 4,
  breakInterval: 5,
}

export function getPomodoroSettings(): PomodoroSettings {
  if (typeof window === 'undefined') return defaultSettings
  const settingsJson = localStorage.getItem(POMODORO_SETTINGS_KEY)
  if (settingsJson) {
    try {
      return { ...defaultSettings, ...JSON.parse(settingsJson) }
    } catch {
      return defaultSettings
    }
  }
  return defaultSettings
}

export function savePomodoroSettings(settings: Partial<PomodoroSettings>): void {
  if (typeof window === 'undefined') return
  const current = getPomodoroSettings()
  const updated = { ...current, ...settings }
  localStorage.setItem(POMODORO_SETTINGS_KEY, JSON.stringify(updated))
}
