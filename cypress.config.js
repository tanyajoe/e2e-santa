const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  projectId: "jmvpif",
  video: false,
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    testIsolation: false,
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      //on("file:preprocessor", webpackPreprocessor);
      allureWriter(on, config);
      // implement node event listeners here
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      addCucumberPreprocessorPlugin(on, config);

      return config;
    },

    env: {
      allureReuseAfterSpec: true,
    },
  },
  viewportHeight: 768,
  viewportWidth: 1366,
});
