// f-kcja wywołana w JsonBuilder.updateJson
/*Created on 11.05.16.*/

define([], function () {
    var exported = {};
    
    exported.makeRequest = function (json) {

        var viewer = this.viewer; // musiałem wstrzyknąć viewera w ten sposób bo przez require/define/function nie widziało go - nie wiem dlaczego!

        console.log("UpdateJsonREQUEST");

        var http_request = new XMLHttpRequest();
        //console.log(viewer);  //
        http_request.open("POST", viewer.serverURL+viewer.DataPath+viewer.JsonFile ); // request url gotowy!

        http_request.setRequestHeader("Content-Type","application/json;charset=UTF-8");

        /*http_request.onload = function(){ console.log("as as asas a");};*/ // to może byc ale i bez tego działa

        http_request.send(json); // to ma forme JSON'A
        
    };
    
    return exported;
});
