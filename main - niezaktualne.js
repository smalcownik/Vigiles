
// https://developer.mozilla.org/pl/docs/AJAX/Na_pocz%C4%85tek
var http_request = false;
function makeRequest(url,cb) {

    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
            // Przeczytaj o tym wierszu poniżej
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Poddaję się :( Nie mogę stworzyć instancji obiektu XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = function() {    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            cb(http_request.responseText); // tu wchodzi cb - czyli "function(JSONstring)" w praktyce callback z loadPackage czyli "function(pack)"
            // z wywolania loadPackage ,  za response text wchodzi obj (ktory w load package jest tworzony jsona w objekt)
            // to jest miejsce gdzie wrzuca się w xmlhttprequest kod do obróbki - i dlatego u nas jest tu zmienna bo tym kodem są całe duże funkcje,
            // które (m.in.) korzystaja z jsona itp.
        } else {

        }
    }};
    http_request.open('GET', url, true);
    http_request.send(null); // zamiast null moze byc jakis string ale tylko w metodzie POST (nie GET)

}


function loadPackage(url,callback){ // ??ta funkcja jest po to zeby do makeRequest dorobic z jSON'a objekt,
                                    // ??gdyby nie byl on w formie pliku json to wogole by tej funkcji nie musialo byc ??

    makeRequest(
        url+"/data.json",
        function(JSONstring){
            var obj = JSON.parse(JSONstring); // robi z json objekt
            obj.url = url; // url to "data/arch1" - czyli poczatek sciezki do plku data.json, nie jest dokladna sciezka bo poczatke przyda
                            // sie jeszcze do zwracania plikow img/jpg
            callback(obj); //to jest funckja anonimowa "function(pack)" z poniższego wuwołania "loadPackage", ktora za "pack" bierze "obj"
                            // i wywoluje funkcjer "browser.showPackage" z argumentem "obj"(->currentPackage->pack->obj)
            //console.log (obj); //to jest object z data.json
        }
    );

}

var currentPackage;



loadPackage("data/arch1",function(pack){

    currentPackage = pack;

    Browser.showPackage(currentPackage); //

});