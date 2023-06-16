export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  fakeTimers: {
    enableGlobally: true,
    doNotFake: ['nextTick', 'setImmediate'],
    legacyFakeTimers: true,
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: { '^@(/.*)$': '<rootDir>/src$1' },
};
