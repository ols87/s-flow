import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: ['**/*.(test|cy).(ts|tsx)'],
    viewportWidth: 1000,
    viewportHeight: 700,
    screenshotOnRunFailure: false,
    video: false,
  },
});
