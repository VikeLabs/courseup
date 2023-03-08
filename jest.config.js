// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  testPathIgnorePatterns: ['/node_modules', 'functions'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^swiper.*$': '<rootDir>/src/lib/utils/jest/__mocks__/moduleMock.js',
  },
  // js-dom setup
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
