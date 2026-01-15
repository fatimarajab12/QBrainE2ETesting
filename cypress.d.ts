/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Login command - logs in a user with email and password
     * @param email - User email
     * @param password - User password
     */
    login(email: string, password: string): Chainable<void>;

    /**
     * Logout command - logs out the current user
     */
    logout(): Chainable<void>;

    /**
     * Delete project by name via API
     * @param projectName - Name of the project to delete
     */
    deleteProjectByName(projectName: string): Chainable<void>;

    /**
     * Wait for AI processing to complete
     * @param selector - Selector for the element to wait for
     * @param timeout - Timeout in milliseconds (default: 120000)
     */
    waitForAIProcessing(selector: string, timeout?: number): Chainable<void>;

    /**
     * Wait for element to be visible and stable
     * @param selector - Selector for the element
     * @param timeout - Timeout in milliseconds (default: 5000)
     */
    waitForStable(selector: string, timeout?: number): Chainable<void>;

    /**
     * Clear and type text into an element
     * @param text - Text to type
     */
    clearAndType(text: string): Chainable<void>;

    /**
     * Check if element exists
     * @param selector - Selector for the element
     * @returns Chainable<boolean>
     */
    elementExists(selector: string): Chainable<boolean>;
  }
}
