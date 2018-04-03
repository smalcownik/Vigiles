// f-kcja wywołana w:
// 1. JsonBuilder.updateJson - gdzie przesyla jsona z nowymi punktami
// 2. ImageDataAdding  - gdzie przesyla jsona z nowym Patchami


/*Created on 11.05.16.*/

define([], function () {
    var exported = {};
    
    exported.makeRequest = function (json, callback) {

        var viewer = this.viewer; // musiałem wstrzyknąć viewera w ten sposób bo przez require/define/function nie widziało go - nie wiem dlaczego!

        console.log("UpdateJsonREQUEST");

        var http_request = new XMLHttpRequest();
        //console.log(viewer);  //
        http_request.open("POST", viewer.serverURL + viewer.DataPath + viewer.JsonFile ); // request url gotowy!

        http_request.setRequestHeader("Content-Type","application/json;charset=UTF-8");

        /*http_request.onload = function(){ console.log("as as asas a");};*/ // to może byc ale i bez tego działa

        http_request.onreadystatechange = function() {    if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                callback();
            } else {

            }
        }};
        //TODO: 21.03.2018 komentarz z linijki wyzej jest chyba piętą achillesową tych ładowań - zobaczyć co się wcześniej tu wykonuje to czy niższa linijka ?
        http_request.send(json); // to ma forme JSON'A , serwer to zapisuje i nie robi nic więcej -
                                // (nie odświeża zawartości - to jest robione przy dodaniu do positionables przy dodawaniu punktu)
        
    };
    
    return exported;
});
