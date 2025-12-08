const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('What is your preferred programming language? ', (language) => {
    if (language.toLowerCase() === "html" || language.toLowerCase() === "css") {
        console.log(`${language} is not a programming language.`);
        readline.close();
    } else {
        console.log(`My programming language preferred is: ${language}`);
        readline.close();
    }
});