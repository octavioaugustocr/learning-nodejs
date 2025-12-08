const fs = require('fs');

console.log('Start');

fs.writeFile('file2.txt', 'Hello World!', function(err) {
    setTimeout(function() {
        console.log('File created');
    }, 1000);
});

console.log('End');