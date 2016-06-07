/**
 * Created by marek on 07.06.16.
 */

var http = require('http');
var fs = require('fs');
var path = "./data/test_arch/data.json";
var port = 80;


http.createServer(function(request, response) {

    var body = []; // gdy to body chciałem dać poza createServer - jako zmienną globalną, to w request.on("data") wyskakiwał błąd że body "has no push method"

    console.log("method 1: " + request.method);
    console.log("server running");

    if (request.method == "POST") {


    request.on('error', function (err) {
        console.error(err);

    }).on('data', function (chunk) {
        body.push(chunk);

    }).on('end', function () {

        body = Buffer.concat(body).toString(); // bez "to String wychodzi zakodowany Buffer, ale działa"

        console.log(body);
        console.log("method 2: " + request.method);

        fs.writeFile(path, body, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

        response.on('error', function (err) {
            console.error(err);
        });

        response.statusCode = 200;
        // response.setHeader('Content-Type', 'application/json'); // bez tego działa - o dziwo
        response.setHeader('Access-Control-Allow-Origin', '*'); // to musi być bo wyrzuca błąd
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // to też musi być bo wyrzuca błąd
        //response.write(JSON.stringify(responseBody));//żeby response.write działało musi mieć argument - jakiś string bo wyrzuci błąd
        //response.end(body);
        response.end(); // response.end musi być bo inaczej nie wykona się request.on("end".....

    });
}
    else{

        var stat = fs.readFileSync(path);

        response.writeHead(200, {
            'Content-Type': 'text/json',
            'Access-Control-Allow-Origin': '*'

        });
        response.write(stat);

        response.end();
    }


}).listen(port);