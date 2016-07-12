define(['./MapDataValidator'], function (MapDataValidator) {

        var exported = function MapData(jsonString) {
            var parsed = JSON.parse(jsonString); // u tu powstaje gotowy objekt
            
            console.log(parsed);

            //debugger;
            MapDataValidator.ValidateData(parsed);
            this.images = parsed.images;
            this.meta = parsed.meta;

        };

        exported.prototype.dig = function dig(image,i, visitFunction, parent) {  //czy f-kcja dig i traverse są potrzebne OBIE czy nie wystarczy delikatnie przerobiona jedna
            //debugger;
            visitFunction(image,i,parent); // ta funckja może robić co chce używając image i parent (to jej argumenty)
                                          // i w ten sposób robi coś na wsystkich imgs'ach - patrz PatchBuilder.build
            image.children.forEach(
                function (childrenImage) {

                    this.dig(childrenImage,i, visitFunction, image);
                }
                , this);
        };


        exported.prototype.traverse = function (visitFunction) {// ta funckja może robić co chce używając image i parent (to jej argumenty)
            // i w ten sposób robi coś na wsystkich imgs'ach - patrz PatchBuilder.build

            //debugger;
            //console.log(this.images);
            for (var i = 0; i < this.images.length; i++) {
                this.dig(this.images[i],i, visitFunction, null); //argumenty f-kcji dig
                // jak trawersuje (gdziekowliek by nie było wywołane) to zawsze zaczyna od this.images[0]
                // gdzie this to objekt z jSON'a
            }
        };


        exported.prototype.getAllNodes = function () { // tu zbudow ać f-kcję, żeby
        };

        exported.prototype.getAllChildrenNodes = function (parentNode) {
        };
        //exported.getAllChildrenNodes = function(parentNode){};


        return exported;
    }
);