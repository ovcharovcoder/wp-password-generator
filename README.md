# 🔐 WP Password Generator

<div align="center">
  
  ### Password and settings generator for WordPress developers
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
  
</div>

---

## 📋 About the project

**WP Password generator** is a free web tool created to simplify the workflow of WordPress developers. It automatically generates unique database names, usernames, and secure passwords when migrating sites to a new hosting.

### 🎯 The problem it solves

Every developer faces the need to:
- Come up with unique database names
- Create database usernames
- Generate secure passwords
- Update wp-config.php

Our generator does this in seconds!

---

## ✨ Features

### 🔑 Generated data
| Component | Format | Example |
|-----------|--------|---------|
| Database Name | `{project}_db` | `lifetime_db` |
| Database User | `{project}_user` | `lifetime_user` |
| Database Password | 12 characters | `k8J#mP2$nL5x` |
| Site Name | `{project}-site` | `lifetime-site` |
| WordPress User | `{project}-admin` | `lifetime-admin` |
| WordPress Password | 12 characters | `xR7@qW3!eK9p` |

### 🛠 Functionality

✅ **Two password types**
- Simple (letters and numbers only)
- Strong (with special characters)

✅ **Transliteration** – support for Ukrainian project names

✅ **Strength indicator** – visual representation of password security

✅ **Ready-to-Use code snippets**
- SQL for database creation
- Section for wp-config.php

✅ **TXT export** – save all data to a text file

✅ **Bilingual interface** – Ukrainian and English languages

✅ **Step-by-Step guide** – for beginners

✅ **Responsive design** – displays correctly on all devices

---

### Screenshots

<div align="center">
  <img src="screenshots/main.png" alt="Main Screen" width="800"/>
  <p><em>Main screen of the generator</em></p>
  
  <img src="screenshots/generation.png" alt="Generation Process" width="800"/>
  <p><em>Generation example for "lifetime" project</em></p>
  
  <img src="screenshots/export.png" alt="Export" width="800"/>
  <p><em>Exporting results to TXT</em></p>
</div>

---

## 💻 How to use

### Online version
1. Go to [WP Password Generator](
https://ovcharovcoder.github.io/wp-password-generator/)
2. Enter the project name (e.g., "project")
3. Choose password type (simple or strong)
4. Click "Generate"
5. Copy SQL or wp-config.php snippet
6. Export data to TXT if needed

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Created by Andrii Ovcharov — Web Developer & Designer
