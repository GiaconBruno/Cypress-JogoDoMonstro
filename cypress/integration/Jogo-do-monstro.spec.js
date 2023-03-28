/// <reference types="cypress" />

import Login from '../support/pages/Login'
import Battle from '../support/pages/Battle'

describe('Jogo do Monstro', () => {
  it('Login', () => {
    Login.Access();
    Login.Form();
    Login.Logon();
  })

  it('BattleDefault', () => {
    Battle.BattleDefault();
  })

  it('BattleATK', () => {
    Battle.BattleATK();
  })

  it('BattleSkill', () => {
    Battle.BattleSkill();
  })

  it('BattleHeal', () => {
    Battle.BattleHeal();
  })

  it('BattleAuto', () => {
    Battle.BattleAuto();
  })

  it.skip('LogOut', () => {
    Battle.LogOut();
  })


})