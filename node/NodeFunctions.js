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
            default:
                ct = 'text/plain';
                break;
        }

        return {'Content-Type': ct};
    };//MIME Type na podstawie rozszerzenia pliku (ext)

    
    
    
    
    
    return exported;

});
