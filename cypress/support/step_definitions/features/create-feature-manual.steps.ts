/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ProjectDetailsPage from '../../page-objects/projects/ProjectDetailsPage';
import CreateFeatureDialog from '../../page-objects/features/CreateFeatureDialog';

// Navigate to project by name
When('I navigate to the project {string}', (projectName: string) => {
  // Click on the project card/name to navigate to project details
  cy.contains(projectName, { matchCase: false }).click();
  // Wait for navigation to project details page
  ProjectDetailsPage.shouldBeVisible();
});

// Feature dialog steps
When('I enter feature name {string}', (featureName: string) => {
  CreateFeatureDialog.enterFeatureName(featureName);
});

When('I enter feature description {string}', (description: string) => {
  CreateFeatureDialog.enterFeatureDescription(description);
});

Then('the feature dialog should close', () => {
  CreateFeatureDialog.shouldBeClosed();
});

Then('I should see the feature {string} in the features list', (featureName: string) => {
  ProjectDetailsPage.shouldSeeFeatureWithName(featureName);
});
