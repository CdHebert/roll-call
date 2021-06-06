const cTable = require('console.table');
class Role {
    
    constructor(db, id = 0, title = "", salary = 0.00, departmentId = 0) {
        this.db = db;
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = departmentId;
    }

    /***** Helper Functions ******/
    // This function will set this objects data
    setProperties(data) {
        Object.getOwnPropertyNames(this).forEach((property) => {
            if(property !== "db"){
                this[property] = data[property];
            }
        });
    }
   
    printClass(){
        this.db.query(
            `SELECT ro.id, ro.title, dep.name, ro.salary 
            FROM role ro
            LEFT JOIN department dep ON ro.department_id = dep.id `,
            function (err, res) {
                if (err) console.log(err);

                console.log('=========================================================================');
                console.table(res);
            }
        );
    }
    
  
    
    makeClass(title = this.title, salary = this.salary, departmentId = this.department_id){
        this.db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [ title, salary, departmentId],
            function (err, res){
                if (err) console.log(err);
            }
        );
    }

   
    updateClass(){
        this.db.query(`UPDATE role SET ? WHERE ?`, { title: this.title, salary: this.salary, departmentId: this.departmentId}, { id: this.id},
            function(err, res){
                if (err) console.log(err);
            }
        );
    }

    
    removeClass(){
        this.db.query(`DELETE FROM role WHERE ?`, {id: this.id},
            function(err,res){
                if (err) console.log(err);
            }
        );
    }
}

module.exports = Role;