define(['./MapData'], function (MapData) {

            var exported = {};


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

//debugger;
            exported.loadData = function(url,cb){
//debugger;
                makeRequest(url+'/data1.json',
                    function(response){
                        cb(new MapData(response));
                    }
                )

            };


            return exported;
        }
    );