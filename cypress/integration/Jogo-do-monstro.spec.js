/// <reference types="cypress" />

import Login from '../support/pages/Login'
import Batalha from '../support/pages/Batalha'

describe('Jogo do Monstro', () => {
  it('Login', () => {
    Login.Access();
    Login.Form();
    Login.Logon();
  })

  it('Batalha', () => {
    // Batalha.LogOut();
  })
})