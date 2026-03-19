document.addEventListener('DOMContentLoaded', function () {
  // DOM елементи
  const projectInput = document.getElementById('project-name');
  const generateBtn = document.getElementById('generate-btn');

  // Елементи для результатів
  const dbNameEl = document.getElementById('db-name');
  const dbUserEl = document.getElementById('db-user');
  const dbPassEl = document.getElementById('db-pass');
  const wpSiteEl = document.getElementById('wp-site');
  const wpUserEl = document.getElementById('wp-user');
  const wpPassEl = document.getElementById('wp-pass');
  const sqlSummaryEl = document.getElementById('sql-summary');
  const wpConfigSummaryEl = document.getElementById('wp-config-summary');

  // Кнопки оновлення паролів
  const refreshDbPass = document.getElementById('refresh-db-pass');
  const refreshWpPass = document.getElementById('refresh-wp-pass');

  // Налаштування паролів
  const passwordTypeRadios = document.querySelectorAll(
    'input[name="password-type"]',
  );

  // Індикатори складності
  const dbStrengthBar = document.getElementById('db-strength-bar');
  const dbStrengthText = document.getElementById('db-strength-text');
  const wpStrengthBar = document.getElementById('wp-strength-bar');
  const wpStrengthText = document.getElementById('wp-strength-text');

  // Кнопка експорту
  const exportTxtBtn = document.getElementById('export-txt');

  // Перемикач мов
  const langButtons = document.querySelectorAll('.lang-btn');
  let currentLang = 'uk';

  // Словник перекладів
  const translations = {
    uk: {
      title: 'Генератор паролів для розробки WordPress сайтів',
      subtitle:
        'Введіть назву проекту та отримайте готові налаштування для бази даних та WordPress.',
      project_label: 'Назва проекту:',
      generate_btn: 'Згенерувати',
      db_title: 'Налаштування бази даних (MySQL)',
      db_name: 'Назва БД:',
      db_user: 'Користувач БД:',
      db_password: 'Пароль БД:',
      wp_title: 'Налаштування WordPress (wp-config.php)',
      wp_site: 'Назва сайту (URL):',
      wp_user: 'Користувач (admin):',
      wp_password: 'Пароль:',
      copy_btn: '📋 Копіювати',
      sql_title: '📊 SQL для створення бази даних:',
      copy_sql: '📋 Скопіювати SQL',
      wp_config_title: '🔧 Фрагмент для wp-config.php:',
      copy_wp: '📋 Скопіювати wp-config.php',
      footer_note:
        '⚡ Просто скопіюйте SQL у phpMyAdmin, а фрагмент для wp-config.php вставте у файл wp-config.php вашого WordPress сайту.',
      footer_made_for: 'Створено з ❤️ для WordPress розробників',
      refresh_title: 'Згенерувати новий пароль',
      password_settings: '🔐 Налаштування паролів:',
      simple: 'Простий (тільки літери та цифри)',
      strong: 'Сильний (з спецсимволами)',
      password_note: '⚡ Довжина пароля: 12 символів',
      weak: 'Слабкий',
      medium: 'Середній',
      strong_text: 'Сильний',
      very_strong: 'Дуже сильний',
      export_txt: 'Експорт у TXT',
      guide_title: '📖 Покрокова інструкція',
      step1_title: 'Введіть назву проекту',
      step1_desc: 'Наприклад: lifetime, azov, myblog (можна кирилицею)',
      step2_title: 'Виберіть тип пароля',
      step2_desc: 'Простий або сильний (12 символів)',
      step3_title: 'Натисніть "Згенерувати"',
      step3_desc: 'Отримайте готові налаштування',
      step4_title: 'Скопіюйте або експортуйте',
      step4_desc: 'Використовуйте кнопки копіювання або експорт у TXT',
      guide_tip: 'Паролі можна оновлювати окремо кнопками 🔄 біля кожного поля',
      copyright_year: '© 2026',
      copyright_rights: 'Всі права захищено.',
    },
    en: {
      title: 'Password generator for WordPress development',
      subtitle:
        'Enter project name and get ready-to-use database and WordPress settings.',
      project_label: 'Project name:',
      generate_btn: 'Generate',
      db_title: 'Database settings (MySQL)',
      db_name: 'DB Name:',
      db_user: 'DB User:',
      db_password: 'DB Password:',
      wp_title: 'WordPress settings (wp-config.php)',
      wp_site: 'Site URL:',
      wp_user: 'Username (admin):',
      wp_password: 'Password:',
      copy_btn: '📋 Copy',
      sql_title: '📊 SQL for database creation:',
      copy_sql: '📋 Copy SQL',
      wp_config_title: '🔧 wp-config.php snippet:',
      copy_wp: '📋 Copy wp-config.php',
      footer_note:
        '⚡ Simply copy the SQL into phpMyAdmin and paste the snippet for wp-config.php into the wp-config.php file of your WordPress site.',
      footer_made_for: 'Made with ❤️ for WordPress developers',
      refresh_title: 'Generate new password',
      password_settings: '🔐 Password settings:',
      simple: 'Simple (letters and numbers only)',
      strong: 'Strong (with special chars)',
      password_note: '⚡ Password length: 12 characters',
      weak: 'Weak',
      medium: 'Medium',
      strong_text: 'Strong',
      very_strong: 'Very strong',
      export_txt: 'Export TXT',
      guide_title: '📖 Step-by-step guide',
      step1_title: 'Enter project name',
      step1_desc: 'Example: lifetime, azov, myblog (Cyrillic supported)',
      step2_title: 'Choose password type',
      step2_desc: 'Simple or strong (12 characters)',
      step3_title: 'Click "Generate"',
      step3_desc: 'Get ready-to-use settings',
      step4_title: 'Copy or export',
      step4_desc: 'Use copy buttons or export to TXT',
      guide_tip: 'You can update passwords individually with 🔄 buttons',
      copyright_year: '© 2026',
      copyright_rights: 'All rights reserved.',
    },
  };

  // Функція для зміни мови
  function changeLanguage(lang) {
    currentLang = lang;

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

    document.getElementById('refresh-db-pass').title =
      translations[lang].refresh_title;
    document.getElementById('refresh-wp-pass').title =
      translations[lang].refresh_title;

    langButtons.forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    updatePasswordStrengthIndicators();
  }

  // Функція для визначення складності пароля
  function checkPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (password.length >= 10) score += 1;
    if (password.length >= 12) score += 1;

    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 2;

    const uniqueChars = new Set(password.split('')).size;
    if (uniqueChars > password.length * 0.7) score += 1;

    return Math.min(10, score);
  }

  // Оновлення індикаторів складності
  function updatePasswordStrength(password, barElement, textElement) {
    const strength = checkPasswordStrength(password);
    const percentage = (strength / 10) * 100;

    barElement.style.width = percentage + '%';

    if (strength < 3) {
      barElement.style.backgroundColor = '#f56565';
      textElement.textContent = translations[currentLang].weak;
    } else if (strength < 5) {
      barElement.style.backgroundColor = '#ed8936';
      textElement.textContent = translations[currentLang].medium;
    } else if (strength < 7) {
      barElement.style.backgroundColor = '#ecc94b';
      textElement.textContent = translations[currentLang].strong_text;
    } else {
      barElement.style.backgroundColor = '#48bb78';
      textElement.textContent = translations[currentLang].very_strong;
    }
  }

  function updatePasswordStrengthIndicators() {
    updatePasswordStrength(dbPassEl.textContent, dbStrengthBar, dbStrengthText);
    updatePasswordStrength(wpPassEl.textContent, wpStrengthBar, wpStrengthText);
  }

  // Функція для генерації пароля (фіксована довжина 12)
  function generatePassword() {
    const type = document.querySelector(
      'input[name="password-type"]:checked',
    ).value;
    const length = 12;

    let chars = '';
    let password = '';

    switch (type) {
      case 'simple':
        chars =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        break;
      case 'strong':
        chars =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        break;
    }

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  }

  // Функція для транслітерації
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
      .map(char => map[char] || char)
      .join('');
  }

  // Функція для очищення назви проекту
  function sanitizeProjectName(name) {
    let translitName = transliterate(name);
    // Дозволяємо тільки літери, цифри, дефіси (тимчасово)
    let cleanName = translitName
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    return cleanName;
  }

  // Функція для отримання baseName для БД (з нижнім підкресленням)
  function getDbBaseName(projectName) {
    // Замінюємо дефіси на нижні підкреслення для БД
    return projectName.replace(/-/g, '_');
  }

  // Функція для отримання baseName для WordPress (з дефісом)
  function getWpBaseName(projectName) {
    // Залишаємо як є (з дефісами)
    return projectName;
  }

  // Функція для генерації wp-config фрагменту
  function generateWpConfig(dbName, dbUser, dbPass) {
    return (
      `/** The name of the database for WordPress */\n` +
      `define( 'DB_NAME', '${dbName}' );\n\n` +
      `/** Database username */\n` +
      `define( 'DB_USER', '${dbUser}' );\n\n` +
      `/** Database password */\n` +
      `define( 'DB_PASSWORD', '${dbPass}' );\n\n` +
      `/** Database hostname */\n` +
      `define( 'DB_HOST', 'localhost' );\n\n` +
      `/** Database charset to use in creating database tables. */\n` +
      `define( 'DB_CHARSET', 'utf8mb4' );\n\n` +
      `/** The database collate type. Don't change this if in doubt. */\n` +
      `define( 'DB_COLLATE', '' );`
    );
  }

  // Основна функція генерації
  function generateAll() {
    let projectName = projectInput.value.trim() || 'lifetime';
    const cleanName = sanitizeProjectName(projectName);

    // Якщо після очищення нічого не залишилось, використовуємо 'project'
    const baseName = cleanName || 'project';

    // Отримуємо різні версії для БД та WordPress
    const dbBaseName = getDbBaseName(baseName); // з нижнім підкресленням
    const wpBaseName = getWpBaseName(baseName); // з дефісом (як ввів користувач)

    // Генерація для бази даних (з нижнім підкресленням)
    const dbName = dbBaseName + '_db';
    const dbUser = dbBaseName + '_user';
    const dbPass = generatePassword();

    // Генерація для WordPress (з дефісом)
    const wpSite = wpBaseName + '-site';
    const wpUser = wpBaseName + '-admin';
    const wpPass = generatePassword();

    // Оновлення DOM
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

  // Оновлення SQL фрагменту
  function updateSQLSummary(dbName, dbUser, dbPass) {
    sqlSummaryEl.textContent =
      `CREATE DATABASE ${dbName};\n` +
      `CREATE USER '${dbUser}'@'localhost' IDENTIFIED BY '${dbPass}';\n` +
      `GRANT ALL PRIVILEGES ON ${dbName}.* TO '${dbUser}'@'localhost';\n` +
      `FLUSH PRIVILEGES;`;
  }

  // Оновлення wp-config фрагменту
  function updateWpConfigSummary(dbName, dbUser, dbPass) {
    wpConfigSummaryEl.textContent = generateWpConfig(dbName, dbUser, dbPass);
  }

  // Функція копіювання в буфер обміну
  function copyToClipboard(text, button) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const originalText = button.textContent;
        const successMessage =
          currentLang === 'uk' ? '✅ Скопійовано!' : '✅ Copied!';
        button.textContent = successMessage;
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      })
      .catch(err => {
        console.error('Помилка копіювання:', err);
        const errorMessage =
          currentLang === 'uk' ? 'Не вдалося скопіювати' : 'Failed to copy';
        alert(errorMessage);
      });
  }

  // Функція експорту в TXT
  function exportToTXT() {
    const content =
      `=== WP Password Generator Export ===\n\n` +
      `Project: ${projectInput.value}\n\n` +
      `=== Database Settings ===\n` +
      `DB Name: ${dbNameEl.textContent}\n` +
      `DB User: ${dbUserEl.textContent}\n` +
      `DB Password: ${dbPassEl.textContent}\n\n` +
      `=== WordPress Settings ===\n` +
      `Site URL: ${wpSiteEl.textContent}\n` +
      `Admin User: ${wpUserEl.textContent}\n` +
      `Admin Password: ${wpPassEl.textContent}\n\n` +
      `=== SQL Query ===\n${sqlSummaryEl.textContent}\n\n` +
      `=== wp-config.php ===\n${wpConfigSummaryEl.textContent}\n\n` +
      `Generated: ${new Date().toLocaleString()}`;

    downloadFile(content, `wp-config-${projectInput.value}.txt`, 'text/plain');
  }

  function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // Ініціалізація
  generateAll();
  changeLanguage('uk');

  // Обробник кнопки генерації
  generateBtn.addEventListener('click', generateAll);

  // Обробник Enter в полі введення
  projectInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      generateAll();
    }
  });

  // Оновлення пароля для БД
  refreshDbPass.addEventListener('click', function () {
    const newPass = generatePassword();
    dbPassEl.textContent = newPass;
    updateSQLSummary(dbNameEl.textContent, dbUserEl.textContent, newPass);
    updateWpConfigSummary(dbNameEl.textContent, dbUserEl.textContent, newPass);
    updatePasswordStrength(newPass, dbStrengthBar, dbStrengthText);
  });

  // Оновлення пароля для WordPress
  refreshWpPass.addEventListener('click', function () {
    const newPass = generatePassword();
    wpPassEl.textContent = newPass;
    updatePasswordStrength(newPass, wpStrengthBar, wpStrengthText);
  });

  // Оновлення при зміні типу пароля
  passwordTypeRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      const newDbPass = generatePassword();
      const newWpPass = generatePassword();

      dbPassEl.textContent = newDbPass;
      wpPassEl.textContent = newWpPass;

      updateSQLSummary(dbNameEl.textContent, dbUserEl.textContent, newDbPass);
      updateWpConfigSummary(
        dbNameEl.textContent,
        dbUserEl.textContent,
        newDbPass,
      );
      updatePasswordStrengthIndicators();
    });
  });

  // Обробники для кнопок копіювання окремих елементів
  document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
    btn.addEventListener('click', function () {
      const elementId = this.getAttribute('data-copy');
      const element = document.getElementById(elementId);
      if (element) {
        copyToClipboard(element.textContent, this);
      }
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

  // Експорт в TXT
  exportTxtBtn.addEventListener('click', exportToTXT);

  // Обробники мов
  langButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      changeLanguage(this.dataset.lang);
    });
  });
});
