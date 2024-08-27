const projectName = 'Test Project'
const taskName = 'Test Task'
const maxTaskNameLength = 500
const longestTaskName = 'x'.repeat(maxTaskNameLength)

const createProject = () => {
  return cy.createProjectAPI({ name: projectName }).then((response) => {
    expect(response.status).to.equal(200)
    return response.body.id
  })
}

const createTask = (projectId, taskContent) => {
  return cy.createTaskAPI({
    content: taskContent,
    project_id: projectId
  }).then((response) => {
    expect(response.status).to.equal(200)
    return response.body.id;
  })
}

describe('Scenario 3: Validate  “Create Task via API”', () => {

  let projectId
  let taskId

  beforeEach(() => {
    cy.login()
  })

  afterEach(() => {
    if (taskId) {
      cy.deleteTaskAPI(taskId)
    }
    if (projectId) {
      cy.deleteProjectAPI(projectId)
    }
  })

  describe('Positive Test - Validate “Create Task via API”', () => {

    before(() => {
      return createProject().then((id) => {
        projectId = id
        return createTask(projectId, taskName).then((id) => {
          taskId = id
        })
      })
    })

    it('should verify that the task created via API is visible on the web application', () => {
      cy.visit(`https://todoist.com/app/task/test-task-${taskId}`)
      cy.contains(taskName).should('be.visible');
    })
  })

  describe('Boundary Test - Validate “Create Task with Maximum Name Length via API”', () => {

    before(() => {
      return createProject().then((id) => {
        projectId = id
        return createTask(projectId, longestTaskName).then((id) => {
          taskId = id
        })
      })
    })

    it('should create a task with the maximum allowed name length via API and verify it is visible on the web application', () => {

      cy.visit(`https://todoist.com/app/task/${longestTaskName}-${taskId}`)
      cy.contains(longestTaskName).should('be.visible')
    });
  });

  describe('Negative Test - Validate “Create Task Without Authentication”', () => {

    before(() => {
      return createProject().then((id) => {
        projectId = id
      })
    })

    it('should not create a task without proper authentication', () => {
      cy.request({
        method: 'POST',
        url: 'https://api.todoist.com/rest/v2/tasks',
        body: {
          content: taskName,
          project_id: projectId
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(401)
      })
      cy.wait(1000)

      cy.visit(`https://todoist.com/app/projects/${projectId}`)
      cy.contains(taskName).should('not.exist')
    })
  })
})