class Department {


    // constructor
    constructor(id = 0, name = "") {

        this.id = id;
        this.name = name;
    }

    printThreatLevels() {
        this.query(
            `SELECT id, name
            FROM department`,
            function (err, res) {
                if (err) console.log(err);
                console.log("\n");
                console.table(res);
            }
        );
    }

    insertThreatLevels(departmentName = this.name) {
        this.query(`INSERT INTO department (name) VALUES (?)`, [departmentName],
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }


    updateThreatLevels() {
        this.query(`UPDATE department SET ? WHERE ?`, { name: this.name }, { id: this.id },
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }

    deleteThreatLevels() {
        this.query(`DELETE FROM department WHERE ?`, { id: this.id },
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }
}

module.exports = Department;