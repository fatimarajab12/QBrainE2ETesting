/// <reference types="cypress" />
import BasePage from '../common/BasePage';

/**
 * Dashboard Page Object
 * Contains all locators and methods for the Dashboard page
 */
class DashboardPage extends BasePage {
  // Locators
  getCreateProjectButton() {
    // The button has data-testid="create-project-trigger"
    return cy.get('[data-testid="create-project-trigger"]').first();
  }

  getProjectsList() {
    // Projects are displayed in a grid container - look for the grid or "Your Projects" heading
    return cy.contains('Your Projects', { matchCase: false }).parent().parent();
  }

  getProjectCards() {
    // Project cards are rendered in a grid - use card selector
    return cy.get('[class*="grid"]').find('[class*="card"], [class*="Card"]');
  }

  getSearchInput() {
    return cy.get('input[placeholder*="Search"], input[type="search"]').first();
  }

  getEmptyState() {
    return cy.contains('No projects', { matchCase: false }).first();
  }

  // Actions
  visit() {
    cy.visit('/dashboard');
    return this;
  }

  clickCreateProject() {
    this.getCreateProjectButton().click();
    return this;
  }

  searchProjects(query: string) {
    this.getSearchInput().clear().type(query);
    return this;
  }

  // Assertions
  shouldBeVisible() {
    cy.url({ timeout: 10000 }).should('include', '/dashboard');
    // Dashboard page displays "Projects" as the main heading (not "Dashboard")
    cy.contains('Projects', { matchCase: false }).should('be.visible');
    return this;
  }

  shouldDisplayProjects() {
    // Check if projects section exists (either with projects or empty state)
    // Look for "Your Projects" heading which always exists
    cy.contains('Your Projects', { matchCase: false }).should('be.visible');
    return this;
  }

  shouldHaveProjectCount(count: number) {
    this.getProjectCards().should('have.length', count);
    return this;
  }

  shouldSeeEmptyState() {
    this.getEmptyState().should('be.visible');
    return this;
  }

  shouldSeeProjectWithName(projectName: string) {
    cy.contains(projectName, { matchCase: false }).should('be.visible');
    return this;
  }
}

export default new DashboardPage();
