# Validator

![booost.bg banner](https://api.booost.bg/uploads/banner_6d1b1c1c4c.png)

This is the project which contains all the tests which validate the tasks for the tasks at www.booost.bg. Feel free to run it locally against your tasks and all contributions are welcome.

[<img src="https://img.shields.io/badge/cypress-6.0-green">](https://www.cypress.io/)
[<img src="https://img.shields.io/badge/ooo-zdr-yellow">](https://booost.bg/)

# Setup

```bash
# Install
npm i

# Run tests
RUN=true HEADED=true TASK_ID={{TASK_ID}} REPO_URL={{CYPRESS_REPO_URL}} node index.js

# Develop tests
RUN=true OPEN=true HEADED=true TASK_ID={{TASK_ID}} REPO_URL={{CYPRESS_REPO_URL}} node index.js
```

### Variables

---

**{{RUN}}**

Whether to execute the test script or not. This is used for debugging the CI

---

**{{OPEN}}**

Whether to open the cypress window for test development and debugging

---

**{{HEADED}}**

Whether to execute the test script in headed mode (the cypress window being visible)

---

**{{TASK_ID}}**

This correlates with the name of the spec eg TASK_ID=1 will run spec cypress/integration/task-1.js 

---

**{{REPO_URL}}**

The repository which will be cloned in /temp which tests will run against

### Example

```bash
RUN=true OPEN=true TASK_ID=1 REPO_URL=https://gitlab.com/booost/boilerplates/app.git node index.js
```

# Configuration
Options located in `cypress.json`

| Property      | Description |
| ----------- | ----------- |
| url      | The url of the dev server which the project is running. We don't use baseUrl as some tasks (like the git eg. task-10) do not have dev servers. |