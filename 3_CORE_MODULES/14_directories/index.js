const fs = require('fs');

if (!fs.existsSync('./myfolder')) {
    console.log('Does not exists!');
    fs.mkdirSync('myfolder');
} else if(fs.existsSync('./myfolder')) {
    console.log('Exists!');
}