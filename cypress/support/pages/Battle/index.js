const el = require('./elements')

class Batalha {
  BattleDefault() {
    //Valida Nickname
    cy.get(el.personName).should('have.text', `${Cypress.env('Class')} - ${Cypress.env('UserName')} `)
    //Validar Vida (Person vs Monster)
    cy.get(el.personLife).should('have.text', `100%`);
    cy.get(el.monsterLife).should('have.text', `100%`);
    //Validar Status Batalha (Start)
    cy.get(el.statusGame).should('have.text', `INICIAR NOVO JOGO`);
    //Logout visible
    cy.get(el.out).should('not.have.css', 'display', 'none');
  }

  BattleATK() {
    cy.get(el.statusGame).click();
    cy.get(el.btnAtk).should('exist');
    cy.get(el.btnAtk).click();

    cy.getDmgPerson();
    cy.getDmgMonter();

    cy.wrap('@getDmgPerson').then(() => {
      cy.get(el.monsterLife).should('have.text', `${100 - Cypress.env('DamageMonster')}%`);
    });

    cy.wrap('@getDmgMonter').then(() => {
      cy.get(el.personLife).should('have.text', `${100 - Cypress.env('DamagePerson')}%`);
    });

    cy.get(el.btnDesist).should('exist');
    cy.get(el.btnDesist).click();
  }

  BattleSkill() {
    cy.get(el.statusGame).click();
    cy.get(el.btnSkill).should('exist');
    cy.get(el.btnSkill).click();

    cy.getDmgPerson();
    cy.getDmgMonter();

    cy.wrap('@getDmgPerson').then(() => {
      cy.get(el.monsterLife).should('have.text', `${100 - Cypress.env('DamageMonster')}%`);
    });

    cy.wrap('@getDmgMonter').then(() => {
      cy.get(el.personLife).should('have.text', `${100 - Cypress.env('DamagePerson')}%`);
    });

    cy.get(el.btnDesist).should('exist');
    cy.get(el.btnDesist).click();
  }

  BattleHeal() {
    cy.get(el.statusGame).click();
    cy.get(el.btnHeal).should('exist');
    cy.get(el.btnHeal).click();

    cy.getHealPerson();
    cy.getDmgMonter();

    cy.wrap('@getHealPerson').then(() => {
      cy.get(el.monsterLife).should('have.text', `100%`);
    });

    cy.wrap('@getDmgMonter').then(() => {
      cy.get(el.personLife).should('have.text', `${(100 + Cypress.env('HealPerson') > 100 ? 100 : 100 + Cypress.env('HealPerson')) - Cypress.env('DamagePerson')}%`);
    });

    cy.get(el.btnDesist).should('exist');
    cy.get(el.btnDesist).click();
  }

  BattleAuto() {
    cy.get(el.statusGame).click();
    cy.get(el.btnAuto).should('exist');
    cy.get(el.btnAuto).click();
  }

  LogOut() {
    cy.get(el.out).click();
  }
}

export default new Batalha;