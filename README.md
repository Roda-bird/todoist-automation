# **Lodgify Junior Automation QA Challenge - Todoist Automation Testing**

Welcome to the repository for the Lodgify Junior Automation QA Challenge. This project contains automated test scenarios for the Todoist web application, built using the Cypress framework. The test scenarios cover various functionalities of the Todoist application, including creating projects and tasks via both API and web UI.

## **📋 Project Overview**

The purpose of this project is to validate the following functionalities of the Todoist application:

1. **Create Project via API and Verify on Web**  
2. **Create Task via Web and Verify via API**  
3. **Create Task via API and Verify on Web**  

These tests are designed to be scalable, maintainable, and easy to extend with new scenarios. They include positive, negative, and boundary condition tests.

## **🔧 Setup & Installation**

### **Prerequisites**

Before you can run the tests, make sure you have the following installed:

  - [Node.js](https://nodejs.org/)
  - [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
  - Cypress

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/lodgify-qa-challenge.git
   cd lodgify-qa-challenge
   ```
2. **Install dependencies:**

    To install node type:
  
    ```bash
    npm install
     ```
    To install Cypres type:
    ```bash
    npm install cypress
     ```
   
## **📝Configuration**
1. I set my API key in **/cypress.config.js** to env:

  ```
  env: {
    apiKey: 'MY_API_KEY'
  },
  ```
2. Other important settings contain my **defaultCommandTimeout** which i set to 10000 and **viewportWidth/Height** which i set to 1920x1080:
  
  ```
  e2e: {
    baseUrl: 'https://app.todoist.com/app/projects/active',
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
  }
  ```
3. Added the necessary cookies for authentication in the login command located along with other important comands  in: **cypress/support/commands.js**
   
## **🚀 Running the Tests**

### **Run All Tests:**

To run all the test scenarios in headless mode using the Chrome browser, type:

  ```
  npx cypress run --browser chrome
  ```
### **Run a Specific Test:**

You can also run a specific test by specifying the test file, for example:

  ```
  npx cypress run --spec "cypress\e2e\1.create_project_api.cy.js"
  ```
### **Run Tests in Cypress UI:**

To open the Cypress test runner and run tests interactively:

  ```
  npx cypress open
  ```
## **📜 Test Scenarios**

### **Scenario 1: Validate “Create Project” functionality**

- Positive Test: Create a new project via API and verify its creation on the web.
- Boundary Test: Create a project with the maximum allowed name length and verify its creation.
- Negative Test: Attempt to create a project without authentication and verify it is not created.

### **Scenario 2: Validate “Create Task via Web Application”**

- Positive Test: Create a new task in a test project via the web application and verify its creation using the API.

### **Scenario 3: Validate “Create Task via API”**

- Positive Test: Create a task via API and verify its visibility on the web application.
- Boundary Test: Create a task with the maximum allowed name length via API and verify its visibility.
- Negative Test: Attempt to create a task without authentication and verify it is not created.
