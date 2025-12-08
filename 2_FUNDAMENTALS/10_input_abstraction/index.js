const inquirer = require('inquirer');

inquirer.prompt([
    {
    name: 'question1',
    message: 'What is the first result?'
    }, 
    {
    name: 'question2',
    message: 'What is the second result?'
    }
]).then((answers) => {
    console.log(answers);
    const average = (parseInt(answers.question1) + parseInt(answers.question2)) / 2;

    console.log(`The average is: ${average}`);
}).catch(err => console.log(err));