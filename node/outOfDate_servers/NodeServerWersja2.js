/**
 * Created by marek on 13.06.17.
 */
/*** Created by marek on 07.06.16.*/
// pamietac zeby odpalac node na amazonie z poziomu folderu Vigiles a nie z poziomu Vigiles/node
// działa w pełni: GET, POST, otwiera img
// przyklad w ajax_proby/node_server oraz server_with_several_file_types
 //shift+ f4 - detach editor tabs

define(['../NodeFunctions'], function (NodeFunctions) {

    /*var http = require('http');
    var fs = require('fs');
    var path = require('path');
    var mkdirp = require('mkdirp');*/ // do tego musialem zainstalowa npm i "npm install mkdirp" z npm // nie dzialalo w wersji z requirejs

    /*exported.http = require('http');
     exported.fs = require('fs');
     exported.path = require('path');
     exported.mkdirp = require('mkdirp');*/ // dziala w wersji z requirejs ale uproszczono w objekcie exported

    var exported = {
        http: require('http'),
        fs:  require('fs'),
        path : require('path'),
        mkdirp : require('mkdirp')
    };



    //var json_data_file_path = "/data/test_arch/data.json";
    var json_data_file_path = "/data/chemik_1/data.json";
    // to trzeba będzie zrobić, żeby spośród kilku opcji wyboru wybierało - na razie nie zrobione i wystepuje w kilku
// miejscach wiec zwrocic uwage ustawić to tak: to jest pierwsza paczka domyślna, a z przycisku na stronie można wybrać inną paczkę i wtedy się załaduje inne auto

    var path_image_folder;
    var port = 4246; //port 4000-5000 zmieniono 07.08 z 4245 na 46 bo wyskakiwał błąd przy odpalaniu: Error: listen EADDRINUSE :::4245

    var data_for_curently_added_patch;

    process.stdout.write("\n" + "************************************************" + "\n" + "\n" + "Plik startuje :)     "); // ta wersja nie powoduje wyswietlania dodatkowych linijek w konsoli ( miast console.log("plik startuje"); )



    exported.http.createServer(function (request, response) {
        

        process.stdout.write("\n" + "server running:    ");//console.log("server running");

        var body = []; //chcialem dac poza createServer, ale w request.on("data") wyskakiwal blad: body "has no push method"

        var headers = request.headers, method = request.method, url = request.url; // URL
        var contentTypeString = headers['content-type'];// var contentTypeString = JSON.stringify(headers['content-type']); //przyklad proponowanej techniki ULR'ow na update jsononserverREQUEST)

        console.log("1.method1: " + method + '     ' +
            //"2.headers: " + headers + '     ' +
            "3.req.url: " + url + '     ' +  // inne niż "/" dla GET  - kiedy żąda konkretnego pliku zdjęcia, dla get JSon tez jest "/" - tu dla post-jpeg interpretuje jako jso
            "4. headers:cont-type: " + contentTypeString); // dla metody get,  pokazuje undefined - wyjasnic (dla post pokazuje zawrtosc)


        var filepath; // = '.' + (request.url == "/" ?  json_data_file_path : url);
        // TODO 1: w drugiej wersji ma być zawsze tu treść, to ma być podstawa dalaszych dzialan

        if (typeof contentTypeString === "undefined") { //niestety nie ma mozliwosci (stack overflow) ustawic headers z html.src skad jest wykonywany request i tym sposobem ustawienia image/jpg dla zdjec
            // dla GET jest undefined- wgrywają sie pliki z serwera (jpg lub json - nie widzi typu w headers),
            //  rozroznia je tylko po url'u

            filepath = "." + (request.url == "/" ? json_data_file_path : url); // TODO 2: tu zmienić, żeby brał url z klasy REQUEST

            process.stdout.write("4.0. filepath: " + filepath);
        }
        else if (contentTypeString == "image/jpeg") {
            if (method == "GET") {
                console.log("     4.1. method:" + method + "(powinno byc GET, ale sprawdzam)");
                //filepath = "." + (request.url == "/" ? json_data_file_path : url); // bez sensu - tu nie może być json
                filepath = "." + url;

                console.log("     4.1.1. filepath: " + filepath);
            }


            if (method == "POST") {//{ to jest POST: przesyła się // ta sytuacja dotyczy tylko przesyłania nowego pliku image
                process.stdout.write("     4.2. method:" + method + ", a powinno byc POST");
                process.stdout.write("     5. confirmed image/jpeg");

                //TODO: tu trzeba uzyc formidable i przeslac pliki

               // process.stdout.write("     5.1 sciezka do pliku" + data_for_curently_added_patch[0][0]); //artefakt
               // filepath = "." + data_for_curently_added_patch[0][0];//artefakt
            }

        }
        else if (headers['content-type'] == "application/json;charset=UTF-8") {
            process.stdout.write("     4.3. aktualizacja jsona");

            filepath = "." + (request.url == "/" ? json_data_file_path : url);

            process.stdout.write("     4.4. filepath: " + filepath);

        }
        else {
            console.log("content-type jest poza kontrola: " + headers['content-type']);
        }


        var fileext = exported.path.extname(filepath);

        process.stdout.write("     4.5. fileext:" + fileext);


        if (request.method == "POST") {

            console.log("     7. method 2: " + method);


            request.on('error', function (err) {
                console.error(err);

            }).on('data', function (chunk) {

                console.log("     7.1. zabiera sie za przesylanie data"); // nie dziala dla jpg - wiadomo, trzeba to rozkminić
                // przerzucic do "if (fileext == ".json")"
                body.push(chunk);

            }).on('end', function () {


                if (fileext == ".jpg") { // request to post - jpg - informacje, ze to jpg bierze z danych do Patcha, natomiast brakuje sciezki "url" od samego patcha
                    // trzeba znaleźć ścieżkę

                    //wynik tego działania pojawia sie w serwerze node'a po kliknieciu addPatch
                    // napisać program aby to działanie szło dalej - tj. żeby prawidłowo działał url
                    // do zdjęcia i pod tym urlem zdjęcie było dostępne (szukaj rozwiązania na stackoverflowe)

                    console.log("    8. fileext to jotpeg, a jego url: " + url);
                    //TODO:30.05.2017 zakladki przegladarki "node server" 3 ostatnie, ew. 4-5 ostatnie tam jest klucz

                    //TODO:póxniej zrobić logike url'ow (przyklad na update jsononserverREQUEST)


                    if (data_for_curently_added_patch = !null) {


                    }

                    data_for_curently_added_patch = null;

                }


                if (fileext == ".json") { // request to post - json


                    console.log("    9.  fileext to JSON");

                    body = Buffer.concat(body).toString();

                    var bodyObject = JSON.parse(body);

                    console.log(bodyObject);


                    if (bodyObject.hasOwnProperty("meta")) {

                        console.log("9.1.  to jest data1.json bo ma property 'meta' ");


                        exported.fs.writeFile('.' + json_data_file_path, body, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log(" 9.1.1. The file was saved!");
                        });


                    }

                    else if (typeof bodyObject[0][0] === "string") {

                        console.log("9.2.  to sa dane do Patcha");


                        data_for_curently_added_patch = bodyObject; // bodyObject:[path, promptedData, nextOriginalParent],promptedData: [ścieżka_pierwotna_pliku, dane jsona, parent.id lub "newParent" ],
                        // path =[directory,file]

                        process.stdout.write("9.2.1. wyglad nowej sciezki do pliku: " + bodyObject[0][0]);
                        console.log("9.2.2. wyglad nowej sciezki po obcieciu folderu: " + bodyObject[0][1]); // obicięciu czego

                        var currentPath = "." + bodyObject[0][1];

                        if (bodyObject[2] == null) { // czyli kiedy nie ma originalParent i trzeb utworzyć nowy folder na kolejnego patcha-matke

                            exported.mkdirp(currentPath, function (err) {

                                // path exists unless there was an error

                            }); // to dziala i folder się pojawił
                        }


                        //TODO: 04-11-2016 to teraz robic (ale najpierw poprzednie TODO z tej daty)
                        // a. jesli jest parent - zapisać plik
                        //    - zapisać url obrazka, żeby sprawdzić z następnym request/postem - aby móc dopasować przesłany obrazek do zapisanego urla
                        //    - wtedy  wysłać request/postem sam obrazek
                        // b. jesli nie ma parenta - utworzyć nowy folder (na podstawie danych z jsona)
                        //    -  wtedy  wysłać request/postem sam obrazek


                    }
                    ;


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

            console.log("     10. method 2: " + method);

            //TODO: 5.06.2017: tutaj zrobić jeszcze jedno rozróżneinie po URL, żeby wbrew komentarzowi  po else (lin. 219) rozróżnić zdjęcia od przesylanego JSON'a
            // bo na wypadek jsona znowu trzeba przekierować program w inne miejsce- tam gdzie powinien isc nomalnie JSON przed zmianą w pliku UpdateJsonREQUEST o koncowke URL'a lalala

            var stat = exported.fs.readFileSync(filepath);


            response.setHeader('Access-Control-Allow-Origin', '*'); // to musi być bo wyrzuca błąd
            response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // to też musi być bo wyrzuca błąd


            response.writeHead(200, NodeFunctions.contentTypeFromExt(fileext)

                //   {
                //  'Content-Type': 'text/json'
                // ponizsze headery wklejone kilka linijek wyzej jso "response.setHeader"
                //'Access-Control-Allow-Origin': '*',
                //'Access-Control-Allow-Headers': 'Content-Type'

                //}

            );
            response.write(stat); 
            //response.write("lalala");
            response.end();
        }


    }).listen(port, function () {
        //Callback triggered when server is successfully listening.
        
        console.log("Server listening on: http://localhost:%s" + "\n" + "\n" + "********************************************************************************************************" + "\n" + "\n" +
            "********************************************************************************************************" + "\n" + "\n" +
            "********************************************************************************************************", port);
    });
    

    return exported;
});