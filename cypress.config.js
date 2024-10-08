const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiKey: '58fed6e92b65c464d5841efa59a6a05e88f99dba'
  },

  e2e: {
    baseUrl: 'https://app.todoist.com/app/projects/active',
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },

    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'Test Report',
      embeddedScreenshots: true,
      inlineAssets: true
    },
  },
});
