/*** Created by marek on 07.06.16.*/
// pamietac zeby odpalac node na amazonie z poziomu folderu Vigiles a nie z poziomu Vigiles/node
// działa w pełni: GET, POST, otwiera img

// przyklad w ajax_proby/node_server oraz server_with_several_file_types

var http = require('http');
var fs = require('fs');
var path = require('path');
var json_data_file_path = "/data/test_arch/data1.json";
//var path_image_folder = "/data/test_arch/data1.json";
var port = 80;
var data_to_add_new_patch;

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
    console.log("request.url: "+ request.url);

    var filepath = '.' + (request.url == '/' ? json_data_file_path : request.url);
    var fileext = path.extname(filepath);

    console.log("path przed :" + filepath+ '\n' +  "wartosc request.url: " + request.url); // sciezka do miejsca przechowywania pliku
    console.log("ext przed :" + fileext);  // rozszerzenie/typ pliku

    //TODO: zeby: teraz to robić 27.08.2016
    //1. rozróżniało jsona czy to url danych zdjęcia czy url data1.json czy jpg

    //2. jesli data1.json - to już dalsza cześć kodu jest gotowa tylko ją wyodrębnić

    
    // Jesli to url danych do zdjęcia zdjęcia:

    //3.0. zapisać dane z pliku json to jakiegoś pliku z danymi, żeby w tamtym pliku miał dane do zdjęcia i mógł użyc ich przy zapisaywaniu zdjęcia
    //3. jakoś wydobyć z niego ścieżkę do zapisania pliku jpg i
    // a. jesli jest parent - zapisać plik
    //    - zapisać url obrazka, żeby sprawdzić z następnym request/postem - aby móc dopasować przesłany obrazek do zapisanego urla
    //    - wtedy  wysłać request/postem sam obrazek
    // b. jesli nie ma parenta - utworzyć nowy folder (na podstawie danych z jsona)
    //    -  wtedy  wysłać request/postem sam obrazek


    if (request.method == "POST") {

        console.log("method 2: " + request.method);


        request.on('error', function (err) {
            console.error(err);

        }).on('data', function (chunk) {
            body.push(chunk);

        }).on('end', function () {


            if (fileext == ".jpg") { // request to post - jpg

                console.log("fileext to jotpeg, a jego url: "+ request.url);

                // szukaj danych do jpg'a





            }

            if (fileext == ".json") { // request to post - json
                console.log("fileext to JSON");

                body = Buffer.concat(body).toString();

                console.log("body: " + body);

                var bodyObject = JSON.parse(body);



                    //TODO: teraz 07-09-2016 przygotować dane do wysyłki AddDataForImage ... tak, żeby były już kompletne
                    //TODO: teraz 06-09-2016 zrobić żeby najpierw wczytało ścieżkę i na podstawie jej treści niech decydyje czy to data1.json
                    // czy może jpg_data

                fs.writeFile('.' + json_data_file_path, body, function (err) {
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


            }


            


        });
    }


    else { // if (request.method ==! "POST") // to dotyczy przesyłania plików zdjęć z serwera

        //var stat = fs.readFileSync(json_data_file_path);
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
    //Callback triggered when server is successfully listening. H$
    console.log("Server listening on: http://localhost:%s", port);
});



