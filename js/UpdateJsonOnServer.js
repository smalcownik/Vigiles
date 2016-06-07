/**
 * Created by marek on 11.05.16.
 */
define([], function () {

    var exported = {};


    exported.makeRequest = function (json) { // f-kcja wywołana w JsonBuilder.updateJson

        console.log(json);

        var http_request = new XMLHttpRequest();
        http_request.open("POST", "http://52.30.81.203/"); // TODO: tutaj zmienić url na odpalony serwer na amazonie (dziala z serwerem
        // nodeJSTutorial/sample_servers/vigiles_node_server.js na amazonie)
        //dziala !

        http_request.setRequestHeader("Content-Type","application/json;charset=UTF-8");

        /*http_request.onload = function(){ console.log("as as asas a");};*/ // to też może byc ale bez tego działa

        http_request.send(json);

    };


    return exported;

});
