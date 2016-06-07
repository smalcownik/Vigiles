var http = require('http'),
    fileSystem = require('fs');
//    path = require('path');
var port = 8000;

var server = http.createServer(function(request, response) {
    //var filePath = path.join('someJSON.json');

//   console.log(request.headers)
    
    var filePath = './data/test_arch/data1.json';

//    var stat = fileSystem.statSync(filePath);

var stat = fileSystem.readFileSync(filePath);

    response.writeHead(200, {
       // 'Content-Type': 'application/json',
'Content-Type': 'text/json',
'Access-Control-Allow-Origin': '*'
//        'Content-Length': stat.length   
	});
response.write(stat);

response.end();

//    var readStream = fileSystem.createReadStream(filePath);
    
// We replaced all the event handlers with a simple call to readStream.pipe()
//    console.log(response.headers);
//    readStream.pipe(response);
   
});

server.listen(port, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", port);
    console.log();
});

//TODO: tutaj teraz pracwoać - dostosować to żeby się odapało i potem połączyć z POST'em w pliku post_get_server