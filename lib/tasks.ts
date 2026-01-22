// Система управления задачами

export type TaskPriority = 'Low' | 'Medium' | 'High'
export type TaskStatus = 'pending' | 'completed'

export interface Task {
  id: string
  title: string
  description?: string
  time: string // Формат: "HH:MM AM/PM"
  date: string // Формат: "YYYY-MM-DD"
  priority: TaskPriority
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'task-sync-tasks'

// Получить все задачи
export function getTasks(): Task[] {
  if (typeof window === 'undefined') return []
  const tasksJson = localStorage.getItem(STORAGE_KEY)
  return tasksJson ? JSON.parse(tasksJson) : []
}

// Сохранить задачи
function saveTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

// Добавить задачу
export function addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Task {
  const tasks = getTasks()
  const newTask: Task = {
    ...task,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  tasks.push(newTask)
  saveTasks(tasks)
  return newTask
}

// Обновить задачу
export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const tasks = getTasks()
  const index = tasks.findIndex(t => t.id === id)
  if (index === -1) return null
  
  tasks[index] = {
    ...tasks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  saveTasks(tasks)
  return tasks[index]
}

// Удалить задачу
export function deleteTask(id: string): boolean {
  const tasks = getTasks()
  const filtered = tasks.filter(t => t.id !== id)
  if (filtered.length === tasks.length) return false
  saveTasks(filtered)
  return true
}

// Переключить статус задачи
export function toggleTaskStatus(id: string): Task | null {
  const task = getTasks().find(t => t.id === id)
  if (!task) return null
  return updateTask(id, {
    status: task.status === 'completed' ? 'pending' : 'completed'
  })
}

// Получить задачи на сегодня
export function getTodayTasks(): Task[] {
  const tasks = getTasks()
  const today = new Date().toISOString().split('T')[0]
  return tasks.filter(t => t.date === today)
}

// Получить задачи на неделю
export function getWeekTasks(): Task[] {
  const tasks = getTasks()
  const today = new Date()
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - today.getDay())
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)
  
  return tasks.filter(t => {
    const taskDate = new Date(t.date)
    return taskDate >= weekStart && taskDate <= weekEnd
  })
}

// Получить статистику
export function getTaskStats() {
  const tasks = getTasks()
  const todayTasks = getTodayTasks()
  const weekTasks = getWeekTasks()
  
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    today: todayTasks.length,
    todayCompleted: todayTasks.filter(t => t.status === 'completed').length,
    week: weekTasks.length,
  }
}

// Форматировать время для отображения
export function formatTime(time: string): string {
  // Если время уже в формате "HH:MM AM/PM", возвращаем как есть
  if (time.includes('AM') || time.includes('PM')) {
    return time
  }
  
  // Если время в формате "HH:MM", конвертируем
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

// Получить цвет приоритета
export function getPriorityColors(priority: TaskPriority): { bg: string; text: string } {
  switch (priority) {
    case 'High':
      return { bg: 'bg-[#FFE9E1]', text: 'text-[#FF7D53]' }
    case 'Medium':
      return { bg: 'bg-[#EDE8FF]', text: 'text-[#5F33E1]' }
    case 'Low':
      return { bg: 'bg-[#E3F2FF]', text: 'text-[#0087FF]' }
    default:
      return { bg: 'bg-[#EDE8FF]', text: 'text-[#5F33E1]' }
  }
}
