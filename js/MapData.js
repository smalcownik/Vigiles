define(['./MapDataValidator'], function (MapDataValidator) {

        var exported = function MapData(jsonString){
            //debugger;
            var parsed = JSON.parse(jsonString);
            MapDataValidator.ValidateData(parsed);
            this.images = parsed.imgs;
            this.meta = parsed.meta;

        };


        exported.prototype.dig = function dig(image,visitFn,parent){
            //debugger;
            visitFn(image,parent);
            //debugger;
            image.children.forEach(
                function(childrenImage){

                    this.dig(childrenImage,visitFn,image);
                }
                ,this);

        };


        exported.prototype.traverse = function(visitFn){

           //TODO: zaimplemetnować trawersowanie drzewa i napisac testy

            this.dig(this.images[0],visitFn,null);
        };

        exported.prototype.getAllNodes = function(){

        };

        exported.prototype.getAllChildrenNodes = function(parentNode){

        };
        //exported.getAllChildrenNodes = function(parentNode){};


            return exported;
        }
    );