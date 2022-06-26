const opening =
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
    }

const addQuestions = 
    {
        type: 'input',
        name: 'choice',
        message: 'What would you like to add?'
    }

module.exports = {opening, addQuestions};