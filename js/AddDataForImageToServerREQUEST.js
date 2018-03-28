/**
 * Created by marek on 17.08.16.
 */
// f-kcja wywołana w ImageDataAdding.executeAddingJsonPathDataToNewImage

define([], function () {

    var exported = {};


    exported.makeRequest = function (imageData) { // f-kcja wywołana w ImageDataAdding.executeAddingJsonPathDataToNewImage

        console.log(imageData);

        var viewer = this.viewer; // musiałem wstrzyknąć viewera w ten sposób bo przez require/define/function nie widziało go - nie wiem dlaczego!

        var http_request = new XMLHttpRequest();


        
        http_request.open("POST", viewer.serverURL /*+ "/imageData"*/,false); //TODO: nie pilne: kiedyś dodać request url pliku dla porzadku

        http_request.setRequestHeader("Content-Type","application/json;charset=UTF-8");

        /*http_request.onload = function(){ console.log("as as asas a");};*/ // to też może byc ale bez tego działa

        /*http_request.onreadystatechange = function() {    if (http_request.readyState == 4) {
         if (http_request.status == 200) {
         cb(http_request.responseText); // tu wchodzi cb - czyli "function(JSONstring)" w praktyce callback z loadData czyli "function(pack)"
         // z wywolania loadPackage ,  za response text wchodzi obj (ktory w load package jest tworzony jsona w objekt)
         // to jest miejsce gdzie wrzuca się w xmlhttprequest kod do obróbki - i dlatego u nas jest tu zmienna bo tym kodem są całe duże funkcje,
         // które (m.in.) korzystaja z jsona itp.

         //console.log(http_request.responseText); //de facto treść pliku json, ten response text dostaje w pliku node_server, tam w chwili tego requesta jest udzielana odpowiedz
         } else {

         }
         }};*/

        http_request.send(imageData);

    };


    return exported;

});



