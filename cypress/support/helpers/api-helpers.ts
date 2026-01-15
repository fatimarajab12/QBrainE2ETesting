/// <reference types="cypress" />

/**
 * API Helpers
 * Helper functions for API operations in Cypress tests
 */

const API_BASE_URL = 'http://localhost:5000/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    _id: string;
    email: string;
    name: string;
    [key: string]: any;
  };
  message?: string;
}

/**
 * Login via API and store token in localStorage
 * @param email - User email
 * @param password - User password
 * @returns Cypress chainable with login response
 */
export const loginViaAPI = (email: string, password: string) => {
  return cy.request({
    method: 'POST',
    url: `${API_BASE_URL}/auth/sign-in`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      email,
      password
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 200 && response.body.success && response.body.token) {
      // Store token in localStorage
      cy.window().then((win) => {
        win.localStorage.setItem('authToken', response.body.token);
      });
      cy.log(`Logged in successfully as ${email}`);
      return response.body as LoginResponse;
    } else {
      const errorMessage = response.body.message || `Login failed with status ${response.status}`;
      cy.log(`Login failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  });
};
