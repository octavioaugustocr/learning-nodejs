const chalk = require('chalk');

const result = 5;

if (result >= 6) {
    console.log(chalk.green.bold('Congratulations! You passed!'));
} else {
    console.log(chalk.bgRed.bold('You need to take the make-up exam!'));
}
