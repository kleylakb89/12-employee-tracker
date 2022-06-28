// require dependencies 
const art = require('ascii-art');
const {callMysql} = require('./utils/helpers.js');
const {opening} = require('./utils/query.js');

// banner displays the ascii art and starts the inquirer prompts
const banner = () => {
    art.font('Employee Tracker', 'doom', (err, rendered) => {
        if (err) {
            console.log(err);
        } else {
            console.log(rendered);
            callMysql(opening);
        }
    })
};

const init = () => {
    banner();
};

init();