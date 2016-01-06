define(["./Point"], function (Point) { //tworzy objekty dodawanych punktów razem z właściowściami DOM

var exported = {};


        exported.buildPoints = function(image){

            var viewer = this.viewer;

            image.points.forEach(function(point){
                //exported.Point(image,point);  //TODO: tu zrobić żeby dodawało do positionable new Point i dorobić update my position dla point + cała f-kcja Point i points builder analogicznie do patch
                viewer.positionable.push(new Point(image,point))
            })
        };


        exported.build = function(data){

            data.traverse(
                function(image){
                    exported.buildPoints(image);
                }
            )
        };
            return exported;
        }
    );