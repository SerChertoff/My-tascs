'use client'

import { useState, useEffect } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { getCurrentUser } from '../../lib/auth'
import { addTask, updateTask, getTasks, TaskPriority, Task } from '../../lib/tasks'
import PageHeader from '../../components/PageHeader'
import BottomNavigation from '../../components/BottomNavigation'

export default function NewTaskPage() {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [taskId, setTaskId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('Medium')
  const [error, setError] = useState('')
  const basePath = useBasePath()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      window.location.href = `${basePath}/login`
    } else {
      setUser(currentUser)
      
      // Проверяем, есть ли ID задачи в URL для редактирования
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        const id = params.get('id')
        if (id) {
          const tasks = getTasks()
          const task = tasks.find(t => t.id === id)
          if (task) {
            setIsEdit(true)
            setTaskId(id)
            setTitle(task.title)
            setDescription(task.description || '')
            setTime(task.time)
            setDate(task.date)
            setPriority(task.priority)
          }
        } else {
          // Устанавливаем сегодняшнюю дату по умолчанию
          const today = new Date().toISOString().split('T')[0]
          setDate(today)
          // Устанавливаем текущее время + 1 час по умолчанию
          const now = new Date()
          now.setHours(now.getHours() + 1)
          const hours = now.getHours()
          const minutes = now.getMinutes().toString().padStart(2, '0')
          const ampm = hours >= 12 ? 'PM' : 'AM'
          const displayHour = hours % 12 || 12
          setTime(`${displayHour}:${minutes} ${ampm}`)
        }
      }
    }
  }, [basePath])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Пожалуйста, введите название задачи')
      return
    }

    if (!time.trim()) {
      setError('Пожалуйста, введите время')
      return
    }

    if (!date.trim()) {
      setError('Пожалуйста, выберите дату')
      return
    }

    try {
      if (isEdit && taskId) {
        updateTask(taskId, {
          title: title.trim(),
          description: description.trim() || undefined,
          time: time.trim(),
          date: date.trim(),
          priority,
        })
      } else {
        addTask({
          title: title.trim(),
          description: description.trim() || undefined,
          time: time.trim(),
          date: date.trim(),
          priority,
        })
      }
      window.location.href = `${basePath}/home`
    } catch (err) {
      setError('Произошла ошибка при сохранении задачи')
    }
  }

  if (!user) {
    return null
  }

  const priorityOptions: { value: TaskPriority; label: string; colors: { bg: string; text: string } }[] = [
    { value: 'Low', label: 'Low', colors: { bg: 'bg-[#E3F2FF]', text: 'text-[#0087FF]' } },
    { value: 'Medium', label: 'Medium', colors: { bg: 'bg-[#EDE8FF]', text: 'text-[#5F33E1]' } },
    { value: 'High', label: 'High', colors: { bg: 'bg-[#FFE9E1]', text: 'text-[#FF7D53]' } },
  ]

  return (
    <div className="relative min-h-screen w-full bg-white">
      <PageHeader title={isEdit ? 'Edit Task' : 'New Task'} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-[15px] p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-[#24252C] mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full h-[52px] px-4 border border-[#5F33E1] rounded-[15px] text-sm placeholder:text-[#24252C] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-[#24252C] mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows={4}
            className="w-full px-4 py-3 border border-[#5F33E1] rounded-[15px] text-sm placeholder:text-[#24252C] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#5F33E1] resize-none"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#24252C] mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-[52px] px-4 border border-[#5F33E1] rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#24252C] mb-2">
              Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="10:00 AM"
              className="w-full h-[52px] px-4 border border-[#5F33E1] rounded-[15px] text-sm placeholder:text-[#24252C] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
              required
            />
            <p className="text-xs text-[#6E6A7C] mt-1">Format: HH:MM AM/PM (e.g., 10:00 AM)</p>
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-semibold text-[#24252C] mb-3">
            Priority
          </label>
          <div className="flex gap-3">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPriority(option.value)}
                className={`flex-1 h-[52px] rounded-[15px] border-2 transition-all ${
                  priority === option.value
                    ? `${option.colors.bg} border-[#5F33E1]`
                    : 'bg-white border-gray-200'
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    priority === option.value
                      ? option.colors.text
                      : 'text-[#6E6A7C]'
                  }`}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-[52px] bg-[#5F33E1] rounded-[14px] text-white font-semibold text-lg flex items-center justify-center relative mt-8"
        >
          {isEdit ? 'Update Task' : 'Create Task'}
          <svg
            className="absolute right-6 w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M13.16 6L18 12L13.16 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
      <BottomNavigation />
    </div>
  )
}
