# wp-password-generator

# 🔐 WP Password Generator

<div align="center">
  
  ### Генератор паролів та налаштувань для WordPress розробників
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
  
  [Демо](#) • [Повідомити про помилку](https://github.com/yourusername/wp-password-generator/issues) • [Запропонувати ідею](https://github.com/yourusername/wp-password-generator/issues)
  
</div>

---

## 📋 Про проект

**WP Password Generator** – це безкоштовний веб-інструмент, створений для полегшення роботи WordPress розробників. Він автоматично генерує унікальні імена для баз даних, користувачів та безпечні паролі при перенесенні сайтів на новий хостинг.

### 🎯 Проблема, яку вирішує інструмент

Кожен розробник стикається з необхідністю:
- Вигадувати унікальні назви для баз даних
- Створювати імена користувачів БД
- Генерувати безпечні паролі
- Оновлювати wp-config.php

Наш генератор робить це за лічені секунди!

---

## ✨ Можливості

### 🔑 Генерація даних
| Компонент | Формат | Приклад |
|-----------|--------|---------|
| Назва БД | `{project}_db` | `lifetime_db` |
| Користувач БД | `{project}_user` | `lifetime_user` |
| Пароль БД | 12 символів | `k8J#mP2$nL5x` |
| Назва сайту | `{project}-site` | `lifetime-site` |
| Користувач WordPress | `{project}-admin` | `lifetime-admin` |
| Пароль WordPress | 12 символів | `xR7@qW3!eK9p` |

### 🛠 Функціонал

✅ **Два типи паролів**
- Простий (тільки літери та цифри)
- Сильний (з спецсимволами)

✅ **Транслітерація** – підтримка українських назв проектів

✅ **Індикатор складності** – візуальне відображення надійності пароля

✅ **Готові фрагменти коду**
- SQL для створення бази даних
- Секція для wp-config.php

✅ **Експорт у TXT** – збереження всіх даних у текстовий файл

✅ **Статистика використання** – відстеження кількості згенерованих паролів

✅ **Двомовний інтерфейс** – українська та англійська мови

✅ **Покрокова інструкція** – для новачків

✅ **Адаптивний дизайн** – коректно відображається на всіх пристроях

---

## 🚀 Демо

**[Подивитися демо](#)** – *вставте посилання на GitHub Pages*

### Скріншоти

<div align="center">
  <img src="screenshots/main.png" alt="Головний екран" width="800"/>
  <p><em>Головний екран генератора</em></p>
  
  <img src="screenshots/generation.png" alt="Процес генерації" width="800"/>
  <p><em>Приклад генерації для проекту "lifetime"</em></p>
  
  <img src="screenshots/export.png" alt="Експорт" width="800"/>
  <p><em>Експорт результатів у TXT</em></p>
</div>

---

## 💻 Як використовувати

### Онлайн версія
1. Перейдіть за посиланням [wp-password-generator](#)
2. Введіть назву проекту (наприклад, "lifetime", "azov", "myblog")
3. Виберіть тип пароля (простий або сильний)
4. Натисніть "Згенерувати"
5. Скопіюйте SQL або фрагмент wp-config.php
6. За потреби експортуйте дані у TXT

### Локальне використання
```bash
# Клонувати репозиторій
git clone https://github.com/yourusername/wp-password-generator.git

# Перейти в директорію
cd wp-password-generator

# Відкрити index.html у браузері
open index.html  # для macOS
# або
start index.html # для Windows
# або
xdg-open index.html # для Linux

https://ovcharovcoder.github.io/wp-password-generator/
