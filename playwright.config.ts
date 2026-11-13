import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/web',
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    launchOptions: process.platform === 'win32' ? { channel: 'msedge' } : {},
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node scripts/serve-web.mjs',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'small-phone', use: { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true } },
    { name: 'phone', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
});
