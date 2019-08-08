module.exports = wallaby => {
  process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

  return {
    files: ['src/**/*', 'jest.config.js', 'package.json', 'tsconfig.json'],

    tests: ['tests/**/*.spec.ts'],

    env: {
      type: 'node'
    },

    preprocessors: {
      '**/*.js?(x)': file => require('@babel/core').transform(
        file.content,
        {sourceMap: true, compact: false, filename: file.path, plugins: ['babel-plugin-jest-hoist']}),
      '**/*.vue': file => require('vue-jest').process(file.content, file.path)
    },

    setup(wallaby) {
      const jestConfig = require('./package').jest || require('./jest.config')
      delete jestConfig.transform['^.+\\.tsx?$']
      wallaby.testFramework.configure(jestConfig)
    },

    testFramework: 'jest',

    debug: true
  }
}
