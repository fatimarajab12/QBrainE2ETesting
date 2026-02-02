/// <reference types="cypress" />
import BasePage from '../common/BasePage';


class LoginPage extends BasePage {
  // Locators
  getEmailInput() {
    // InputWithIcon renders Input component with id="email" and type="email"
    return cy.get('input#email[type="email"]').first();
  }

  getPasswordInput() {
    // InputWithIcon renders Input component with id="password" and type="password" or "text"
    return cy.get('input#password').first();
  }

  getLoginButton() {
    return cy.get('form').find('button[type="submit"]').first();
  }

  getSignupLink() {
    return cy.contains('Sign up', { matchCase: false });
  }

  getForgotPasswordLink() {
    return cy.contains('Forgot password', { matchCase: false });
  }

  getErrorMessage() {
    return cy.get('form').find('.text-destructive').filter(':not([role])').first();
  }
  
  getToastNotification() {
    // Toast notifications use Radix UI Toast (Radix UI) with data-state="open"
    // Toast notifications also use Sonner (alternative toast library)
    // Both are rendered in App.tsx
    // Radix UI Toast uses: [data-state="open"]
    // Sonner uses: [data-sonner-toast] or [role="status"]
    return cy.get('[data-state="open"], [data-sonner-toast], [role="status"]').first();
  }

  getValidationErrors() {
    return cy.get('input:invalid, [aria-invalid="true"]');
  }

  // Actions
  visit() {
    cy.visit('/login');
    return this;
  }

  enterEmail(email: string) {
    this.getEmailInput().clear().type(email);
    return this;
  }

  enterPassword(password: string) {
    this.getPasswordInput().clear().type(password);
    return this;
  }

  clickLoginButton() {
    this.getLoginButton().click();
    return this;
  }

  login(email: string, password: string) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickLoginButton();
    return this;
  }

  clickSignupLink() {
    this.getSignupLink().click();
    return this;
  }

  clickForgotPasswordLink() {
    this.getForgotPasswordLink().click();
    return this;
  }

  // Assertions
  shouldBeOnLoginPage() {
    cy.url().should('include', '/login');
    return this;
  }

  shouldSeeErrorMessage(message?: string) {
    this.getErrorMessage().should('be.visible');
    if (message) {
      this.getErrorMessage().should('contain.text', message);
    }
    return this;
  }

  shouldSeeValidationErrors() {
    this.getValidationErrors().should('exist');
    return this;
  }

  shouldHaveEmailInput() {
    this.getEmailInput().should('be.visible');
    return this;
  }

  shouldHavePasswordInput() {
    this.getPasswordInput().should('be.visible');
    return this;
  }

  shouldHaveLoginButton() {
    this.getLoginButton().should('be.visible');
    return this;
  }
}

export default new LoginPage();
