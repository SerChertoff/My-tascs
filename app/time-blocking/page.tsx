'use client'

import { useState, useEffect } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { getCurrentUser } from '../../lib/auth'
import { getTasks, Task } from '../../lib/tasks'
import { useTranslation } from '../../lib/useTranslation'
import PageHeader from '../../components/PageHeader'
import BottomNavigation from '../../components/BottomNavigation'

interface TimeBlock {
  id: string
  startTime: string
  endTime: string
  taskId?: string
  title: string
  color: string
}

export default function TimeBlockingPage() {
  const { t } = useTranslation()
  const [user, setUser] = useState<{ email: string; name?: string; avatarUrl?: string } | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
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
    generateTimeBlocks()
  }, [tasks, selectedDate])

  const loadTasks = () => {
    const allTasks = getTasks()
    const dayTasks = allTasks.filter(task => task.date === selectedDate)
    setTasks(dayTasks.sort((a, b) => a.time.localeCompare(b.time)))
  }

  const generateTimeBlocks = () => {
    const blocks: TimeBlock[] = []
    const dayTasks = tasks.filter(task => task.date === selectedDate)
    
    // Создаем блоки из задач
    dayTasks.forEach((task) => {
      const [hours, minutes] = task.time.split(':').map(Number)
      const startTime = `${task.time}`
      // Предполагаем, что задача занимает 1 час
      const endHours = (hours + 1) % 24
      const endTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      
      let color = '#E3F2FF'
      if (task.priority === 'High') color = '#FFE9E1'
      else if (task.priority === 'Medium') color = '#EDE8FF'
      
      blocks.push({
        id: task.id,
        startTime,
        endTime,
        taskId: task.id,
        title: task.title,
        color,
      })
    })

    // Добавляем пустые блоки для остального времени
    const hours = Array.from({ length: 24 }, (_, i) => i)
    hours.forEach((hour) => {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`
      const hasBlock = blocks.some(block => {
        const blockHour = parseInt(block.startTime.split(':')[0])
        return blockHour === hour
      })
      
      if (!hasBlock) {
        blocks.push({
          id: `empty-${hour}`,
          startTime: timeStr,
          endTime: `${((hour + 1) % 24).toString().padStart(2, '0')}:00`,
          title: t.timeBlocking.freeTime,
          color: '#F5F5F5',
        })
      }
    })

    // Сортируем блоки по времени
    blocks.sort((a, b) => a.startTime.localeCompare(b.startTime))
    setTimeBlocks(blocks)
  }

  const getBlockHeight = (startTime: string, endTime: string) => {
    const [startHours, startMins] = startTime.split(':').map(Number)
    const [endHours, endMins] = endTime.split(':').map(Number)
    const startTotal = startHours * 60 + startMins
    const endTotal = endHours * 60 + endMins
    const duration = endTotal > startTotal ? endTotal - startTotal : (24 * 60 - startTotal) + endTotal
    // Каждый час = 60px, минимальная высота 40px
    return Math.max((duration / 60) * 60, 40)
  }

  const formatTime = (time: string) => {
    return time
  }

  if (!user) {
    return null
  }

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      <PageHeader title={t.timeBlocking.timeBlocking} />

      <div className="px-6 py-6 space-y-6">
        {/* Date Selector */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              loadTasks()
            }}
            className="px-4 py-2 border border-[#5F33E1] rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
          />
          <button
            onClick={() => {
              const newDate = new Date(selectedDate)
              newDate.setDate(newDate.getDate() + 1)
              setSelectedDate(newDate.toISOString().split('T')[0])
              loadTasks()
            }}
            className="px-4 py-2 bg-[#5F33E1] text-white rounded-[15px] text-sm font-semibold"
          >
            {t.common.next}
          </button>
        </div>

        {/* Time Blocks */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-[#24252C] mb-3">
            {new Date(selectedDate).toLocaleDateString('ru-RU', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {timeBlocks.map((block) => {
              const height = getBlockHeight(block.startTime, block.endTime)
              const isTask = block.taskId !== undefined
              
              return (
                <div
                  key={block.id}
                  className={`rounded-[7px] p-4 border-l-4 ${
                    isTask ? 'border-[#5F33E1]' : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: block.color,
                    minHeight: `${height}px`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-[#6E6A7C]">
                          {formatTime(block.startTime)} - {formatTime(block.endTime)}
                        </span>
                      </div>
                      <h3 className={`text-sm font-semibold ${
                        isTask ? 'text-[#24252C]' : 'text-[#6E6A7C]'
                      }`}>
                        {block.title}
                      </h3>
                      {isTask && tasks.find(t => t.id === block.taskId) && (
                        <p className="text-xs text-[#6E6A7C] mt-1">
                          {tasks.find(t => t.id === block.taskId)?.description || 'No description'}
                        </p>
                      )}
                    </div>
                    {isTask && (
                      <a
                        href={`${basePath}/new-task?id=${block.taskId}`}
                        className="text-[#5F33E1] text-xs font-semibold"
                      >
                        {t.common.edit}
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Add Block Button */}
        <button
          onClick={() => window.location.href = `${basePath}/new-task?date=${selectedDate}`}
          className="w-full h-[52px] bg-[#5F33E1] rounded-[14px] text-white font-semibold text-lg flex items-center justify-center gap-2"
        >
          <svg
            className="w-6 h-6"
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
          {t.timeBlocking.addTimeBlock}
        </button>

        {/* Statistics */}
        <div className="bg-white rounded-[15px] p-6 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-semibold text-[#24252C] mb-4">{t.timeBlocking.daySummary}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6E6A7C]">{t.timeBlocking.scheduledTasks}</span>
              <span className="text-lg font-semibold text-[#24252C]">
                {tasks.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6E6A7C]">{t.timeBlocking.timeBlocks}</span>
              <span className="text-lg font-semibold text-[#5F33E1]">
                {timeBlocks.filter(b => b.taskId).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6E6A7C]">{t.timeBlocking.freeTime}</span>
              <span className="text-lg font-semibold text-[#24252C]">
                {timeBlocks.filter(b => !b.taskId).length} {t.timeBlocking.blocks}
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
