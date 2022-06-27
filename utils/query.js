const mysql = require('mysql2/promise');

const opening =
{
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
};

const addDept = [
    {
        type: 'input',
        name: 'choice',
        message: 'What department would you like to add?'
    }
];

const getRoles = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const addRole = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the role\'s title?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the role\'s salary?',
        },
        {
            type: 'list',
            name: 'dept',
            message: 'What is the role\'s department?',
            choices: []
        }
    ];

    const names = await db.query('SELECT name FROM department');
    for (let item of names[0]) {
        addRole[2].choices.push(item.name);
    }
    return (addRole);
};

const getEmployees = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const addEmployee = [
        {
            type: 'input',
            name: 'first',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: []
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: []
        }
    ];
    const role = await db.query('SELECT title FROM role');
    for (let item of role[0]) {
        addEmployee[2].choices.push(item.title);
    }
    const manager = await db.query('SELECT first_name, last_name FROM manager');
    for (let item of manager[0]) {
        let name = item.first_name + ' ' + item.last_name;
        addEmployee[3].choices.push(name);
        console.log(name);
    }
    console.log(addEmployee);
    return (addEmployee);

}

getEmployees();

module.exports = { opening, addDept, getRoles, getEmployees };