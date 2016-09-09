/*** Created by marek on 07.06.16.*/
// pamietac zeby odpalac node na amazonie z poziomu folderu Vigiles a nie z poziomu Vigiles/node
// działa w pełni: GET, POST, otwiera img

// przyklad w ajax_proby/node_server oraz server_with_several_file_types

var http = require('http');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp'); // do tego musialem zainstalowa nmp i "npm install mkdirp" z nmp
var json_data_file_path = "/data/test_arch/data1.json";
//var path_image_folder = "/data/test_arch/data1.json";
var port = 80;
var data_for_new_patches;

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

http.createServer(function (request, response) {

    var body = []; // gdy to body chciałem dać poza createServer - jako zmienną globalną, to w request.on("data") wyskakiwał błąd że body "has no push method"

    console.log("method 1: " + request.method);
    console.log("server running");
    console.log("request.url: " + request.url);

    var filepath = '.' + (request.url == '/' ? json_data_file_path : request.url);
    var fileext = path.extname(filepath);

    console.log("wartosc request.url: " + request.url); // sciezka do miejsca przechowywania pliku
    console.log("ext przed :" + fileext);  // rozszerzenie/typ pliku


    if (request.method == "POST") {

        console.log("method 2: " + request.method);


        request.on('error', function (err) {
            console.error(err);

        }).on('data', function (chunk) {
            body.push(chunk);

        }).on('end', function () {


            if (fileext == ".jpg") { // request to post - jpg

                console.log("fileext to jotpeg, a jego url: " + request.url);
                if (data_for_new_patches = !null) {





                }
                data_for_new_patches = null;

            }


            if (fileext == ".json") { // request to post - json


                console.log("fileext to JSON");

                body = Buffer.concat(body).toString();

                var bodyObject = JSON.parse(body);

                console.log(bodyObject);


                if (bodyObject.hasOwnProperty("meta")) {

                    console.log("to jest data1.json bo ma property 'meta' ");


                    fs.writeFile('.' + json_data_file_path, body, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    });


                }

                else if (typeof bodyObject[0][0] === "string") {

                    console.log("to sa dane do Patcha");


                    data_for_new_patches = bodyObject; // bO:[path, promptedData, nextOriginalParent],pD: [ścieżka_pierwotna_pliku, dane jsona, parent.id lub "newParent" ],
                                                        // path =[directory,file]

                    console.log("wyglad nowej sciezki: "+ bodyObject[0]);
                    console.log("wyglad nowej sciezki po obcieciu: "+ bodyObject[0][0]);


                    mkdirp(bodyObject[0][0], function (err) {

                        // path exists unless there was an error

                    });

                    //TODO: 09-09-2016 tutaj teraz robic
                    // a. jesli jest parent - zapisać plik
                    //    - zapisać url obrazka, żeby sprawdzić z następnym request/postem - aby móc dopasować przesłany obrazek do zapisanego urla
                    //    - wtedy  wysłać request/postem sam obrazek
                    // b. jesli nie ma parenta - utworzyć nowy folder (na podstawie danych z jsona)
                    //    -  wtedy  wysłać request/postem sam obrazek


                };


            }

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


    else { // if (request.method === "GET") // to dotyczy przesyłania plików zdjęć z serwera

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


}).listen(port, function () {
    //Callback triggered when server is successfully listening.
    console.log("Server listening on: http://localhost:%s", port);
});



