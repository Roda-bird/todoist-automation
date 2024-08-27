# **Junior Automation QA Challenge - Todoist Automation Testing**

Welcome to the repository for my Junior Automation QA Challenge. This project contains automated test scenarios for the Todoist web application, built using the Cypress framework. The test scenarios cover various functionalities of the Todoist application, including creating projects and tasks via both API and web UI.

## **📋 Project Overview**

The purpose of this project is to validate the following functionalities of the Todoist application:

1. **Create Project via API and Verify on Web**  
2. **Create Task via Web and Verify via API**  
3. **Create Task via API and Verify on Web**  

These tests are designed to be scalable, maintainable, and easy to extend with new scenarios. They include positive, negative, and boundary condition tests.
Three cases were created for each scenario, as instructed, positive, negative and boundary.

## **🔧 Setup & Installation**

### **Prerequisites**

Before you can run the tests, make sure you have the following installed:

  - [Node.js](https://nodejs.org/) - can be installed on their website
  - [npm](https://www.npmjs.com/)
  - [Cypress](https://www.cypress.io/)

1. **Clone the repository:**

To clone the repository, type this into your terminal:

   ```
   git clone https://github.com/yourusername/lodgify-qa-challenge.git
   cd lodgify-qa-challenge
   ```
Or, download the code manually.

3. **Install dependencies:**

    To install node type this into terminal:
  
    ```
    npm install
    ```
    To install Cypres type this into terminal::
   
    ```
    npm install cypress
    ```
   
## **📝Configuration**

1. I added my API key to **/cypress.config.js** to env:

  ```
  env: {
    apiKey: 'MY_API_KEY'
  },
  ```
2. Other important settings contain my **defaultCommandTimeout** which i set to **10000** and **viewportWidth/Height** which i set to **1920x1080**:
  
  ```
  e2e: {
    baseUrl: 'https://app.todoist.com/app/projects/active',
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
  }
  ```
3. I Added the necessary cookies for authentication in the login command located along with other important comands  in: **cypress/support/commands.js**
   
## **🚀 Running the Tests**

### **Run All Tests:**

To run all the test scenarios in headless mode using the Chrome browser, type:

  ```
  npx cypress run --browser chrome
  ```
### **Run a Specific Test:**

You can also run a specific test by specifying the test file, for example:

  ```
  npx cypress run --browser chrome --spec "cypress\e2e\1.create_project_api.cy.js"
  ```
### **Run Tests in Cypress UI:**

To open the Cypress test runner and run tests interactively type:

  ```
  npx cypress open
  ```
You can then choose the browser and the test you wod want to run in the Cypress test runner UI.

## **📜 Test Scenarios**

### **Scenario 1: Validate “Create Project” functionality**

- Positive Test: Create a new project via API and verify its creation on the web.
- Boundary Test: Create a project with the maximum allowed name length and verify its creation.
- Negative Test: Attempt to create a project without authentication and verify it is not created.

### **Scenario 2: Validate “Create Task via Web Application”**

- Positive Test: Create a new task in a test project via the web application and verify its creation using the API.
- Negative Test: Attempt to Create Task with Only Whitespace.
- Boundary Test: Create Task with Maximum Name Length.

### **Scenario 3: Validate “Create Task via API”**

- Positive Test: Create a task via API and verify its visibility on the web application.
- Boundary Test: Create a task with the maximum allowed name length via API and verify its visibility.
- Negative Test: Attempt to create a task without authentication and verify it is not created.

## **🛠️ Custom Commands**

Several custom Cypress commands have been added to simplify API interactions:

- cy.login() - Handles user login by setting necessary cookies.
- cy.createProjectAPI(projectData) - Creates a new project via API.
- cy.deleteProjectAPI(projectId) - Deletes a project via API.
- cy.createTaskAPI(taskData) - Creates a new task via API.
- cy.deleteTaskAPI(taskId) - Deletes a task via API.
- cy.getTasksAPI(projectId) - Retrieves tasks for a specific project via API.

## **📈 Reporting**

The test suite can use the **Mochawesome** Reporter to generate detailed reports:

- **HTML Report:** The report is saved in the cypress/reports directory.
- **Screenshots:** Screenshots of test failures are captured and embedded in the report.

To generate the report, simply run the tests. The reports will be generated automatically.

To install Mochawesome Reporter, type:

  ```
  npm install --save-dev mochawesome
  ```
After that, add your settings to **/cypress.config.js**:
  ```
  e2e: {

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },

    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'Test Report',
      embeddedScreenshots: true,
      inlineAssets: true
    },
  },
  ```
## **📄 Notes**

I decided to use **'todoistd'** cookie option for my login command in **cypress\support\commands.js** as that is the only way I found to go around Todoists security measures and sucesfully log in via Cypress.

There was also an app error not connected to my tests, so I added **this** to **cypress\support\e2e.js** to be able to finish them:

  ```
  Cypress.on('uncaught:exception', (err, runnable) => {
  return false
  })
  ```

I also separated 1 scenario branch & created 1 pull request to merge it to main as instructed.

**Todoist only allows 5 projects per free user, so I set tasks and projects to auto-delete after test execution so that tests could be redoable**

For each user, you can make a maximum of 1000 API requests on Todoist within a 15 minute period: https://developer.todoist.com/rest/v2/#request-limits
