const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'pbx5wc',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
    testIsolation: false,
    viewportWidth: 992,
    viewportHeight: 620,
    env: {
      'UserName': '',
      'Sex': '',
      'Class': '',
      'bodyForm': {},
      'DamageMonster': 0,
      'DamagePerson': 0,
      'HealPerson': 0,
    }
  },
});
