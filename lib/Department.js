class Department {
  

    // constructor
    constructor(connection, id = 0, name = "") {
        this.connection = connection;
        this.id = id;
        this.name = name;
    }
    
    /***** Helper Functions ******/
    // This function will set this objects data
    setProperties(data){
        Object.getOwnPropertyNames(this).forEach((property) => {
            if(property !== "connection"){
                this[property] = data[property];
            }
        });
    }

 
    printDepartments(){
        this.connection.query(
            "SELECT d.id, d.name " +
            "FROM department d ",
            function (err, res) {
                if (err) console.log(err);
                // Print departments
                console.log("\n");
                console.table(res);
            }
        );
    }
   
    insertDepartment(departmentName = this.name){
        this.connection.query("INSERT INTO department (name) VALUES (?)", [departmentName] ,
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }

   
    updateDepartment() {
        this.connection.query("UPDATE department SET ? WHERE ?", { name: this.name }, { id: this.id },
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }

    deleteDepartment() {
        this.connection.query("DELETE FROM department WHERE ?", { id: this.id },
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }
}

module.exports = Department;