
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
            cb(http_request.responseText);
        } else {

        }
    }};
    http_request.open('GET', url, true);
    http_request.send(null);

}


function loadPackage(url,callback){


    makeRequest(
        url+"/data.json",
        function(JSONstring){
            var obj = JSON.parse(JSONstring);
            obj.url = url;
            callback(obj);
        }
    );

}

var currentPackage;








loadPackage("data/arch1",function(pack){

    currentPackage = pack;

    Browser.showPackage(currentPackage);

});




