// Import commands
import './commands';

// Import hooks for setup and cleanup
import './hooks';

// Export helpers for use in step definitions
export * from './helpers/data-generator';
export * from './helpers/api-helpers';

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

