/**
 * Created by marek on 11.05.16.
 */
// ten plik dziala dobrze, trzeba go polaczyc z plikiem node_get.js ale juz w nowym pliku (NodeServer.js)
// serwery dzialaja dobrze (sceizki do plikow sa prawidlowe jesli w konsoli serwer jest odpalanay z poziomu folderu /Vigiles$)
    
var http = require('http');
var fs = require('fs');
var path = "./data/test_arch/data1.json";


http.createServer(function(request, response) {

    var body = []; // gdy to body chciałem dać poza createServer - jako zmienną globalną, to w request.on("data") wyskakiwał błąd że body "has no push method"

    console.log("server running");
    request.on('error', function(err) {
        console.error(err);

    }).on('data', function(chunk) {
        body.push(chunk);

    }).on('end', function() {

        body = Buffer.concat(body).toString(); // bez "toString()" wychodzi zakodowany Buffer, ale działa

        console.log(body);
        console.log(request.method);

        fs.writeFile(path, body, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

        response.on('error', function(err) {
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
}).listen(80);


//ten plik dziala dobrze, trzeba go polaczyc z plikiem node_get.js ale juz w nowym pliku (NodeServer.js)
// serwery dzialaja dobrze (sceizki do plikow sa prawidlowe jesli w konsoli serwer jest odpalanay z poziomu folderu /Vigiles$)
