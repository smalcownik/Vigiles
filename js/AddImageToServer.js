/**
 * Created by marek on 22.07.16.
 */

define([], function () {

    var exported = {};


    exported.makeRequest = function (imageUrl) { // f-kcja wywołana w ImageDataAdding.executeAddingNewImage

        console.log(imageUrl);

        var http_request = new XMLHttpRequest();
        http_request.open("POST", "http://52.30.81.203"); // tutaj zmienić url na odpalony serwer na amazonie (dziala z serwerem
        // Vigiles/node/node_post.js)
        //dziala !
        //mozna dac dla testow url pliku z dysku, powinno tam sie zapisac ale nie testowalem

        http_request.setRequestHeader("Content-Type","image/jpeg");

        /*http_request.onload = function(){ console.log("as as asas a");};*/ // to też może byc ale bez tego działa

        http_request.send(imageUrl);

    };


    return exported;

});

