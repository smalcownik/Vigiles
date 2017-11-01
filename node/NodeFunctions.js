/**
 * Created by marek on 25.08.17.
 */
define([], function () {

    var exported = {};

    exported.contentTypeFromExt = function (ext){
        var ct;

        switch (ext) {
            case '.html':
                ct = 'text/html';
                break;
            case '.css':
                ct = 'text/css';
                break;
            case '.js':
                ct = 'text/javascript';
                break;
            case '.jpg':
                ct = "image/jpeg";
                break;
            case '.json':
                ct = "application/json";
                break;
            default:
                ct = 'text/plain';
                break;
        }

        return {'Content-Type': ct};
    };//MIME Type na podstawie rozszerzenia pliku (ext)

    exported.requestInfo = function (exp){

        var node = exp;
        
        process.stdout.write("0.0. filepath: " + node.filepath);
        process.stdout.write("     0.1. fileext:" + node.fileext);
        process.stdout.write("  1.method1: " + node.method + '     ' +
            //"2.headers: " + headers + '     ' +
            "3.req.url: " + node.url + '     ' );

        //niestety nie ma mozliwosci (stack overflow) ustawic headers z html.src skad jest wykonywany request i rozroznia je tylko po url'u:
        var actualContType;

        if (typeof node.contentTypeString === "undefined"){ // ! OPTIONS, ale ta sama operacja jest wykonywana ponownie z POST więc mozna to zignorować(?) i będzie dzialało jak POST
            actualContType = exported.contentTypeFromExt(node.fileext)["Content-Type"]; //ta funkcja potem użyta niżej w response.writeHead(200, NodeFunctions.contentTypeFromExt(fileext)
            process.stdout.write("  4.0. send;;actual:cont-type: " +node.contentTypeString+";;"+ actualContType ); // dla metody get,  pokazuje undefined - wyjasnic (dla post pokazuje zawrtosc)

        }else{
            actualContType = node.contentTypeString;
            process.stdout.write("  4.1. send;;actual:cont-type: " +node.contentTypeString+";;"+ actualContType);
        } // tutaj serwer wykonuje dodatkowo opercaje z metoda options - zastanowic sie jak jej uniknac i czy jest konieczna




        if (actualContType == "image/jpeg") {
            //GET - przesyla zdjecia z bazy

            if (node.method == "POST") {//{ to jest POST: przesyła się // ta sytuacja dotyczy tylko przesyłania nowego pliku image
                process.stdout.write("     4.2. method:" + node.method);
                process.stdout.write("     5. confirmed image/jpeg");
                
            }

        }
        else if (actualContType == "application/json;charset=UTF-8" || "application/json") {
            process.stdout.write("     4.3. aktualizacja jsona");

        }
        else {
            process.stdout.write("UWAGA! content-type jest poza kontrola: actualContentType: " + actualContType);
        }

        return;
    };
    
    
    
    
    return exported;

});
