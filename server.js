// server.js;

const http = require('http');
const fs = require('fs');
const server = http.createServer( function (request, response) {
    console.log(request.method, request.url);
    if(request.url === '/styles.css'){
        var myStylesFile = fs.readFileSync('styles.css', 'utf8');
        response.end(myStylesFile);
    }
    else if(request.url === '/') {
        var myIndexFile = fs.readFileSync('index.html', 'utf8');
        response.end(myIndexFile);
    } else {
        console.log('icon');
        response.end();
    }

});

server.listen(3000);
console.log('Server stated!');