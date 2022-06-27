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
            name: 'deptId',
            message: 'What is the role\'s department?',
            choices: []
        }
    ];

    const test = await db.query('SELECT name FROM department');
    for (let item of test[0]) {
        addRole[2].choices.push(item.name);
    }
    // console.log(test);
    // console.log(addRole);
    return (addRole);
};

const check = async () => {
    const test = await getRoles();
    console.log(test);
}

check();


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
        type: 'input',
        name: 'roleId',
        message: 'What is the employee\'s role id?'
    },
    {
        type: 'input',
        name: 'managerId',
        message: 'What is the employee\'s manager id?'
    }
];

module.exports = { opening, addDept, getRoles, addEmployee };