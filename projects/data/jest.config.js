const baseConfig = require('../../jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>'],
  testPathIgnorePatterns: ['./src/test.ts']
};
