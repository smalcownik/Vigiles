define(['./MapDataValidator'], function (MapDataValidator) {

        var exported = function MapData(jsonString){

            var parsed = JSON.parse(jsonString); // u tu powstaje gotowy objekt

            //debugger;
            MapDataValidator.ValidateData(parsed);
            this.images = parsed.imgs;
            this.meta = parsed.meta;

        };

        exported.prototype.dig = function dig(image,visitFunction,parent){  //TODO: czy f-kcja dig i traverse są potrzebne OBIE czy nie wystarczy delikatnie przerobiona jedna
            //debugger;
            visitFunction(image,parent); // ta funckja może robić co chce używając image i parent (to jej argumenty)
                                         // i w ten sposób robi coś na wsystkich imgs'ach - patrz PatchBuilder.build
            image.children.forEach(
                function(childrenImage){

                    this.dig(childrenImage,visitFunction,image);
                }
                ,this);
        };


        exported.prototype.traverse = function(visitFunction){// ta funckja może robić co chce używając image i parent (to jej argumenty)
                                                // i w ten sposób robi coś na wsystkich imgs'ach - patrz PatchBuilder.build



            this.dig(this.images[0],visitFunction,null); //argumenty f-kcji dig
            // jak trawersuje (gdziekowliek by nie było wywołane) to zawsze zaczyna od this.images[0]
            // gdzie this to objekt z jSON'a
        };


        exported.prototype.getAllNodes = function(){};

        exported.prototype.getAllChildrenNodes = function(parentNode){};
        //exported.getAllChildrenNodes = function(parentNode){};


        return exported;
        }
    );