Feature: User Login
  As a user
  I want to login to the QBrain system
  So that I can access my projects and features

  Background:
    Given I navigate to the login page

  @smoke @critical
  Scenario: Successful login with valid credentials
    When I enter valid email "fatimarajab678@gmail.com"
    And I enter valid password "12345678"
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see the dashboard page
    And I should see my projects

  @negative
  Scenario: Failed login with invalid email
    When I enter invalid email "invalid@example.com"
    And I enter password "12345678"
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @negative
  Scenario: Failed login with invalid password
    When I enter valid email "fatimarajab678@gmail.com"
    And I enter invalid password "WrongPassword"
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @negative
  Scenario: Failed login with empty credentials
    When I enter email ""
    And I enter password ""
    And I click the login button
    Then I should see validation error messages
    And I should remain on the login page
