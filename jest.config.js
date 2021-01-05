module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  },
  setupFilesAfterEnv: ['<rootDir>/test/config/setup.ts'],
  transform: {
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  moduleNameMapper: {
    '\\.(ttf|woff|woff2)$': 'identity-obj-proxy'
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{tsx,ts,jsx,js}',
    '!src/**/*.d.ts',
    '!src/env.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
