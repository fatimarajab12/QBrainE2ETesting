/// <reference types="cypress" />
import { After } from '@badeball/cypress-cucumber-preprocessor';
import { createdProjects, clearTrackedProjects } from '../../helpers/test-state';

/**
 * Global cleanup hook - runs after each scenario
 * Deletes all tracked projects
 */
After(() => {
  // Cleanup all tracked projects after each scenario
  if (createdProjects.length > 0) {
    cy.wrap(createdProjects).each((projectName: string) => {
      cy.deleteProjectByName(projectName);
    }).then(() => {
      // Clear the array after all deletions complete
      clearTrackedProjects();
    });
  } else {
    // Clear the array if no projects to delete
    clearTrackedProjects();
  }
});
