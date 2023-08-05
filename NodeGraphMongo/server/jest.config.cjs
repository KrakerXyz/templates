module.exports = {
    testEnvironment: 'node',

    collectCoverage: false,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',

    rootDir: '',
    coveragePathIgnorePatterns: ['/dist/'],
    testPathIgnorePatterns: ['/dist/'],

    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest'
    }
};
