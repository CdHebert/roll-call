class Role {
    
    constructor( id = 0, title = "", salary = 0.00, departmentId = 0) {
        
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = departmentId;
    }

   
    printClass(){
        this.query(
            `SELECT role.id, role.title, department.name, role.salary 
            FROM role 
            LEFT JOIN department d ON r.department_id = d.id `,
            function (err, res) {
                if (err) console.log(err);
                console.table(res);
            }
        );
    }
    
  
    
    insertClass(title = this.title, salary = this.salary, departmentId = this.department_id){
        this.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [ title, salary, departmentId],
            function (err, res){
                if (err) console.log(err);
            }
        );
    }

   
    updateClass(){
        this.query(`UPDATE role SET ? WHERE ?`, { title: this.title, salary: this.salary, departmentId: this.departmentId}, { id: this.id},
            function(err, res){
                if (err) console.log(err);
            }
        );
    }

    
    deleteClass(){
        this.query(`DELETE FROM role WHERE ?`, {id: this.id},
            function(err,res){
                if (err) console.log(err);
            }
        );
    }
}

module.exports = Role;