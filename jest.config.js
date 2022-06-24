const baseTsConfig = require('./tsconfig.json');
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: {
        ...baseTsConfig.compilerOptions,
        jsx: 'react-jsx',
      },
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules', 'functions'],
  testRegex: 'src/.*(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/src/lib/utils/jest/__mocks__/styleMock.js',
    '^swiper.*$': '<rootDir>/src/lib/utils/jest/__mocks__/moduleMock.js',
  },
};

module.exports = config;
