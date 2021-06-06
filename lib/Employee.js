const cTable = require('console.table');
const Department = require("./Department.js");
const Role = require("./Role.js");
class Employee {
 
    constructor(db, id = 0, firstName = "", lastName = "", roleId = 0, managerId = 0) {
        this.db = db;
        this.id = id;
        this.first_name = firstName;
        this.last_name = lastName;
        this.role_id = roleId;
        this.manager_id = managerId;
    }

    /***** Helper Functions ******/
    // This function will set this objects data
    setProperties(data) {
        Object.getOwnPropertyNames(this).forEach((property) => {
            if (property !== "db") {
                this[property] = data[property];
            }
        });
    }
    viewHero() {
        this.db.query(
            `SELECT emp.id, emp.first_name, emp.last_name,  ro.title, dep.name, ro.salary, man.first_name AS manager_first_name, man.last_name AS manager_last_name 
            FROM employee emp 
            LEFT JOIN role ro ON emp.role_id = ro.id  
            LEFT JOIN department dep ON ro.department_id = dep.id  
            LEFT JOIN employee man ON emp.manager_id = man.id `,
            function (err, res){
                if (err) console.log(err);
                console.log('=========================================================================');
                console.table(res);
            }
        );
    }
   

    becomeHero(firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        this.db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [ firstName, lastName, roleId, managerId ],
           function (err, res){
                if (err) console.log(err);
            }
        );
    }

    updateHero(id = this.id, firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        this.db.query(`UPDATE employee SET ? WHERE ?`, [{ first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId }, { id: id }],
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }

    removeHero() {
        this.db.query(`DELETE FROM employee WHERE ?`, { id: this.id },
            function (err, res) {
                if (err) throw err;
            }
        );
    }
}

module.exports = Employee;