/*** Created by marek on 07.06.16.*/
// pamietac zeby odpalac node na amazonie z poziomu folderu Vigiles a nie z poziomu Vigiles/node
// działa w pełni: GET, POST, otwiera img

// przyklad w ajax_proby/node_server oraz server_with_several_file_types

var http = require('http');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp'); // do tego musialem zainstalowa nmp i "npm install mkdirp" z nmp
var json_data_file_path = "/data/test_arch/data1.json"; // to trzeba będzie zrobić, żeby spośród kilku opcji wyboru wybierało - na razie nie rozbione
                                                        //no i wystepuje w kilku miejscach wiec zwrocic uwage
var path_image_folder;
var port = 80;
var data_for_curently_added_patch;

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

    console.log("server running");

    var body = []; // gdy to body chciałem dać poza createServer - jako zmienną globalną, to w request.on("data") wyskakiwał błąd że body "has no push method"

    var headers = request.headers;
    var method = request.method;
    var url = request.url;

    console.log("1. method 1: " + method);
    console.log("2. headers: " + JSON.stringify(headers));
    console.log("3. request.url: " + url); // to jest inne niż "/" dla GET  - kiedy żąda konkretnego pliku zdjęcia, ale dla get JSon tez jest "/" - i tu dla post-jpeg interpretuje jako json
    console.log("4. headers:content-type: " + JSON.stringify(headers['content-type'])); // to jest inne niż "/" dla GET  - kiedy żąda konkretnego pliku zdjęcia, ale dla get JSon tez jest "/" - i tu dla post-jpeg interpretuje jako json
    

    var filepath; // = '.' + (request.url == "/" ?  json_data_file_path : url);
    if(typeof headers['content-type'] == "undefined"){ // to jest GET - wgrywają sie pliki z serwera (jpg lub json - on tu nie widzi typu w headers),
        // ale rozrozni je po url'u

        filepath = "." + (request.url == "/" ?  json_data_file_path : url);
        console.log("4.0. filepath: " + filepath);
    }
    else if(headers['content-type'] =="image/jpeg"){  // to jest POST: przesyła się // ta sytuacja dotyczy tylko przesyłania nowego pliku image
        console.log("5. confirmed image/jpeg");
        console.log("5.1 sciezka do pliku" + data_for_curently_added_patch[0][0]);
        filepath = "."+ data_for_curently_added_patch[0][0];
    }
    else if(headers['content-type'] =="application/json;charset=UTF-8"){
        console.log("4.1. aktualizacja jsona");
        filepath = "." + (request.url == "/" ?  json_data_file_path : url);
        console.log("4.2. filepath: " + filepath);

    }
    else {
        console.log("content-type jest poza kontrola: " + headers['content-type']);
    };


   


    var fileext = path.extname(filepath);

    console.log("6. ext przed :" + fileext);  // rozszerzenie/typ pliku


    if (request.method == "POST") {

        console.log("7. method 2: " + method);


        request.on('error', function (err) {
            console.error(err);

        }).on('data', function (chunk) {

            console.log("7.1. zabiera sie za przesylanie data"); // ten sposob przesyalnaia pliku prawdopodobnie nie dziala dla jpg wiec bedzie trzeba ten fragment
                                                                    // przerzucic do "if (fileext == ".json")"
            body.push(chunk);

        }).on('end', function () {


            if (fileext == ".jpg") { // request to post - jpg - informacje, ze to jpg bierze z danych do Patcha, natomiast brauje sceizki "url" od samego patcha
                // trzeba tak zrobić, żeby tą ścieżkę wyłuskać

                console.log("8. fileext to jotpeg, a jego url: " + url); //TODO: 1. 13.02.2017:tutaj jestem - dalszy plan:
                                                                         //wynik tego działania pojawia sie w serwerze node'a po kliknieciu addPatch
                                                                        // napisać program aby to działanie szło dalej - tj. żeby prawidłowo działał url
                                                                        // do zdjęcia i pod tym urlem zdjęcie było dostępne (szukaj rozwiązania na stackoverflowe)
                
                
                
                if (data_for_curently_added_patch = !null) {



                }

                data_for_curently_added_patch = null;

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


                    data_for_curently_added_patch = bodyObject; // bO:[path, promptedData, nextOriginalParent],pD: [ścieżka_pierwotna_pliku, dane jsona, parent.id lub "newParent" ],
                                                        // path =[directory,file]

                    console.log("wyglad nowej sciezki do pliku: "+ bodyObject[0][0]);
                    console.log("wyglad nowej sciezki po obcieciu folderu: "+ bodyObject[0][1]); // obicięciu czego

                    var currentPath = "."+bodyObject[0][1];

                    if(bodyObject[2]== null){ // czyli kiedy nie ma originalParent i trzeb utworzyć nowy folder na kolejnego patcha-matke

                    mkdirp(currentPath, function (err) {

                        // path exists unless there was an error

                    }); // to dziala i folder się pojawił
                    }



                    //TODO: 04-11-2016 to teraz robic (ale najpierw poprzednie TODO z tej daty)
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



