document.addEventListener('DOMContentLoaded', function () {
  // ===================== CRYPTO API CHECK =====================
  if (!window.crypto || !window.crypto.getRandomValues) {
    alert(
      'Your browser does not support modern cryptographic features. Please update your browser.',
    );
    throw new Error('Crypto API not supported');
  }

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
  const htaccessSummaryEl = document.getElementById('htaccess-summary');
  const robotsSummaryEl = document.getElementById('robots-summary');

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

  // ===================== STATE =====================
  let generatedSalts = null;
  let currentDbPass = '';
  let currentWpPass = '';

  // ===================== HELPER =====================
  function getPasswordType() {
    const selected = document.querySelector(
      'input[name="password-type"]:checked',
    );
    return selected ? selected.value : 'strong';
  }

  // ===================== TRANSLATIONS =====================
  const translations = {
    uk: {
      title: 'Генератор паролів для розробки WordPress сайтів',
      subtitle:
        'Введіть назву проєкту та отримайте готові налаштування для бази даних та WordPress.',
      guide_title: '📖 Покрокова інструкція',
      step1_title: 'Введіть назву проєкту',
      step1_desc: 'Наприклад: мій сайт, мій блог, (можна кирилицею)',
      step2_title: 'Виберіть тип пароля',
      step2_desc: 'Простий або сильний (16 символів)',
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
      password_note: 'Довжина пароля: 16 символів',

      db_title: 'Налаштування бази даних (MySQL)',
      db_name: 'Назва БД:',
      db_user: "Ім'я користувача:",
      db_password: 'Пароль:',

      wp_title: 'Налаштування WordPress',
      wp_site: 'Назва сайту:',
      wp_user: "Ім'я користувача:",
      wp_password: 'Пароль:',

      sql_title: '📊 SQL для створення бази даних:',
      wp_config_title: '🔧 Фрагмент для wp-config.php:',
      htaccess_title: '🛡️ .htaccess (Безпека)',
      robots_title: '🤖 robots.txt (SEO та безпека)',

      copy_btn: 'Копіювати',
      copy_sql: 'Скопіювати SQL',
      copy_wp: 'Скопіювати wp-config.php',
      copy_htaccess: 'Скопіювати .htaccess',
      copy_robots: 'Скопіювати robots.txt',

      export_txt: 'Експорт у TXT',
      footer_note:
        'Просто скопіюйте SQL у phpMyAdmin, а фрагмент для wp-config.php вставте у файл wp-config.php вашого WordPress сайту.',
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
      export_htaccess: '.HTACCESS',
      export_robots: 'ROBOTS.TXT',

      // FAQ translations
      faq_title: '❓ Часті запитання',
      faq_q1: 'Цей генератор безкоштовний?',
      faq_a1:
        'Так! Це повністю безкоштовний інструмент з відкритим кодом без жодних обмежень. Перегляньте вихідний код на GitHub: https://github.com/ovcharovcoder/wp-password-generator',
      faq_q2: 'Чим цей генератор відрізняється від інших?',
      faq_a2: [
        '🔐 Криптографічна випадковість (crypto.getRandomValues)',
        '🎲 Унікальні 6-символьні суфікси для кожного компонента',
        '🔑 16-символьні паролі з гарантованою різноманітністю',
        '📄 Генерація .htaccess та robots.txt файлів',
        '🛡️ Повні Security Keys для WordPress (8 унікальних солей)',
        "💉 Захист від SQL ін'єкцій",
      ],
      faq_q3: 'Наскільки безпечні згенеровані паролі?',
      faq_a3:
        'Дуже безпечні! Ми використовуємо криптографічно безпечний генератор випадкових чисел (crypto.getRandomValues), а не Math.random(). Паролі мають довжину 16 символів і включають великі та малі літери, цифри й спеціальні символи. Це дає величезну кількість можливих комбінацій, що робить їх практично неможливими для підбору.',
      faq_q4: 'Чи потрібно щось встановлювати?',
      faq_a4:
        'Встановлення не потрібне! Це веб-інструмент, який працює у вашому браузері. Жодні дані не відправляються на сервер – усе відбувається локально на вашому пристрої.',
      faq_q5: 'Чи можна використовувати для існуючих WordPress сайтів?',
      faq_a5:
        'Так! Ви можете використовувати цей інструмент для створення нових облікових даних при міграції бази даних, оновлення wp-config.php або для налаштування безпечних .htaccess та robots.txt на будь-якому існуючому WordPress сайті.',
      faq_q6: 'Які файли створює генератор?',
      faq_a6: [
        '📊 SQL – скрипт створення бази даних',
        '🔧 wp-config.php – конфігурація WordPress з security keys',
        '🛡️ .htaccess – правила безпеки Apache та оптимізація',
        '🤖 robots.txt – конфігурація SEO та безпеки',
      ],
    },

    en: {
      title: 'Password generator for WordPress development',
      subtitle:
        'Enter project name and get ready-to-use database and WordPress settings.',

      guide_title: '📖 Step-by-step guide',
      step1_title: 'Enter project name',
      step1_desc: 'Example: myblog, mysite',
      step2_title: 'Choose password type',
      step2_desc: 'Simple or strong (16 characters)',
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
      password_note: 'Password length: 16 characters',

      db_title: 'Database settings (MySQL)',
      db_name: 'DB Name:',
      db_user: 'Username:',
      db_password: 'Password:',

      wp_title: 'WordPress settings',
      wp_site: 'Site Title:',
      wp_user: 'Username:',
      wp_password: 'Password:',

      sql_title: '📊 SQL for database creation:',
      wp_config_title: '🔧 wp-config.php snippet:',
      htaccess_title: '🛡️ .htaccess (Security)',
      robots_title: '🤖 robots.txt (SEO & Security)',

      copy_btn: 'Copy',
      copy_sql: 'Copy SQL',
      copy_wp: 'Copy wp-config.php',
      copy_htaccess: 'Copy .htaccess',
      copy_robots: 'Copy robots.txt',

      export_txt: 'Export TXT',
      footer_note:
        'Simply copy the SQL into phpMyAdmin and paste the snippet for wp-config.php into the wp-config.php file of your WordPress site.',
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
      export_htaccess: '.HTACCESS',
      export_robots: 'ROBOTS.TXT',

      // FAQ translations
      faq_title: '❓ FAQ',
      faq_q1: 'Is this generator free?',
      faq_a1:
        'Yes! This is a completely free and open-source tool. You can use it without any limitations. Check out the source code on GitHub: https://github.com/ovcharovcoder/wp-password-generator',
      faq_q2: 'What makes this generator different from others?',
      faq_a2: [
        '🔐 Cryptographic randomness (crypto.getRandomValues)',
        '🎲 Unique 6-character suffixes for each component',
        '🔑 16-character passwords with guaranteed diversity',
        '📄 Generates .htaccess and robots.txt files',
        '🛡️ Full WordPress Security Keys (8 salts)',
        '💉 SQL injection protection',
      ],
      faq_q3: 'How secure are the generated passwords?',
      faq_a3:
        'Very secure! We use a cryptographically secure random number generator (crypto.getRandomValues), not Math.random(). Passwords are 16 characters long and include uppercase and lowercase letters, numbers, and special characters. This results in an enormous number of possible combinations, making them practically impossible to brute-force.',
      faq_q4: 'Do I need to install anything?',
      faq_a4:
        'No installation needed! This is a web-based tool that runs entirely in your browser. No data is sent to any server – everything happens locally on your device.',
      faq_q5: 'Can I use this for existing WordPress sites?',
      faq_a5:
        'Absolutely! You can use this tool to generate new credentials for database migration, update wp-config.php, or set up secure .htaccess and robots.txt files on any existing WordPress site.',
      faq_q6: 'What files does the generator create?',
      faq_a6: [
        '📊 SQL – database creation script',
        '🔧 wp-config.php – WordPress configuration with security keys',
        '🛡️ .htaccess – Apache security rules and optimization',
        '🤖 robots.txt – SEO and security configuration',
      ],
    },
  };

  // ===================== SECURITY =====================
  function secureRandomInt(max) {
    const arr = new Uint32Array(1);
    const limit = Math.floor(0xffffffff / max) * max;
    let rand;

    do {
      crypto.getRandomValues(arr);
      rand = arr[0];
    } while (rand >= limit);

    return rand % max;
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
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "''")
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\0/g, '\\0')
      .replace(/\x1a/g, '\\Z');
  }

  // ===================== TRANSLITERATION =====================
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
  function generatePassword(type) {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^*_+-=';

    const length = 16;
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
 */
`;

    salts.forEach(salt => {
      block += `define('${salt}', '${generateSalt()}');\n`;
    });

    return block;
  }

  function getSaltsBlock() {
    if (generatedSalts) return generatedSalts;
    generatedSalts = generateSaltsBlock();
    return generatedSalts;
  }

  // ===================== GENERATION =====================
  function generateSuffix() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let suffix = '';
    for (let i = 0; i < 6; i++) {
      suffix += getRandomChar(chars);
    }
    return suffix;
  }

  function generateUniqueSuffixes() {
    const suffixes = new Set();

    while (suffixes.size < 3) {
      suffixes.add(generateSuffix());
    }

    const [dbSuffix, userSuffix, wpSuffix] = [...suffixes];
    return { dbSuffix, userSuffix, wpSuffix };
  }

  function sanitizeProjectName(name) {
    const transliterated = transliterate(name);
    const cleaned = transliterated
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 45);

    return cleaned || 'project';
  }

  function getDbBaseName(name) {
    return name.replace(/-/g, '_');
  }

  // ===================== DATA MODEL =====================
  function buildProjectData() {
    const rawName = projectInput.value.trim();
    const baseName = rawName === '' ? 'project' : rawName;
    const clean = sanitizeProjectName(baseName);
    const dbBase = getDbBaseName(clean);
    const passwordType = getPasswordType();
    const { dbSuffix, userSuffix, wpSuffix } = generateUniqueSuffixes();

    return {
      projectName: clean,
      dbName: `${dbBase}_${dbSuffix}_db`,
      dbUser: `${dbBase}_${userSuffix}_user`,
      dbPass: generatePassword(passwordType),
      wpSite: `${clean}`,
      wpUser: `${clean}-${wpSuffix}-admin`,
      wpPass: generatePassword(passwordType),
      passwordType,
    };
  }

  function renderProjectData(data) {
    dbNameEl.textContent = data.dbName;
    dbUserEl.textContent = data.dbUser;
    dbPassEl.textContent = data.dbPass;
    wpSiteEl.textContent = data.wpSite;
    wpUserEl.textContent = data.wpUser;
    wpPassEl.textContent = data.wpPass;

    currentDbPass = data.dbPass;
    currentWpPass = data.wpPass;
  }

  // ===================== STATIC CONTENT =====================
  function getHtaccessContent() {
    return `# =========================
# CORE SECURITY
# =========================

# Protect wp-config.php
<Files wp-config.php>
    Require all denied
</Files>

# Disable XML-RPC (major attack vector)
<Files xmlrpc.php>
    Require all denied
</Files>

# Disable directory browsing
Options -Indexes

# Protect hidden files (allow .well-known for SSL)
RedirectMatch 403 /\\.(?!well-known).*

# Block access to sensitive files
<FilesMatch "(^#.*#|\\.(inc|log|bak|sql|git|svn|htaccess|htpasswd|ini|sh|yml|lock)$)">
    Require all denied
</FilesMatch>

# =========================
# BASIC BOT / BAD REQUEST FILTER
# =========================

<IfModule mod_rewrite.c>
RewriteEngine On

# Block suspicious query strings (basic injections)
RewriteCond %{QUERY_STRING} (\\.\\./|\\.\\.\\\\|<|>|%3C|%3E|UNION|SELECT|INSERT|DROP|--|') [NC]
RewriteRule .* - [F]

# Block direct access to PHP in uploads (common hack vector)
RewriteRule ^wp-content/uploads/.*\\.php$ - [F]
</IfModule>

# =========================
# LOGIN PROTECTION (LIGHT)
# =========================

<Files wp-login.php>
    Require all denied
</Files>

# =========================
# PERFORMANCE
# =========================

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json application/xml text/plain font/woff2 application/font-woff application/vnd.ms-fontobject
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On

    # Images
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"

    # Fonts
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType application/font-woff "access plus 1 year"

    # CSS / JS
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# =========================
# SECURITY HEADERS
# =========================

<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set Referrer-Policy "strict-origin-when-cross-origin"

    # Basic CSP (safe mode)
    Header set Content-Security-Policy "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'"
</IfModule>`;
  }

  function getRobotsContent() {
    return `# =========================
# OPTIMIZED ROBOTS.TXT
# =========================

# Apply rules to all bots
User-agent: *

# -------------------------
# Core WordPress security
# -------------------------

# Block sensitive admin and system files
Disallow: /wp-admin/
Disallow: /wp-login.php
Disallow: /wp-register.php
Disallow: /xmlrpc.php
Disallow: /wp-signup.php
Disallow: /wp-activate.php
Disallow: /wp-config.php
Disallow: /readme.html
Disallow: /license.txt

# Block plugin and theme folders for indexing
Disallow: /wp-content/plugins/
Disallow: /wp-content/themes/

# Allow public JS/CSS from plugins/themes for proper rendering
Allow: /wp-content/plugins/*.js
Allow: /wp-content/plugins/*.css
Allow: /wp-content/themes/*.js
Allow: /wp-content/themes/*.css

# Allow media uploads for indexing
Allow: /wp-content/uploads/

# -------------------------
# Optional crawl control
# -------------------------

# Reduce server load (adjust if needed)
# Crawl-delay: 1

# -------------------------
# Sitemap
# -------------------------
Sitemap: https://yourdomain.com/sitemap.xml`;
  }

  function updateHtaccess() {
    if (htaccessSummaryEl) {
      htaccessSummaryEl.textContent = getHtaccessContent();
    }
  }

  function updateRobots() {
    if (robotsSummaryEl) {
      robotsSummaryEl.textContent = getRobotsContent();
    }
  }

  // ===================== SQL & WP-CONFIG =====================
  function updateSQLSummary(dbName, dbUser, dbPass) {
    if (sqlSummaryEl) {
      sqlSummaryEl.textContent = `${translations.en.sql_comment_create}
CREATE DATABASE IF NOT EXISTS \`${dbName}\`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS \`${dbUser}\`@'localhost'
  IDENTIFIED BY '${escapeSQL(dbPass)}';

-- Grant all privileges for WordPress (without GRANT OPTION for security)
GRANT ALL PRIVILEGES ON \`${dbName}\`.*
  TO \`${dbUser}\`@'localhost';

FLUSH PRIVILEGES;

${translations.en.sql_comment_important}`;
    }
  }

  function updateWpConfigSummary(dbName, dbUser, dbPass) {
    if (wpConfigSummaryEl) {
      wpConfigSummaryEl.textContent = `<?php
/**
 * WordPress Database Configuration
 * Generated by WP Password Generator
 */

// Database settings
define('DB_NAME', '${dbName}');
define('DB_USER', '${dbUser}');
define('DB_PASSWORD', '${dbPass}');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

${getSaltsBlock()}`;
    }
  }

  function resetSalts() {
    generatedSalts = null;
  }

  function generateAll() {
    const projectData = buildProjectData();

    resetSalts();

    renderProjectData(projectData);

    updateSQLSummary(
      projectData.dbName,
      projectData.dbUser,
      projectData.dbPass,
    );
    updateWpConfigSummary(
      projectData.dbName,
      projectData.dbUser,
      projectData.dbPass,
    );

    updateHtaccess();
    updateRobots();

    updatePasswordStrengthIndicators();
  }

  // ===================== STRENGTH =====================
  function checkPasswordStrength(password) {
    if (!password) return 0;

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

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
    if (dbPassEl.textContent) {
      updatePasswordStrength(
        dbPassEl.textContent,
        dbStrengthBar,
        dbStrengthText,
      );
    }
    if (wpPassEl.textContent) {
      updatePasswordStrength(
        wpPassEl.textContent,
        wpStrengthBar,
        wpStrengthText,
      );
    }
  }

  // ===================== LANGUAGE =====================
  function changeLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const value = translations[lang]?.[key];

      if (!value) return;

      // Якщо масив → список
      if (Array.isArray(value)) {
        element.innerHTML = value
          .map(item => `<div class="faq-list-item">${item}</div>`)
          .join('');
      }
      // Якщо текст
      else {
        element.textContent = value;
      }
    });

    if (refreshDbPass) {
      refreshDbPass.title = translations[lang].refresh_title;
    }
    if (refreshWpPass) {
      refreshWpPass.title = translations[lang].refresh_title;
    }

    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    updatePasswordStrengthIndicators();

    // Важливо: при зміні мови НЕ оновлюємо SQL та wp-config,
    // щоб вони залишалися англійською
  }

  // ===================== COPY з FALLBACK =====================
  function copyToClipboard(text, btn) {
    const copySuccess = () => {
      const old = btn.textContent;
      btn.textContent = translations[currentLang].copied;
      setTimeout(() => (btn.textContent = old), 1500);
    };

    const copyFail = () => {
      alert(translations[currentLang].copy_error);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(copySuccess).catch(copyFail);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const success = document.execCommand('copy');
      if (success) {
        copySuccess();
      } else {
        copyFail();
      }
    } catch (err) {
      copyFail();
    }

    document.body.removeChild(textarea);
  }

  // ===================== EXPORT =====================
  function exportToTXT() {
    const date = new Date().toLocaleString(
      currentLang === 'uk' ? 'uk-UA' : 'en-US',
    );
    const t = translations.en; // ЗАВЖДИ англійська для експорту
    const safeName = sanitizeProjectName(projectInput.value || 'project');

    const content = `========================================
${t.export_header}
========================================
${t.export_date} ${date}
${t.export_project} ${safeName}

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
${wpConfigSummaryEl.textContent}

========================================
${t.export_htaccess}
========================================
${htaccessSummaryEl.textContent}

========================================
${t.export_robots}
========================================
${robotsSummaryEl.textContent}

========================================
Generated by WP Password Generator
(https://ovcharovcoder.github.io/wp-password-generator)
© 2026 Andrii Ovcharov. All rights reserved.
========================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `wp-${safeName}-${Date.now()}.txt`;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  // ===================== REFRESH HELPERS =====================
  function refreshDbPassword() {
    const passwordType = getPasswordType();

    currentDbPass = generatePassword(passwordType);
    dbPassEl.textContent = currentDbPass;
    updateSQLSummary(dbNameEl.textContent, dbUserEl.textContent, currentDbPass);
    updateWpConfigSummary(
      dbNameEl.textContent,
      dbUserEl.textContent,
      currentDbPass,
    );
    updatePasswordStrength(currentDbPass, dbStrengthBar, dbStrengthText);
  }

  function refreshWpPassword() {
    const passwordType = getPasswordType();

    currentWpPass = generatePassword(passwordType);
    wpPassEl.textContent = currentWpPass;
    updatePasswordStrength(currentWpPass, wpStrengthBar, wpStrengthText);
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

  document
    .getElementById('copy-htaccess')
    ?.addEventListener('click', function () {
      copyToClipboard(htaccessSummaryEl.textContent, this);
    });

  document
    .getElementById('copy-robots')
    ?.addEventListener('click', function () {
      copyToClipboard(robotsSummaryEl.textContent, this);
    });

  generateBtn?.addEventListener('click', generateAll);

  projectInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      generateAll();
    }
  });

  refreshDbPass?.addEventListener('click', refreshDbPassword);
  refreshWpPass?.addEventListener('click', refreshWpPassword);

  passwordTypeRadios.forEach(r =>
    r?.addEventListener('change', () => {
      updatePasswordStrengthIndicators();
    }),
  );

  exportTxtBtn?.addEventListener('click', exportToTXT);

  langButtons.forEach(btn => {
    btn?.addEventListener('click', () => changeLanguage(btn.dataset.lang));
  });

  // ===================== FAQ ACCORDION =====================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');

      if (question) {
        question.addEventListener('click', () => {
          // Close other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
            }
          });

          // Toggle current item
          item.classList.toggle('active');
        });
      }
    });
  }

  // ===================== INIT =====================
  changeLanguage('en');
  generateAll();
  initFaqAccordion();
});
