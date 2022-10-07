module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: { ignoreCodes: ['TS6059'] },
      isolatedModules: true,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!<rootDir>/node_modules/'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  setupFiles: ['./jest-setup-file.ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/loader.setup.ts'],
  testPathIgnorePatterns: [
    '/build/',
    '/node_modules/',
    '/dist/',
    '/__tests__/(setup|helpers|factories|store)/',
  ],
  resetMocks: true,
  testMatch: ['**/?(*.)+(test).ts'],
};
