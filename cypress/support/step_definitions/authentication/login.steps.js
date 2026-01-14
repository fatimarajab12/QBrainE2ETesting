import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../page-objects/authentication/LoginPage';
import DashboardPage from '../../page-objects/projects/DashboardPage';

// Background
Given('I navigate to the login page', () => {
  LoginPage.visit();
});

// When steps
When('I enter valid email {string}', (email) => {
  LoginPage.enterEmail(email);
});

When('I enter invalid email {string}', (email) => {
  LoginPage.enterEmail(email);
});

When('I enter email {string}', (email) => {
  if (email === '""' || email === '') {
    LoginPage.getEmailInput().clear();
  } else {
    LoginPage.enterEmail(email);
  }
});

When('I enter valid password {string}', (password) => {
  LoginPage.enterPassword(password);
});

When('I enter invalid password {string}', (password) => {
  LoginPage.enterPassword(password);
});

When('I enter password {string}', (password) => {
  if (password === '""' || password === '') {
    LoginPage.getPasswordInput().clear();
  } else {
    LoginPage.enterPassword(password);
  }
});

When('I click the login button', () => {
  LoginPage.clickLoginButton();
});

// Then steps
Then('I should be redirected to the dashboard', () => {
  cy.url({ timeout: 10000 }).should('include', '/dashboard');
});

Then('I should see the dashboard page', () => {
  DashboardPage.shouldBeVisible();
});

Then('I should see my projects', () => {
  DashboardPage.shouldDisplayProjects();
});

Then('I should see an error message', () => {
  LoginPage.shouldSeeErrorMessage();
});

Then('I should remain on the login page', () => {
  LoginPage.shouldBeOnLoginPage();
});

Then('I should see validation error messages', () => {
  LoginPage.shouldSeeValidationErrors();
});
