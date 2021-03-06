// requiring dependencies
const { prompt } = require('inquirer');
const mysql = require('mysql2');
const { opening, addDept, getRoles, getEmployees, updateEmp, getManagers, updateManager, viewByMan, viewByDept, viewDeptBudget, delDept, updateRole, delRole, delEmp, delMan } = require('./query.js');
require('console.table');

// asks the first set of questions and returns answers.choice
const askQuestions = async (quest) => {
    const answers = await prompt(quest);
    return(answers.choice);
};

// asks sets of questions and returns answers
const askRoleQuestions = async (quest) => {
    const answers = await prompt(quest);
    return answers;
};

// connecting to the database through mysql2
const db = mysql.createConnection(
    {
        user: 'root',
        database: 'business_db'
    }
);

// basic query that takes a string as a parameter and displays the results as a table
const dbQuery = (string) => {
    db.query(string, (err, results) => {
        if (err) return(console.log(err));
        console.table(results)
        return callMysql(opening);
    })
};

// query adds a feature based on table and name
const dbQueryAdd = (table, name) => {
    db.query('INSERT INTO ?? SET name = ?', [table, name], (err, results) => {
        if (err) return(console.log(err));
        console.log('Added to database')
        return callMysql(opening);
    })
};

// query adds a role with the passed data
const dbQueryAddRole = (table, title, salary, deptId) => {
    db.query('INSERT INTO ?? SET title = ?, salary = ?, department_id = ?', [table, title, salary, deptId], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

// query adds an employee with the passed data
const dbQueryAddEmployee = (table, first, last, roleId, managerId) => {
    db.query('INSERT INTO ?? SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?', [table, first, last, roleId, managerId], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

// query updates an employee
const dbQueryUpdateEmployee = (table, roleId, managerId, first) => {
    db.query('UPDATE ?? SET role_id = ?, manager_id = ? WHERE first_name = ?', [table, roleId, managerId, first], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

// query adds a manager
const dbQueryAddManager = (table, first, last, deptId, salary) => {
    db.query('INSERT INTO ?? SET first_name = ?, last_name = ?, department_id = ?, salary = ?', [table, first, last, deptId, salary], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

// query updates a manager
const dbQueryUpdateManager = (table, deptId, salary, first) => {
    db.query('UPDATE ?? SET department_id = ?, salary = ? WHERE first_name = ?', [table, deptId, salary, first], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

// query runs a string and value to dynamically access the database
const dbQueryViewByMan = (string, value) => {
    db.query(string, value, (err, results) => {
        if (err) return(console.log(err));
        console.table(results);
        return callMysql(opening);
    })
};

// query runs a string and a value to dynamically delete from the database
const dbQueryDelete = (string, value) => {
    db.query(string, value, (err, results) => {
        if (err) return(console.log(err));
        console.log('Deleted!');
        return callMysql(opening);
    })
};

// query updates a role
const dbQueryUpdateRole = (table, salary, deptId, title) => {
    db.query('UPDATE ?? SET salary = ?, department_id = ? WHERE title = ?', [table, salary, deptId, title], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

// async function that runs through possible answers to inquirer prompts and queries database based on the prompt responses
const conditionals = async (answers) => {
    const mysql = require('mysql2/promise');
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // exit feature
    if (answers === 'exit') return(process.exit());
    // view all attributes of department table
    if (answers === 'view all departments') {
        const string = 'SELECT * FROM department'
        return(dbQuery(string));
    }
    // joins role and department tables to display specific data
    else if (answers === 'view all roles') {
        const string = 'SELECT role.id, title, name AS department, salary FROM role LEFT JOIN department ON role.department_id = department.id';
        return(dbQuery(string));
    }
    // joins manager and department tables to display specific data
    else if (answers === 'view all managers') {
        const string = 'SELECT manager.id, first_name, last_name, name AS department, salary FROM manager LEFT JOIN department ON manager.department_id = department.id';
        return(dbQuery(string));
    }
    // joins employee, role, department, and manager tables to display specific data
    else if (answers === 'view all employees') {
        const string = 'SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, role.salary, CONCAT(manager.first_name," ",manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN manager ON department.id = manager.department_id';
        return(dbQuery(string));
    }
    // adds a department based on inquirer prompts
    else if (answers === 'add a department') {
        const table = await askQuestions(addDept);
        return(dbQueryAdd('department', table));
    }
    // adds a role based on inquirer prompts
    else if (answers === 'add a role') {
        const roleQuest = await getRoles();
        const table = await askRoleQuestions(roleQuest);
        const deptId = await db.query('SELECT id FROM department WHERE name = ?', table.dept);
        return(dbQueryAddRole('role', table.title, table.salary, deptId[0][0].id));
    }
    // adds an employee based on inquirer prompts
    else if (answers === 'add an employee') {
        const empQuest = await getEmployees();
        const table = await askRoleQuestions(empQuest);
        const roleId = await db.query('SELECT id FROM role WHERE title = ?', table.role);
        let first = '';
        for (let letter of table.manager) {
            if (letter === ' ') break;
            first += letter;
        };
        const managerId = await db.query('SELECT id FROM manager WHERE first_name = ?', first);
        return(dbQueryAddEmployee('employee', table.first, table.last, roleId[0][0].id, managerId[0][0].id));
    }
    // updates an employee based on inquirer prompts
    else if (answers === 'update an employee') {
        const upRole = await updateEmp();
        const table = await askRoleQuestions(upRole);
        const roleId = await db.query('SELECT id FROM role WHERE title = ?', table.role);
        let first = '';
        for (let letter of table.manager) {
            if (letter === ' ') break;
            first += letter;
        };
        const managerId = await db.query('SELECT id FROM manager WHERE first_name = ?', first);
        let empFirst = '';
        for (let letter of table.employee) {
            if (letter === ' ') break;
            empFirst += letter;
        };
        return(dbQueryUpdateEmployee('employee', roleId[0][0].id, managerId[0][0].id, empFirst));
    }
    // adds a manager based on inquirer prompts
    else if (answers === 'add manager') {
        const manQuest = await getManagers();
        const table = await askRoleQuestions(manQuest);
        const deptId = await db.query('SELECT id FROM department WHERE name = ?', table.role);
        return(dbQueryAddManager('manager', table.first, table.last, deptId[0][0].id, table.salary));
    }
    // updates a manager based on inquirer prompts
    else if (answers === 'update manager') {
        const upMan = await updateManager();
        const table = await askRoleQuestions(upMan);
        const deptId = await db.query('SELECT id FROM department WHERE name = ?', table.dept);
        let first = '';
        for (let letter of table.manager) {
            if (letter === ' ') break;
            first += letter;
        };
        return(dbQueryUpdateManager('manager', deptId[0][0].id, table.salary, first));
    }
    // views employees based on chosen manager
    else if (answers === 'view employees by manager') {
        const viewMan = await viewByMan();
        const table = await askRoleQuestions(viewMan);
        const string = 'SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name," ",manager.last_name) AS manager FROM employee LEFT JOIN manager ON employee.manager_id = manager.id WHERE CONCAT(manager.first_name," ",manager.last_name) = ?';
        return(dbQueryViewByMan(string, table.manager));
    }
    // views employees based on chosen department
    else if (answers === 'view employees by department') {
        const viewDept = await viewByDept();
        const table = await askRoleQuestions(viewDept);
        const string = 'SELECT employee.id, employee.first_name, employee.last_name, title, CONCAT(manager.first_name," ",manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN manager ON department.id = manager.department_id WHERE department.name = ?';
        return(dbQueryViewByMan(string, table.department));
    }
    // views budget based on chosen department
    else if (answers === 'view department budget') {
        const viewBudge = await viewDeptBudget();
        const table = await askRoleQuestions(viewBudge);
        const deptId = await db.query('SELECT id FROM department WHERE name = ?', table.department);

        // using SUM aggregate function to add up salaries
        const empSum = await db.query('SELECT SUM(salary) FROM employee LEFT JOIN role ON employee.role_id = role.id WHERE department_id = ?', deptId[0][0].id);
        const manSum = await db.query('SELECT SUM(salary) FROM manager WHERE department_id = ?', deptId[0][0].id);
        const totalSum = parseFloat(empSum[0][0]['SUM(salary)']) + parseFloat(manSum[0][0]['SUM(salary)']);

        console.log('Department: '+ table.department + ' Budget: $' + totalSum);
        return callMysql(opening);
    }
    // deletes chosen department
    else if (answers === 'delete a department') {
        const del = await delDept();
        const table = await askRoleQuestions(del);
        const string = 'DELETE FROM department WHERE name = ?';
        return(dbQueryDelete(string, table.department));
    }
    // updates chosen roll
    else if (answers === 'update a roll') {
        const upRole = await updateRole();
        const table = await askRoleQuestions(upRole);
        const deptId = await db.query('SELECT id FROM department WHERE name = ?', table.department);
        return(dbQueryUpdateRole('role', table.salary, deptId[0][0].id, table.department));
    }
    // deletes chosen roll
    else if (answers === 'delete a roll') {
        const del = await delRole();
        const table = await askRoleQuestions(del);
        const string = 'DELETE FROM role WHERE title = ?';
        return(dbQueryDelete(string, table.role));
    }
    // deletes chosen employee
    else if (answers === 'delete an employee') {
        const del = await delEmp();
        const table = await askRoleQuestions(del);
        let first = '';
        for (let letter of table.employee) {
            if (letter === ' ') break;
            first += letter;
        };
        const string = 'DELETE FROM employee WHERE first_name = ?';
        return(dbQueryDelete(string, first));
    }
    // deletes chosen manager
    else if (answers === 'delete a manager') {
        const del = await delMan();
        const table = await askRoleQuestions(del);
        let first = '';
        for (let letter of table.manager) {
            if (letter === ' ') break;
            first += letter;
        };
        const string = 'DELETE FROM manager WHERE first_name = ?';
        return(dbQueryDelete(string, first));
    }
    else process.exit();
};

// begins inquirer prompts
const callMysql = async (quest) => {
    const answers = await askQuestions(quest);
    const query = await conditionals(answers);
};

// export function to begin prompts
module.exports = { callMysql };