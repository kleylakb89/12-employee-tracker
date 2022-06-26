const { prompt } = require('inquirer');
const mysql = require('mysql2');
const { questions } = require('./query.js');
require('console.table');

const askQuestions = async (quest) => {
    const answers = await prompt(quest);
    return callMysql(answers.choice);
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
        return askQuestions(questions);
    })
};

const callMysql = (answers) => {
    const query = new Promise((resolve, reject) => {
        console.log(answers);
        if (answers === 'exit') resolve(process.exit());
        if (answers === 'view all departments') {
            resolve(dbQuery('department'));
        };
        if (answers === 'view all roles') {
            resolve(dbQuery('role'));
        };
        if (answers === 'view all employees') {
            resolve(dbQuery('employee'));
        }
        else reject('No choice made.');
    });
};

module.exports = { askQuestions };