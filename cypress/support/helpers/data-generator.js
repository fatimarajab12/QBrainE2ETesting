/**
 * Data Generator Helper
 * Generates dynamic test data for Cypress tests
 */

/**
 * Generate a unique email address
 * @param {string} prefix - Email prefix (default: 'test')
 * @returns {string} Unique email address
 */
export const generateUniqueEmail = (prefix = 'test') => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${timestamp}-${random}@example.com`;
};

/**
 * Generate a unique project name
 * @param {string} prefix - Project name prefix (default: 'Test Project')
 * @returns {string} Unique project name
 */
export const generateUniqueProjectName = (prefix = 'Test Project') => {
  const timestamp = Date.now();
  return `${prefix} ${timestamp}`;
};

/**
 * Generate a unique string
 * @param {string} prefix - String prefix
 * @returns {string} Unique string
 */
export const generateUniqueString = (prefix = 'test') => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Generate a random password
 * @param {number} length - Password length (default: 8)
 * @returns {string} Random password
 */
export const generateRandomPassword = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

/**
 * Generate a random number within a range
 * @param {number} min - Minimum value (default: 1)
 * @param {number} max - Maximum value (default: 100)
 * @returns {number} Random number
 */
export const generateRandomNumber = (min = 1, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate test user data
 * @param {Object} overrides - Optional overrides for user data
 * @returns {Object} User data object
 */
export const generateTestUser = (overrides = {}) => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  
  return {
    email: overrides.email || `test-user-${timestamp}-${random}@example.com`,
    password: overrides.password || generateRandomPassword(8),
    name: overrides.name || `Test User ${timestamp}`,
    ...overrides,
  };
};

/**
 * Generate test project data
 * @param {Object} overrides - Optional overrides for project data
 * @returns {Object} Project data object
 */
export const generateTestProject = (overrides = {}) => {
  const timestamp = Date.now();
  
  return {
    name: overrides.name || `Test Project ${timestamp}`,
    description: overrides.description || `Test Project Description ${timestamp}`,
    ...overrides,
  };
};

/**
 * Generate a random string of specified length
 * @param {number} length - String length (default: 10)
 * @param {string} charset - Character set (default: 'alphanumeric')
 * @returns {string} Random string
 */
export const generateRandomString = (length = 10, charset = 'alphanumeric') => {
  let chars = '';
  switch (charset) {
    case 'alphanumeric':
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      break;
    case 'numeric':
      chars = '0123456789';
      break;
    case 'alphabetic':
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      break;
    default:
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
