'use client'

import { useEffect, useState } from 'react'
import { useBasePath } from '../lib/useBasePath'
import { getCurrentUser, logout } from '../lib/auth'
import {
  Task,
  getTodayTasks,
  getTasks,
  toggleTaskStatus,
  deleteTask,
  getTaskStats,
  getPriorityColors,
  formatTime,
} from '../lib/tasks'
import BottomNavigation from './BottomNavigation'

export default function Home() {
  const [user, setUser] = useState<{ email: string; name?: string; avatarUrl?: string } | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [stats, setStats] = useState(getTaskStats())
  const [pendingTasksCount, setPendingTasksCount] = useState(0)
  const basePath = useBasePath()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      window.location.href = `${basePath}/login`
    } else {
      setUser(currentUser)
      loadTasks()
    }
  }, [basePath])

  const loadTasks = () => {
    const todayTasks = getTodayTasks()
    // Сортируем: сначала незавершенные, потом завершенные, затем по времени
    const sorted = todayTasks.sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === 'pending' ? -1 : 1
      }
      return a.time.localeCompare(b.time)
    })
    setTasks(sorted)
    setStats(getTaskStats())
    
    // Подсчитываем предстоящие незавершенные задачи
    const allTasks = getTasks()
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    const pendingUpcoming = allTasks.filter(task => {
      if (task.status !== 'pending') return false
      const taskDate = new Date(task.date)
      const todayDate = new Date(today)
      return taskDate >= todayDate
    })
    setPendingTasksCount(pendingUpcoming.length)
  }

  const handleToggleTask = (id: string) => {
    toggleTaskStatus(id)
    loadTasks()
  }

  const handleDeleteTask = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
      deleteTask(id)
      loadTasks()
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-7 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-[46px] h-[46px] rounded-full bg-gray-200 overflow-hidden">
            <img
              src={`${basePath}/images/avatar.png`}
              alt="Avatar"
              width={46}
              height={46}
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-[#24252C]">Hello!</p>
            <p className="text-lg font-semibold text-[#24252C]">{user.name || user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`${basePath}/notifications`}
            className="relative cursor-pointer hover:opacity-70 transition-opacity"
          >
            <svg
              className="w-6 h-6 text-[#24252C]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {pendingTasksCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#5F33E1] rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white font-semibold">
                  {pendingTasksCount > 9 ? '9+' : pendingTasksCount}
                </span>
              </div>
            )}
          </a>
          <button onClick={handleLogout}>
            <svg
              className="w-6 h-6 text-[#24252C]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="19" cy="12" r="1" fill="currentColor" />
              <circle cx="5" cy="12" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Today's Tasks Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-[#24252C]">Today&apos;s Tasks</h2>
          <div className="w-4 h-4 bg-[#EEE9FF] rounded-full flex items-center justify-center">
            <span className="text-[11px] text-[#5F33E1] font-semibold">
              {tasks.filter(t => t.status === 'pending').length}
            </span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
            <p className="text-sm text-[#24252C] mb-2">Total</p>
            <p className="text-[64px] font-semibold text-[#24252C] leading-none">{stats.total}</p>
            {stats.total > 0 && (
              <p className="text-xs text-[#6E6A7C] mt-2">
                {stats.completed} completed
              </p>
            )}
          </div>
          <div className="bg-[#5F33E1] rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
            <p className="text-sm text-white mb-2">Completed tasks</p>
            <p className="text-[64px] font-semibold text-white leading-none">{stats.completed}</p>
            {stats.total > 0 && (
              <div className="mt-2">
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((stats.completed / stats.total) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="bg-[#5F33E1] rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
            <p className="text-sm text-white mb-2">Today tasks</p>
            <p className="text-[64px] font-semibold text-white leading-none">{stats.today}</p>
            {stats.today > 0 && (
              <p className="text-xs text-white/80 mt-2">
                {stats.todayCompleted} completed
              </p>
            )}
          </div>
          <div className="bg-white rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
            <p className="text-sm text-[#24252C] mb-2">Week tasks</p>
            <p className="text-[64px] font-semibold text-[#24252C] leading-none">{stats.week}</p>
            {stats.week > 0 && (
              <p className="text-xs text-[#6E6A7C] mt-2">
                This week
              </p>
            )}
          </div>
        </div>

        {/* Productivity Tools */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <a
            href={`${basePath}/pomodoro`}
            className="bg-gradient-to-br from-[#5F33E1] to-[#8B6FE8] rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)] text-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <h3 className="text-sm font-semibold">Pomodoro</h3>
            </div>
            <p className="text-xs text-white/80">Focus timer</p>
          </a>
          <a
            href={`${basePath}/time-blocking`}
            className="bg-gradient-to-br from-[#6E6A7C] to-[#8B8A9C] rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)] text-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h3 className="text-sm font-semibold">Time Blocking</h3>
            </div>
            <p className="text-xs text-white/80">Schedule your day</p>
          </a>
        </div>

        {/* Statistics Title */}
        <h3 className="text-lg font-semibold text-[#24252C] mb-4">Statistics</h3>

        {/* Task Cards */}
        <div className="space-y-4 mb-6">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-[15px] p-8 shadow-[0px_4px_32px_rgba(0,0,0,0.04)] text-center">
              <p className="text-sm text-[#6E6A7C]">Нет задач на сегодня</p>
              <a
                href={`${basePath}/new-task`}
                className="mt-4 inline-block text-sm text-[#5F33E1] font-semibold"
              >
                Создать задачу
              </a>
            </div>
          ) : (
            tasks.map((task) => {
              const priorityColors = getPriorityColors(task.priority)
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  basePath={basePath}
                  onToggle={() => handleToggleTask(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                  priorityColors={priorityColors}
                />
              )
            })
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )

  function handleLogout() {
    logout()
    window.location.href = `${basePath}/`
  }
}

interface TaskCardProps {
  task: Task
  basePath: string
  onToggle: () => void
  onDelete: () => void
  priorityColors: { bg: string; text: string }
}

function TaskCard({ task, basePath, onToggle, onDelete, priorityColors }: TaskCardProps) {
  const isCompleted = task.status === 'completed'

  const handleCardClick = (e: React.MouseEvent) => {
    // Не переходим на редактирование, если кликнули на чекбокс или кнопку удаления
    const target = e.target as HTMLElement
    if (target.closest('button')) {
      return
    }
    window.location.href = `${basePath}/new-task?id=${task.id}`
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-[0px_4px_32px_rgba(0,0,0,0.08)] transition-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
            className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
              isCompleted
                ? 'bg-[#5F33E1] border-[#5F33E1]'
                : 'border-[#5F33E1] bg-white'
            }`}
          >
            {isCompleted && (
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 6L5 9L10 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <div className="flex-1 min-w-0">
            <h4
              className={`text-sm text-[#24252C] mb-2 ${
                isCompleted ? 'line-through opacity-60' : ''
              }`}
            >
              {task.title}
            </h4>
            {task.description && (
              <p className="text-[11px] text-[#6E6A7C] mb-2 line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 text-[#AB94FF] flex-shrink-0"
                viewBox="0 0 14 14"
                fill="none"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 4V7L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[11px] text-[#AB94FF]">
                {formatTime(task.time)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 flex-shrink-0">
          <div className={`${priorityColors.bg} px-2 py-1 rounded-[7px]`}>
            <span className={`text-[9px] ${priorityColors.text} font-semibold`}>
              {task.priority}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="w-6 h-6 flex items-center justify-center text-[#6E6A7C] hover:text-red-500 transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
