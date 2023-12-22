module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  }
}
