/**
 * Created by marek on 01.02.16.
 */
define([], function () {

        var exported = {};


        exported.buildJSON = function(positionable){

            var viewer = this.viewer;

            console.log("jshdsjksdhjs");

            console.log(viewer.positionable);
            /*var a = JSON.stringify(this.positionable[0]); // cannot convert circular structure to json
            console.log(a);*/

            //TODO: tu teraz rozkminić jakies budowanie JSONA z positionables,
            // wyekstrachować te dane co potrzebne i jakoś zbudować z nich objekt a potem ten objekt zestringifiesować
            // no i ghdzie dziada wstrzyknąć - wydaje mi się że po kazdej edycji punktu powinien się wywołać
        };

        return exported;
    }
);

