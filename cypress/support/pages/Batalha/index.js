const el = require('./elements')

class Batalha {
  LogOut() {
    cy.get(el.out).click();
  }
}

export default new Batalha;