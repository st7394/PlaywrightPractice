import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporters */
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  /* Shared settings for all projects */
  use: {
    baseURL: process.env.BASE_URL,
    testIdAttribute: 'data-test',
    headless: false,
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    /* Video on first retry */
    video: 'on-first-retry',
    /* Browser context options */
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    /* Viewport */
    viewport: { width: 1280, height: 720 },
  },

  /* Global timeout per test */
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Mobile viewports */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Output directory for test artifacts */
  outputDir: 'test-results/',
});
