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

// After each test (optional)
afterEach(() => {
  // Take screenshot on failure
  // This is already handled by Cypress config, but you can add custom logic here
});

// Before all tests (setup)
before(() => {
  // Setup code that runs once before all tests
  // Note: cy.log() cannot be used in before() hooks
});

// After all tests (cleanup)
after(() => {
  // Cleanup code that runs once after all tests
  // Note: cy.log() cannot be used in after() hooks
});
