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
  let currentLang = 'en';

  // ===================== ПЕРЕКЛАДИ =====================
  const translations = {
    uk: {
      title: 'Генератор паролів для розробки WordPress сайтів',
      subtitle:
        'Введіть назву проєкту та отримайте готові налаштування для бази даних та WordPress.',
      guide_title: '📖 Покрокова інструкція',
      step1_title: 'Введіть назву проєкту',
      step1_desc: 'Наприклад: мій сайт, мій блог, (можна кирилицею)',
      step2_title: 'Виберіть тип пароля',
      step2_desc: 'Простий або сильний (12 символів)',
      step3_title: 'Натисніть "Згенерувати"',
      step3_desc: 'Отримайте готові налаштування',
      step4_title: 'Скопіюйте або експортуйте',
      step4_desc: 'Використовуйте кнопки копіювання або експорт у TXT',
      guide_tip: 'Паролі можна оновлювати окремо кнопками 🔄 біля кожного поля',

      project_label: 'Назва проєкту:',
      generate_btn: 'Згенерувати',

      password_settings: '🔐 Налаштування паролів:',
      simple: 'Простий (тільки літери та цифри)',
      strong: 'Сильний (з спецсимволами)',
      password_note: '⚡ Довжина пароля: 12 символів',

      db_title: 'Налаштування бази даних (MySQL)',
      db_name: 'Назва БД:',
      db_user: 'Користувач БД:',
      db_password: 'Пароль БД:',

      wp_title: 'Налаштування WordPress (wp-config.php)',
      wp_site: 'Назва сайту (URL):',
      wp_user: 'WP Користувач:',
      wp_password: 'WP Пароль:',

      sql_title: '📊 SQL для створення бази даних:',
      wp_config_title: '🔧 Фрагмент для wp-config.php:',

      copy_btn: '📋 Копіювати',
      copy_sql: '📋 Скопіювати SQL',
      copy_wp: '📋 Скопіювати wp-config.php',

      export_txt: 'Експорт у TXT',
      footer_note:
        '⚡ Просто скопіюйте SQL у phpMyAdmin, а фрагмент для wp-config.php вставте у файл wp-config.php вашого WordPress сайту.',
      footer_made_for: 'Створено з ❤️ для WordPress розробників',
      copyright_year: '© 2026',
      copyright_rights: 'Всі права захищено.',

      weak: 'Слабкий',
      medium: 'Середній',
      strong_text: 'Сильний',
      very_strong: 'Дуже сильний',

      refresh_title: 'Згенерувати новий пароль',
      copied: '✅ Скопійовано!',
      copy_error: 'Не вдалося скопіювати',

      sql_comment_create: '-- Створення бази даних та користувача',
      sql_comment_important:
        '-- Важливо: змініть "localhost" на відповідний хост, -- якщо база даних знаходиться на окремому сервері',
      wp_comment_db: '// Налаштування бази даних',
      wp_comment_host:
        '// Змініть DB_HOST якщо використовуєте інший хост // Для MariaDB/MySQL на окремому сервері: "host:port"',

      export_header: 'WP PASSWORD GENERATOR - ЕКСПОРТ',
      export_date: 'Дата:',
      export_project: 'Проєкт:',
      export_db_settings: 'НАЛАШТУВАННЯ БАЗИ ДАНИХ',
      export_db_name: 'Назва БД:',
      export_db_user: 'Користувач БД:',
      export_db_pass: 'Пароль БД:',
      export_wp_settings: 'НАЛАШТУВАННЯ WORDPRESS',
      export_wp_site: 'Назва сайту:',
      export_wp_user: 'WP Користувач:',
      export_wp_pass: 'WP Пароль:',
      export_sql: 'SQL ЗАПИТ',
      export_wp_config: 'WP-CONFIG.PHP',
    },

    en: {
      title: 'Password generator for WordPress development',
      subtitle:
        'Enter project name and get ready-to-use database and WordPress settings.',

      guide_title: '📖 Step-by-step guide',
      step1_title: 'Enter project name',
      step1_desc: 'Example: myblog, mysite',
      step2_title: 'Choose password type',
      step2_desc: 'Simple or strong (12 characters)',
      step3_title: 'Click "Generate"',
      step3_desc: 'Get ready-to-use settings',
      step4_title: 'Copy or export',
      step4_desc: 'Use copy buttons or export to TXT',
      guide_tip: 'You can update passwords individually with 🔄 buttons',

      project_label: 'Project name:',
      generate_btn: 'Generate',

      password_settings: '🔐 Password settings:',
      simple: 'Simple (letters and numbers only)',
      strong: 'Strong (with special chars)',
      password_note: '⚡ Password length: 12 characters',

      db_title: 'Database settings (MySQL)',
      db_name: 'DB Name:',
      db_user: 'DB Username:',
      db_password: 'DB Password:',

      wp_title: 'WordPress settings (wp-config.php)',
      wp_site: 'Site URL:',
      wp_user: 'WP Username:',
      wp_password: 'WP Password:',

      sql_title: '📊 SQL for database creation:',
      wp_config_title: '🔧 wp-config.php snippet:',

      copy_btn: '📋 Copy',
      copy_sql: '📋 Copy SQL',
      copy_wp: '📋 Copy wp-config.php',

      export_txt: 'Export TXT',
      footer_note:
        '⚡ Simply copy the SQL into phpMyAdmin and paste the snippet for wp-config.php into the wp-config.php file of your WordPress site.',
      footer_made_for: 'Made with ❤️ for WordPress developers',
      copyright_year: '© 2026',
      copyright_rights: 'All rights reserved.',
      weak: 'Weak',
      medium: 'Medium',
      strong_text: 'Strong',
      very_strong: 'Very strong',

      refresh_title: 'Generate new password',
      copied: '✅ Copied!',
      copy_error: 'Failed to copy',

      sql_comment_create: '-- Create database and user',
      sql_comment_important:
        '-- Important: change "localhost" to appropriate host -- if database is on a separate server',
      wp_comment_db: '// Database settings',
      wp_comment_host:
        '// Change DB_HOST if using a different host // For MariaDB/MySQL on separate server: "host:port"',

      export_header: 'WP PASSWORD GENERATOR - EXPORT',
      export_date: 'Date:',
      export_project: 'Project:',
      export_db_settings: 'DATABASE SETTINGS',
      export_db_name: 'DB Name:',
      export_db_user: 'DB Username:',
      export_db_pass: 'DB Password:',
      export_wp_settings: 'WORDPRESS SETTINGS',
      export_wp_site: 'Site URL:',
      export_wp_user: 'WP Username:',
      export_wp_pass: 'WP Password:',
      export_sql: 'SQL QUERY',
      export_wp_config: 'WP-CONFIG.PHP',
    },
  };

  // ===================== SECURITY =====================
  function secureRandomInt(max) {
    if (!crypto || !crypto.getRandomValues) {
      throw new Error('Secure random generator not supported');
    }
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  }

  function getRandomChar(chars) {
    return chars[secureRandomInt(chars.length)];
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = secureRandomInt(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function escapeSQL(str) {
    return str.replace(/'/g, "\\'");
  }

  // ===================== ТРАНСЛІТЕРАЦІЯ =====================
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
      А: 'a',
      Б: 'b',
      В: 'v',
      Г: 'h',
      Ґ: 'g',
      Д: 'd',
      Е: 'e',
      Є: 'ye',
      Ж: 'zh',
      З: 'z',
      И: 'y',
      І: 'i',
      Ї: 'yi',
      Й: 'y',
      К: 'k',
      Л: 'l',
      М: 'm',
      Н: 'n',
      О: 'o',
      П: 'p',
      Р: 'r',
      С: 's',
      Т: 't',
      У: 'u',
      Ф: 'f',
      Х: 'kh',
      Ц: 'ts',
      Ч: 'ch',
      Ш: 'sh',
      Щ: 'shch',
      Ь: '',
      Ю: 'yu',
      Я: 'ya',
    };

    return word
      .split('')
      .map(char => map[char] || char)
      .join('');
  }

  // ===================== PASSWORD =====================
  function generatePassword() {
    const selected = document.querySelector(
      'input[name="password-type"]:checked',
    );
    const type = selected ? selected.value : 'strong';

    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';

    const length = 12;
    let password = [];

    if (type === 'simple') {
      const all = lower + upper + numbers;
      for (let i = 0; i < length; i++) {
        password.push(getRandomChar(all));
      }
    } else {
      password.push(getRandomChar(lower));
      password.push(getRandomChar(upper));
      password.push(getRandomChar(numbers));
      password.push(getRandomChar(symbols));

      const all = lower + upper + numbers + symbols;
      while (password.length < length) {
        password.push(getRandomChar(all));
      }
    }

    return shuffleArray(password).join('');
  }

  // ===================== SECURITY KEYS =====================
  function generateSalt() {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const length = 64;

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

  // ===================== GENERATION =====================
  function generateSuffix() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let suffix = '';
    for (let i = 0; i < 4; i++) {
      suffix += getRandomChar(chars);
    }
    return suffix;
  }

  // ВИПРАВЛЕНО: додано транслітерацію перед обробкою
  function sanitizeProjectName(name) {
    // Спочатку транслітеруємо кирилицю
    const transliterated = transliterate(name);
    // Потім обробляємо
    const cleaned = transliterated
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 30);

    // Якщо після очищення нічого не залишилось, повертаємо 'project'
    return cleaned || 'project';
  }

  function getDbBaseName(name) {
    return name.replace(/-/g, '_');
  }

  function updateSQLSummary(dbName, dbUser, dbPass) {
    if (sqlSummaryEl) {
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
  }

  function updateWpConfigSummary(dbName, dbUser, dbPass) {
    if (wpConfigSummaryEl) {
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
  }

  function generateAll() {
    const rawName = projectInput.value.trim();
    const clean = sanitizeProjectName(rawName);
    const dbBase = getDbBaseName(clean);
    const suffix = generateSuffix();

    const dbName = `${dbBase}_${suffix}_db`;
    const dbUser = `${dbBase}_${suffix}_user`;
    const dbPass = generatePassword();

    const wpSite = `${clean}-site`;
    const wpUser = `${clean}-${suffix}-admin`;
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

  // ===================== STRENGTH =====================
  function checkPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 10) score++;
    if (password.length >= 12) score++;

    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;

    const specialMatches = password.match(/[^a-zA-Z0-9]/g) || [];
    if (specialMatches.length > 0) score += Math.min(2, specialMatches.length);

    const uniqueChars = new Set(password.split('')).size;
    if (uniqueChars > password.length * 0.6) score++;

    return Math.min(10, score);
  }

  function updatePasswordStrength(password, bar, text) {
    if (!bar || !text) return;

    const strength = checkPasswordStrength(password);
    const percentage = (strength / 10) * 100;
    bar.style.width = percentage + '%';

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

  // ===================== LANGUAGE =====================
  function changeLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    document.getElementById('refresh-db-pass').title =
      translations[lang].refresh_title;
    document.getElementById('refresh-wp-pass').title =
      translations[lang].refresh_title;

    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    updatePasswordStrengthIndicators();
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
${t.export_project} ${projectInput.value || 'project'}

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
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `wp-${projectInput.value || 'config'}-${Date.now()}.txt`;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
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

  // ===================== EVENTS =====================
  document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
    btn.addEventListener('click', function () {
      const el = document.getElementById(this.dataset.copy);
      if (el) copyToClipboard(el.textContent, this);
    });
  });

  document.getElementById('copy-sql')?.addEventListener('click', function () {
    copyToClipboard(sqlSummaryEl.textContent, this);
  });

  document
    .getElementById('copy-wp-config')
    ?.addEventListener('click', function () {
      copyToClipboard(wpConfigSummaryEl.textContent, this);
    });

  generateBtn?.addEventListener('click', generateAll);

  projectInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') generateAll();
  });

  refreshDbPass?.addEventListener('click', () => {
    const pass = generatePassword();
    dbPassEl.textContent = pass;
    updateSQLSummary(dbNameEl.textContent, dbUserEl.textContent, pass);
    updateWpConfigSummary(dbNameEl.textContent, dbUserEl.textContent, pass);
    updatePasswordStrength(pass, dbStrengthBar, dbStrengthText);
  });

  refreshWpPass?.addEventListener('click', () => {
    const pass = generatePassword();
    wpPassEl.textContent = pass;
    updatePasswordStrength(pass, wpStrengthBar, wpStrengthText);
  });

  passwordTypeRadios.forEach(r => r?.addEventListener('change', generateAll));

  exportTxtBtn?.addEventListener('click', exportToTXT);

  langButtons.forEach(btn => {
    btn?.addEventListener('click', () => changeLanguage(btn.dataset.lang));
  });

  // ===================== INIT =====================
  changeLanguage('en');
  generateAll();
});
