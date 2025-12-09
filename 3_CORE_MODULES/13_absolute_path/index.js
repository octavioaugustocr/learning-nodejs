const path = require('path');

// absolute path
console.log(path.resolve('test.txt'));

// form a path
const midFolder = 'reports';
const fileName = 'octavio.txt';

const finalPath = path.join('/', 'files', midFolder, fileName);
console.log(finalPath);