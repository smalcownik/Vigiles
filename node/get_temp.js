




var server = http.createServer(function(request, response) {




    var path = './data/test_arch/data1.json';



    var stat = fileSystem.readFileSync(path);

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