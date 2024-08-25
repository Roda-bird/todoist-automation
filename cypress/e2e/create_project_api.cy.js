describe('Create Project via API', () => {

  it('should create a new project', () => {

    cy.request({
      method: 'POST',
      url: 'https://api.todoist.com/rest/v2/projects',
      headers: {
        'Authorization': 'Bearer ' + Cypress.env("apiKey"),
      },
      body: {
        name: 'Test Project'
      }
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.name).to.equal('Test Project')
      cy.wrap(response.body.id).as('projectId')
    })

  })
})

describe('Verify Project in UI', () => {

  before(() => {
    cy.login()
  });

  it('should display the created project in the UI', () => {
    
    cy.visit('https://todoist.com/app/projects')
    cy.contains('Test Project').should('be.visible')
  })

})

describe('Create Project Exceeding Name Length Limit', () => {

  before(() => {
    cy.login()
  });

  const maxLength = 120; //This is maximum length for project name on Todoist
  const projectName = 'A'.repeat(maxLength + 1);
  
  it('should not create a project with a name exceeding the length limit', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.todoist.com/rest/v2/projects',
      headers: {
        'Authorization': 'Bearer ' + Cypress.env("apiKey"),
      },
      body: {
        name: projectName
      },
      failOnStatusCode: false // Prevent Cypress from failing the test automatically
    }).then((response) => {
      expect(response.status).to.not.equal(200)
      expect(response.body).to.have.property('error')
    })
  })
})
