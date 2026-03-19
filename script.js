document.addEventListener('DOMContentLoaded', function () {
  // ===================== DOM =====================
  const projectInput = document.getElementById('project-name');
  const generateBtn = document.getElementById('generate-btn');

  const dbNameEl = document.getElementById('db-name');
  const dbUserEl = document.getElementById('db-user');
  const dbPassEl = document.getElementById('db-pass');
  const wpSiteEl = document.getElementById('wp-site');
  const wpUserEl = document.getElementById('wp-user');
  const wpPassEl = document.getElementById('wp-pass');

  const sqlSummaryEl = document.getElementById('sql-summary');
  const wpConfigSummaryEl = document.getElementById('wp-config-summary');

  const refreshDbPass = document.getElementById('refresh-db-pass');
  const refreshWpPass = document.getElementById('refresh-wp-pass');

  const passwordTypeRadios = document.querySelectorAll(
    'input[name="password-type"]',
  );

  const dbStrengthBar = document.getElementById('db-strength-bar');
  const dbStrengthText = document.getElementById('db-strength-text');
  const wpStrengthBar = document.getElementById('wp-strength-bar');
  const wpStrengthText = document.getElementById('wp-strength-text');

  const exportTxtBtn = document.getElementById('export-txt');

  const langButtons = document.querySelectorAll('.lang-btn');
  let currentLang = 'en'; // Англійська за замовчуванням

  // ===================== ПОВНІ ПЕРЕКЛАДИ =====================
  const translations = {
    uk: {
      // Заголовки
      title: 'Генератор паролів для розробки WordPress сайтів',
      subtitle:
        'Введіть назву проєкту та отримайте готові налаштування для бази даних та WordPress.',

      // Інструкція
      guide_title: '📖 Покрокова інструкція',
      step1_title: 'Введіть назву проєкту',
      step1_desc: 'Наприклад: lifetime, azov, myblog (можна кирилицею)',
      step2_title: 'Виберіть тип пароля',
      step2_desc: 'Простий або сильний (12 символів)',
      step3_title: 'Натисніть "Згенерувати"',
      step3_desc: 'Отримайте готові налаштування',
      step4_title: 'Скопіюйте або експортуйте',
      step4_desc: 'Використовуйте кнопки копіювання або експорт у TXT',
      guide_tip: 'Паролі можна оновлювати окремо кнопками 🔄 біля кожного поля',

      // Поля введення
      project_label: 'Назва проєкту:',
      generate_btn: 'Згенерувати',

      // Налаштування паролів
      password_settings: '🔐 Налаштування паролів:',
      simple: 'Простий (тільки літери та цифри)',
      strong: 'Сильний (з спецсимволами)',
      password_note: '⚡ Довжина пароля: 12 символів',

      // Секція бази даних
      db_title: 'Налаштування бази даних (MySQL)',
      db_name: 'Назва БД:',
      db_user: 'Користувач БД:',
      db_password: 'Пароль БД:',

      // Секція WordPress
      wp_title: 'Налаштування WordPress (wp-config.php)',
      wp_site: 'Назва сайту (URL):',
      wp_user: 'Користувач (admin):',
      wp_password: 'Пароль:',

      // Заголовки кодових блоків
      sql_title: '📊 SQL для створення бази даних:',
      wp_config_title: '🔧 Фрагмент для wp-config.php:',

      // Кнопки
      copy_btn: '📋 Копіювати',
      copy_sql: '📋 Скопіювати SQL',
      copy_wp: '📋 Скопіювати wp-config.php',

      // Експорт
      export_txt: 'Експорт у TXT',

      // Підказка внизу
      footer_note:
        '⚡ Просто скопіюйте SQL у phpMyAdmin, а фрагмент для wp-config.php вставте у файл wp-config.php вашого WordPress сайту.',

      // Футер
      footer_made_for: 'Створено з ❤️ для WordPress розробників',
      copyright_year: '© 2026',
      copyright_rights: 'Всі права захищено.',

      // Індикатор складності
      weak: 'Слабкий',
      medium: 'Середній',
      strong_text: 'Сильний',
      very_strong: 'Дуже сильний',

      // Копіювання
      refresh_title: 'Згенерувати новий пароль',
      copied: '✅ Скопійовано!',
      copy_error: 'Не вдалося скопіювати',

      // Коментарі в SQL та wp-config
      sql_comment_create: '-- Створення бази даних та користувача',
      sql_comment_important:
        '-- Важливо: змініть "localhost" на відповідний хост, -- якщо база даних знаходиться на окремому сервері',
      wp_comment_db: '// Налаштування бази даних',
      wp_comment_host:
        '// Змініть DB_HOST якщо використовуєте інший хост // Для MariaDB/MySQL на окремому сервері: "host:port"',

      // Експорт TXT
      export_header: 'WP PASSWORD GENERATOR - ЕКСПОРТ',
      export_date: 'Дата:',
      export_project: 'Проєкт:',
      export_db_settings: 'НАЛАШТУВАННЯ БАЗИ ДАНИХ',
      export_db_name: 'Назва БД:',
      export_db_user: 'Користувач БД:',
      export_db_pass: 'Пароль БД:',
      export_wp_settings: 'НАЛАШТУВАННЯ WORDPRESS',
      export_wp_site: 'Назва сайту:',
      export_wp_user: 'Користувач:',
      export_wp_pass: 'Пароль:',
      export_sql: 'SQL ЗАПИТ',
      export_wp_config: 'WP-CONFIG.PHP',
    },
    en: {
      // Headers
      title: 'Password Generator for WordPress Development',
      subtitle:
        'Enter project name and get ready-to-use database and WordPress settings.',

      // Guide
      guide_title: '📖 Step-by-step Guide',
      step1_title: 'Enter project name',
      step1_desc: 'Example: lifetime, azov, myblog (Cyrillic supported)',
      step2_title: 'Choose password type',
      step2_desc: 'Simple or strong (12 characters)',
      step3_title: 'Click "Generate"',
      step3_desc: 'Get ready-to-use settings',
      step4_title: 'Copy or export',
      step4_desc: 'Use copy buttons or export to TXT',
      guide_tip: 'You can update passwords individually with 🔄 buttons',

      // Input fields
      project_label: 'Project name:',
      generate_btn: 'Generate',

      // Password settings
      password_settings: '🔐 Password settings:',
      simple: 'Simple (letters and numbers only)',
      strong: 'Strong (with special chars)',
      password_note: '⚡ Password length: 12 characters',

      // Database section
      db_title: 'Database Settings (MySQL)',
      db_name: 'DB Name:',
      db_user: 'DB User:',
      db_password: 'DB Password:',

      // WordPress section
      wp_title: 'WordPress Settings (wp-config.php)',
      wp_site: 'Site URL:',
      wp_user: 'Username (admin):',
      wp_password: 'Password:',

      // Code block titles
      sql_title: '📊 SQL for database creation:',
      wp_config_title: '🔧 wp-config.php snippet:',

      // Buttons
      copy_btn: '📋 Copy',
      copy_sql: '📋 Copy SQL',
      copy_wp: '📋 Copy wp-config.php',

      // Export
      export_txt: 'Export TXT',

      // Footer note
      footer_note:
        '⚡ Simply copy the SQL into phpMyAdmin and paste the snippet for wp-config.php into the wp-config.php file of your WordPress site.',

      // Footer
      footer_made_for: 'Made with ❤️ for WordPress developers',
      copyright_year: '© 2026',
      copyright_rights: 'All rights reserved.',

      // Strength indicator
      weak: 'Weak',
      medium: 'Medium',
      strong_text: 'Strong',
      very_strong: 'Very strong',

      // Copying
      refresh_title: 'Generate new password',
      copied: '✅ Copied!',
      copy_error: 'Failed to copy',

      // SQL and wp-config comments
      sql_comment_create: '-- Create database and user',
      sql_comment_important:
        '-- Important: change "localhost" to appropriate host -- if database is on a separate server',
      wp_comment_db: '// Database settings',
      wp_comment_host:
        '// Change DB_HOST if using a different host // For MariaDB/MySQL on separate server: "host:port"',

      // TXT Export
      export_header: 'WP PASSWORD GENERATOR - EXPORT',
      export_date: 'Date:',
      export_project: 'Project:',
      export_db_settings: 'DATABASE SETTINGS',
      export_db_name: 'DB Name:',
      export_db_user: 'DB User:',
      export_db_pass: 'DB Password:',
      export_wp_settings: 'WORDPRESS SETTINGS',
      export_wp_site: 'Site URL:',
      export_wp_user: 'Username:',
      export_wp_pass: 'Password:',
      export_sql: 'SQL QUERY',
      export_wp_config: 'WP-CONFIG.PHP',
    },
  };

  // ===================== ФУНКЦІЯ ЗМІНИ МОВИ =====================
  function changeLanguage(lang) {
    currentLang = lang;

    // Оновлюємо всі елементи з data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translations[lang][key];
        } else {
          element.textContent = translations[lang][key];
        }
      }
    });

    // Оновлюємо title для кнопок оновлення
    document.getElementById('refresh-db-pass').title =
      translations[lang].refresh_title;
    document.getElementById('refresh-wp-pass').title =
      translations[lang].refresh_title;

    // Оновлюємо активний клас на кнопках мови
    langButtons.forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Оновлюємо індикатори складності
    updatePasswordStrengthIndicators();

    // Оновлюємо SQL та wp-config фрагменти з новими коментарями
    updateSQLSummary(
      dbNameEl.textContent,
      dbUserEl.textContent,
      dbPassEl.textContent,
    );
    updateWpConfigSummary(
      dbNameEl.textContent,
      dbUserEl.textContent,
      dbPassEl.textContent,
    );
  }

  // ===================== SECURITY =====================
  // Криптографічно безпечний генератор випадкових чисел
  function secureRandomInt(max) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  }

  function getRandomChar(chars) {
    return chars[secureRandomInt(chars.length)];
  }

  // Безпечне перемішування масиву (Fisher-Yates з криптографічним RNG)
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = secureRandomInt(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ===================== GENERATE RANDOM SUFFIX =====================
  // Додаємо 4-символьний рандомний суфікс для посилення безпеки
  function generateSuffix() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let suffix = '';
    for (let i = 0; i < 4; i++) {
      suffix += chars[secureRandomInt(chars.length)];
    }
    return suffix;
  }

  // ===================== PASSWORD =====================
  function generatePassword() {
    const type = document.querySelector(
      'input[name="password-type"]:checked',
    ).value;
    const length = 12;

    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';

    let all = '';
    let password = [];

    if (type === 'simple') {
      // Простий пароль: тільки літери та цифри
      all = lower + upper + numbers;
      for (let i = 0; i < length; i++) {
        password.push(getRandomChar(all));
      }
    } else {
      // Сильний пароль: гарантовано має хоча б один символ з кожної категорії
      password.push(getRandomChar(lower));
      password.push(getRandomChar(upper));
      password.push(getRandomChar(numbers));
      password.push(getRandomChar(symbols));

      all = lower + upper + numbers + symbols;

      // Додаємо решту символів
      while (password.length < length) {
        password.push(getRandomChar(all));
      }
    }

    // Перемішуємо, щоб гарантовані символи не були тільки на початку
    return shuffleArray(password).join('');
  }

  // ===================== SECURITY KEYS =====================
  // Генерація криптографічно безпечних солей для WordPress
  function generateSalt() {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const length = 64; // WordPress рекомендує 64 символи для солей

    let salt = '';
    for (let i = 0; i < length; i++) {
      salt += getRandomChar(chars);
    }
    return salt;
  }

  function generateSaltsBlock() {
    const salts = [
      'AUTH_KEY',
      'SECURE_AUTH_KEY',
      'LOGGED_IN_KEY',
      'NONCE_KEY',
      'AUTH_SALT',
      'SECURE_AUTH_SALT',
      'LOGGED_IN_SALT',
      'NONCE_SALT',
    ];

    let block = `/**
 * WordPress Security Keys & Salts
 * Generated with cryptographically secure random generator
 * https://api.wordpress.org/secret-key/1.1/salt/
 */
`;

    salts.forEach(salt => {
      block += `define('${salt}', '${generateSalt()}');\n`;
    });

    return block;
  }

  // ===================== SANITIZE =====================
  function transliterate(word) {
    const map = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'h',
      ґ: 'g',
      д: 'd',
      е: 'e',
      є: 'ye',
      ж: 'zh',
      з: 'z',
      и: 'y',
      і: 'i',
      ї: 'yi',
      й: 'y',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'kh',
      ц: 'ts',
      ч: 'ch',
      ш: 'sh',
      щ: 'shch',
      ь: '',
      ю: 'yu',
      я: 'ya',
      А: 'A',
      Б: 'B',
      В: 'V',
      Г: 'H',
      Ґ: 'G',
      Д: 'D',
      Е: 'E',
      Є: 'Ye',
      Ж: 'Zh',
      З: 'Z',
      И: 'Y',
      І: 'I',
      Ї: 'Yi',
      Й: 'Y',
      К: 'K',
      Л: 'L',
      М: 'M',
      Н: 'N',
      О: 'O',
      П: 'P',
      Р: 'R',
      С: 'S',
      Т: 'T',
      У: 'U',
      Ф: 'F',
      Х: 'Kh',
      Ц: 'Ts',
      Ч: 'Ch',
      Ш: 'Sh',
      Щ: 'Shch',
      Ь: '',
      Ю: 'Yu',
      Я: 'Ya',
    };

    return word
      .split('')
      .map(c => map[c] || c)
      .join('');
  }

  function sanitizeProjectName(name) {
    return (
      transliterate(name)
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 30) || 'project'
    );
  }

  function getDbBaseName(name) {
    return name.replace(/-/g, '_');
  }

  // ===================== GENERATION =====================
  function generateAll() {
    const clean = sanitizeProjectName(projectInput.value.trim());
    const dbBase = getDbBaseName(clean);

    // Генеруємо рандомний 4-символьний суфікс для посилення безпеки
    const suffix = generateSuffix();

    // Додаємо суфікс до всіх назв для додаткового захисту
    const dbName = `${dbBase}_${suffix}_db`; // lifetime_xk7m_db
    const dbUser = `${dbBase}_${suffix}_user`; // lifetime_xk7m_user
    const dbPass = generatePassword();

    const wpSite = `${clean}-site`; // lifetime-site (суфікс не потрібен для URL)
    const wpUser = `${clean}-${suffix}-admin`; // lifetime-xk7m-admin
    const wpPass = generatePassword();

    dbNameEl.textContent = dbName;
    dbUserEl.textContent = dbUser;
    dbPassEl.textContent = dbPass;

    wpSiteEl.textContent = wpSite;
    wpUserEl.textContent = wpUser;
    wpPassEl.textContent = wpPass;

    updateSQLSummary(dbName, dbUser, dbPass);
    updateWpConfigSummary(dbName, dbUser, dbPass);

    updatePasswordStrengthIndicators();
  }

  function updateSQLSummary(dbName, dbUser, dbPass) {
    sqlSummaryEl.textContent = `${translations[currentLang].sql_comment_create}
CREATE DATABASE IF NOT EXISTS \`${dbName}\`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS '${dbUser}'@'localhost'
  IDENTIFIED BY '${dbPass}';

GRANT ALL PRIVILEGES ON \`${dbName}\`.*
  TO '${dbUser}'@'localhost';

FLUSH PRIVILEGES;

${translations[currentLang].sql_comment_important}`;
  }

  function updateWpConfigSummary(dbName, dbUser, dbPass) {
    wpConfigSummaryEl.textContent = `<?php
/**
 * WordPress Database Configuration
 * Generated by WP Password Generator
 */

${translations[currentLang].wp_comment_db}
define('DB_NAME', '${dbName}');
define('DB_USER', '${dbUser}');
define('DB_PASSWORD', '${dbPass}');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

${generateSaltsBlock()}

/**
 * WordPress Database Table prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy publishing. */

if ( ! defined('ABSPATH') ) {
  define('ABSPATH', __DIR__ . '/');
}
require_once ABSPATH . 'wp-settings.php';`;
  }

  // ===================== STRENGTH =====================
  function checkPasswordStrength(password) {
    let score = 0;

    // Довжина
    if (password.length >= 8) score++;
    if (password.length >= 10) score++;
    if (password.length >= 12) score++;

    // Різноманітність символів
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;

    // Спеціальні символи дають більше балів
    const specialMatches = password.match(/[^a-zA-Z0-9]/g) || [];
    if (specialMatches.length > 0) score += Math.min(2, specialMatches.length);

    // Унікальність символів
    const uniqueChars = new Set(password.split('')).size;
    if (uniqueChars > password.length * 0.6) score++;

    return Math.min(10, score);
  }

  function updatePasswordStrength(password, bar, text) {
    const strength = checkPasswordStrength(password);
    const percentage = (strength / 10) * 100;
    bar.style.width = percentage + '%';

    // Оновлюємо колір та текст відповідно до рівня безпеки
    if (strength < 4) {
      bar.style.backgroundColor = '#f56565';
      text.textContent = translations[currentLang].weak;
    } else if (strength < 6) {
      bar.style.backgroundColor = '#ed8936';
      text.textContent = translations[currentLang].medium;
    } else if (strength < 8) {
      bar.style.backgroundColor = '#ecc94b';
      text.textContent = translations[currentLang].strong_text;
    } else {
      bar.style.backgroundColor = '#48bb78';
      text.textContent = translations[currentLang].very_strong;
    }
  }

  function updatePasswordStrengthIndicators() {
    updatePasswordStrength(dbPassEl.textContent, dbStrengthBar, dbStrengthText);
    updatePasswordStrength(wpPassEl.textContent, wpStrengthBar, wpStrengthText);
  }

  // ===================== COPY =====================
  function copyToClipboard(text, btn) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const old = btn.textContent;
        btn.textContent = translations[currentLang].copied;
        setTimeout(() => (btn.textContent = old), 1500);
      })
      .catch(() => {
        alert(translations[currentLang].copy_error);
      });
  }

  // ===================== EXPORT =====================
  function exportToTXT() {
    const date = new Date().toLocaleString(
      currentLang === 'uk' ? 'uk-UA' : 'en-US',
    );
    const t = translations[currentLang];

    const content = `========================================
${t.export_header}
========================================
${t.export_date} ${date}
${t.export_project} ${projectInput.value}

========================================
${t.export_db_settings}
========================================
${t.export_db_name} ${dbNameEl.textContent}
${t.export_db_user} ${dbUserEl.textContent}
${t.export_db_pass} ${dbPassEl.textContent}

========================================
${t.export_wp_settings}
========================================
${t.export_wp_site} ${wpSiteEl.textContent}
${t.export_wp_user} ${wpUserEl.textContent}
${t.export_wp_pass} ${wpPassEl.textContent}

========================================
${t.export_sql}
========================================
${sqlSummaryEl.textContent}

========================================
${t.export_wp_config}
========================================
${wpConfigSummaryEl.textContent}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `wp-${projectInput.value || 'config'}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // ===================== EVENT LISTENERS =====================

  // Копіювання окремих елементів
  document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
    btn.addEventListener('click', function () {
      const el = document.getElementById(this.dataset.copy);
      copyToClipboard(el.textContent, this);
    });
  });

  // Копіювання SQL
  document.getElementById('copy-sql').addEventListener('click', function () {
    copyToClipboard(sqlSummaryEl.textContent, this);
  });

  // Копіювання wp-config
  document
    .getElementById('copy-wp-config')
    .addEventListener('click', function () {
      copyToClipboard(wpConfigSummaryEl.textContent, this);
    });

  // Генерація
  generateBtn.addEventListener('click', generateAll);

  // Enter в полі введення
  projectInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') generateAll();
  });

  // Оновлення пароля БД
  refreshDbPass.addEventListener('click', () => {
    const pass = generatePassword();
    dbPassEl.textContent = pass;
    updateSQLSummary(dbNameEl.textContent, dbUserEl.textContent, pass);
    updateWpConfigSummary(dbNameEl.textContent, dbUserEl.textContent, pass);
    updatePasswordStrength(pass, dbStrengthBar, dbStrengthText);
  });

  // Оновлення пароля WordPress
  refreshWpPass.addEventListener('click', () => {
    const pass = generatePassword();
    wpPassEl.textContent = pass;
    updatePasswordStrength(pass, wpStrengthBar, wpStrengthText);
  });

  // Зміна типу пароля
  passwordTypeRadios.forEach(r => r.addEventListener('change', generateAll));

  // Експорт
  exportTxtBtn.addEventListener('click', exportToTXT);

  // Зміна мови
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => changeLanguage(btn.dataset.lang));
  });

  // ===================== INIT =====================
  // Встановлюємо початкову мову (англійська)
  changeLanguage('en');

  // Генеруємо початкові значення
  generateAll();
});
