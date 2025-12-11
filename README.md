# QBrain Cypress E2E Tests

Comprehensive end-to-end testing suite for the QBrain project using Cypress and Cucumber BDD framework.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Organization](#test-organization)
- [Page Object Model](#page-object-model)
- [Writing Tests](#writing-tests)
- [Configuration](#configuration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This testing framework provides comprehensive coverage for:
- **API Testing**: All backend endpoints (Authentication, Projects, Features, Test Cases, Bugs)
- **UI Testing**: User interface interactions and workflows
- **Integration Testing**: End-to-end scenarios and data synchronization

### Key Features

- ✅ **Cucumber BDD**: Behavior-Driven Development with Gherkin syntax
- ✅ **Page Object Model**: Maintainable and reusable test code
- ✅ **TypeScript**: Type-safe test development
- ✅ **Comprehensive Coverage**: API, UI, and Integration tests
- ✅ **Status Management**: Focused testing on status updates for Features, Test Cases, and Bugs

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Backend Server**: Running on `http://localhost:5000`
- **Frontend Application**: Running on `http://localhost:5173`

## 🚀 Installation

1. **Navigate to the project directory:**
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
│   ├── config/
│   │   └── cypress.config.ts      # Cypress configuration
│   ├── e2e/
│   │   ├── api/                    # API test suites
│   │   │   ├── authentication/    # Login, Signup
│   │   │   ├── projects/          # CRUD operations
│   │   │   ├── features/          # Feature management
│   │   │   ├── test-cases/        # Test case management
│   │   │   └── bugs/              # Bug tracking
│   │   ├── ui/                     # UI test suites
│   │   │   ├── authentication/    # UI login/signup
│   │   │   ├── projects/          # Project UI flows
│   │   │   ├── features/          # Feature UI flows
│   │   │   ├── test-cases/        # Test case UI flows
│   │   │   └── bugs/              # Bug UI flows
│   │   └── integration/           # Integration tests
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
├── package.json
├── tsconfig.json
└── README.md
```

## 🏃 Running Tests

### Interactive Mode (Recommended for Development)

Open Cypress Test Runner to run tests interactively:

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

## 🧪 Test Organization

### API Tests (`cypress/e2e/api/`)

Test all backend endpoints:

- **Authentication**: Login, Signup, Profile management
- **Projects**: Create, Read, Update, Delete, Counts
- **Features**: CRUD operations, Status updates, Counts
- **Test Cases**: CRUD operations, Status updates, Counts
- **Bugs**: CRUD operations, Status updates, Counts

### UI Tests (`cypress/e2e/ui/`)

Test user interface interactions:

- **Authentication**: Login/Signup flows
- **Projects**: Project creation, viewing, counts display
- **Features**: Feature management, status updates via UI
- **Test Cases**: Test case management, status updates
- **Bugs**: Bug tracking, status updates

### Integration Tests (`cypress/e2e/integration/`)

Test end-to-end scenarios:

- **Counts Synchronization**: Verify API and UI counts match

## 🏗️ Page Object Model

The Page Object Model (POM) pattern is used to organize test code:

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

### Cypress Configuration (`cypress/config/cypress.config.ts`)

Key settings:
- **baseUrl**: Frontend URL (default: `http://localhost:5173`)
- **specPattern**: Test file pattern (`**/*.feature`)
- **viewport**: Default viewport size (1280x720)
- **timeouts**: Request and command timeouts

### Environment Variables

Set environment variables in `cypress.config.ts` or via command line:

```bash
# Default values
API_BASE_URL=http://localhost:5000/api
FRONTEND_URL=http://localhost:5173
```

### TypeScript Configuration (`tsconfig.json`)

Configured for:
- ES2020 target
- Strict type checking
- Cypress type definitions

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
- **Solution**: Verify backend is running on `http://localhost:5000`

**Issue: UI tests fail with element not found**
- **Solution**: Check selectors in Page Objects match current UI

**Issue: Cucumber steps not recognized**
- **Solution**: Ensure step definitions are properly imported in `step-definitions.ts`

### Debug Mode

Run tests with debug output:

```bash
DEBUG=cypress:* npm run cypress:open
```

### View Test Reports

After running tests, check:
- **Videos**: `cypress/videos/` (if enabled)
- **Screenshots**: `cypress/screenshots/` (on failure)

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cucumber Documentation](https://cucumber.io/docs/)
- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)

## 🤝 Contributing

When adding new tests:

1. Follow the existing folder structure
2. Use Page Object Model pattern
3. Write clear Gherkin scenarios
4. Add appropriate step definitions
5. Update this README if needed

## 📝 Notes

- **Status Testing**: Focus on changing status only using available buttons. No need to test actions page for each status.
- **Data Generation**: Always use `DataGenerator` for creating test data to avoid conflicts.
- **API vs UI**: API tests verify backend functionality, UI tests verify user experience.

---

**Happy Testing! 🚀**
