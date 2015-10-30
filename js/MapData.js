define(['./MapDataValidator'], function (MapDataValidator) {

        var exported = function MapData(jsonString){

            var parsed = JSON.parse(jsonString);
            //debugger;
            MapDataValidator.ValidateData(parsed);
            this.images = parsed.imgs;
            this.meta = parsed.meta;

        };


        exported.prototype.dig = function dig(image,visitFunction,parent){
            //debugger;
            visitFunction(image,parent);// visitFunction jest argumentem "dig'a", można tu wstawić dowolną funkcję, która jakoś wytestuje nam pozostale zmienne

            image.children.forEach(
                function(childrenImage){

                    this.dig(childrenImage,visitFunction,image);
                }
                ,this);

        };


        exported.prototype.traverse = function(visitFunction){

           //TODO: zaimplemetnować trawersowanie drzewa i napisac testy

            this.dig(this.images[0],visitFunction,null);
        };

        exported.prototype.getAllNodes = function(){

        };

        exported.prototype.getAllChildrenNodes = function(parentNode){

        };
        //exported.getAllChildrenNodes = function(parentNode){};


            return exported;
        }
    );