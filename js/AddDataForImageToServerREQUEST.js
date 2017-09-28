/**
 * Created by marek on 17.08.16.
 */
// f-kcja wywołana w ImageDataAdding.executeAddingNewImage

define([], function () {

    var exported = {};


    exported.makeRequest = function (imageData) { // f-kcja wywołana w ImageDataAdding.executeAddingNewImage

        console.log(imageData);

        var viewer = this.viewer; // musiałem wstrzyknąć viewera w ten sposób bo przez require/define/function nie widziało go - nie wiem dlaczego!

        var http_request = new XMLHttpRequest();
        http_request.open("POST", viewer.serverURL,false); // tutaj zmienić url na odpalony serwer na amazonie (dziala z serwerem TODO: dodać request url pliku
        // Vigiles/node/node_post.js)
        //dziala !
        //mozna dac dla testow url pliku z dysku, powinno tam sie zapisac ale nie testowalem

        http_request.setRequestHeader("Content-Type","application/json;charset=UTF-8");

        /*http_request.onload = function(){ console.log("as as asas a");};*/ // to też może byc ale bez tego działa

        http_request.send(imageData);

    };


    return exported;

});



