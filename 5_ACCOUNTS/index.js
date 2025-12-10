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
            choices: ['Create Account', 'Check Balance', 'Deposit', 'Cash Out', 'Transfer', 'Logout']
        }
    ])
    .then((answer) => {
        const action = answer['action'];
        
        if (action === 'Create Account') {
            createAccount();
        } else if (action === 'Check Balance') {
            getAccountBalance();
        } else if (action === 'Deposit') {
            deposit();
        } else if (action === 'Cash Out') {
            withdraw();
        } else if (action === 'Transfer') {
            transfer();
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

// show account balance
function getAccountBalance() {
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
            return getAccountBalance();
        }

        const accountData = getAccount(accountName);

        console.log(chalk.bgBlue.black(`The balance of this account is: ${accountData.balance}`));

        operations();
    })
    .catch(err => console.log(chalk.bgRed(err)));
}

// withdraw an amount from user account
function withdraw() {
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
            return withdraw();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'How much do you want to withdraw?'
            }
        ])
        .then((answer) => {
            const amount = answer['amount'];

            removeAmount(accountName, amount);
        })
        .catch(err => console.log(chalk.bgRed(err)));
    })
    .catch(err => console.log(chalk.bgRed(err)));
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName);

    if (!amount) {
        console.log(chalk.bgRed('An error occurred, please try again later!'));
        return withdraw();
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgRed.black('Value unavailable!'))
        return withdraw();
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(chalk.bgRed(err))
        }
    );

    console.log(chalk.green(`Withdrawal of $${amount} successfully completed!`));
    operations();
}

function transfer() {
    inquirer.prompt([
        {
            name: 'payer',
            message: "What is the name of payer's account?"
        }
    ])
    .then((answer) => {
        const payer = answer['payer'];

        // verify if payer's account exists
        if (!checkAccount(payer)) {
            return transfer();
        }

        inquirer.prompt([
            {
                name: 'payee',
                message: 'What is the name account of payee?'
            }
        ])
        .then((answer) => {
            const payee = answer['payee'];

            // verify if payee account exists
            if (!checkAccount(payee)) {
                return transfer();
            }

            finishingTransfer(payer, payee);
        })
        .catch(err => console.log(chalk.bgRed(err)));
    })
    .catch(err => console.log(chalk.bgRed(err)));
}

function finishingTransfer(payer, payee) {
    inquirer.prompt([
        {
            name: 'amount',
            message: 'How much amount do you want to transfer?'
        }
    ])
    .then((answer) => {
        const amount = answer['amount'];

        if (!amount) {
            console.log(chalk.bgRed('An error occurred, please try again later!'))
            return transfer();
        }

        const payerData = getAccount(payer);
        const payeeData = getAccount(payee);

        if (payerData.balance < amount) {
            console.log(chalk.bgRed('Value unavailable!'));
            return transfer();
        }

        payerData.balance = parseFloat(payerData.balance) - parseFloat(amount);
        payeeData.balance = parseFloat(payeeData.balance) + parseFloat(amount);

        fs.writeFileSync(
            `accounts/${payer}.json`,
            JSON.stringify(payerData),
            function (err) {
                console.log(chalk.bgRed.black(err))
            }
        );

        fs.writeFileSync(
            `accounts/${payee}.json`,
            JSON.stringify(payeeData),
            function (err) {
                console.log(chalk.bgRed.black(err))
            }
        )

        console.log(chalk.green('Transfer completed successfully!'));
        operations();
    })
    .catch(err => console.log(chalk.bgRed(err)))
}