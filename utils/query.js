const { up } = require('inquirer/lib/utils/readline');
const mysql = require('mysql2/promise');

const opening =
{
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all managers', 'view all employees', 'view employees by manager', 'view employees by department', 'view department budget', 'add a department', 'delete a department', 'add a role', 'update a roll', 'delete a roll', 'add an employee', 'update an employee', 'add manager', 'update manager', 'exit']
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
    }
    return (addEmployee);
};

const updateEmp = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const updateEmployee = [
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: []
        },
        {
            type: 'list',
            name: 'role',
            message: 'What role would you like to assign?',
            choices: []
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is their new manager?',
            choices: []
        }
    ];
    const employee = await db.query('SELECT first_name, last_name FROM employee');
    for (let item of employee[0]) {
        let name = item.first_name + ' ' + item.last_name;
        updateEmployee[0].choices.push(name);
    }
    const role = await db.query('SELECT title FROM role');
    for (let item of role[0]) {
        updateEmployee[1].choices.push(item.title);
    }
    const manager = await db.query('SELECT first_name, last_name FROM manager');
    for (let item of manager[0]) {
        let name = item.first_name + ' ' + item.last_name;
        updateEmployee[2].choices.push(name);
    }
    return (updateEmployee);
};

const getManagers = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const addManager = [
        {
            type: 'input',
            name: 'first',
            message: 'What is the manager\'s first name?'
        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the manager\'s last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the manager\'s department?',
            choices: []
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the manager\'s salary?'
        }
    ];
    const role = await db.query('SELECT name FROM department');
    for (let item of role[0]) {
        addManager[2].choices.push(item.name);
    }
    return (addManager);
};

const updateManager = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const upMan = [
        {
            type: 'list',
            name: 'manager',
            message: 'Which manager would you like to update?',
            choices: []
        },
        {
            type: 'list',
            name: 'dept',
            message: 'What department would you like to assign?',
            choices: []
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is their new salary?'
        }
    ];
    const manager = await db.query('SELECT first_name, last_name FROM manager');
    for (let item of manager[0]) {
        let name = item.first_name + ' ' + item.last_name;
        upMan[0].choices.push(name);
    }
    const depart = await db.query('SELECT name FROM department');
    for (let item of depart[0]) {
        upMan[1].choices.push(item.name);
    }
    return (upMan);
};

const viewByMan = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const viewMan = [
        {
            type: 'list',
            name: 'manager',
            message: 'Which manager\'s employees would you like to view?',
            choices: []
        }
    ];
    const manager = await db.query('SELECT first_name, last_name FROM manager');
    for (let item of manager[0]) {
        let name = item.first_name + ' ' + item.last_name;
        viewMan[0].choices.push(name);
    }
    return (viewMan);
};

const viewByDept = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const viewDept = [
        {
            type: 'list',
            name: 'department',
            message: 'Which department\'s employees would you like to view?',
            choices: []
        }
    ];
    const dept = await db.query('SELECT name FROM department');
    for (let item of dept[0]) {
        viewDept[0].choices.push(item.name);
    }
    return (viewDept);
};

const viewDeptBudget = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const deptBudget = [
        {
            type: 'list',
            name: 'department',
            message: 'Which department\'s budget would you like to view?',
            choices: []
        }
    ];
    const dept = await db.query('SELECT name FROM department');
    for (let item of dept[0]) {
        deptBudget[0].choices.push(item.name);
    }
    return (deptBudget);
};

const delDept = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const del = [
        {
            type: 'list',
            name: 'department',
            message: 'Which department would you like to delete?',
            choices: []
        }
    ];
    const dept = await db.query('SELECT name FROM department');
    for (let item of dept[0]) {
        del[0].choices.push(item.name);
    }
    return (del);
};

const updateRole = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const upRole = [
        {
            type: 'list',
            name: 'role',
            message: 'Which role would you like to update?',
            choices: []
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the new salary?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department is it in?',
            choices: []
        }
    ];
    const role = await db.query('SELECT title FROM role');
    for (let item of role[0]) {
        upRole[0].choices.push(item.title);
    }
    const dept = await db.query('SELECT name FROM department');
    for (let item of dept[0]) {
        upRole[2].choices.push(item.name);
    }
    return (upRole);
};

const delRole = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    const del = [
        {
            type: 'list',
            name: 'role',
            message: 'Which role would you like to delete?',
            choices: []
        }
    ];
    const dept = await db.query('SELECT title FROM role');
    for (let item of dept[0]) {
        del[0].choices.push(item.title);
    }
    return (del);
};

module.exports = { opening, addDept, getRoles, getEmployees, updateEmp, getManagers, updateManager, viewByMan, viewByDept, viewDeptBudget, delDept, updateRole, delRole };