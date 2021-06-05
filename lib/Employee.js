const Department = require("./Department.js");
const Role = require("./Role.js");




class Employee {
 
    constructor(id = 0, firstName = "", lastName = "", roleId = 0, managerId = 0) {
        this.id = id;
        this.first_name = firstName;
        this.last_name = lastName;
        this.role_id = roleId;
        this.manager_id = managerId;
    }

  
    printHero() {
        this.query(
            `SELECT employee.id, employee.first_name, employee.last_name,  role.title, department.name, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
            FROM employee 
            LEFT JOIN role ON employee.role_id = r.id  
            LEFT JOIN department ON role.department_id = id  
            LEFT JOIN employee ON employee.manager_id = manager.id` ,
             (err, res) => {
                if (err) console.log(err);
                console.table(res);
            }
        );
    }
   

    insertHero(firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        this.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [ firstName, lastName, roleId, managerId ],
            (err, res) => {
                if (err) console.log(err);
            }
        );
    }

    updateHero(id = this.id, firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        this.query(`UPDATE employee SET ? WHERE ?`, [{ first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId }, { id: id }],
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }

    deleteHero() {
        this.query(`DELETE FROM employee WHERE ?`, { id: this.id },
            function (err, res) {
                if (err) throw err;
            }
        );
    }
}

module.exports = Employee;