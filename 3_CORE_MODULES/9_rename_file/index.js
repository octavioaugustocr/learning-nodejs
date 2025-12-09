const fs = require('fs');

const oldFile = 'file.txt';
const newFile = 'newfile.txt';

fs.rename(oldFile, newFile, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('File renamed!')
})