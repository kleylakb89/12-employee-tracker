const { prompt } = require('inquirer');
const mysql = require('mysql2');
const { opening, addDept, getRoles, getEmployees } = require('./query.js');
require('console.table');

const askQuestions = async (quest) => {
    const answers = await prompt(quest);
    return(answers.choice);
};

const askRoleQuestions = async (quest) => {
    const answers = await prompt(quest);
    return answers;
};

const db = mysql.createConnection(
    {
        user: 'root',
        database: 'business_db'
    }
);

const dbQuery = (string) => {
    db.query(string, (err, results) => {
        if (err) return(console.log(err));
        console.table(results)
        return callMysql(opening);
    })
};

const dbQueryAdd = (table, name) => {
    db.query('INSERT INTO ?? SET name = ?', [table, name], (err, results) => {
        if (err) return(console.log(err));
        console.log('Added to database')
        return callMysql(opening);
    })
};

const dbQueryAddRole = (table, title, salary, deptId) => {
    db.query('INSERT INTO ?? SET title = ?, salary = ?, department_id = ?', [table, title, salary, deptId], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

const dbQueryAddEmployee = (table, first, last, roleId, managerId) => {
    db.query('INSERT INTO ?? SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?', [table, first, last, roleId, managerId], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

const conditionals = async (answers) => {
    const mysql = require('mysql2/promise');
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    if (answers === 'exit') return(process.exit());
    if (answers === 'view all departments') {
        const string = 'SELECT * FROM department'
        return(dbQuery(string));
    }
    else if (answers === 'view all roles') {
        const string = 'SELECT role.id, title, name AS department, salary FROM role JOIN department ON role.department_id = department.id';
        return(dbQuery(string));
    }
    else if (answers === 'view all employees') {
        const string = 'SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, salary, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN manager ON department.id = manager.department_id';
        return(dbQuery(string));
    }
    else if (answers === 'add a department') {
        const table = await askQuestions(addDept);
        return(dbQueryAdd('department', table));
    }
    else if (answers === 'add a role') {
        const roleQuest = await getRoles();
        const table = await askRoleQuestions(roleQuest);
        const deptId = await db.query('SELECT id FROM department WHERE name = ?', table.dept);
        return(dbQueryAddRole('role', table.title, table.salary, deptId[0][0].id));
    }
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
    else if (answers === 'update an employee role') {
        const table = await askRoleQuestions(addEmployee);
        return(dbQueryAddEmployee('employee', table.first, table.last, table.roleId, table.managerId));
    }
    // else process.exit();
    else console.log('not working');
};

const callMysql = async (quest) => {
    const answers = await askQuestions(quest);
    // const query = new Promise((resolve, reject) => {
    //     if(answers)resolve(conditionals(answers));
    //     else console.log('not yet');
    // });
    // query.then(conditionals(answers)).catch(err=>console.log(err));
    const query = await conditionals(answers);
};

module.exports = { callMysql };