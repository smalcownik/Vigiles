define(['./MapDataValidator'], function (MapDataValidator) {

        var exported = function MapData(jsonString){

            var parsed = JSON.parse(jsonString);
            MapDataValidator(parsed);
            this.images = parsed.imgs;
            this.meta = parsed.meta;

        };


        exported.prototype.traverse = function(visitFn){

           //TODO: zaimplemetnować trawersowanie drzewa i napisac testy


        };

        exported.prototype.getAllNodes = function(){

        };

        exported.prototype.getAllChildrenNodes = function(parentNode){

        };
        //exported.getAllChildrenNodes = function(parentNode){};


            return exported;
        }
    );