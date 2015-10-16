define(['./MapDataValidator'], function (MapDataValidator) {

        var exported = function MapData(jsonString){

            var parsed = JSON.parse(jsonString);
            MapDataValidator(parsed);
            this.images = parsed.imgs;
            this.meta = parsed.meta;

        };


        exported.prototype.dig = function dig(image,visitFn){

            visitFn(image);

        };



        exported.prototype.getAllNodes = function(){

        };

        exported.prototype.getAllChildrenNodes = function(parentNode){

        };
        //exported.getAllChildrenNodes = function(parentNode){};


            return exported;
        }
    );