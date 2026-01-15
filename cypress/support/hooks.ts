/// <reference types="cypress" />

/**
 * Cypress Hooks
 * Before and After hooks for test setup and cleanup
 */

// Before each test
beforeEach(() => {
  // Clear cookies and localStorage
  cy.clearCookies();
  cy.clearLocalStorage();
  
  // Clear session storage
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

// Before all tests (setup)
before(() => {
  // Setup code that runs once before all tests
  // Note: cy.log() cannot be used in before() hooks
});

// After all tests (cleanup)
after(() => {
  // Final cleanup code that runs once after all tests
  // Note: cy.log() cannot be used in after() hooks
});
