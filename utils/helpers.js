const { prompt } = require('inquirer');
const mysql = require('mysql2');
const { opening, addDept, addRole } = require('./query.js');
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

const dbQuery = (table) => {
    db.query('SELECT * FROM ??', table, (err, results) => {
        if (err) reject(console.log(err));
        console.table(results)
        return callMysql(opening);
    })
};

const dbQueryAdd = (table, name) => {
    db.query('INSERT INTO ?? SET name = ?', [table, name], (err, results) => {
        if (err) reject(console.log(err));
        console.table(results)
        return callMysql(opening);
    })
};

const dbQueryAddRole = (table, title, salary, deptId) => {
    db.query('INSERT INTO ?? SET title = ?, salary = ?, department_id = ?', [table, title, salary, deptId], (err, results) => {
        if (err) console.log(err);
        console.table(results)
        return callMysql(opening);
    })
};

const conditionals = async (answers) => {
    if (answers === 'exit') return(process.exit());
    if (answers === 'view all departments') {
        return(dbQuery('department'));
    }
    else if (answers === 'view all roles') {
        return(dbQuery('role'));
    }
    else if (answers === 'view all employees') {
        return(dbQuery('employee'));
    }
    else if (answers === 'add a department') {
        const table = await askQuestions(addDept);
        return(dbQueryAdd('department', table));
    }
    else if (answers === 'add a role') {
        const table = await askRoleQuestions(addRole);
        return(dbQueryAddRole('role', table.title, table.salary, table.deptId));
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