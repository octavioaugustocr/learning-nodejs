const fs = require('fs');

console.log('Start');

fs.writeFileSync('file.txt', 'Hello World!');

console.log('End');