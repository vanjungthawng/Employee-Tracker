-- Add Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Bryan', 'MC', 1, null),
('Alice', 'Spring', 3, 1),
('Tom', 'Cruise', 5, 2),
('John', 'Doe', 4, null),
('Sam', 'Din', 6, null),
('Emily', 'Ann', 78, 64),
('Shawn', 'Mendas', 8, null),
('Andrew', 'Biggin', 24, 29),
('Scott', 'Tran', 65, null),
('Liam', 'Graham', 72, null),
('James', 'Lau', 15, null);

-- Add departments
INSERT INTO department (department_name)
VALUES
('Reception'),
('Human Resources'),
('Finance'),
('Software Engineer'),
('Sales'),
('Marketing');

-- Add roles
INSERT INTO role (title, salary, department_id)
VALUES 
('Salesman', 80000, 2),
('Finance', 90000, 4),
('Senior Engineer', 120000, 7),
('Receptionist', 70000, 13),
('Digital Marketing Manager', 110000, 15),
('Human Resource Officer', 130000, 12);