define(["./Point"], function (Point) { // wywolana w Viewer.js
                                       //tworzy objekty dodawanych punktów razem z właściowściami DOM

var exported = {};


        exported.buildPoints = function(image){

            var viewer = this.viewer;

            image.points.forEach(function(point){

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