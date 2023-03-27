const el = require('./elements')

class Login {
  Access() {
    cy.visit('https://giaconbruno.github.io/Jogo-do-Monstro/')
  }
  Form() {
    // cy.intercept();
    cy.PrepareUser();
    cy.GenerateUser().then(() => {
      cy.get(el.name).type(Cypress.env('UserName'));
      (Cypress.env('Sex') == 'H') ? cy.get(el.male).click() : cy.get(el.famele).click();
      cy.get(el.class).select(Cypress.env('Class'));
    });
  }

  Logon() {
    cy.get(el.enter).click();
  }
}

export default new Login;