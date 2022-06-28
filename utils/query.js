// require mysql2 as a promise for async await
const mysql = require('mysql2/promise');

// looping set of questions
const opening =
{
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all managers', 'view all roles', 'view all employees', 'view employees by manager', 'view employees by department', 'view department budget', 'add a department', 'delete a department', 'add manager', 'update manager', 'delete a manager', 'add a role', 'update a roll', 'delete a roll', 'add an employee', 'update an employee', 'delete an employee',  'exit']
};

// questions for adding a department
const addDept = [
    {
        type: 'input',
        name: 'choice',
        message: 'What department would you like to add?'
    }
];

// async function to create a role
const getRoles = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer questions
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

    // query and loop populates the role department choices array with department names
    const names = await db.query('SELECT name FROM department');
    for (let item of names[0]) {
        addRole[2].choices.push(item.name);
    }
    return (addRole);
};

// async function to add an employee
const getEmployees = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer questions
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
    // two queries and loops to populate the inquirer choices arrays with titles and names
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

// async function to update an employee
const updateEmp = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer questions
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
    // three queries and three loops for populating the inquirer choices arrays with data
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

// async function for adding a manager
const getManagers = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer questions
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
    // database query and loop to populate inquirer choices array with department names
    const role = await db.query('SELECT name FROM department');
    for (let item of role[0]) {
        addManager[2].choices.push(item.name);
    }
    return (addManager);
};

// async function to update a manager
const updateManager = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer questions
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
    // two queries and loops for populating names in the inquirer choices arrays
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

// async function to view employees based on manager
const viewByMan = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer question
    const viewMan = [
        {
            type: 'list',
            name: 'manager',
            message: 'Which manager\'s employees would you like to view?',
            choices: []
        }
    ];
    // query and loop to populate choices array with manager names
    const manager = await db.query('SELECT first_name, last_name FROM manager');
    for (let item of manager[0]) {
        let name = item.first_name + ' ' + item.last_name;
        viewMan[0].choices.push(name);
    }
    return (viewMan);
};

// async function to view employees by department
const viewByDept = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer question
    const viewDept = [
        {
            type: 'list',
            name: 'department',
            message: 'Which department\'s employees would you like to view?',
            choices: []
        }
    ];
    // query and loop to populate choices array with department names
    const dept = await db.query('SELECT name FROM department');
    for (let item of dept[0]) {
        viewDept[0].choices.push(item.name);
    }
    return (viewDept);
};

// async function to view department budgets
const viewDeptBudget = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer question
    const deptBudget = [
        {
            type: 'list',
            name: 'department',
            message: 'Which department\'s budget would you like to view?',
            choices: []
        }
    ];
    // query and loop to populate choices array with department names
    const dept = await db.query('SELECT name FROM department');
    for (let item of dept[0]) {
        deptBudget[0].choices.push(item.name);
    }
    return (deptBudget);
};

// async function to delete a department
const delDept = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer question
    const del = [
        {
            type: 'list',
            name: 'department',
            message: 'Which department would you like to delete?',
            choices: []
        }
    ];
    // query and loop to populate choices array with department names
    const dept = await db.query('SELECT name FROM department');
    for (let item of dept[0]) {
        del[0].choices.push(item.name);
    }
    return (del);
};

// async function to update a role
const updateRole = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer questions
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
    // two queries and loops to populate the choices arrays
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

// async function to delete a role
const delRole = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer question
    const del = [
        {
            type: 'list',
            name: 'role',
            message: 'Which role would you like to delete?',
            choices: []
        }
    ];
    // query and loop to populate choices array with role titles
    const dept = await db.query('SELECT title FROM role');
    for (let item of dept[0]) {
        del[0].choices.push(item.title);
    }
    return (del);
};

// async function to delete an employee
const delEmp = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer question
    const del = [
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to delete?',
            choices: []
        }
    ];
    // query and loop to populate choices array with employee names
    const employee = await db.query('SELECT first_name, last_name FROM employee');
    for (let item of employee[0]) {
        let name = item.first_name + ' ' + item.last_name;
        del[0].choices.push(name);
    }
    return (del);
};

// async function to delete a manager
const delMan = async () => {
    const db = await mysql.createConnection(
        {
            user: 'root',
            database: 'business_db'
        }
    );
    // inquirer question
    const del = [
        {
            type: 'list',
            name: 'manager',
            message: 'Which manager would you like to delete?',
            choices: []
        }
    ];
    // query and loop to populate choices array with manager names
    const manager = await db.query('SELECT first_name, last_name FROM manager');
    for (let item of manager[0]) {
        let name = item.first_name + ' ' + item.last_name;
        del[0].choices.push(name);
    }
    return (del);
};

// exporting all the questions and functions
module.exports = { opening, addDept, getRoles, getEmployees, updateEmp, getManagers, updateManager, viewByMan, viewByDept, viewDeptBudget, delDept, updateRole, delRole, delEmp, delMan };