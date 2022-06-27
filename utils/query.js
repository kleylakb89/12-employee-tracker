const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        user: 'root',
        database: 'business_db'
    }
);

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

const getRoles = () => {
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
            choices: db.query('SELECT name FROM department', (err, results) => {
                const arr = [];
                if (err) console.log(err);
                for (let item of results) {
                    arr.push(item.name);
                }
                return (arr);
            })
        }
    ];

    // db.query('SELECT name FROM department', (err, results) => {
    //     if (err) console.log(err);
    //     for (let item of results) {
    //         addRole[2].choices.push(item.name);
    //     }
    //     return (addRole);
    // });
    console.log(addRole);
    return(addRole);
};

const test = getRoles();
// console.log(test);


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

module.exports = {opening, addDept, getRoles, addEmployee};