/**
 * Created by marek on 13.06.16.
 */
//GNU nano 2.2.6  File: server_with_changing_content_types.js

function contentType(ext) {
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
            ct = 'image/jpeg';
            break;
        default:
            ct = 'text/plain';
            break;
    }

    return {'Content-Type': ct};
}
//
var http = require('http'),
    fs = require('fs'),
    path = require('path');
//
var HTTP_OK = 200,
    HTTP_ERR_UNKNOWN = 500,
    HTTP_ERR_NOT_FOUND = 404;

var server =http.createServer(function (req, res) {
    var filepath = '.' + (req.url == '/' ? '/main.html' : req.url),
        fileext = path.extname(filepath);

    fs.exists(filepath, function (f) {
        if (f) {
            fs.readFile(filepath, function (err, content) {
                if (err) {
                    res.writeHead(HTTP_ERR_UNKNOWN);
                    res.end();
                } else {

                    res.writeHead(HTTP_OK, contentType(fileext));
                    /*res.writeHead(HTTP_OK,('Access-Control-Allow-Origin','*'));
                     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');*/
                    res.end(content);
                }
            }); } else {
            res.writeHead(HTTP_ERR_NOT_FOUND);
            res.end();
        }
    });
});




server.listen(8000, function(){
    //Callback triggered when server is successfully listening. H$
    console.log("Server listening on: http://localhost:%s", 80);
});
