describe('Scenario 1: Validate “Create Project” functionality:', () => {

  const projectName = 'Test Project'
  const maxNameLength = 120
  const longestName = 'X'.repeat(maxNameLength)

  let projectId

  beforeEach(() => {
    cy.login()
  })

  afterEach(function () {
    if (projectId) {
      cy.deleteProjectAPI(projectId)
    }
  })

  describe('Positive Test: Create and Verify Project', () => {

    it('should create a new project and verify it in the UI', () => {

      cy.createProjectAPI({ name: projectName }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.name).to.equal(projectName)
        projectId = response.body.id
      })

      cy.visit('https://todoist.com/app/projects')
      cy.contains(projectName).should('be.visible')
    })
  })

  describe('Boundary Test: Create and Verify Project', () => {

    it('should create a project with the maximum allowed name length and verify in the UI', () => {

      cy.createProjectAPI({ name: longestName }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.name).to.equal(longestName)
        projectId = response.body.id
      })

      cy.visit('https://todoist.com/app/projects')
      cy.contains(longestName).should('be.visible')
    })
  })

  describe('Negative Test: Create a Project Without Authentication', () => {

    it('should not create a project without authentication', () => {

      cy.request({
        method: 'POST',
        url: 'https://api.todoist.com/rest/v2/projects',
        body: { name: 'Unauthorized Project' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(401)
      });
  
      cy.visit('https://todoist.com/app/projects')
      cy.contains('Unauthorized Project').should('not.exist')
    })
  })
  
})