export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
  };