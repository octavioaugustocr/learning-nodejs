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
        } else if (action === 'Check Balance') {

        } else if (action === 'Deposit') {
            deposit();
        } else if (action === 'Cash Out') {

        } else if (action === 'Logout') {
            console.log(chalk.bgBlue.black('Thanks you for using Accounts!'));
            process.exit();
        }
    })
    .catch(err => console.log(chalk.bgRed(err)));
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
    .catch(err => console.log(chalk.bgRed(err)));
}

// add an amount to user account
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'What is your account name?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName'];
        
        // verify if account exists
        if (!checkAccount(accountName)) {
            return deposit();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'How much do you want to deposit?'
            }
        ])
        .then((answer) => {
            const amount = answer['amount'];

            // add an amount
            addAmount(accountName, amount);
        })
        .catch(err => console.log(chalk.bgRed(err)));
    })
    .catch(err => console.log(chalk.bgRed(err)));
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed('This account does not exist. Please try again!'));
        return false;
    }
    return true;
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName);

    if (!amount) {
        console.log(chalk.bgRed.black('An error occurred, please try again later!'));
        return deposit();
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
        console.log(chalk.bgRed.black(err));
    });

    console.log(chalk.green(`The amount of $${amount} has been deposited!`));
    operations();
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r' // read only
    });

    return JSON.parse(accountJSON);
}