import BasePage from '../common/BasePage';

/**
 * Create Project Dialog Page Object
 * Contains all locators and methods for the Create Project dialog
 */
class CreateProjectDialog extends BasePage {
  // Locators
  getDialog() {
    return cy.get('[role="dialog"]').contains('Create New Project', { matchCase: false });
  }

  getProjectNameInput() {
    return cy.get('input#name').first();
  }

  getProjectDescriptionInput() {
    return cy.get('textarea#description').first();
  }

  getSRSFileInput() {
    return cy.get('input#srs-file[type="file"]').first();
  }

  getCreateProjectButton() {
    // LoadingButton renders as button[type="button"] or button[type="submit"]
    return cy.get('[role="dialog"]').find('button').contains('Create Project', { matchCase: false }).first();
  }

  getCreateProjectTriggerButton() {
    // The button that opens the dialog
    return cy.get('[data-testid="create-project-trigger"]').first();
  }

  getSelectedFileDisplay() {
    return cy.get('[role="dialog"]').find('[class*="bg-muted"]').contains(/\.(pdf|txt)$/i);
  }

  getRemoveFileButton() {
    return cy.get('[role="dialog"]').find('button').contains('X', { matchCase: false }).first();
  }

  getCloseButton() {
    return cy.get('[role="dialog"]').find('button[aria-label*="close"], button[aria-label*="Close"]').first();
  }

  // Actions
  openDialog() {
    this.getCreateProjectTriggerButton().click();
    // Wait for dialog to appear in DOM
    cy.get('[role="dialog"]', { timeout: 10000 }).should('exist');
    // Wait for dialog animation to complete by checking that content is visible
    // We check for input field which is a good indicator that dialog is fully rendered
    cy.get('[role="dialog"]').find('input#name', { timeout: 10000 }).should('be.visible');
    return this;
  }

  enterProjectName(name) {
    this.getProjectNameInput().clear().type(name);
    return this;
  }

  enterProjectDescription(description) {
    this.getProjectDescriptionInput().clear().type(description);
    return this;
  }

  uploadSRSFile(fileName) {
    // Upload file from fixtures
    this.getSRSFileInput().selectFile(`cypress/fixtures/files/${fileName}`, { force: true });
    return this;
  }

  removeSRSFile() {
    this.getRemoveFileButton().click();
    return this;
  }

  clickCreateProjectButton() {
    this.getCreateProjectButton().click();
    return this;
  }

  closeDialog() {
    this.getCloseButton().click();
    return this;
  }

  // Assertions
  shouldBeVisible() {
    // Wait for dialog to appear in DOM
    cy.get('[role="dialog"]', { timeout: 10000 }).should('exist');
    // Wait for dialog animation to complete by checking that content is visible
    cy.get('[role="dialog"]').find('input#name', { timeout: 10000 }).should('be.visible');
    return this;
  }

  shouldBeClosed() {
    // Check that dialog element no longer exists in DOM
    cy.get('[role="dialog"]').should('not.exist');
    return this;
  }

  shouldHaveProjectNameInput() {
    this.getProjectNameInput().should('be.visible');
    return this;
  }

  shouldHaveProjectDescriptionInput() {
    this.getProjectDescriptionInput().should('be.visible');
    return this;
  }

  shouldHaveSRSFileInput() {
    this.getSRSFileInput().should('exist');
    return this;
  }

  shouldHaveCreateButtonDisabled() {
    this.getCreateProjectButton().should('be.disabled');
    return this;
  }

  shouldHaveCreateButtonEnabled() {
    this.getCreateProjectButton().should('not.be.disabled');
    return this;
  }

  shouldDisplaySelectedFile(fileName) {
    this.getSelectedFileDisplay().should('be.visible').and('contain.text', fileName);
    return this;
  }

  shouldNotDisplaySelectedFile() {
    this.getSelectedFileDisplay().should('not.exist');
    return this;
  }
}

export default new CreateProjectDialog();
