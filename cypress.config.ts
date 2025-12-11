import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createBundler = require('@bahmutov/cypress-esbuild-preprocessor');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    env: {
      API_BASE_URL: 'http://localhost:5000/api',
      FRONTEND_URL: 'http://localhost:8080',
    },
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      const esbuildPlugin = (await import('@badeball/cypress-cucumber-preprocessor/dist/subpath-entrypoints/esbuild')).createEsbuildPlugin(config);
      
      on(
        'file:preprocessor',
        createBundler({
          plugins: [
            esbuildPlugin as any, // Type compatibility workaround for esbuild version mismatch
          ],
        })
      );

      return config;
    },
  },
});

