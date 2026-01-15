import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import DashboardPage from '../../page-objects/projects/DashboardPage';
import CreateProjectDialog from '../../page-objects/projects/CreateProjectDialog';
import CreateFeatureDialog from '../../page-objects/features/CreateFeatureDialog';
import { generateUniqueProjectName } from '../../index';
import { trackProject, untrackProject } from '../../helpers/test-state';

// Background
Given('I am logged in', () => {
  cy.login('fatimarajab678@gmail.com', '12345678');
});

Given('I navigate to the dashboard', () => {
  DashboardPage.visit();
  DashboardPage.shouldBeVisible();
});

// When steps
When('I click the {string} button', (buttonText: string) => {
  if (buttonText === 'New Project') {
    CreateProjectDialog.openDialog();
  } else if (buttonText === 'Create Project') {
    CreateProjectDialog.clickCreateProjectButton();
  } else if (buttonText === 'Add Feature') {
    CreateFeatureDialog.openDialog();
  } else if (buttonText === 'Create Feature') {
    CreateFeatureDialog.clickCreateFeatureButton();
  }
});

When('I enter project name {string}', (projectName: string) => {
  if (projectName === '""' || projectName === '') {
    CreateProjectDialog.getProjectNameInput().clear();
  } else {
    CreateProjectDialog.enterProjectName(projectName);
  }
});

When('I enter project description {string}', (description: string) => {
  CreateProjectDialog.enterProjectDescription(description);
});

When('I upload SRS file {string}', (fileName: string) => {
  CreateProjectDialog.uploadSRSFile(fileName);
});

When('I try to click the {string} button', (buttonText: string) => {
  // Try to click even if disabled (for testing validation)
  if (buttonText === 'Create Project') {
    CreateProjectDialog.getCreateProjectButton().click({ force: true });
  }
});

// Then steps
Then('I should see a success message {string}', (message: string) => {
  // Toast notifications are li elements with data-state="open" or have data-sonner-toast
  // Exclude dialog buttons by only selecting toast-specific elements
  cy.get('li[data-state="open"], [data-sonner-toast]')
    .should('be.visible')
    .and('contain.text', message);
});

Then('the project dialog should close', () => {
  CreateProjectDialog.shouldBeClosed();
});

Then('the project dialog should remain open', () => {
  CreateProjectDialog.shouldBeVisible();
});

Then('I should see the project {string} in the projects list', (projectName: string) => {
  DashboardPage.shouldSeeProjectWithName(projectName);
  // Track project for cleanup
  trackProject(projectName);
});

Then('the {string} button should be disabled', (buttonText: string) => {
  if (buttonText === 'Create Project') {
    CreateProjectDialog.shouldHaveCreateButtonDisabled();
  }
});

Then('I should see a validation error {string}', (errorMessage: string) => {
  // Wait for toast notification to appear and contain the error message
  // Toast notifications are li elements with data-state="open" or have data-sonner-toast
  cy.get('li[data-state="open"], [data-sonner-toast]')
    .should('be.visible')
    .and('contain.text', errorMessage);
});

Then('I should see an error message {string}', (errorMessage: string) => {
  // Wait for toast notification to appear and contain the error message
  // Toast notifications are li elements with data-state="open" or have data-sonner-toast
  cy.get('li[data-state="open"], [data-sonner-toast]')
    .should('be.visible')
    .and('contain.text', errorMessage);
});

Then('I should see error description {string}', (description: string) => {
  // Wait for toast notification to appear and contain the error description
  // Toast notifications are li elements with data-state="open" or have data-sonner-toast
  cy.get('li[data-state="open"], [data-sonner-toast]')
    .should('be.visible')
    .and('contain.text', description);
});

Then('the file should not be selected', () => {
  CreateProjectDialog.shouldNotDisplaySelectedFile();
});

// Cleanup step
When('I delete the project {string}', (projectName: string) => {
  cy.deleteProjectByName(projectName);
  // Remove from tracking
  untrackProject(projectName);
});
