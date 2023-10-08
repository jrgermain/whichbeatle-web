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
      functions: 90,
      branches: 90,
      lines: 90,
      statements: 90,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
