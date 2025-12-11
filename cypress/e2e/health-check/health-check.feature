Feature: Health Check
  As a developer
  I want to verify that the system is working
  So that I can run tests successfully

  Scenario: Verify Frontend is accessible
    Given I navigate to the frontend
    Then the frontend page should load

  Scenario: Verify Backend API is accessible
    Given the backend server is running
    When I send a request to the API
    Then the API should respond

