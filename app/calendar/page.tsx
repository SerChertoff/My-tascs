'use client'

import { useState, useEffect } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { getCurrentUser } from '../../lib/auth'
import { getTasks, Task, formatTime, getPriorityColors } from '../../lib/tasks'
import { useTranslation } from '../../lib/useTranslation'
import PageHeader from '../../components/PageHeader'
import BottomNavigation from '../../components/BottomNavigation'

export default function CalendarPage() {
  const { t } = useTranslation()
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedDateTasks, setSelectedDateTasks] = useState<Task[]>([])
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
    filterTasksByDate()
  }, [selectedDate, tasks])

  const loadTasks = () => {
    const allTasks = getTasks()
    setTasks(allTasks)
  }

  const filterTasksByDate = () => {
    const filtered = tasks.filter(task => task.date === selectedDate)
    setSelectedDateTasks(filtered.sort((a, b) => a.time.localeCompare(b.time)))
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days: (Date | null)[] = []
    
    // Пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getTasksForDate = (date: Date | null): number => {
    if (!date) return 0
    const dateStr = date.toISOString().split('T')[0]
    return tasks.filter(task => task.date === dateStr && task.status === 'pending').length
  }

  const isSelectedDate = (date: Date | null): boolean => {
    if (!date) return false
    return date.toISOString().split('T')[0] === selectedDate
  }

  const isToday = (date: Date | null): boolean => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const currentDate = new Date(selectedDate)
  const days = getDaysInMonth(currentDate)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setSelectedDate(newDate.toISOString().split('T')[0])
  }

  if (!user) {
    return null
  }

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      <PageHeader
        title={t.calendar.calendar}
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

      {/* Calendar */}
      <div className="px-6 py-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => changeMonth('prev')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-[#24252C]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-[#24252C]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => changeMonth('next')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-[#24252C]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-[#6E6A7C] py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            const taskCount = getTasksForDate(date)
            const selected = isSelectedDate(date)
            const today = isToday(date)
            
            return (
              <button
                key={index}
                onClick={() => date && setSelectedDate(date.toISOString().split('T')[0])}
                className={`aspect-square rounded-[10px] flex flex-col items-center justify-center p-1 transition-all ${
                  selected
                    ? 'bg-[#5F33E1] text-white'
                    : today
                    ? 'bg-[#EEE9FF] text-[#5F33E1]'
                    : 'bg-gray-50 text-[#24252C] hover:bg-gray-100'
                } ${!date ? 'opacity-0 cursor-default' : 'cursor-pointer'}`}
                disabled={!date}
              >
                {date && (
                  <>
                    <span className={`text-sm font-semibold ${selected ? 'text-white' : ''}`}>
                      {date.getDate()}
                    </span>
                    {taskCount > 0 && (
                      <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                        selected ? 'bg-white' : 'bg-[#5F33E1]'
                      }`} />
                    )}
                  </>
                )}
              </button>
            )
          })}
        </div>

        {/* Selected Date Tasks */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#24252C] mb-4">
            {new Date(selectedDate).toLocaleDateString('ru-RU', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </h3>
          
          {selectedDateTasks.length === 0 ? (
            <div className="bg-white rounded-[15px] p-8 shadow-[0px_4px_32px_rgba(0,0,0,0.04)] text-center">
              <p className="text-sm text-[#6E6A7C]">{t.calendar.noTasksOnDate}</p>
              <a
                href={`${basePath}/new-task`}
                className="mt-4 inline-block text-sm text-[#5F33E1] font-semibold"
              >
                Создать задачу
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateTasks.map((task) => {
                const priorityColors = getPriorityColors(task.priority)
                return (
                  <div
                    key={task.id}
                    onClick={() => {
                      window.location.href = `${basePath}/new-task?id=${task.id}`
                    }}
                    className="bg-white rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-[0px_4px_32px_rgba(0,0,0,0.08)] transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm text-[#24252C] mb-2 ${
                          task.status === 'completed' ? 'line-through opacity-60' : ''
                        }`}>
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-xs text-[#6E6A7C] mb-2 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2">
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
                          <span className="text-xs text-[#AB94FF]">
                            {formatTime(task.time)}
                          </span>
                        </div>
                      </div>
                      <div className={`${priorityColors.bg} px-2 py-1 rounded-[7px] ml-2`}>
                        <span className={`text-[10px] ${priorityColors.text} font-semibold`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
