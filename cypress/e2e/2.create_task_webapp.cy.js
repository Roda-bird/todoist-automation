describe('Scenario 2: Validate “Create Task via web application”', () => {

  const projectName = 'Test Project'
  const maxTaskNameLength = 500
  const longestTaskName = 'X'.repeat(maxTaskNameLength)
  const taskName = 'Test Task'
  let projectId
  let taskId

  beforeEach(() => {
    cy.login()
    
    cy.createProjectAPI({ name: projectName }).then((response) => {
      expect(response.status).to.equal(200)
      projectId = response.body.id
    })
  })

  afterEach(function () {
    if (taskId) {
      cy.deleteTaskAPI(taskId)
    }
    if (projectId) {
      cy.deleteProjectAPI(projectId)
    }
  })

  describe('Positive Test: Create and Verify Task', () => {

    it('should create a new task in the test project via web application and verify it using API', () => {

      cy.get('#content').contains(projectName).click()
      cy.get('.plus_add_button').click()
      cy.get('.task_editor__content_field .is-empty').type(taskName)
      cy.get('[data-testid="task-editor-submit-button"]').click()
      cy.get('[data-testid="project-list-view"]').contains(taskName).should('be.visible')

      cy.request({
        method: 'GET',
        url: `https://api.todoist.com/rest/v2/tasks`,
        headers: {
          'Authorization': 'Bearer ' + Cypress.env("apiKey"),
        },
        qs: {
          project_id: projectId
        }
      }).then((response) => {
        expect(response.status).to.equal(200)
        const createdTask = response.body.find(task => task.content === taskName)
        expect(createdTask).to.exist
        taskId = createdTask.id
      })
    })
  })
})