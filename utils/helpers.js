const { prompt } = require('inquirer');
const mysql = require('mysql2');
const { opening, addDept, getRoles, getEmployees, updateRole, getManagers, updateManager, viewByMan, viewByDept, viewDeptBudget } = require('./query.js');
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

const dbQueryUpdateEmployee = (table, roleId, managerId, first) => {
    db.query('UPDATE ?? SET role_id = ?, manager_id = ? WHERE first_name = ?', [table, roleId, managerId, first], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

const dbQueryAddManager = (table, first, last, deptId, salary) => {
    db.query('INSERT INTO ?? SET first_name = ?, last_name = ?, department_id = ?, salary = ?', [table, first, last, deptId, salary], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

const dbQueryUpdateManager = (table, deptId, salary, first) => {
    db.query('UPDATE ?? SET department_id = ?, salary = ? WHERE first_name = ?', [table, deptId, salary, first], (err, results) => {
        if (err) console.log(err);
        console.log('Added to database')
        return callMysql(opening);
    })
};

const dbQueryViewByMan = (string, value) => {
    db.query(string, value, (err, results) => {
        if (err) return(console.log(err));
        console.table(results)
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
    else if (answers === 'view all managers') {
        const string = 'SELECT manager.id, first_name, last_name, name AS department, salary FROM manager JOIN department ON manager.department_id = department.id';
        return(dbQuery(string));
    }
    else if (answers === 'view all employees') {
        const string = 'SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, role.salary, CONCAT(manager.first_name," ",manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN manager ON department.id = manager.department_id';
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
        const upRole = await updateRole();
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
    else if (answers === 'add manager') {
        const manQuest = await getManagers();
        const table = await askRoleQuestions(manQuest);
        const deptId = await db.query('SELECT id FROM department WHERE name = ?', table.role);
        return(dbQueryAddManager('manager', table.first, table.last, deptId[0][0].id, table.salary));
    }
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
    else if (answers === 'view employees by manager') {
        const viewMan = await viewByMan();
        const table = await askRoleQuestions(viewMan);
        const string = 'SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name," ",manager.last_name) AS manager FROM employee JOIN manager ON employee.manager_id = manager.id WHERE CONCAT(manager.first_name," ",manager.last_name) = ?';
        return(dbQueryViewByMan(string, table.manager));
    }
    else if (answers === 'view employees by department') {
        const viewDept = await viewByDept();
        const table = await askRoleQuestions(viewDept);
        const string = 'SELECT employee.id, employee.first_name, employee.last_name, title, CONCAT(manager.first_name," ",manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN manager ON department.id = manager.department_id WHERE department.name = ?';
        return(dbQueryViewByMan(string, table.department));
    }
    else if (answers === 'view department budget') {
        const viewBudge = await viewDeptBudget();
        const table = await askRoleQuestions(viewBudge);
        const deptId = await db.query('SELECT id FROM department WHERE name = ?', table.department);
        const empSum = await db.query('SELECT SUM(salary) FROM employee JOIN role ON employee.role_id = role.id WHERE department_id = ?', deptId[0][0].id);
        const manSum = await db.query('SELECT SUM(salary) FROM manager WHERE department_id = ?', deptId[0][0].id);
        const totalSum = parseFloat(empSum[0][0]['SUM(salary)']) + parseFloat(manSum[0][0]['SUM(salary)']);
        console.log('Department: '+ table.department + ' Budget: $' + totalSum);
        return callMysql(opening);
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