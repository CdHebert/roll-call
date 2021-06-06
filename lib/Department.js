const cTable = require('console.table');
class Department {


    // constructor
    constructor(db, id = 0, name = "") {
        this.db = db;
        this.id = id;
        this.name = name;
    }
    
    /***** Helper Functions ******/
    // This function will set this objects data
    setProperties(data){
        Object.getOwnPropertyNames(this).forEach((property) => {
            if(property !== "db"){
                this[property] = data[property];
            }
        });
    }

    viewThreatLevels() {
        this.db.query(
            `SELECT dep.id, dep.name
            FROM department dep`,
            function (err, res) {
                if (err) console.log(err);
                console.log('=========================================================================');
                console.table(res);
            }
        );
    }

    makeThreatLevels(departmentName = this.name) {
        this.db.query(`INSERT INTO department (name) VALUES (?)`, [departmentName],
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }


    updateThreatLevels() {
        this.db.query(`UPDATE department SET ? WHERE ?`, { name: this.name }, { id: this.id },
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }

    removeThreatLevels() {
        this.db.query(`DELETE FROM department WHERE ?`, { id: this.id },
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }
}

module.exports = Department;