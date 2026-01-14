// Import commands
import './commands';

// Export helpers for use in step definitions
export * from './helpers/data-generator';

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test for these errors
  if (
    err.message.includes('ResizeObserver loop limit exceeded') ||
    err.message.includes('Non-Error promise rejection captured') ||
    err.message.includes('NetworkError') ||
    err.message.includes('Failed to fetch')
  ) {
    return false;
  }
  return true;
});

// Log Cypress events (optional, for debugging)
// Note: cy.log() cannot be used in event handlers, use console.log instead if needed
// Cypress.on('test:before:run', (attributes) => {
//   console.log(`Running test: ${attributes.title}`);
// });

// Set default timeout for commands (if needed)
// Cypress.config('defaultCommandTimeout', 10000);
