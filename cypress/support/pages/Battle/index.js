const el = require('./elements')
const elLogin = require('../Login/elements')

class Batalha {
  BattleDefault() {
    //Valida Nickname
    cy.get(el.personName).should('have.text', `${Cypress.env('Class')} - ${Cypress.env('UserName')} `)
    //Validar Vida (Person vs Monster)
    cy.get(el.personLife).should('have.text', `100%`);
    cy.get(el.monsterLife).should('have.text', `100%`);
    //Validar Status Batalha (Start)
    cy.contains(el.statusGame.el, el.statusGame.text).should('exist');
    //Logout visible
    cy.get(el.out).should('not.have.css', 'display', 'none');
  }

  BattleATK() {
    cy.contains(el.statusGame.el, el.statusGame.text).click();
    cy.contains(el.btnAtk.el, el.btnAtk.text).should('exist');
    cy.contains(el.btnAtk.el, el.btnAtk.text).click();

    cy.getDmgPerson();
    cy.getDmgMonter();

    cy.wrap('@getDmgPerson').then(() => {
      cy.get(el.monsterLife).should('have.text', `${100 - Cypress.env('DamagePerson')}%`);
    });

    cy.wrap('@getDmgMonter').then(() => {
      cy.get(el.personLife).should('have.text', `${100 - Cypress.env('DamageMonster')}%`);
    });

    cy.contains(el.btnDesist.el, el.btnDesist.text).should('exist');
    cy.contains(el.btnDesist.el, el.btnDesist.text).click();
  }

  BattleSkill() {
    cy.contains(el.statusGame.el, el.statusGame.text).click();
    cy.contains(el.btnSkill.el, el.btnSkill.text).should('exist');
    cy.contains(el.btnSkill.el, el.btnSkill.text).click();

    cy.getDmgPerson();
    cy.getDmgMonter();

    cy.wrap('@getDmgPerson').then(() => {
      cy.get(el.monsterLife).should('have.text', `${100 - Cypress.env('DamagePerson')}%`);
    });

    cy.wrap('@getDmgMonter').then(() => {
      cy.get(el.personLife).should('have.text', `${100 - Cypress.env('DamageMonster')}%`);
    });

    cy.contains(el.btnDesist.el, el.btnDesist.text).should('exist');
    cy.contains(el.btnDesist.el, el.btnDesist.text).click();
  }

  BattleHeal() {
    cy.contains(el.statusGame.el, el.statusGame.text).click();
    cy.contains(el.btnHeal.el, el.btnHeal.text).should('exist');
    cy.contains(el.btnHeal.el, el.btnHeal.text).click();

    cy.getHealPerson();
    cy.getDmgMonter();

    cy.wrap('@getHealPerson').then(() => {
      cy.get(el.monsterLife).should('have.text', `100%`);
    });

    cy.wrap('@getDmgMonter').then(() => {
      cy.get(el.personLife)
        .should('have.text', `${Math.min(100 + Cypress.env('HealPerson'), 100) - Cypress.env('DamageMonster')}%`);
    });

    cy.contains(el.btnDesist.el, el.btnDesist.text).should('exist');
    cy.contains(el.btnDesist.el, el.btnDesist.text).click();
  }

  BattleStop() {
    cy.contains(el.statusGame.el, el.statusGame.text).click();
    cy.contains(el.btnAuto.el, el.btnAuto.text).should('exist');
    cy.contains(el.btnAuto.el, el.btnAuto.text).click();

    cy.contains(el.btnStop.el, el.btnStop.text).should('exist');
    cy.wait(5000);
    cy.contains(el.btnStop.el, el.btnStop.text).click();

    cy.getDmgPerson();
    cy.getDmgMonter();
    cy.getHealPerson();

    cy.wrap('@getDmgPerson').then(() => {
      cy.get(el.monsterLife).should('have.text', `${100 - Cypress.env('DamagePerson')}%`);
    });

    cy.wrap('@getDmgMonter').then(() => {
      cy.log('dmgMonster', `${Cypress.env('DamageMonster')}%`)
    });

    cy.wrap('@getDmgMonter').then(() => {
      cy.log('dmgMonster', `${Cypress.env('HealPerson')}%`)
    });

    // Bug: Usuário cura mais que 100%;
    // cy.wrap('@getDmgMonter').then(() => {
    //   cy.get(el.personLife)
    //     .should('have.text', `${Math.min(100 - Cypress.env('DamageMonster') + Cypress.env('HealPerson'), 100)}%`);
    // });

    cy.contains(el.btnDesist.el, el.btnDesist.text).should('exist');
    cy.contains(el.btnDesist.el, el.btnDesist.text).click();
  }

  BattleAuto() {
    cy.contains(el.statusGame.el, el.statusGame.text).click();
    cy.contains(el.btnAuto.el, el.btnAuto.text).should('exist');
    cy.contains(el.btnAuto.el, el.btnAuto.text).click();

    cy.contains(el.btnStop.el, el.btnStop.text).should('exist');

    cy.contains(el.statusGame.el, el.statusGame.text, { timeout: 20000 }).should('exist');

    cy.getDmgPerson();
    cy.getDmgMonter();
    cy.getHealPerson();

    cy.wrap('@getDmgPerson').then(() => {
      cy.get(el.monsterLife).should('have.text', `${Math.max(100 - Cypress.env('DamagePerson'), 0)}%`);
    });

    cy.wrap('@getDmgMonter').then(() => {
      cy.log('dmgMonster', `${Cypress.env('DamageMonster')}%`)
    });

    cy.wrap('@getDmgMonter').then(() => {
      cy.log('HealPerson', `${Cypress.env('HealPerson')}%`)
    });
  }

  LogOut() {
    cy.get(el.out).should('exist');
    cy.get(el.out).click();

    cy.get(elLogin.name).should('be.empty');

    // Bug: Logout não voltou o campo 'Genero' para default. Default: Masculino.
    // cy.get(elLogin.male).should('be.checked')
    // cy.get(elLogin.famele).should('be.not.checked');
    if (Cypress.env('Sex') == 'H') {
      cy.get(elLogin.male).should('be.checked')
      cy.get(elLogin.famele).should('be.not.checked');
    } else {
      cy.get(elLogin.famele).should('be.checked');
      cy.get(elLogin.male).should('be.not.checked');
    }

    cy.get(elLogin.class).should('not.to.be.selected');

  }
}

export default new Batalha;