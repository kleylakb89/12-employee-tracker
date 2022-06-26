INSERT INTO department (name)
VALUES  ('Potions'),
        ('Transfiguration'),
        ('Defense Against The Dark Arts'),
        ('Divination');

INSERT INTO role (title, salary, department_id)
VALUES  ('Manager', 100.00, 1),
        ('Manager', 100.00, 2),
        ('Manager', 100.00, 3),
        ('Manager', 100.00, 4),
        ('Student', 10.00, 1),
        ('Student', 10.00, 2),
        ('Student', 10.00, 3),
        ('Student', 10.00, 4);

INSERT INTO manager (first_name, last_name, role_id)
VALUES  ('Severus', 'Snape', 1),
        ('Minerva', 'McGonagall', 2),
        ('Remus', 'Lupin', 3),
        ('Sybill', 'Trelawney', 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Harry', 'Potter', 7, 3),
        ('Hermione', 'Granger', 6, 2),
        ('Ron', 'Weasley', 8, 4),
        ('Draco', 'Malfoy', 5, 1);
