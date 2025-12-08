const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.prompt([
    { name: 'name', message: 'What is your name?' }, 
    { name: 'age', message: 'How old are you?' }
])
.then((answers) => {
    if (!answers.name || !answers.age) {
        throw new Error('Name and age are required!');
    }

    const response = `Your name is ${answers.name} and you are ${answers.age} years old.`;
    console.log(chalk.bgYellow.black(response));
})
.catch(err => console.log(chalk.bgRed(err)));