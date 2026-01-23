'use client'

import { useState, useEffect } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { getCurrentUser } from '../../lib/auth'
import { getTasks, Task, formatTime, getPriorityColors } from '../../lib/tasks'
import { useTranslation } from '../../lib/useTranslation'
import PageHeader from '../../components/PageHeader'
import BottomNavigation from '../../components/BottomNavigation'

export default function NotificationsPage() {
  const { t } = useTranslation()
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])
  const basePath = useBasePath()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      window.location.href = `${basePath}/login`
    } else {
      setUser(currentUser)
      loadUpcomingTasks()
    }
  }, [basePath])

  const loadUpcomingTasks = () => {
    const allTasks = getTasks()
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    
    // Получаем задачи на сегодня и ближайшие дни, которые еще не выполнены
    const upcoming = allTasks
      .filter(task => task.status === 'pending')
      .filter(task => {
        const taskDate = new Date(task.date)
        const todayDate = new Date(today)
        // Показываем задачи на сегодня и будущие
        return taskDate >= todayDate
      })
      .sort((a, b) => {
        // Сортируем по дате, затем по времени
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date)
        }
        return a.time.localeCompare(b.time)
      })
      .slice(0, 10) // Показываем только ближайшие 10 задач
    
    setUpcomingTasks(upcoming)
  }

  if (!user) {
    return null
  }

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      <PageHeader title={t.notifications.notifications} />

      {/* Notifications List */}
      <div className="px-6 py-6">
        {upcomingTasks.length === 0 ? (
          <div className="bg-white rounded-[15px] p-8 shadow-[0px_4px_32px_rgba(0,0,0,0.04)] text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#EEE9FF] rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#5F33E1]"
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
            </div>
            <p className="text-sm text-[#6E6A7C] mb-2">{t.notifications.noNotifications}</p>
            <p className="text-xs text-[#6E6A7C] opacity-60">
              У вас нет предстоящих задач
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingTasks.map((task) => {
              const priorityColors = getPriorityColors(task.priority)
              const taskDate = new Date(task.date)
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const isToday = taskDate.getTime() === today.getTime()
              
              return (
                <div
                  key={task.id}
                  onClick={() => {
                    window.location.href = `${basePath}/new-task?id=${task.id}`
                  }}
                  className="bg-white rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-[0px_4px_32px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${priorityColors.bg}`}>
                      <svg
                        className={`w-6 h-6 ${priorityColors.text}`}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#24252C] mb-1">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-xs text-[#6E6A7C] mb-2 line-clamp-2">
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
                          <span className="text-[11px] text-[#AB94FF]">
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
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  )
}
