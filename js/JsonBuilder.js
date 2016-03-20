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


            //TODO: każdy patch image ma swój parent, kazdy point ma swój image, na podtsawie tych dwóch danych zrobić drzewo

            // potrzebne dane: patch: id:"", size:{}, points:[], children:[], pos(tylko jeśli jest childrenem):{}, parent:{}

            // a może wymazać tylko te dane, które powodują "circle" tj(w patch.image): parent, patch,
            // a w point DOM i image, absolute poistion (zostawić point.point i point.absolutePos)
            // ale wtedy przy usuwaniu pointa trzeba też usuwac jego dane z image

            // jeszcze sie zastanowić czy dodawać dane kazdego nowego pointa do image i przy usuwaniu pointa je usuwać czy raczej budować drzewo tylko na podstawie positionables
        };

        return exported;
    }
);

