/**
 * Custom Cypress Commands
 * Reusable commands for common operations
 */

// Login command
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input#email[type="email"]').first().type(email);
  cy.get('input#password').first().type(password);
  cy.get('form').find('button[type="submit"]').first().click();
  cy.url({ timeout: 10000 }).should('include', '/dashboard');
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"], button').contains('Logout', { matchCase: false }).click({ force: true });
  cy.url().should('include', '/login');
});

// Wait for AI processing
Cypress.Commands.add('waitForAIProcessing', (selector, timeout = 120000) => {
  cy.get(selector, { timeout }).should('contain.text', 'Processed', { matchCase: false });
});

// Wait for element to be visible and stable
Cypress.Commands.add('waitForStable', (selector, timeout = 5000) => {
  cy.get(selector, { timeout }).should('be.visible');
  cy.wait(500); // Additional wait for stability
});

// Clear and type command
Cypress.Commands.add('clearAndType', { prevSubject: 'element' }, (subject, text) => {
  cy.wrap(subject).clear().type(text);
});

// Check if element exists
Cypress.Commands.add('elementExists', (selector) => {
  return cy.get('body').then(($body) => {
    return $body.find(selector).length > 0;
  });
});
