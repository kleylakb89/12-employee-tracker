INSERT INTO department (name)
VALUES  ('Potions'),
        ('Transfiguration'),
        ('Defense Against The Dark Arts'),
        ('Divination');

INSERT INTO role (title, salary, department_id)
VALUES  ('Potions Student', 10.00, 1),
        ('Transfiguration Student', 10.00, 2),
        ('DADA Student', 10.00, 3),
        ('Divination Student', 10.00, 4);

INSERT INTO manager (first_name, last_name, department_id, salary)
VALUES  ('Severus', 'Snape', 1, 100.00),
        ('Minerva', 'McGonagall', 2, 100.00),
        ('Remus', 'Lupin', 3, 100.00),
        ('Sybill', 'Trelawney', 4, 100.00);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Harry', 'Potter', 3, 3),
        ('Hermione', 'Granger', 2, 2),
        ('Ron', 'Weasley', 4, 4),
        ('Draco', 'Malfoy', 1, 1);
