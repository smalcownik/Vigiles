/**
 * Created by marek on 27.09.17.
 */
// odpalac node z poziomu folderu Vigiles a nie Vigiles/node
//shift+ f4 - detach editor tabs
// ustawić to tak: to jest pierwsza paczka domyślna, a z przycisku na stronie można wybrać inną paczkę i wtedy się załaduje inne auto

define(['./NodeFunctions'], function (NodeFunctions) {

    var exported = {
        http: require('http'),
        fs: require('fs-extra'),
        path: require('path'),
        mkdirp: require('mkdirp'),
        util: require('util'), // do formidable - patrz formidable_sample/formidable.js
        formidable: require('formidable')
    };

    //NodeFunctions.node = this;

    var port = 4246;
    var data_for_curently_added_patch;

    process.stdout.write("\n" + "************************************************" + "\n" + "\n" + "Plik startuje :)     "); // ta wersja nie powoduje wyswietlania dodatkowych linijek w konsoli ( miast console.log("plik startuje"); )


    exported.http.createServer(function (request, response) {

        //var form = new exported.formidable.IncomingForm();

        process.stdout.write("\n" + "server running:    ");//console.log("server running");
        //NodeFunctions.node = this;

        {
            exported.body = []; //chcialem dac poza createServer, ale w request.on("data") wyskakiwal blad: body "has no push method"
            exported.headers = request.headers;
            exported.method = request.method;
            exported.url = request.url; // URL
            exported.contentTypeString = exported.headers['content-type'];// var contentTypeString = JSON.stringify(headers['content-type']); //przyklad proponowanej techniki ULR'ow na update jsononserverREQUEST)
            exported.filepath = "." + exported.url;
            exported.fileext = exported.path.extname(exported.filepath);
        }


        if (exported.method == "OPTIONS") {

            console.log("OPTIONS?: " + exported.method);

            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            response.end();
        }

        else {

            NodeFunctions.requestInfo(exported); // informacja zwrotna z serwera na temat requestow

            if (exported.method == "POST") {

                console.log("     7. method 2: " + exported.method);


                /*request.on('error', function (err) {
                 console.error(err);

                 }).on('data', function (chunk) {

                 console.log("     7.1. zabiera sie za przesylanie data"); // nie dziala dla jpg - dalej jest formidable
                 // przerzucic do "if (fileext == ".json")"
                 exported.body.push(chunk);

                 }).on('end', function () {*/

                /////////////////////////////////////

                request.on('error', function (err) {
                    console.error(err);
                });

                ////////////////////////////////////

                console.log("   8.0 fileext  :" +exported.fileext);

                if (exported.fileext == ".jpg") { //wynik tego działania pojawia sie w serwerze node'a po kliknieciu addPatch

                    console.log("    8. fileext to jotpeg, a jego url: " + exported.url);

                    //TODO: tu uzyc formidable i przeslac pliki

                    // creates a new incoming form. 
                    var form = new exported.formidable.IncomingForm();

                    // parse a file upload
                    form.parse(request, function (err/*, fields, files*/) {
                        response.writeHead(204, {'content-type': 'text/plain'}); //TODO: to 204 powoduje, że nie wyskakuje okno - SUCCESS; tu zmieniłem z 200 i skomentowałem
                        //response.write('Upload received :\n'); // tu skomentowałem
                        response.end(/*exported.util.inspect({fields: fields, files: files})*/); //  tu skomentowałem
                    });
                    /*form.on('field', function (field, value) {
                        console.log(field, value);
                        fields.push([field, value]);
                    });

                    form.on('file', function (field, file) {
                        console.log(field, file);
                        files.push([field, file]);
                    });*/ //to dodane ze stackoverflow
                    form.on('end', function (/*fields, files*/) {

                        /* Temporary location of our uploaded file */
                        var temp_path = this.openedFiles[0].path;
                        console.log("path: " + temp_path);

                        /* The file name of the uploaded file */
                        var file_name = this.openedFiles[0].name;

                        /* Location where we want to copy the uploaded file */
                        var new_location = '/home/marek/WebstormProjects/nodeJSTutorial/formidable_sample/';
                        exported.fs.copy(temp_path, new_location + file_name, function (err) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("success!")
                            }
                        });
                        //return;5
                    });
                    //response.writeHead(200, {'content-type': 'text/html'});

                    //response.statusCode = 200;
                    //response.setHeader('Access-Control-Allow-Origin', '*'); // to musi być bo wyrzuca błąd
                    //response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

                    //response.end();

                    //TODO: tutaj po "form.end" wykonać dodatkowe czynnosci na przeslanym pliku (przekopiować we właściwe miejsce i zmienić nazwę)


                }


                if (NodeFunctions.actualContType == ("application/json;charset=UTF-8" || "application/json")) { // request to post - json

                    request.on('data', function (chunk) {

                        console.log("     7.1. zabiera sie za przesylanie data"); // nie dziala dla jpg - dalej jest formidable
                        // przerzucic do "if (fileext == ".json")"
                        exported.body.push(chunk);

                    });

                    request.on('end', function () {


                        console.log("   9.  fileext to JSON");

                        exported.body = Buffer.concat(exported.body).toString();

                        exported.bodyObject = JSON.parse(exported.body);


                        console.log(exported.bodyObject);


                        if (exported.bodyObject.hasOwnProperty("meta")) {

                            console.log("9.1.  to jest data1.json bo ma property 'meta' ");


                            exported.fs.writeFile(exported.filepath, exported.body, function (err) { //tu poprawiono po zadzialaniu req.url na filepath
                                if (err) {
                                    return console.log(err);
                                }
                                console.log(" 9.1.1. The file was saved!");
                            });


                        }

                        else if (typeof exported.bodyObject[0][0] === "string") {

                            console.log("9.2.  to sa dane do Patcha");

                            data_for_curently_added_patch = exported.bodyObject; // exported.bodyObject:[path, promptedData, nextOriginalParent],promptedData: [ścieżka_pierwotna_pliku, dane jsona, parent.id lub "newParent" ],
                            // path =[directory,file]

                            process.stdout.write("9.2.1. nowa sciezka do pliku: " + exported.bodyObject[0][0]);
                            console.log("    9.2.2. sciezka do folderu: " + exported.bodyObject[0][1]);
                            var currentPath = "." + exported.bodyObject[0][1];

                            if (exported.bodyObject[2] == null) { // czyli kiedy nie ma originalParent i trzeb utworzyć nowy folder na kolejnego patcha-matke

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


                    }); //req on end

                }


            } //if post koniec

            else if (exported.method === "GET") { // if (request.method === "GET") // to dotyczy przesyłania plików zdjęć z serwera

                console.log("     10. method 2: " + exported.method);

                //TODO: 5.06.2017: tutaj zrobić jeszcze jedno rozróżneinie po URL, żeby wbrew komentarzowi po else (lin. 219) rozróżnić zdjęcia od przesylanego JSON'a
                // bo na wypadek jsona znowu trzeba przekierować program w inne miejsce- tam gdzie powinien isc nomalnie JSON przed zmianą w pliku UpdateJsonREQUEST
                // o koncowke URL'a lalala

                var stat = exported.fs.readFileSync(exported.filepath);


                response.setHeader('Access-Control-Allow-Origin', '*'); // to musi być bo wyrzuca błąd
                response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // to też musi być bo wyrzuca błąd


                response.writeHead(200, NodeFunctions.contentTypeFromExt(exported.fileext)

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

            else { // method: inna niźli get,post i options

                console.log("   ani get ani post ani options??: " + exported.method);

                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

                response.end();
            }

        }


    }).listen(port, function () {
        //Callback triggered when server is successfully listening.

        console.log("Server listening on: http://localhost:%s" + "\n" + "\n" + "********************************************************************************************************" + "\n" + "\n" +
            "********************************************************************************************************" + "\n" + "\n" +
            "********************************************************************************************************", port);
    });


    return exported;
});
