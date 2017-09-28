/**
 * Created by marek on 27.09.17.
 */
// pamietac zeby odpalac node na amazonie z poziomu folderu Vigiles a nie z poziomu Vigiles/node
//shift+ f4 - detach editor tabs

// zwrocic uwage - ustawić to tak: to jest pierwsza paczka domyślna, a z przycisku na stronie można wybrać inną paczkę i wtedy się załaduje inne auto

define(['./NodeFunctions'], function (NodeFunctions) {

    var exported = {
        http: require('http'),
        fs:  require('fs'),
        path : require('path'),
        mkdirp : require('mkdirp')
    };

    var port = 4246;
    var data_for_curently_added_patch;

    process.stdout.write("\n" + "************************************************" + "\n" + "\n" + "Plik startuje :)     "); // ta wersja nie powoduje wyswietlania dodatkowych linijek w konsoli ( miast console.log("plik startuje"); )


    exported.http.createServer(function (request, response) {


        process.stdout.write("\n" + "server running:    ");//console.log("server running");

        var body = []; //chcialem dac poza createServer, ale w request.on("data") wyskakiwal blad: body "has no push method"
        var headers = request.headers, method = request.method, url =  request.url; // URL
        var contentTypeString = headers['content-type'];// var contentTypeString = JSON.stringify(headers['content-type']); //przyklad proponowanej techniki ULR'ow na update jsononserverREQUEST)
        var filepath = "." + url;
        var fileext = exported.path.extname(filepath);
        process.stdout.write("0.0. filepath: " + filepath);
        process.stdout.write("     0.1. fileext:" + fileext);
        process.stdout.write("  1.method1: " + method + '     ' +
            //"2.headers: " + headers + '     ' +
            "3.req.url: " + url + '     ' +  // inne niż "/" dla GET  - kiedy żąda konkretnego pliku zdjęcia, dla get JSon tez jest "/" - tu dla post-jpeg interpretuje jako jso
            "4. send:cont-type: " + contentTypeString); // dla metody get,  pokazuje undefined - wyjasnic (dla post pokazuje zawrtosc
        var actualContType = NodeFunctions.contentTypeFromExt(fileext)["Content-Type"]; //ta funkcja potem użyta niżej w response.writeHead(200, NodeFunctions.contentTypeFromExt(fileext)
        process.stdout.write("  4. actual:cont-type: " + actualContType ); // dla metody get,  pokazuje undefined - wyjasnic (dla post pokazuje zawrtosc)


        if (typeof contentTypeString === "undefined") { //niestety nie ma mozliwosci (stack overflow) ustawic headers z html.src skad jest wykonywany request i tym sposobem ustawienia image/jpg dla zdjec
            // dla GET jest undefined- wgrywają sie pliki z serwera (jpg lub json - nie widzi typu w headers),
            //  rozroznia je tylko po url'u

            //filepath = ".." + (request.url == "/" ? json_data_file_path : url); // TODO 2: tu zmienić, żeby brał url z klasy REQUEST

            //process.stdout.write("4.0. filepath: " + filepath);
        }
        else if (contentTypeString == "image/jpeg") {
            if (method == "GET") {
                console.log("     4.1. method:" + method + "(powinno byc GET, ale sprawdzam)");
                //filepath = "." + (request.url == "/" ? json_data_file_path : url); // bez sensu - tu nie może być json
                //filepath = "." + url;

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

            //filepath = "." + (request.url == "/" ? json_data_file_path : url);

            process.stdout.write("     4.4. filepath: " + filepath);

        }
        else {
            console.log("content-type jest poza kontrola: " + headers['content-type']);
        }


       // process.stdout.write("     4.5. fileext:" + fileext);


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


                        exported.fs.writeFile(filepath, body, function (err) { //tu poprawiono po zadzialaniu req.url na filepath
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
