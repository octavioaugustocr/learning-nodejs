const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    res.write('Hi HTTP');
    res.end();
});

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});