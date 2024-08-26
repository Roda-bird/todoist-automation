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

  describe('Negative Test: Create and Verify Project', () => {

    it('should not allow creating a project with an empty name', () => {

      cy.createProjectAPI({ name: '' }).then((response) => {
        expect(response.status).to.equal(400)
      })
  
      cy.visit('https://todoist.com/app/projects')
      cy.contains('').should('not.exist')

    })
  })
})