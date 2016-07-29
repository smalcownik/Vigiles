/**
 * Created by marek on 07.06.16.
 */

// pamietac zeby odpalac node na amazonie z poziomu folderu Vigiles a nie z poziomu Vigiles/node
// działa w pełni: GET, POST, otwiera img


var http = require('http');
var fs = require('fs');
var path = require('path');
var path_file = "/data/test_arch/data1.json";
//var path_image_folder = "/data/test_arch/data1.json";
var port = 80;

function contentType(ext) {
    var ct;

    switch (ext) {
        case '.html':
            ct = 'text/html';
            break;
        case '.css':
            ct = 'text/css';
            break;
        case '.js':
            ct = 'text/javascript';
            break;
        case '.jpg':
            ct = "image/jpeg";
            break;
        default:
            ct = 'text/plain';
            break;
    }

    return {'Content-Type': ct};
}

console.log("plik startuje");

http.createServer(function(request, response) {

    var body = []; // gdy to body chciałem dać poza createServer - jako zmienną globalną, to w request.on("data") wyskakiwał błąd że body "has no push method"

    console.log("method 1: " + request.method);
    console.log("server running");

    var filepath = '.' + (request.url == '/' ? path_file : request.url);
    var  fileext = path.extname(filepath);
    console.log("przed :"+filepath); // sciezka do miejsca przechowywania pliku
    console.log("przed :"+fileext);  // rozszerzenie/typ pliku

    if (request.method == "POST") {
        
        //TODO: tutuaj popracować, żeby rozróżniało że idzie json (dodoanie punkta) lub img (idzie nowe zdjęcie) i w drugm przypadku niech
        // przesyła i zapisuje plik img na serverze
        console.log("tu jestem: " +request.headers);

    request.on('error', function (err) {
        console.error(err);

    }).on('data', function (chunk) {
        body.push(chunk);

    }).on('end', function () {
        


        body = Buffer.concat(body).toString(); // bez "to String wychodzi zakodowany Buffer, ale działa"

        //console.log(body);
        console.log("method 2: " + request.method);

        fs.writeFile('.' +path_file, body, function (err) {
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

        //var stat = fs.readFileSync(path_file);
        var stat = fs.readFileSync(filepath);

        response.setHeader('Access-Control-Allow-Origin', '*'); // to musi być bo wyrzuca błąd
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // to też musi być bo wyrzuca błąd


        response.writeHead(200, contentType(fileext)

         //   {
          //  'Content-Type': 'text/json'
        // ponizsze headery wklejone kilka linijek wyzej jso "response.setHeader"
            //'Access-Control-Allow-Origin': '*',
            //'Access-Control-Allow-Headers': 'Content-Type'

        //}

        );
        response.write(stat);

        response.end();
    }


}).listen(port, function(){
    //Callback triggered when server is successfully listening. H$
    console.log("Server listening on: http://localhost:%s", port);
});



// działa w pełni: GET, POST, otwiera img
// pamietac zeby odpalac node na amazonie z poziomu folderu Vigiles a nie z poziomu Vigiles/node

// przyklad w ajax_proby/node_server oraz server_with_several_file_types
