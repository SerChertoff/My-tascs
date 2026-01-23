'use client'

import { useState, useEffect } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { getCurrentUser } from '../../lib/auth'
import {
  Task,
  getTasks,
  toggleTaskStatus,
  deleteTask,
  getPriorityColors,
  formatTime,
  TaskPriority,
  TaskStatus,
} from '../../lib/tasks'
import PageHeader from '../../components/PageHeader'
import BottomNavigation from '../../components/BottomNavigation'

export default function TasksPage() {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)
  const [allTasks, setAllTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'All'>('All')
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'All'>('All')
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date')
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

  useEffect(() => {
    filterAndSortTasks()
  }, [allTasks, searchQuery, filterPriority, filterStatus, sortBy])

  const loadTasks = () => {
    const tasks = getTasks()
    setAllTasks(tasks)
  }

  const filterAndSortTasks = () => {
    let filtered = [...allTasks]

    // Поиск
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)
      )
    }

    // Фильтр по приоритету
    if (filterPriority !== 'All') {
      filtered = filtered.filter((task) => task.priority === filterPriority)
    }

    // Фильтр по статусу
    if (filterStatus !== 'All') {
      filtered = filtered.filter((task) => task.status === filterStatus)
    }

    // Сортировка
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date)
        }
        return a.time.localeCompare(b.time)
      } else if (sortBy === 'priority') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 }
        const diff = priorityOrder[b.priority] - priorityOrder[a.priority]
        if (diff !== 0) return diff
        return a.date.localeCompare(b.date)
      } else {
        return a.title.localeCompare(b.title)
      }
    })

    setFilteredTasks(filtered)
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

  const priorityOptions: TaskPriority[] = ['High', 'Medium', 'Low']
  const statusOptions: TaskStatus[] = ['pending', 'completed']

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      <PageHeader
        title="All Tasks"
        rightAction={
          <a href={`${basePath}/new-task`} className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
            <svg
              className="w-6 h-6 text-[#5F33E1]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        }
      />

      {/* Search and Filters */}
      <div className="px-6 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[44px] pl-10 pr-4 border border-[#5F33E1] rounded-[15px] text-sm placeholder:text-[#24252C] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A7C]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterStatus('All')}
            className={`px-4 py-2 rounded-[15px] text-sm font-semibold whitespace-nowrap ${
              filterStatus === 'All'
                ? 'bg-[#5F33E1] text-white'
                : 'bg-gray-100 text-[#6E6A7C]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-[15px] text-sm font-semibold whitespace-nowrap ${
              filterStatus === 'pending'
                ? 'bg-[#5F33E1] text-white'
                : 'bg-gray-100 text-[#6E6A7C]'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-[15px] text-sm font-semibold whitespace-nowrap ${
              filterStatus === 'completed'
                ? 'bg-[#5F33E1] text-white'
                : 'bg-gray-100 text-[#6E6A7C]'
            }`}
          >
            Completed
          </button>
          {priorityOptions.map((priority) => {
            const colors = getPriorityColors(priority)
            return (
              <button
                key={priority}
                onClick={() => setFilterPriority(filterPriority === priority ? 'All' : priority)}
                className={`px-4 py-2 rounded-[15px] text-sm font-semibold whitespace-nowrap ${
                  filterPriority === priority
                    ? `${colors.bg} ${colors.text}`
                    : 'bg-gray-100 text-[#6E6A7C]'
                }`}
              >
                {priority}
              </button>
            )
          })}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6E6A7C]">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'title')}
            className="flex-1 h-[36px] px-3 border border-[#5F33E1] rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
          >
            <option value="date">Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="px-6 pb-6">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-[15px] p-8 shadow-[0px_4px_32px_rgba(0,0,0,0.04)] text-center">
            <p className="text-sm text-[#6E6A7C] mb-2">
              {searchQuery ? 'Задачи не найдены' : 'Нет задач'}
            </p>
            <a
              href={`${basePath}/new-task`}
              className="inline-block text-sm text-[#5F33E1] font-semibold"
            >
              Создать задачу
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const priorityColors = getPriorityColors(task.priority)
              const taskDate = new Date(task.date)
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const isToday = taskDate.getTime() === today.getTime()
              const isPast = taskDate < today && !isToday

              return (
                <div
                  key={task.id}
                  className="bg-white rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        task.status === 'completed'
                          ? 'bg-[#5F33E1] border-[#5F33E1]'
                          : 'border-[#5F33E1] bg-white'
                      }`}
                    >
                      {task.status === 'completed' && (
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
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => {
                        window.location.href = `${basePath}/new-task?id=${task.id}`
                      }}
                    >
                      <h4
                        className={`text-sm text-[#24252C] mb-2 ${
                          task.status === 'completed' ? 'line-through opacity-60' : ''
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-[11px] text-[#6E6A7C] mb-2 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5 text-[#AB94FF]"
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
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5 text-[#AB94FF]"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <rect
                              x="2"
                              y="3"
                              width="10"
                              height="10"
                              rx="1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M2 6H12"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className={`text-[11px] ${
                            isPast && task.status === 'pending'
                              ? 'text-red-500'
                              : isToday
                              ? 'text-[#5F33E1]'
                              : 'text-[#AB94FF]'
                          }`}>
                            {isToday
                              ? 'Сегодня'
                              : taskDate.toLocaleDateString('ru-RU', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                          </span>
                        </div>
                        <div className={`${priorityColors.bg} px-2 py-0.5 rounded-[7px]`}>
                          <span className={`text-[9px] ${priorityColors.text} font-semibold`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="w-6 h-6 flex items-center justify-center text-[#6E6A7C] hover:text-red-500 transition-colors flex-shrink-0"
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
              )
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0px_-4px_32px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around px-4 py-3">
          <a href={`${basePath}/home`} className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.77V10.36C22 9.23 21.27 7.74 20.37 7.05L14.98 2.84C13.54 1.74 11.46 1.74 10.02 2.84Z"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
          <a href={`${basePath}/calendar`} className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M8 2V6"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V6"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 10H21"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </a>
          <a href={`${basePath}/new-task`} className="flex flex-col items-center">
            <div className="w-11 h-11 bg-[#5F33E1] rounded-full flex items-center justify-center shadow-[2px_10px_18px_rgba(95,51,225,0.49)]">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
          <a href={`${basePath}/tasks`} className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M14.68 2.02L14.68 2.02C14.68 2.02 6.75 12.25 6.75 12.25L14.68 16.25L14.68 16.25"
                  stroke="#5F33E1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
          <a href={`${basePath}/profile`} className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
