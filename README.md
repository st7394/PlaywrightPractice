# 🎭 Playwright Automation Framework

A robust end-to-end test automation framework built with **Playwright** and **TypeScript**, following the **Page Object Model** design pattern.

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)](https://playwright.dev) | ^1.60.0 | E2E Test Framework |
| [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org) | ESNext | Language |
| [![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org) | LTS | Runtime |
| [![Allure](https://img.shields.io/badge/Allure-FF6B35?style=flat&logo=qameta&logoColor=white)](https://allurereport.org) | ^2.42.0 | Test Reporting |
| [![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)](https://github.com/features/actions) | — | CI/CD |

---

## 📁 Project Structure

```
📦 Playwright/
├── 📂 .github/
│   └── 📂 workflows/
│       └── 📄 playwright.yml        # GitHub Actions CI pipeline
├── 📂 .vscode/
│   ├── 📄 extensions.json           # Recommended VS Code extensions
│   └── 📄 settings.json             # Workspace settings
├── 📂 src/
│   ├── 📂 pages/                    # Page Object Models
│   │   └── 📄 LoginPage.ts
│   └── 📂 tests/                    # Test specs
│       ├── 📄 login.spec.ts
│       └── 📄 example.spec.ts
├── 📄 .env                          # Environment variables (gitignored)
├── 📄 .env.example                  # Environment variable template
├── 📄 .gitignore
├── 📄 package.json
├── 📄 playwright.config.ts          # Playwright configuration
└── 📄 tsconfig.json                 # TypeScript configuration
```

---

## ⚙️ Configuration Highlights

| Setting | Value |
|---------|-------|
| 🌐 Base URL | `process.env.BASE_URL` (via `.env`) |
| 🧪 Test Directory | `src/tests` |
| 🔁 Retries (CI) | 2 |
| 🖥️ Browsers | Chromium · Firefox · WebKit |
| 📸 Screenshots | On failure |
| 🎥 Video | On first retry |
| 🔍 Trace | On first retry |
| ⏱️ Test Timeout | 60s |
| 🏷️ Test ID Attribute | `data-test` |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) LTS
- [VS Code](https://code.visualstudio.com) with the [Playwright extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Install Playwright Browsers

```bash
npx playwright install
```

### 3️⃣ Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and set your target URL:

```env
BASE_URL=https://www.saucedemo.com/
```

---

## 🧪 Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (headed) |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Step-through debugger |
| `npm run test:ui` | Playwright UI mode |
| `npm run test:chromium` | Chromium only |
| `npm run test:firefox` | Firefox only |
| `npm run test:webkit` | WebKit only |
| `npm run test:report` | Open HTML report |
| `npm run codegen` | Record tests via codegen |

---

## 📊 Reporting

### 🌐 Playwright HTML Report

```bash
npm run test:report
```

### 📋 Allure Report

```bash
npm test                   # run tests to generate allure-results
npm run allure:serve       # live preview
# or
npm run allure:generate    # build static report
npm run allure:open        # open in browser
```

---

## 🏗️ Design Pattern

This framework uses the **Page Object Model (POM)** pattern:

- **`src/pages/`** — each file represents a page/component with its locators and actions
- **`src/tests/`** — spec files import page objects and contain only test logic

```
test file  →  imports  →  Page Object  →  interacts with  →  Browser
```

### Example

```ts
// src/pages/LoginPage.ts
export class Loginpage {
  async login(username: string, password: string) {
    await this.textboxUsername.fill(username);
    await this.textboxPassword.fill(password);
    await this.buttonLogin.click();
  }
}

// src/tests/login.spec.ts
test('Login with valid credentials', async ({ page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('/inventory.html');
});
```

---

## 🔄 CI/CD

Tests run automatically on every push and pull request to `main` via **GitHub Actions**.

The pipeline:
1. ✅ Checks out the code
2. 📦 Installs Node.js (LTS) and dependencies
3. 🎭 Installs Playwright browsers
4. 🧪 Runs all tests
5. 📤 Uploads the HTML report as an artifact (retained 30 days)

---

## 🧩 VS Code Extensions

When you open the project, VS Code will recommend:

- 🎭 [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) — run & debug tests inline
- 🔍 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- ✨ [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
