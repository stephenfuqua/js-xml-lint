const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  transform: tsjPreset.transform,
  testEnvironment: 'node',
  transformIgnorePatterns: ['<rootDir>.*(node_modules).*$'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  collectCoverageFrom: ['**/src/**/*.ts'],
  modulePathIgnorePatterns: ['dist*', 'docs*'],
  watchPathIgnorePatterns: ['globalConfig'],
};
