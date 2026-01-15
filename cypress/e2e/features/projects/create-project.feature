Feature: Create Project
  As a user
  I want to create a new project
  So that I can manage my testing projects and features

  Background:
    Given I am logged in
    And I navigate to the dashboard

  @smoke @critical
  Scenario: Create project successfully with valid data
    When I click the "New Project" button
    And I enter project name "Test Project E2E"
    And I enter project description "This is a test project for E2E testing"
    And I click the "Create Project" button
    Then I should see a success message "Project Created Successfully"
    And the project dialog should close
    And I should see the project "Test Project E2E" in the projects list

  @smoke @critical
  Scenario: Create project successfully with SRS file (PDF)
    When I click the "New Project" button
    And I enter project name "Project with SRS PDF"
    And I enter project description "Project with PDF SRS document"
    And I upload SRS file "validSRS.pdf"
    And I click the "Create Project" button
    Then I should see a success message "Project Created Successfully"
    And I should see a success message "SRS Uploaded Successfully"
    And the project dialog should close
    And I should see the project "Project with SRS PDF" in the projects list

  @smoke @critical
  Scenario: Create project successfully with SRS file (TXT)
    When I click the "New Project" button
    And I enter project name "Project with SRS TXT"
    And I enter project description "Project with TXT SRS document"
    And I upload SRS file "valid-srs.txt"
    And I click the "Create Project" button
    Then I should see a success message "Project Created Successfully"
    And I should see a success message "SRS Uploaded Successfully"
    And the project dialog should close
    And I should see the project "Project with SRS TXT" in the projects list

  @negative
  Scenario: Create project fails with empty project name
    When I click the "New Project" button
    And I enter project name ""
    And I enter project description "Test description"
    Then the "Create Project" button should be disabled
    And the project dialog should remain open

  @negative
  Scenario: Create project fails with whitespace-only project name
    When I click the "New Project" button
    And I enter project name "   "
    And I enter project description "Test description"
    Then the "Create Project" button should be disabled
    And the project dialog should remain open

  @negative
  Scenario: Upload invalid SRS file type (not PDF or TXT)
    When I click the "New Project" button
    And I enter project name "Test Project"
    And I enter project description "Test description"
    And I upload SRS file "download (1).jpg"
    Then I should see an error message "Invalid File Type"
    And I should see error description "Please upload a PDF or TXT file only"
    And the file should not be selected

  @negative
  Scenario: Upload SRS file that is too large
    When I click the "New Project" button
    And I enter project name "Test Project"
    And I enter project description "Test description"
    And I upload SRS file "10MB-TESTFILE.ORG.pdf"
    Then I should see an error message "File Too Large"
    And I should see error description "File size must be less than 10MB"
    And the file should not be selected
