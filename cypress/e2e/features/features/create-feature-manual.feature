Feature: Create Feature Manual
  As a user
  I want to create a feature manually for a project
  So that I can add custom features to my project

  Background:
    Given I am logged in
    And I navigate to the dashboard

  @smoke @critical
  Scenario: Create feature manual after creating project with valid SRS file
    When I click the "New Project" button
    And I enter project name "Project for Feature Creation"
    And I enter project description "Project to test feature creation"
    And I upload SRS file "validSRS.pdf"
    And I click the "Create Project" button
    Then I should see a success message "Project Created Successfully"
    And the project dialog should close
    When I navigate to the project "Project for Feature Creation"
    And I click the "Add Feature" button
    And I enter feature name "Test Feature Manual"
    And I enter feature description "This is a manually created feature for testing"
    And I click the "Create Feature" button
    Then I should see a success message "Success"
    And the feature dialog should close
    And I should see the feature "Test Feature Manual" in the features list
