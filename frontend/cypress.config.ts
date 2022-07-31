import { defineConfig } from 'cypress'
import * as registerCodeCoverageTasks from '@cypress/code-coverage/task'
export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    setupNodeEvents (on, config) {
      registerCodeCoverageTasks(on, config)
      return config
      // implement node event listeners here
    },
  },

  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents (on, config) {
      registerCodeCoverageTasks(on, config)
      return config
      // implement node event listeners here
    },
  },
})
