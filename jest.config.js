module.exports = {
  testEnvironment: 'jsdom',
  rootDir: './src',
  testPathIgnorePatterns: [
    '<rootDir>/../node_modules/',
    'helpers',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/../../jest-config/__mocks__/fileMock.js',
    '\\.(css|scss|less)$': 'identity-obj-proxy', // NOTE: This would be required for local scope css
  },
  setupTestFrameworkScriptFile: '<rootDir>/../config/setupJest.js',
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};
