// Система интернационализации

export type Language = 'en' | 'ru'

const TRANSLATIONS = {
  en: {
    // Common
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      confirm: 'Confirm',
      home: 'Home',
      all: 'All',
      today: 'Today',
      sortBy: 'Sort by:',
    },
    // Auth
    auth: {
      login: 'Login',
      registration: 'Registration',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      enter: 'Enter',
      loginButton: 'Login',
      registerButton: 'Register',
      alreadyExists: 'User with this email already exists',
      invalidCredentials: 'Invalid email or password',
      fillAllFields: 'Please fill in all fields',
      invalidEmail: 'Please enter a valid email',
      passwordMinLength: 'Password must be at least 6 characters',
      loginSuccess: 'Login successful!',
      registrationSuccess: 'Registration successful!',
    },
    // Tasks
    tasks: {
      tasks: 'Tasks',
      task: 'Task',
      newTask: 'New Task',
      editTask: 'Edit Task',
      todayTasks: "Today's Tasks",
      allTasks: 'All Tasks',
      title: 'Title',
      description: 'Description',
      time: 'Time',
      date: 'Date',
      priority: 'Priority',
      status: 'Status',
      completed: 'Completed',
      pending: 'Pending',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      noTasks: 'No tasks',
      noTasksToday: 'No tasks for today',
      createTask: 'Create Task',
      updateTask: 'Update Task',
      taskCreated: 'Task created!',
      taskUpdated: 'Task updated!',
      noTasksFound: 'No tasks found',
      searchPlaceholder: 'Search tasks...',
      taskDeleted: 'Task deleted!',
      taskCompleted: 'Task completed!',
      taskReturned: 'Task returned to list',
      deleteConfirm: 'Are you sure you want to delete this task?',
      enterTitle: 'Please enter task title',
      enterTime: 'Please enter time',
      selectDate: 'Please select date',
      saveError: 'An error occurred while saving the task',
    },
    // Home
    home: {
      hello: 'Hello!',
      statistics: 'Statistics',
      total: 'Total',
      completed: 'Completed',
      todayTasks: 'Today Tasks',
      weekTasks: 'Week Tasks',
      completedTasks: 'Completed tasks',
    },
    // Calendar
    calendar: {
      calendar: 'Calendar',
      selectDate: 'Select Date',
      noTasksOnDate: 'No tasks on this date',
    },
    // Notifications
    notifications: {
      notifications: 'Notifications',
      noNotifications: 'No notifications',
      upcomingTasks: 'Upcoming Tasks',
    },
    // Profile
    profile: {
      profile: 'Profile',
      editName: 'Edit name',
      statistics: 'Statistics',
      totalTasks: 'Total Tasks',
      pending: 'Pending',
      completionRate: 'Completion Rate',
      settings: 'Settings',
      notifications: 'Notifications',
      theme: 'Theme',
      language: 'Language',
      logout: 'Logout',
      logoutConfirm: 'Are you sure you want to logout?',
      logoutSuccess: 'Logged out',
      nameUpdated: 'Name updated',
      nameCannotBeEmpty: 'Name cannot be empty',
      selectFromGallery: 'Select from gallery',
      takePhoto: 'Take photo',
      removePhoto: 'Remove photo',
      photoUpdated: 'Photo updated',
      photoRemoved: 'Photo removed',
      photoError: 'Error loading photo',
      photoSizeError: 'File size should not exceed 5 MB',
      removePhotoConfirm: 'Remove profile photo?',
    },
    // Pomodoro
    pomodoro: {
      pomodoro: 'Pomodoro',
      focusTime: 'Focus Time',
      shortBreak: 'Short Break',
      longBreak: 'Long Break',
      work: 'Work',
      completedPomodoros: 'Completed Pomodoros',
      todaySessions: "Today's Sessions",
    },
    // Time Blocking
    timeBlocking: {
      timeBlocking: 'Time Blocking',
      addTimeBlock: 'Add Time Block',
      daySummary: 'Day Summary',
      scheduledTasks: 'Scheduled Tasks',
      timeBlocks: 'Time Blocks',
      freeTime: 'Free Time',
      blocks: 'blocks',
    },
    // Settings
    settings: {
      settings: 'Settings',
      profile: 'Profile',
      emailCannotBeChanged: 'Email cannot be changed',
      newPassword: 'New password',
      minimumCharacters: 'Minimum 6 characters',
      saveProfile: 'Save Profile',
      saving: 'Saving...',
      profileSaved: 'Profile settings saved',
      pomodoro: 'Pomodoro',
      workInterval: 'Work Interval',
      intervalCount: 'Interval Count',
      breakInterval: 'Break Interval',
      minutes: 'minutes',
      intervals: 'intervals',
      savePomodoro: 'Save Pomodoro Settings',
      pomodoroSaved: 'Pomodoro settings saved',
      saveError: 'Error saving',
      workIntervalRange: 'Work interval must be between 1 and 60 minutes',
      breakIntervalRange: 'Break interval must be between 1 and 30 minutes',
      intervalCountRange: 'Number of intervals must be between 1 and 10',
      language: 'Language',
      selectLanguage: 'Select Language',
      english: 'English',
      russian: 'Russian',
    },
    // Menu
    menu: {
      menu: 'Menu',
    },
    // Start
    start: {
      taskSync: 'Task Sync',
      description: "This productive tool is designed to help you better manage your task project-wise conveniently!",
      letsStart: "Let's Start",
    },
  },
  ru: {
    // Common
    common: {
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Редактировать',
      back: 'Назад',
      next: 'Далее',
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успешно',
      confirm: 'Подтвердить',
      home: 'Главная',
      all: 'Все',
      today: 'Сегодня',
      sortBy: 'Сортировка:',
    },
    // Auth
    auth: {
      login: 'Вход',
      registration: 'Регистрация',
      email: 'Email',
      password: 'Пароль',
      name: 'Имя',
      enter: 'Войти',
      loginButton: 'Войти',
      registerButton: 'Зарегистрироваться',
      alreadyExists: 'Пользователь с таким email уже существует',
      invalidCredentials: 'Неверный email или пароль',
      fillAllFields: 'Пожалуйста, заполните все поля',
      invalidEmail: 'Введите корректный email',
      passwordMinLength: 'Пароль должен содержать минимум 6 символов',
      loginSuccess: 'Вход выполнен успешно!',
      registrationSuccess: 'Регистрация успешна!',
    },
    // Tasks
    tasks: {
      tasks: 'Задачи',
      task: 'Задача',
      newTask: 'Новая задача',
      editTask: 'Редактировать задачу',
      todayTasks: 'Задачи на сегодня',
      allTasks: 'Все задачи',
      title: 'Название',
      description: 'Описание',
      time: 'Время',
      date: 'Дата',
      priority: 'Приоритет',
      status: 'Статус',
      completed: 'Выполнено',
      pending: 'В ожидании',
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      noTasks: 'Нет задач',
      noTasksToday: 'Нет задач на сегодня',
      createTask: 'Создать задачу',
      updateTask: 'Обновить задачу',
      taskCreated: 'Задача создана!',
      taskUpdated: 'Задача обновлена!',
      noTasksFound: 'Задачи не найдены',
      searchPlaceholder: 'Поиск задач...',
      taskDeleted: 'Задача удалена',
      taskCompleted: 'Задача выполнена!',
      taskReturned: 'Задача возвращена в список',
      deleteConfirm: 'Вы уверены, что хотите удалить эту задачу?',
      enterTitle: 'Пожалуйста, введите название задачи',
      enterTime: 'Пожалуйста, введите время',
      selectDate: 'Пожалуйста, выберите дату',
      saveError: 'Произошла ошибка при сохранении задачи',
    },
    // Home
    home: {
      hello: 'Привет!',
      statistics: 'Статистика',
      total: 'Всего',
      completed: 'Выполнено',
      todayTasks: 'Задачи на сегодня',
      weekTasks: 'Задачи на неделю',
      completedTasks: 'Выполненные задачи',
    },
    // Calendar
    calendar: {
      calendar: 'Календарь',
      selectDate: 'Выберите дату',
      noTasksOnDate: 'Нет задач на эту дату',
    },
    // Notifications
    notifications: {
      notifications: 'Уведомления',
      noNotifications: 'Нет уведомлений',
      upcomingTasks: 'Предстоящие задачи',
    },
    // Profile
    profile: {
      profile: 'Профиль',
      editName: 'Редактировать имя',
      statistics: 'Статистика',
      totalTasks: 'Всего задач',
      pending: 'В ожидании',
      completionRate: 'Процент выполнения',
      settings: 'Настройки',
      notifications: 'Уведомления',
      theme: 'Тема',
      language: 'Язык',
      logout: 'Выйти',
      logoutConfirm: 'Вы уверены, что хотите выйти?',
      logoutSuccess: 'Выход выполнен',
      nameUpdated: 'Имя обновлено',
      nameCannotBeEmpty: 'Имя не может быть пустым',
      selectFromGallery: 'Выбрать из галереи',
      takePhoto: 'Сделать фото',
      removePhoto: 'Удалить фото',
      photoUpdated: 'Фото обновлено',
      photoRemoved: 'Фото удалено',
      photoError: 'Ошибка при загрузке фото',
      photoSizeError: 'Размер файла не должен превышать 5 МБ',
      removePhotoConfirm: 'Удалить фото профиля?',
    },
    // Pomodoro
    pomodoro: {
      pomodoro: 'Pomodoro',
      focusTime: 'Время работы',
      shortBreak: 'Короткий перерыв',
      longBreak: 'Длинный перерыв',
      work: 'Работа',
      completedPomodoros: 'Завершенные помодоро',
      todaySessions: 'Сессии сегодня',
    },
    // Time Blocking
    timeBlocking: {
      timeBlocking: 'Time Blocking',
      addTimeBlock: 'Добавить блок времени',
      daySummary: 'Итоги дня',
      scheduledTasks: 'Запланированные задачи',
      timeBlocks: 'Блоки времени',
      freeTime: 'Свободное время',
      blocks: 'блоков',
    },
    // Settings
    settings: {
      settings: 'Настройки',
      profile: 'Профиль',
      emailCannotBeChanged: 'Email нельзя изменить',
      newPassword: 'Новый пароль',
      minimumCharacters: 'Минимум 6 символов',
      saveProfile: 'Сохранить профиль',
      saving: 'Сохранение...',
      profileSaved: 'Настройки профиля сохранены',
      pomodoro: 'Pomodoro',
      workInterval: 'Интервал работы',
      intervalCount: 'Количество интервалов',
      breakInterval: 'Интервал перерыва',
      minutes: 'минут',
      intervals: 'интервалов',
      savePomodoro: 'Сохранить настройки Pomodoro',
      pomodoroSaved: 'Настройки Pomodoro сохранены',
      saveError: 'Ошибка при сохранении',
      workIntervalRange: 'Интервал работы должен быть от 1 до 60 минут',
      breakIntervalRange: 'Интервал перерыва должен быть от 1 до 30 минут',
      intervalCountRange: 'Количество интервалов должно быть от 1 до 10',
      language: 'Язык',
      selectLanguage: 'Выберите язык',
      english: 'Английский',
      russian: 'Русский',
    },
    // Menu
    menu: {
      menu: 'Меню',
    },
    // Start
    start: {
      taskSync: 'Task Sync',
      description: 'Этот продуктивный инструмент разработан, чтобы помочь вам лучше управлять задачами проекта удобным способом!',
      letsStart: 'Начать',
    },
  },
}

const LANGUAGE_KEY = 'task-sync-language'

export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem(LANGUAGE_KEY) as Language
  return saved && (saved === 'en' || saved === 'ru') ? saved : 'en'
}

export function setLanguage(language: Language): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LANGUAGE_KEY, language)
  // Перезагружаем страницу для применения языка
  window.location.reload()
}

export function getTranslations(language: Language = getLanguage()) {
  return TRANSLATIONS[language]
}

export type Translations = typeof TRANSLATIONS.en
