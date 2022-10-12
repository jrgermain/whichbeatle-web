// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  silent: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      functions: 100,
      branches: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
