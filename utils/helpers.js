const { prompt } = require('inquirer');
const mysql = require('mysql2');
const { opening, addQuestions } = require('./query.js');
require('console.table');

const askQuestions = async (quest) => {
    const answers = await prompt(quest);
    return(answers.choice);
};

// const askTableQuestions = async (quest) => {
//     const answers = await prompt(quest);
//     return answers.table;
// };

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

const conditionals = (answers) => {
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
        const table = askQuestions(addQuestions);
        console.log(table);
        // resolve(dbQueryAdd('department', table));
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
    const query = conditionals(answers);
    console.log(query);
};

module.exports = { callMysql };