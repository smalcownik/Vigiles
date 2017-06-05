// f-kcja wywołana w JsonBuilder.updateJson

/**
 * Created by marek on 11.05.16.
 
 */

define([], function () {

    var exported = {};





    exported.makeRequest = function (json) {

        var viewer = this.viewer; // musiałem wstrzyknąć viewera w ten sposób bo przez require/define/function nie widziało go - nie wiem dlaczego!

        console.log(json);

        var http_request = new XMLHttpRequest();
        //console.log(viewer);  // 
        http_request.open("POST", viewer.serverURL+"/lala"); // tutaj zmienić url na odpalony serwer na amazonie (dziala z serwerem //TODO: tu jest trop z tym LALA
        // tylko na serwerze robiz  tego scieżke do pliku (już tam) i to trzeba poprawić
        // Vigiles/node/node_post.js)
        //dziala !
        //mozna dac dla testow ulr pliku z dysku, powinno tam sie zapisac ale nie testowalem

        http_request.setRequestHeader("Content-Type","application/json;charset=UTF-8");

        /*http_request.onload = function(){ console.log("as as asas a");};*/ // to też może byc ale bez tego działa


        http_request.send(json);

    };


    return exported;

});
