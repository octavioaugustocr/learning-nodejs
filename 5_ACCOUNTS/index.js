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
        
        if (action === 'Create Account') {
            createAccount();
        }
    })
    .catch((err) => console.log(chalk.bgRed(err)));
}

// create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Congratulations on choosing our bank!'));
    console.log(chalk.green('Set your account options below:'));
    buildAccount();
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Please provide the account name:'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName'];

        console.info(accountName);

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('This account already exists, please choose a different name!'));
            buildAccount();
            return;
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) {
            console.log(chalk.bgRed(err));
        })

        console.log(chalk.green('Congratulations, your account has been successfully created!'));
        operations();
    })
    .catch((err) => console.log(chalk.bgRed(err)));
}