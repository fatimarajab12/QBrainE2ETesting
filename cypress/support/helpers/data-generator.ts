

interface TestUser {
  email: string;
  password: string;
  name?: string;
  [key: string]: any;
}

interface TestProject {
  name: string;
  description?: string;
  [key: string]: any;
}


export const generateUniqueEmail = (prefix = 'test'): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${timestamp}-${random}@example.com`;
};


export const generateUniqueProjectName = (prefix = 'Test Project'): string => {
  const timestamp = Date.now();
  return `${prefix} ${timestamp}`;
};


export const generateUniqueString = (prefix = 'test'): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${timestamp}-${random}`;
};


export const generateRandomPassword = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};


export const generateRandomNumber = (min = 1, max = 100): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export const generateTestUser = (overrides: Partial<TestUser> = {}): TestUser => {
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
 * @param overrides - Optional overrides for project data
 * @returns Project data object
 */
export const generateTestProject = (overrides: Partial<TestProject> = {}): TestProject => {
  const timestamp = Date.now();
  
  return {
    name: overrides.name || `Test Project ${timestamp}`,
    description: overrides.description || `Test Project Description ${timestamp}`,
    ...overrides,
  };
};

/**
 * Generate a random string of specified length
 * @param length - String length (default: 10)
 * @param charset - Character set (default: 'alphanumeric')
 * @returns Random string
 */
export const generateRandomString = (length = 10, charset: 'alphanumeric' | 'numeric' | 'alphabetic' = 'alphanumeric'): string => {
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
