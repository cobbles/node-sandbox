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
    },
  },

  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents (on, config) {
      registerCodeCoverageTasks(on, config)
      return config
    },
  },
})
