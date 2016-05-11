/**
 * Created by marek on 11.05.16.
 */
define([], function () {

    var exported = {};


    exported.makeRequest = function (json) { // f-kcja wywołana w JsonBuilder.updateJson

        console.log(json);

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "http://localhost:8000/");
        xmlhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");

        /*xmlhttp.onload = function(){ console.log("as as asas a");};*/ // to też może byc ale bez tego działa

        xmlhttp.send(json);

    };


    return exported;

});
