// ten plik juz dziala prawidlowo, polaczenie z post w pliku node_post.js

var http = require('http'),
    fileSystem = require('fs');

var port = 8000;

var server = http.createServer(function(request, response) {


//   console.log(request.headers)
    
    var filePath = './data/test_arch/data1.json';



var stat = fileSystem.readFileSync(filePath);

    response.writeHead(200, {
       'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*'

	});
response.write(stat);

response.end();


});

server.listen(port, function(){

    console.log("Server listening on: http://localhost:%s", port);
    console.log();
});

//ten plik dziala prawidlowo, polaczenie w pliku node_post.js