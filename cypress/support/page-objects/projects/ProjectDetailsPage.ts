/// <reference types="cypress" />
import BasePage from '../common/BasePage';

/**
 * Project Details Page Object
 * Contains all locators and methods for the Project Details page
 */
class ProjectDetailsPage extends BasePage {
  // Locators
  getAddFeatureButton() {
    return cy.get('button').contains('Add Feature', { matchCase: false }).first();
  }

  getFeaturesList() {
    return cy.get('[class*="features"], [class*="Features"], table, [role="list"]').first();
  }

  getFeatureByName(featureName: string) {
    // Features are displayed in a table, find the feature name in the table body
    return cy.get('table tbody').contains('tr', featureName, { matchCase: false });
  }

  // Actions
  visit(projectId: string) {
    cy.visit(`/projects/${projectId}`);
    return this;
  }

  clickAddFeature() {
    this.getAddFeatureButton().click();
    return this;
  }

  // Assertions
  shouldBeVisible() {
    cy.url({ timeout: 10000 }).should('include', '/projects/');
    return this;
  }

  shouldSeeFeatureWithName(featureName: string) {
    // Verify feature exists in the table
    cy.get('table tbody').should('be.visible');
    // Find the feature name in the table rows
    cy.get('table tbody tr').contains(featureName, { matchCase: false }).should('be.visible');
    return this;
  }
}

export default new ProjectDetailsPage();
