// external modules
const chalk = require('chalk');
const inquirer = require('inquirer');

// internal modules
const fs = require('fs');

operations();

function operations() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: ['Create Account', 'Check Balance', 'Deposit', 'Cash Out', 'Logout']
        }
    ])
    .then((answer) => {
        const action = answer['action'];
        console.log(action);
    })
    .catch((err) => console.log(chalk.bgRed(err)));
}