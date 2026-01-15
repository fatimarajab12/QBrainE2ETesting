/// <reference types="cypress" />
import BasePage from '../common/BasePage';

/**
 * Create Feature Dialog Page Object
 * Contains all locators and methods for the Create Feature dialog
 */
class CreateFeatureDialog extends BasePage {
  // Locators
  getDialog() {
    return cy.get('[role="dialog"]').contains('Add New Feature', { matchCase: false });
  }

  getFeatureNameInput() {
    return cy.get('input#feature-name').first();
  }

  getFeatureDescriptionInput() {
    return cy.get('textarea#feature-description').first();
  }

  getCreateFeatureButton() {
    return cy.get('[role="dialog"]').find('button').contains('Create Feature', { matchCase: false }).first();
  }

  getAddFeatureButton() {
    return cy.get('button').contains('Add Feature', { matchCase: false }).first();
  }

  // Actions
  openDialog() {
    this.getAddFeatureButton().click();
    // Wait for dialog to appear in DOM
    cy.get('[role="dialog"]', { timeout: 10000 }).should('exist');
    // Wait for dialog animation to complete
    cy.get('[role="dialog"]').find('input#feature-name', { timeout: 10000 }).should('be.visible');
    return this;
  }

  enterFeatureName(name: string) {
    this.getFeatureNameInput().clear().type(name);
    return this;
  }

  enterFeatureDescription(description: string) {
    this.getFeatureDescriptionInput().clear().type(description);
    return this;
  }

  clickCreateFeatureButton() {
    this.getCreateFeatureButton().click();
    return this;
  }

  // Assertions
  shouldBeVisible() {
    // Wait for dialog to appear in DOM
    cy.get('[role="dialog"]', { timeout: 10000 }).should('exist');
    // Wait for dialog animation to complete
    cy.get('[role="dialog"]').find('input#feature-name', { timeout: 10000 }).should('be.visible');
    return this;
  }

  shouldBeClosed() {
    // Check that dialog element no longer exists in DOM
    cy.get('[role="dialog"]').should('not.exist');
    return this;
  }
}

export default new CreateFeatureDialog();
