// node index.js --a=5 --b=3
const minimist = require('minimist');

// external
const args = minimist(process.argv.slice(2));

// internal
const sum = require('./sum').sum;

const a = parseInt(args['a']);
const b = parseInt(args['b']);

sum(a, b);