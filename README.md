# QBrain Cypress E2E Tests

[![Cypress](https://img.shields.io/badge/Cypress-13.17.0-00D7A7?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber&logoColor=white)](https://cucumber.io/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Enabled-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

> Comprehensive end-to-end testing suite for the [QBrain](https://github.com/fatimarajab12/QBrain) project using Cypress and Cucumber BDD framework.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Running Tests](#-running-tests)
- [CI/CD with GitHub Actions](#-cicd-with-github-actions)
- [Test Organization](#-test-organization)
- [Page Object Model](#-page-object-model)
- [Writing Tests](#-writing-tests)
- [Configuration](#-configuration)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## 🎯 Overview

This testing framework provides comprehensive E2E coverage for the **QBrain** platform - an AI-powered SRS analysis and test case generation system. The suite includes API testing, UI testing, and integration testing using modern BDD practices.

### What is QBrain?

[QBrain](https://github.com/fatimarajab12/QBrain) is an intelligent platform that leverages RAG (Retrieval Augmented Generation) and AI technologies to:
- Analyze SRS (Software Requirements Specification) documents
- Automatically extract features using GPT-4o-mini
- Generate test cases based on extracted features
- Provide comprehensive coverage analysis

## ✨ Features

### 🧪 Testing Capabilities

- ✅ **API Testing**: Complete backend endpoint coverage (Authentication, Projects, Features, Test Cases, Bugs)
- ✅ **UI Testing**: Full user interface interaction testing
- ✅ **Integration Testing**: End-to-end scenarios and data synchronization
- ✅ **Status Management**: Comprehensive status update testing for Features, Test Cases, and Bugs

### 🛠️ Technical Features

- ✅ **Cucumber BDD**: Behavior-Driven Development with Gherkin syntax
- ✅ **Page Object Model**: Maintainable and reusable test code architecture
- ✅ **TypeScript**: Type-safe test development
- ✅ **CI/CD Integration**: Automated testing with GitHub Actions
- ✅ **Comprehensive Coverage**: 100+ test scenarios across API and UI

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Backend Server**: Running on `http://localhost:5000` (or configured via environment variables)
- **Frontend Application**: Running on `http://localhost:8080` (or configured via environment variables)

> **Note**: For CI/CD, servers are automatically started by GitHub Actions. No manual setup required!

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/QBrainCypress.git
cd QBrainCypress
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify Installation

```bash
npx cypress verify
```

### 4. Configure Environment (Optional)

Create a `.env` file or set environment variables:

```bash
# Backend Configuration
API_BASE_URL=http://localhost:5000/api

# Frontend Configuration
FRONTEND_URL=http://localhost:8080
CYPRESS_BASE_URL=http://localhost:8080
```

## 📁 Project Structure

```
QBrainCypress/
├── .github/
│   └── workflows/
│       ├── cypress.yml              # GitHub Actions workflow
│       └── README.md                # CI/CD documentation
├── cypress/
│   ├── config/
│   │   └── cypress.config.ts        # Cypress configuration (legacy)
│   ├── e2e/
│   │   ├── api/                     # API test suites
│   │   │   ├── authentication/    # Login, Signup
│   │   │   ├── projects/           # CRUD operations
│   │   │   ├── features/           # Feature management
│   │   │   ├── test-cases/         # Test case management
│   │   │   └── bugs/               # Bug tracking
│   │   ├── ui/                      # UI test suites
│   │   │   ├── authentication/    # UI login/signup
│   │   │   ├── projects/          # Project UI flows
│   │   │   ├── features/          # Feature UI flows
│   │   │   ├── test-cases/        # Test case UI flows
│   │   │   └── bugs/              # Bug UI flows
│   │   └── integration/            # Integration tests
│   │       └── counts-synchronization.feature
│   ├── fixtures/                   # Test data
│   │   ├── test-data.json
│   │   └── users.json
│   └── support/
│       ├── commands.ts              # Custom Cypress commands
│       ├── step-definitions.ts     # Common step definitions
│       ├── helpers/                # Helper utilities
│       │   ├── api-helpers.ts
│       │   ├── data-generator.ts
│       │   └── ui-helpers.ts
│       └── page-objects/           # Page Object Model
│           ├── pages/              # Page objects
│           ├── components/         # Component objects
│           └── api/                # API objects
├── cypress.config.ts                # Main Cypress config
├── package.json
├── tsconfig.json
└── README.md
```

## 🏃 Running Tests

### Interactive Mode (Recommended for Development)

Open Cypress Test Runner for interactive testing:

```bash
npm run cypress:open
```

### Headless Mode (CI/CD)

Run all tests in headless mode:

```bash
npm run cypress:run
```

### Run Specific Test Suites

**Run all API tests:**
```bash
npx cypress run --spec "cypress/e2e/api/**/*.feature"
```

**Run all UI tests:**
```bash
npx cypress run --spec "cypress/e2e/ui/**/*.feature"
```

**Run specific feature:**
```bash
npx cypress run --spec "cypress/e2e/api/authentication/login.api.feature"
```

**Run by tag (if configured):**
```bash
npx cypress run --env tags="@api"
```

## 🔄 CI/CD with GitHub Actions

This project includes automated CI/CD pipeline that runs tests automatically on every push and pull request.

### How It Works

1. **Automatic Trigger**: Tests run on push to `main`, `develop`, or `master` branches
2. **Environment Setup**: GitHub Actions automatically:
   - Checks out QBrain repository (backend + frontend)
   - Installs dependencies
   - Starts backend server (port 5000)
   - Starts frontend server (port 8080)
   - Waits for servers to be ready
   - Runs Cypress tests
   - Uploads results (screenshots, videos, logs)

### Setup

1. **No Manual Setup Required**: The workflow is pre-configured
2. **Optional Secrets**: Add to GitHub repository secrets if needed:
   ```
   QBRAIN_REPO=fatimarajab12/QBrain
   MONGO_URI=your-mongodb-uri
   OPENAI_API_KEY=your-openai-key
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-key
   ```

### View Results

- Go to **Actions** tab in GitHub
- Select the workflow run
- Download artifacts (screenshots, videos, logs)

For detailed CI/CD documentation, see [`.github/workflows/README.md`](.github/workflows/README.md)

## 🧪 Test Organization

### API Tests (`cypress/e2e/api/`)

Comprehensive backend endpoint testing:

- **Authentication**: Login, Signup, Profile management
- **Projects**: Create, Read, Update, Delete, Counts
- **Features**: CRUD operations, Status updates, Counts
- **Test Cases**: CRUD operations, Status updates, Counts
- **Bugs**: CRUD operations, Status updates, Counts

### UI Tests (`cypress/e2e/ui/`)

Complete user interface testing:

- **Authentication**: Login/Signup flows
- **Projects**: Project creation, viewing, counts display
- **Features**: Feature management, status updates via UI
- **Test Cases**: Test case management, status updates
- **Bugs**: Bug tracking, status updates

### Integration Tests (`cypress/e2e/integration/`)

End-to-end scenario testing:

- **Counts Synchronization**: Verify API and UI counts match

## 🏗️ Page Object Model

The Page Object Model (POM) pattern ensures maintainable and reusable test code:

### Pages (`support/page-objects/pages/`)

- `LoginPage.ts` - Login page interactions
- `DashboardPage.ts` - Dashboard page interactions
- `ProjectDetailsPage.ts` - Project details page
- `FeatureDetailsPage.ts` - Feature details page
- `ProfilePage.ts` - User profile page

### Components (`support/page-objects/components/`)

- `ProjectCard.ts` - Project card component
- `FeatureCard.ts` - Feature card component
- `TestCaseCard.ts` - Test case card component
- `BugCard.ts` - Bug card component
- `StatusDropdown.ts` - Status dropdown component
- `CreateDialog.ts` - Create dialog component

### API Objects (`support/page-objects/api/`)

- `AuthApi.ts` - Authentication API calls
- `ProjectApi.ts` - Project API calls
- `FeatureApi.ts` - Feature API calls
- `TestCaseApi.ts` - Test case API calls
- `BugApi.ts` - Bug API calls

## ✍️ Writing Tests

### Cucumber Feature File Example

```gherkin
Feature: Login via API
  As a user
  I want to login
  So that I can access the application

  Scenario: Login successfully with valid data
    Given I have a registered user
    When I send a login request with valid credentials
    Then I should receive a success response
    And I should receive an authentication token
    And I should receive user data
```

### Step Definitions Example

```typescript
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { AuthApi } from '../../support/page-objects/api/AuthApi';

When('I send a login request with valid credentials', () => {
  AuthApi.login('test@example.com', 'password123')
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
    });
});
```

### Using Page Objects

```typescript
import { LoginPage } from '../../support/page-objects/pages/LoginPage';

const loginPage = new LoginPage();

Given('I am on the login page', () => {
  loginPage.visit();
});

When('I enter valid credentials', () => {
  loginPage.fillEmail('test@example.com');
  loginPage.fillPassword('password123');
  loginPage.clickLogin();
});
```

## ⚙️ Configuration

### Cypress Configuration (`cypress.config.ts`)

Key settings:
- **baseUrl**: Frontend URL (default: `http://localhost:8080`)
- **specPattern**: Test file pattern (`**/*.feature`)
- **viewport**: Default viewport size (1280x720)
- **timeouts**: Request and command timeouts (10000ms)

### Environment Variables

Set environment variables in `cypress.config.ts` or via command line:

```bash
# Default values
API_BASE_URL=http://localhost:5000/api
FRONTEND_URL=http://localhost:8080
CYPRESS_BASE_URL=http://localhost:8080
```

### TypeScript Configuration (`tsconfig.json`)

Configured for:
- ES2020 target
- Strict type checking
- Cypress type definitions
- CommonJS modules

## 💡 Best Practices

### 1. Use Page Object Model
Always use POM for UI interactions to maintain clean, reusable code.

### 2. Generate Test Data
Use `DataGenerator` helper to create unique test data:

```typescript
import { DataGenerator } from '../../support/helpers/data-generator';

const email = DataGenerator.generateEmail();
const projectName = DataGenerator.generateProjectName();
```

### 3. Focus on Status Updates
For Features, Test Cases, and Bugs, focus on testing status changes using available buttons in the dropdown. No need to test the actions page for each status.

### 4. Use API Helpers
Leverage `ApiHelpers` for consistent API interactions:

```typescript
import { ApiHelpers } from '../../support/helpers/api-helpers';

ApiHelpers.makeRequest('GET', '/projects', null, token)
  .then((response) => {
    ApiHelpers.validateSuccessResponse(response);
  });
```

### 5. Keep Steps Reusable
Write step definitions that can be reused across multiple scenarios.

### 6. Use Custom Commands
Utilize custom Cypress commands for common operations:

```typescript
cy.login('test@example.com', 'password123');
cy.apiRequest('GET', '/projects');
```

## 🔧 Troubleshooting

### Common Issues

**Issue: Tests fail with "Cannot find module"**
- **Solution**: Ensure all dependencies are installed: `npm install`

**Issue: Cypress cannot connect to backend**
- **Solution**: Verify backend is running on `http://localhost:5000` or check `API_BASE_URL` environment variable

**Issue: UI tests fail with element not found**
- **Solution**: Check selectors in Page Objects match current UI

**Issue: Cucumber steps not recognized**
- **Solution**: Ensure step definitions are properly imported in `step-definitions.ts`

### Debug Mode

Run tests with debug output:

```bash
# Windows
set DEBUG=cypress:* && npm run cypress:open

# Linux/Mac
DEBUG=cypress:* npm run cypress:open
```

### View Test Reports

After running tests, check:
- **Videos**: `cypress/videos/` (if enabled)
- **Screenshots**: `cypress/screenshots/` (on failure)
- **CI/CD Artifacts**: Available in GitHub Actions for automated runs

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cucumber Documentation](https://cucumber.io/docs/)
- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
- [QBrain Project](https://github.com/fatimarajab12/QBrain)

## 🤝 Contributing

When adding new tests:

1. Follow the existing folder structure
2. Use Page Object Model pattern
3. Write clear Gherkin scenarios
4. Add appropriate step definitions
5. Update this README if needed

### Development Workflow

1. Create a feature branch
2. Write tests following BDD practices
3. Ensure all tests pass locally
4. Push to GitHub (CI/CD will run automatically)
5. Create a Pull Request

## 📝 Notes

- **Status Testing**: Focus on changing status only using available buttons. No need to test actions page for each status.
- **Data Generation**: Always use `DataGenerator` for creating test data to avoid conflicts.
- **API vs UI**: API tests verify backend functionality, UI tests verify user experience.
- **CI/CD**: No need to run servers manually - GitHub Actions handles everything automatically.

## 📄 License

This project is licensed under the MIT License.

---

**Happy Testing! 🚀**

Made with ❤️ for [QBrain](https://github.com/fatimarajab12/QBrain)
