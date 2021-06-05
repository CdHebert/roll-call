
const Inquirer = require("inquirer");
const MySQL = require("mysql2");



function start() {
    let question = "What would you like to do?";
    let options = [
        "View All Heros",
        "Add Hero",
        "Remove Hero",
        "Update Hero Role",
        "Update Hero Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View All Departments",
        "Add Department",
        "Remove Department",
        "Exit"
    ];
    Inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: question,
            choices: options
        }
    ).then((data) => {
        switch (data.action) {
            case "View All Heroes":
                employee.printHero();
                start();
                break;
            case "View All Roles":
                role.printClass();
                start();
                break;
            case "View All Departments":
                department.printThreatLevel();
                start();
                break;
            case "Add Hero":
                addHero();
                break;
            case "Add Role":
                addClass();
                break;
            case "Add Department":
                addThreatLevel();
                break;
            case "Update Hero Role":
                heroPromotion();
                break;
            case "Update Hero Manager":
                updateUnderling();
                break;
            case "Remove Hero":
                removeHero();
                break;
            case "Remove Role":
                removeClass();
                break;
            case "Remove Department":
                removeThreatLevel();
                break;
            case "Exit":
                console.log(`Thank you for using our Hero Database. Enjoy your day.`);
                break;
        }
    });
}

function addThreatLevel() {
    let question = `Is there a new Threat Level? What is it?`;
    Inquirer.prompt(
        {
            name: "department",
            type: "input",
            message: question
        }
    ).then((data) => {
        department.insertThreatLevel(data.department);
        start();
    });
}

function addClass() {
    let departments = ["No Department"];
      
    query(`SELECT * FROM department`,
        function (err, res) {
            if (err) console.log(err);
            for (let i = 0; i < res.length; i++) {
                if (res[i].name) {
                    departments.push(res[i].name);
                }
            }

           
            let questions = [
                "What is the role you would like to add?",
                "What is the role salary?",
                "What is the role department?"];
            Inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: questions[0]
                },
                {
                    name: "salary",
                    type: "number",
                    message: questions[1]
                },
                {
                    name: "department",
                    type: "list",
                    message: questions[2],
                    choices: departments
                }
            ]).then((data) => {
                // get the department to tie to 
                let departmentId = null;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].name === data.department) {
                        departmentId = res[i].id;
                        break;
                    }
                }
                role.insertClass(data.title, data.salary, departmentId);
                start();
            });

        }
    );
}

function addHero() {
    let roles = ["No Role"];
    let managers = ["No Manager"];
      
    query(`SELECT * FROM role `,
        function (err, roleCall) {
            if (err) console.log(err);
            for (let i = 0; i < roleCall.length; i++) {
                if (roleCall[i].title) {
                    roles.push(roleCall[i].title);
                }
            }

            query(`SELECT * from employee `,
                function (err, heroCall) {
                    if (err) console.log(err);
                    for (let i = 0; i < heroCall.length; i++) {
                        if (heroCall[i].first_name) {
                            managers.push(heroCall[i].first_name + " " + heroCall[i].last_name);
                        }
                    }

                    // Get the employee details
                    let questions = [
                        "What is the employee first name?",
                        "What is the employee last name?",
                        "What is the employee role?",
                        "Who is the employee manager?"];
                    Inquirer.prompt([
                        {
                            name: "firstName",
                            type: "input",
                            message: questions[0]
                        },
                        {
                            name: "lastName",
                            type: "input",
                            message: questions[1]
                        },
                        {
                            name: "role",
                            type: "list",
                            message: questions[2],
                            choices: roles
                        },
                        {
                            name: "manager",
                            type: "list",
                            message: questions[3],
                            choices: managers
                        }
                    ]).then((data) => {
                        // get the role to tie to 
                        let roleId = null;
                        for (let i = 0; i < roleRes.length; i++) {
                            if (roleRes[i].title === data.role) {
                                roleId = roleRes[i].id;
                                break;
                            }
                        }
                        // Get the manager to tie to
                        let managerId = null;
                        for (let i = 0; i < empRes.length; i++) {
                            if (empRes[i].first_name + " " + empRes[i].last_name === data.manager) {
                                managerId = empRes[i].id;
                                break;
                            }
                        }
                        employee.insertHero(data.firstName, data.lastName, roleId, managerId);
                        start();
                    });

                }
            );
        }
    );
}


