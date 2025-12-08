// node index.js --name=Octávio --profession=Developer
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

console.log(args);

const name = args['name'];
const profession = args['profession'];

console.log(name, profession);

console.log(`His name is ${name} and his profession is ${profession}.`);