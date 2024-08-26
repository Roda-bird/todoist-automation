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

Cypress.Commands.add('openHomePage', () => {
  cy.visit('/')
})

Cypress.Commands.add('login', () => {
  cy.setCookie('todoistd', '/0NO0CW9wfc+/UM1fwwZXBYxC98=?pCHK=gASVJAAAAAAAAACMIGViZDFmZmU2OGE3ZjRjZjJiODY1NTg4ODc0OTFmZmJklC4=&user_id=gASVBgAAAAAAAABKZiwBAy4=')
  cy.visit('/')
})

Cypress.Commands.add('createProjectAPI', (projectData) => {
  cy.request({
    method: 'POST',
    url: 'https://api.todoist.com/rest/v2/projects',
    body: projectData,
    headers: {
      'Authorization': 'Bearer ' + Cypress.env("apiKey"),
    },
  })
})

Cypress.Commands.add('deleteProjectAPI', (projectId) => {
  cy.request({
    method: 'DELETE',
    url: `https://api.todoist.com/rest/v2/projects/${projectId}`,
    headers: {
      'Authorization': 'Bearer ' + Cypress.env("apiKey"),
    }
  })
})