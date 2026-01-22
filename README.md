# My-tascs

# Task Sync

Приложение для управления задачами, сверстанное по макету из Figma.

## Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Установка

```bash
npm install
```

## Запуск локально

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Деплой

Приложение автоматически деплоится на GitHub Pages через GitHub Actions при каждом push в ветку `main`.

**Доступно по адресу:** https://serchertoff.github.io/My-tascs/

## Структура проекта

- `/app` - страницы Next.js
- `/components` - React компоненты
- `/public/images` - изображения из Figma макета
- `/lib` - утилиты и вспомогательные функции

## Экраны

- `/` - Стартовый экран (Let's Start)
- `/login` - Экран входа
- `/registration` - Экран регистрации
- `/home` - Главный экран с задачами
