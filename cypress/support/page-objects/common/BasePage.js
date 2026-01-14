/**
 * Base Page Object - Contains common methods for all page objects
 */
class BasePage {
  // Common locators
  getLoader() {
    return cy.get('[data-testid="loader"], .loading, .spinner').first();
  }

  getToastNotification() {
    // Toast notifications use Radix UI Toast (Radix UI) with data-state="open"
    // Toast notifications also use Sonner (alternative toast library)
    // Radix UI Toast uses: [data-state="open"]
    // Sonner uses: [data-sonner-toast] or [role="status"]
    return cy.get('[data-state="open"], [data-sonner-toast], [role="status"]').first();
  }

  // Common actions
  waitForPageLoad() {
    cy.wait(1000); // Wait for page to stabilize
    return this;
  }

  waitForLoaderToDisappear() {
    this.getLoader().should('not.exist');
    return this;
  }

  // Common assertions
  shouldBeVisible() {
    cy.url().should('not.include', '/login');
    return this;
  }

  shouldSeeToastMessage(message) {
    this.getToastNotification().should('be.visible').and('contain.text', message);
    return this;
  }
}

export default BasePage;
