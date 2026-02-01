# Контракт API бэкенда для авторизации

Фронтенд ожидает, что бэкенд доступен по адресу из переменной окружения `NEXT_PUBLIC_API_URL` (без завершающего слеша). Все запросы к API, кроме входа через Google, отправляются с заголовком `Authorization: Bearer <token>` после успешной авторизации.

---

## Модели данных

### Пользователь (User / ApiUser)

| Поле       | Тип     | Обязательное | Описание                          |
|-----------|---------|--------------|-----------------------------------|
| `email`   | string  | да           | Email пользователя                |
| `name`    | string  | нет          | Отображаемое имя (целиком)        |
| `firstName` | string | нет        | Имя                               |
| `lastName`  | string | нет        | Фамилия                           |
| `avatarUrl` | string | нет        | URL аватарки (или data URL)       |

Отображаемое имя на фронте: `name` → иначе `firstName + lastName` → иначе `email`.

---

## Эндпоинты

### 1. Регистрация

**POST** `/auth/register`

**Тело запроса (JSON):**

```json
{
  "email": "user@example.com",
  "password": "secret123",
  "firstName": "Иван",
  "lastName": "Петров",
  "name": "Иван Петров",
  "avatarUrl": "data:image/png;base64,..."
}
```

- Обязательные поля: `email`, `password`.
- Остальные поля опциональны.

**Ответ (200):**

```json
{
  "user": {
    "email": "user@example.com",
    "firstName": "Иван",
    "lastName": "Петров",
    "avatarUrl": "..."
  },
  "token": "jwt-access-token"
}
```

- `token` — JWT (или другой токен сессии), по нему фронт будет отправлять запросы.

**Ошибки:** 400 (валидация), 409 (email уже занят) — тело с `{ "message": "..." }`.

---

### 2. Вход по email/паролю

**POST** `/auth/login`

**Тело запроса (JSON):**

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

**Ответ (200):**

```json
{
  "user": {
    "email": "user@example.com",
    "firstName": "Иван",
    "lastName": "Петров",
    "avatarUrl": "..."
  },
  "token": "jwt-access-token"
}
```

**Ошибки:** 401 — тело с `{ "message": "..." }`.

---

### 3. Вход через Google (OAuth 2.0)

**GET** `/auth/google`

- Бэкенд должен перенаправить пользователя на страницу авторизации Google (OAuth).
- После успешной авторизации Google бэкенд создаёт или находит пользователя по email из Google, выдаёт ему JWT и **редиректит на фронтенд** на страницу callback.

**Рекомендуемый редирект бэкенда после успешного OAuth:**

На URL фронтенда вида (если у приложения есть basePath, например `/My-tascs`, его нужно добавить):

```
<FRONTEND_ORIGIN><BASE_PATH>/auth/callback?token=<JWT>
```

Либо с данными пользователя в query (base64-encoded JSON), чтобы не вызывать `/auth/me` сразу:

```
<FRONTEND_ORIGIN><BASE_PATH>/auth/callback?token=<JWT>&user=<base64-encoded-JSON>
```

где `user` — это base64-encoded JSON объекта пользователя (`email`, `firstName`, `lastName`, `name`, `avatarUrl` по возможности).

Фронт на странице `/auth/callback` сохраняет `token` и при необходимости данные пользователя, затем перенаправляет на `/home`.

**Ошибки:** редирект на фронт с `?error=...` (опционально).

---

### 4. Текущий пользователь (профиль)

**GET** `/auth/me`

**Заголовки:** `Authorization: Bearer <token>`

**Ответ (200):**

```json
{
  "email": "user@example.com",
  "firstName": "Иван",
  "lastName": "Петров",
  "name": "Иван Петров",
  "avatarUrl": "..."
}
```

**Ошибки:** 401 — неверный или истёкший токен.

---

### 5. Обновление профиля

**PATCH** `/auth/profile`

**Заголовки:** `Authorization: Bearer <token>`

**Тело запроса (JSON), все поля опциональны:**

```json
{
  "name": "Новое имя",
  "firstName": "Иван",
  "lastName": "Петров",
  "avatarUrl": "data:image/png;base64,..."
}
```

**Ответ (200):** объект пользователя в том же формате, что и в `/auth/me`.

**Ошибки:** 400 (валидация), 401.

---

## CORS

Бэкенд должен разрешать запросы с origin фронтенда (и при необходимости `localhost` для разработки), а также заголовки `Content-Type`, `Authorization`.

---

## Переменные окружения фронтенда

| Переменная              | Описание                                      |
|-------------------------|-----------------------------------------------|
| `NEXT_PUBLIC_API_URL`   | Базовый URL API (например `https://api.example.com`) |

Если `NEXT_PUBLIC_API_URL` не задан, фронт работает в режиме только localStorage (без бэкенда).
