/// <reference types="cypress" />

/**
 * Test State Management
 * Shared state for tracking created resources across tests
 */

// Track created projects for cleanup
export const createdProjects: string[] = [];

/**
 * Track a project name for cleanup
 * @param projectName - Name of the project to track
 */
export const trackProject = (projectName: string): void => {
  if (!createdProjects.includes(projectName)) {
    createdProjects.push(projectName);
  }
};

/**
 * Remove a project from tracking
 * @param projectName - Name of the project to untrack
 */
export const untrackProject = (projectName: string): void => {
  const index = createdProjects.indexOf(projectName);
  if (index > -1) {
    createdProjects.splice(index, 1);
  }
};

/**
 * Clear all tracked projects
 */
export const clearTrackedProjects = (): void => {
  createdProjects.length = 0;
};
