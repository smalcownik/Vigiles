/**
 * Created by marek on 17.08.16.
 */
// f-kcja wywołana w ImageDataAdding.executeAddingJsonPathDataToNewImage

define([], function () {

    var exported = {};


    exported.makeRequest = function (imageData,callback) { // f-kcja wywołana w ImageDataAdding.executeAddingJsonPathDataToNewImage

        console.log(imageData);

        var viewer = this.viewer; // musiałem wstrzyknąć viewera w ten sposób bo przez require/define/function nie widziało go - nie wiem dlaczego!

        var http_request = new XMLHttpRequest();


        
        http_request.open("POST", viewer.serverURL /*+ "/imageData"*/,false); //TODO: nie pilne: kiedyś dodać request url pliku dla porzadku

        http_request.setRequestHeader("Content-Type","application/json;charset=UTF-8");

        //http_request.onload = function(){ console.log("as as asas a");}; // to też może byc ale bez tego działa

        http_request.onreadystatechange = function() {    if (http_request.readyState == 4) {
         if (http_request.status == 200) {
         callback();
         } else {

         }
         }};

        http_request.send(imageData);

    };


    return exported;

});



