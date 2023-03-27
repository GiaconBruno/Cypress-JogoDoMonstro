// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const util = require('./utils.js')

Cypress.Commands.add('PrepareUser', () => {
  Cypress.env('Sex', (util.random(0, 2)) ? 'H' : 'M');
  Cypress.env('bodyForm', {
    'acao': 'gerar_pessoa',
    'sexo': Cypress.env('Sex'),
    'pontuacao': 'N',
    'idade': '0',
    'cep_estado': '',
    'txt_qtde': '1',
    'cep_cidade': '',
  });

  switch (util.random(1, 4)) {
    case 1:
      Cypress.env('Class', (Cypress.env('Sex') == 'H') ? 'Guerreiro' : 'Guerreira');
      break;
    case 2:
      Cypress.env('Class', (Cypress.env('Sex') == 'H') ? 'Caçador' : 'Caçadora');
      break;
    case 3:
      Cypress.env('Class', (Cypress.env('Sex') == 'H') ? 'Feiticeiro' : 'Feiticeira');
      break;
    default:
      Cypress.env('Class', (Cypress.env('Sex') == 'H') ? 'Guerreiro' : 'Guerreira');
      break;
  }
});

Cypress.Commands.add('GenerateUser', () => {
  cy.request({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: 'https://www.4devs.com.br/ferramentas_online.php',
    form: true,
    body: Cypress.env('bodyForm'),
  }).then(res => {
    expect(res.status).to.eq(200);
    expect(res.body[0].nome).is.not.null;
    Cypress.env('UserName', (res.body[0].nome).split(' ')[0]);
  });
})