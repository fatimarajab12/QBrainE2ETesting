# QBrain Cypress E2E Tests

[![Cypress Tests](https://github.com/fatimarajab12/QBrainE2ETesting/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/fatimarajab12/QBrainE2ETesting/actions/workflows/cypress-tests.yml)

Cypress End-to-End testing framework for QBrain project using Cucumber (BDD) and Page Object Model (POM).

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Naming Conventions](#naming-conventions)
- [Best Practices](#best-practices)
- [CI/CD](#cicd)

## 🚀 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- **QBrain Frontend** running on `http://localhost:8080` (configured in vite.config.ts)
- **QBrain Backend API** running on `http://localhost:5000/api` (Backend port 5000 + /api prefix)

## 📦 Installation

1. **Navigate to QBrainCypress directory:**
   ```bash
   cd QBrainCypress
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify installation:**
   ```bash
   npx cypress verify
   ```

## 📁 Project Structure

```
QBrainCypress/
├── cypress/
│   ├── e2e/
│   │   └── features/              # Cucumber feature files
│   │       ├── authentication/    # Auth-related features
│   │       ├── projects/          # Project-related features
│   │       └── integration/       # Integration test features
│   │
│   ├── support/
│   │   ├── step_definitions/      # Cucumber step definitions
│   │   │   ├── authentication/
│   │   │   ├── projects/
│   │   │   └── common/
│   │   │
│   │   ├── page-objects/          # Page Object Model files
│   │   │   ├── authentication/
│   │   │   ├── projects/
│   │   │   └── common/
│   │   │
│   │   ├── helpers/               # Helper functions
│   │   ├── commands.js            # Custom Cypress commands
│   │   ├── hooks.js               # Cypress hooks
│   │   └── index.js               # Support entry point
│   │
│   ├── fixtures/                  # Test data files
│   │   └── files/                 # Test file uploads (large files gitignored)
│   ├── downloads/                 # Downloaded files
│   ├── videos/                    # Test videos (gitignored)
│   ├── screenshots/               # Test screenshots (gitignored)
│   └── cucumber-json/             # Cucumber JSON reports (gitignored)
│
├── cypress.config.js              # Cypress configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## 🏃 Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npm run cypress:open
```

### Run Tests Headless
```bash
npm run cypress:run
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Tests in Specific Browser
```bash
npm run test:chrome
npm run test:firefox
```

### Run Specific Feature
```bash
npx cypress run --spec "cypress/e2e/features/authentication/login.feature"
```

## ✍️ Writing Tests

### 1. Feature Files (Gherkin Syntax)

Create `.feature` files in `cypress/e2e/features/`:

```gherkin
Feature: User Login
  As a user
  I want to login to the QBrain system
  So that I can access my projects

  Background:
    Given I navigate to the login page

  @smoke @critical
  Scenario: Successful login
    When I enter valid email "test@example.com"
    And I enter valid password "Test123!@#"
    And I click the login button
    Then I should be redirected to the dashboard
```

### 2. Step Definitions

Create step definition files in `cypress/support/step_definitions/`:

```javascript
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../page-objects/authentication/LoginPage';

When('I enter valid email {string}', (email) => {
  LoginPage.enterEmail(email);
});
```

### 3. Page Objects

Create page object files in `cypress/support/page-objects/`:

```javascript
class LoginPage {
  getEmailInput() {
    return cy.get('input[name="email"]').first();
  }

  enterEmail(email) {
    this.getEmailInput().clear().type(email);
    return this;
  }
}

export default new LoginPage();
```

## 📝 Naming Conventions

### Files and Folders
- **Feature files**: `kebab-case.feature` (e.g., `login.feature`)
- **Step definitions**: `kebab-case.steps.js` (e.g., `login.steps.js`)
- **Page objects**: `PascalCase.js` (e.g., `LoginPage.js`)
- **Folders**: `kebab-case` (e.g., `authentication/`, `step_definitions/`)

### Variables and Methods
- **Variables**: `camelCase` (e.g., `userEmail`)
- **Methods**: `camelCase` (e.g., `enterEmail()`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)

### Test Tags
- `@smoke` - Smoke tests (critical paths)
- `@critical` - Critical functionality tests
- `@negative` - Negative test cases
- `@integration` - Integration tests

## ✅ Best Practices

1. **Use Page Object Model (POM)**
   - Encapsulate page elements and actions in page objects
   - Reuse page objects across tests
   - Keep page objects focused and single-responsibility

2. **Follow BDD Principles**
   - Write readable, business-focused scenarios
   - Use Given-When-Then structure
   - Keep scenarios independent and testable

3. **Data Management**
   - Use fixtures for static test data
   - Use dynamic data generation helpers for unique data
   - Generate unique data when needed (emails, project names, etc.)
   - Avoid hardcoding credentials
   
   **Dynamic Data Generation:**
   - Helper functions available in `cypress/support/helpers/data-generator.js`
   - Import helpers in step definitions: `import { generateUniqueEmail, generateTestUser } from '../../support/index';`
   - Use for generating unique test data on the fly

   **Large Test Files:**
   - Large test files (>50MB) should NOT be committed to Git
   - Files exceeding GitHub's 100MB limit will block repository pushes
   - Large test files are automatically ignored via `.gitignore`
   - If you need large files for testing, store them locally or use Git LFS
   - Recommended: Generate large test files programmatically in tests rather than storing them

4. **Wait Strategies**
   - Use Cypress built-in waiting (automatic retry)
   - Avoid hard-coded waits (`cy.wait(1000)`)
   - Use `cy.get()` with timeouts for dynamic content

5. **Error Handling**
   - Handle uncaught exceptions in `support/index.js`
   - Use appropriate error messages
   - Take screenshots on failures (automatic)

6. **Test Organization**
   - Group related tests in feature files
   - Use tags for test categorization
   - Keep scenarios focused and small

## 🔧 Configuration

### Base URL

The base URL is configured in `cypress.config.js`:

```javascript
baseUrl: "http://localhost:8080" // QBrain Frontend (configured in vite.config.ts)
```

**URLs Configuration:**
- **Frontend**: `http://localhost:8080` (configured in vite.config.ts)
- **Backend API**: `http://localhost:5000/api` (Express server on port 5000)

If your application runs on different ports, update the `baseUrl` in `cypress.config.js` and the API base URL in `cypress/fixtures/test-data.json`.

### Timeouts

Adjust timeouts in `cypress.config.js`:

```javascript
defaultCommandTimeout: 10000,
requestTimeout: 10000,
responseTimeout: 10000
```

## 📊 Test Reports

Cucumber JSON reports are generated in `cypress/cucumber-json/` after test execution.

## 🚀 CI/CD

This project uses GitHub Actions for continuous integration and continuous deployment.

### GitHub Actions Workflow

The CI/CD pipeline automatically runs Cypress tests on:
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop` branches
- Manual workflow dispatch (via GitHub Actions UI)

### Workflow Configuration

The workflow file is located at `.github/workflows/cypress-tests.yml` and includes:

- **Automatic test execution** on Chrome browser (headless mode)
- **Artifact uploads** for:
  - Screenshots (on test failures)
  - Test videos (always)
  - Cucumber JSON reports (always)
- **Node.js caching** for faster builds
- **Test summaries** in GitHub Actions UI

### Setup Instructions

1. **Ensure the workflow file exists**:
   - `.github/workflows/cypress-tests.yml` should be present in your repository

2. **Configure services** (if needed):
   - If your tests require the Frontend/Backend to be running, you have several options:
     - **Option A**: Uncomment and configure the service setup steps in the workflow (if QBrain repo is in a parent directory)
     - **Option B**: Use service containers in the workflow (Docker)
     - **Option C**: Run tests against a deployed staging environment
     - **Option D**: Use `cypress run --config baseUrl=<staging-url>` to point to a remote environment
   - Update paths, environment variables, and commands to match your setup

3. **Optional: Cypress Dashboard**:
   - To record tests to Cypress Dashboard, uncomment the `record` option
   - Add `CYPRESS_RECORD_KEY` to your repository secrets
   - Add your project ID to the workflow configuration

4. **Optional: Multi-browser testing**:
   - Uncomment the `cypress-run-matrix` job to run tests on multiple browsers (Chrome, Firefox, Edge)

### Viewing Test Results

- **GitHub Actions**: Navigate to the "Actions" tab in your repository to view workflow runs
- **Artifacts**: Download test videos, screenshots, and reports from the workflow run page
- **Test Summary**: View a summary in the workflow run output

### Local CI/CD Testing

To test the CI/CD workflow locally, you can use [act](https://github.com/nektos/act):

```bash
# Install act (macOS)
brew install act

# Run the workflow locally
act -j cypress-run
```

## 🐛 Troubleshooting

### Tests failing due to timing
- Increase timeout values in `cypress.config.js`
- Use `cy.wait()` for known delays
- Ensure application is fully loaded

### Element not found
- Check selectors in page objects
- Use `cy.contains()` for text-based selection
- Verify element is visible and not hidden

### Authentication issues
- Ensure test user exists in the database
- Clear cookies/localStorage between tests
- Use custom `login` command for consistency

### Git push rejected due to large files
If you encounter errors about large files when pushing to GitHub:
1. **Check `.gitignore`**: Ensure large test files are listed in `.gitignore`
2. **Remove from Git history**: If files were already committed, remove them from history:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch cypress/fixtures/files/LARGE_FILE.pdf" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. **Clean up**: After removing files, clean Git references:
   ```bash
   rm -rf .git/refs/original/
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   ```
4. **Force push**: Push the cleaned history (only if safe to do so):
   ```bash
   git push -u origin main --force
   ```
   ⚠️ **Warning**: Only force push if you're sure no one else has pulled the repository yet.

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)

## 👥 Contributing

When adding new tests:

1. Follow the folder structure
2. Use Page Object Model
3. Write clear Gherkin scenarios
4. Add appropriate tags
5. Update this README if needed

## 📄 License

MIT