function heroPromotion() {
    let roles = ["No Role"];
    let employees = [];
      
    query(`SELECT * FROM role `,
        function (err, roleCall) {
            if (err) console.log(err);
            for (let i = 0; i < roleCall.length; i++) {
                if (roleCall[i].title) {
                    roles.push(roleCall[i].title);
                }
            }

            
            query(`SELECT * from employee `,
                function (err, heroCall) {
                    if (err) console.log(err);
                    for (let i = 0; i < heroCall.length; i++) {
                        if (heroCall[i].first_name) {
                            employees.push(heroCall[i].first_name + " " + heroCall[i].last_name);
                        }
                    }

                    // Get the employee details
                    let questions = [
                        "Who's role would you like to update?",
                        "What is their new role??"];
                    Inquirer.prompt([
                        {
                            name: "employee",
                            type: "list",
                            message: questions[0],
                            choices: employees
                        },
                        {
                            name: "role",
                            type: "list",
                            message: questions[1],
                            choices: roles
                        }
                    ]).then((data) => {
                        // get the role to tie to 
                        let roleId = null;
                        for (let i = 0; i < roleRes.length; i++) {
                            if (roleRes[i].title === data.role) {
                                roleId = roleRes[i].id;
                                break;
                            }
                        }
                        // Get the employee to update to
                        for (let i = 0; i < empRes.length; i++) {
                            if (empRes[i].first_name + " " + empRes[i].last_name === data.employee) {
                                employee.setProperties(empRes[i]);
                                employee.role_id = roleId;
                                employee.updateHero();
                                break;

                            }
                        }
                        start();
                    });

                }
            );
        }
    );
}


function updateUnderling() {
    let managers = ["No Manager"];
    let employees = [];
     
    query("SELECT * FROM employee ",
        function (err, res) {
            if (err) console.log(err);
            for (let i = 0; i < res.length; i++) {
                if (res[i].first_name) {
                    employees.push(res[i].first_name + " " + res[i].last_name);
                    managers.push(res[i].first_name + " " + res[i].last_name);
                }
            }

            
            let questions = [
                "Who's manager would you like to update?",
                "Who is their new manager?"];
            Inquirer.prompt([
                {
                    name: "employee",
                    type: "list",
                    message: questions[0],
                    choices: employees
                },
                {
                    name: "manager",
                    type: "list",
                    message: questions[1],
                    choices: managers
                }
            ]).then((data) => {
                /
                let managerId = null;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].first_name + " " + res[i].last_name === data.manager) {
                        managerId = res[i].id;
                        break;
                    }
                }
                
                for (let i = 0; i < res.length; i++) {
                    if (res[i].first_name + " " + res[i].last_name === data.employee) {
                        employee.setProperties(res[i]);
                        employee.manager_id = managerId;
                        employee.updateHero();
                        break;
                    }
                }
                start();
            });
        }
    );
}


function removeHero() {
    let employees = ["No Employee"];
       
    query(`SELECT * FROM employee`,
        function (err, res) {
            if (err) console.log(err);
            for (let i = 0; i < res.length; i++) {
                if (res[i].first_name && res[i].last_name) {
                    employees.push(res[i].first_name + " " + res[i].last_name);
                }
            }

            // Get the employee details
            let question = "Select the employee to remove?";
            Inquirer.prompt([
                {
                    name: "employee",
                    type: "list",
                    message: question,
                    choices: employees
                }
            ]).then((data) => {
                // get the role to remove 
                for (let i = 0; i < res.length; i++) {
                    if (res[i].first_name + " " + res[i].last_name === data.employee) {
                        employee.setProperties(res[i]);
                        employee.deleteHero();
                        break;
                    }
                }
                start();
            });

        }
    );
}


function removeClass() {
    let roles = ["No Role"];
     
    query(`SELECT * FROM role`,
        function (err, res) {
            if (err) console.log(err);
            for (let i = 0; i < res.length; i++) {
                if (res[i].title) {
                    roles.push(res[i].title);
                }
            }

           
            let question = "Select the role to remove?";
            Inquirer.prompt([
                {
                    name: "role",
                    type: "list",
                    message: question,
                    choices: roles
                }
            ]).then((data) => {
                
                for (let i = 0; i < res.length; i++) {
                    if (res[i].title === data.role) {
                        role.setProperties(res[i]);
                        role.deleteRole();
                        break;
                    }
                }
                start();
            });

        }
    );
}


function removeThreatLevel() {
    let departments = ["No Department"];
      
    query(`SELECT * FROM department`,
        function (err, res) {
            if (err) console.log(err);
            for (let i = 0; i < res.length; i++) {
                if (res[i].name) {
                    departments.push(res[i].name);
                }
            }

            
            let question = "Select the department to remove?";
            Inquirer.prompt([
                {
                    name: "department",
                    type: "list",
                    message: question,
                    choices: departments
                }
            ]).then((data) => {
               
                for (let i = 0; i < res.length; i++) {
                    if (res[i].name === data.department) {
                        department.setProperties(res[i]);
                        department.deleteDepartment();
                        break;
                    }
                }
                start();
            });

        }
    );
}

start();
