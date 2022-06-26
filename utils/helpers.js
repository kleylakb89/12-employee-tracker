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

const callMysql = (answers) => {
    const query = new Promise((resolve, reject) => {
        console.log(answers);
        if (answers === 'exit') resolve(process.exit());
        if (answers === 'view all departments') {
            db.query('SELECT * FROM department', (err, results) => {
                if (err) reject(console.log(err));
                console.table(results)
                return resolve(askQuestions(questions));
            })
        }
        else reject('No choice made.');
    });
}

module.exports = { askQuestions };