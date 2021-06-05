
INSERT INTO department (name)
VALUES
("God-Level"),
("Dragon-Level"),
("Demon-Level"),
("Tiger-Level"),
("wolf-Level");

INSERT INTO role (title, salary, department_id)
VALUES
("S-Class", 120000, 2),
("A-Class", 100000, 3),
("B-Class", 60000, 4),
("C-Class", 10000, 5);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
("Caped", "Baldy", 3, NULL),
("Demon", "Cyborg", 2, 1),
("Silver", "Fang", 1, NULL),
("Mumen", "Rider", 3, 3),
("TankTop", "Tiger", 3, 3);
