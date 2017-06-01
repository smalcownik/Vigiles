// f-kcja wywołana w JsonBuilder.updateJson

/**
 * Created by marek on 11.05.16.
 
 */

define(["./Viewer"], function (Viewer) {

    var exported = {};


    exported.makeRequest = function (json) { 

        console.log(json);

        var http_request = new XMLHttpRequest();
        console.log(Viewer);
        http_request.open("POST", Viewer.serverURL); // tutaj zmienić url na odpalony serwer na amazonie (dziala z serwerem
        // Vigiles/node/node_post.js)
        //dziala !
        //mozna dac dla testow ulr pliku z dysku, powinno tam sie zapisac ale nie testowalem

        http_request.setRequestHeader("Content-Type","application/json;charset=UTF-8");

        /*http_request.onload = function(){ console.log("as as asas a");};*/ // to też może byc ale bez tego działa


        http_request.send(json);

    };


    return exported;

});
