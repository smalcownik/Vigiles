{

/**
 * Created by marek on 22.07.16.
 */
//f-kcja wywołana w ImageDataAdding

define([], function () {

    var exported = {};



    exported.makeRequest = function (imageUrl) { // f-kcja wywołana w ImageDataAdding.executeAddingJsonPathDataToNewImage

        console.log(imageUrl);

        var viewer = this.viewer; // musiałem wstrzyknąć viewera w ten sposób bo przez require/define/function nie widziało go - nie wiem dlaczego!


        var http_request = new XMLHttpRequest();
        http_request.open("POST", viewer.serverURL+ "/image.jpg");
      

        http_request.setRequestHeader("Content-Type","image/jpeg");

        /*http_request.onload = function(){ console.log("as as asas a");};*/ // to też może byc ale bez tego działa

        http_request.send(imageUrl);
       

    };


    return exported;

});

} // Plik artefakt, obecnie zdjecie przesyla formidable