/// <reference types="cypress" />

/**
 * Custom Cypress Commands
 * Reusable commands for common operations
 */

interface Project {
  _id: string;
  name: string;
  description?: string;
}

interface ProjectsResponse {
  status: number;
  body: {
    data?: Project[];
  };
}

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
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
Cypress.Commands.add('waitForAIProcessing', (selector: string, timeout = 120000) => {
  cy.get(selector, { timeout }).should('contain.text', 'Processed', { matchCase: false });
});

// Wait for element to be visible and stable
Cypress.Commands.add('waitForStable', (selector: string, timeout = 5000) => {
  cy.get(selector, { timeout }).should('be.visible');
  cy.wait(500); // Additional wait for stability
});

// Clear and type command
Cypress.Commands.add('clearAndType', { prevSubject: 'element' }, (subject, text: string) => {
  cy.wrap(subject).clear().type(text);
});

// Check if element exists
Cypress.Commands.add('elementExists', (selector: string) => {
  return cy.get('body').then(($body) => {
    return $body.find(selector).length > 0;
  });
});

// Delete project by name via API
Cypress.Commands.add('deleteProjectByName', (projectName: string) => {
  // Get token from localStorage
  cy.window().then((win: Window) => {
    const token = win.localStorage.getItem('authToken');
    
    if (!token) {
      cy.log('No auth token found, skipping project deletion');
      return;
    }

    // Get all projects
    cy.request({
      method: 'GET',
      url: 'http://localhost:5000/api/projects',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response: ProjectsResponse) => {
      if (response.status === 200 && response.body.data) {
        // Find project by name
        const project = response.body.data.find((p: Project) => p.name === projectName);
        
        if (project && project._id) {
          // Delete the project
          cy.request({
            method: 'DELETE',
            url: `http://localhost:5000/api/projects/${project._id}`,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            failOnStatusCode: false
          }).then((deleteResponse) => {
            if (deleteResponse.status === 200) {
              cy.log(`Project "${projectName}" deleted successfully`);
            } else {
              cy.log(`Failed to delete project "${projectName}": ${deleteResponse.status}`);
            }
          });
        } else {
          cy.log(`Project "${projectName}" not found, skipping deletion`);
        }
      }
    });
  });
});
