import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import DashboardPage from '../../page-objects/projects/DashboardPage';
import CreateProjectDialog from '../../page-objects/projects/CreateProjectDialog';
import { generateUniqueProjectName } from '../../index';

// Background
Given('I am logged in', () => {
  cy.login('fatimarajab678@gmail.com', '12345678');
});

Given('I navigate to the dashboard', () => {
  DashboardPage.visit();
  DashboardPage.shouldBeVisible();
});

// When steps
When('I click the {string} button', (buttonText) => {
  if (buttonText === 'New Project') {
    CreateProjectDialog.openDialog();
  } else if (buttonText === 'Create Project') {
    CreateProjectDialog.clickCreateProjectButton();
  }
});

When('I enter project name {string}', (projectName) => {
  if (projectName === '""' || projectName === '') {
    CreateProjectDialog.getProjectNameInput().clear();
  } else {
    CreateProjectDialog.enterProjectName(projectName);
  }
});

When('I enter project description {string}', (description) => {
  CreateProjectDialog.enterProjectDescription(description);
});

When('I upload SRS file {string}', (fileName) => {
  CreateProjectDialog.uploadSRSFile(fileName);
});

When('I try to click the {string} button', (buttonText) => {
  // Try to click even if disabled (for testing validation)
  if (buttonText === 'Create Project') {
    CreateProjectDialog.getCreateProjectButton().click({ force: true });
  }
});

// Then steps
Then('I should see a success message {string}', (message) => {
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

Then('I should see the project {string} in the projects list', (projectName) => {
  DashboardPage.shouldSeeProjectWithName(projectName);
});

Then('the {string} button should be disabled', (buttonText) => {
  if (buttonText === 'Create Project') {
    CreateProjectDialog.shouldHaveCreateButtonDisabled();
  }
});

Then('I should see a validation error {string}', (errorMessage) => {
  // Wait for toast notification to appear and contain the error message
  // Toast notifications are li elements with data-state="open" or have data-sonner-toast
  cy.get('li[data-state="open"], [data-sonner-toast]')
    .should('be.visible')
    .and('contain.text', errorMessage);
});

Then('I should see an error message {string}', (errorMessage) => {
  // Wait for toast notification to appear and contain the error message
  // Toast notifications are li elements with data-state="open" or have data-sonner-toast
  cy.get('li[data-state="open"], [data-sonner-toast]')
    .should('be.visible')
    .and('contain.text', errorMessage);
});

Then('I should see error description {string}', (description) => {
  // Wait for toast notification to appear and contain the error description
  // Toast notifications are li elements with data-state="open" or have data-sonner-toast
  cy.get('li[data-state="open"], [data-sonner-toast]')
    .should('be.visible')
    .and('contain.text', description);
});

Then('the file should not be selected', () => {
  CreateProjectDialog.shouldNotDisplaySelectedFile();
});
