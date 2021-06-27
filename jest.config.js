// Configuration docs: https://jestjs.io/docs/pt-BR/configuration
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  ...tsjPreset,
  preset: 'jest-expo', // A node environment that mimics the environment of a React Native app
  verbose: true, // Report every individual test
  setupFilesAfterEnv: [
    // Run code that will set up the testing environment every. Each setupFile will be run once per test file
    '<rootDir>/src/setupTests.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '@testing-library/jest-native/extend-expect',
  ],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  moduleDirectories: [
    "node_modules",
    "utils",
    __dirname,
  ],
  moduleFileExtensions: [
    // File extensions Jest will look for
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  testEnvironment: "node",
  // timers: "fake",
  // Detect test files on the project with a suffix of .test and have extension .ts or .tsx
  testRegex: '((\\.|/)(test))\\.tsx?$',
  transform: {
    ...tsjPreset.transform,
    // Use ts-jest transformer to allow use Jest in TypeScript files
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
    '^.+\\.tsx?$': 'ts-jest',
  },
  // transformIgnorePatterns: [
  //   "node_modules/(?!(@react-native|react-native|react|@react-native-community|react-native-permissions|react-native-app-auth|react-native-base64|react-native-splash-screen|react-native-iphone-x-helper|react-native-webview|react-native-keyboard-aware-scroll-view|react-native-modal|react-native-animatable|react-native-shimmer-placeholder|react-native-linear-gradient|react-native-gifted-chat|react-native-parsed-text|react-native-communications|react-native-lightbox|react-native-typing-animation|react-native-rate|react-native-dropdown-picker|react-native-vector-icons|react-native-reanimated|@react-native-firebase/messaging|@react-native-firebase/app|@react-native-picker/picker|react-native-responsive-fontsize)/)"
  // ],
  testPathIgnorePatterns: [
    // Skip tests in these paths
    '/node_modules/',
  ],
  coverageThreshold: {
    global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
    },
  },
  moduleNameMapper: {
    // Regular expression for module names that allows to require objets, such as images or videos, with a single module
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/staticFileImportMock.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      isolateModule: true,
      diagnostics: false // Disable Typescript lint errors on project during tests
    }
  }
}
