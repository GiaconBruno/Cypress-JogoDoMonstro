const el = require('./elements')

class Login {
  Access() {
    cy.visit('https://giaconbruno.github.io/Jogo-do-Monstro/')
  }
  Form() {
    cy.PrepareUser();
    cy.GenerateUser();
    cy.wrap('@GenerateUser').then(() => {
      cy.get(el.name).type(Cypress.env('UserName'));
      (Cypress.env('Sex') == 'H') ? cy.get(el.male).check() : cy.get(el.famele).check();
      cy.get(el.class).select(Cypress.env('Class'));
    });
  }

  Logon() {
    cy.get(el.enter).click();
  }
}

export default new Login;