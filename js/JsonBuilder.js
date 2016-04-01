/**
 * Created by marek on 01.02.16.
 */
define(["./Camera"], function (Camera) {

        var exported = {};


        exported.buildJSON = function(positionable){

            var viewer = this.viewer;

            console.log("jshdsjksdhjs");

            console.log(viewer.positionable);

            var saveJsonButton = document.createElement('div');
            document.body.appendChild(saveJsonButton);
            this.DOM = saveJsonButton;
            saveJsonButton.classList.add("saveJsonButton"); // użyte później w index2.html

            /*this.point = point;

            this.image = image;

            this.absolutePos = {
                x: image.absolutePos.x + 0.5 * image.absolutePos.w * point.x,
                y: image.absolutePos.y + 0.5 * image.absolutePos.h * point.y
            };

            this.originalTextValue = point.textInit;*/

            saveJsonButton.style.top = Camera.position.x + 20 + 'px';
            saveJsonButton.style.left = Camera.position.y + 20 +'px';


            saveJsonButton.style.position = 'absolute';

            saveJsonButton.style.zIndex = '1000';
            saveJsonButton.style.height = '70px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
            saveJsonButton.style.width = '140px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
            saveJsonButton.style.backgroundColor = '#000000';
            saveJsonButton.style.borderColor = '#ffffff';
            //divPoint.style.borderRadius = '50%';
            //divPoint.style.borderWidth = '3px';
            saveJsonButton.style.borderStyle = 'solid';
            saveJsonButton.style.textAlign = 'center';

           var saveButtonParagraph = document.createElement('p');

            var txt = "SAVE";
            saveButtonParagraph.style.color = 'white';
            saveButtonParagraph.style.fontSize = '22px';
            saveButtonParagraph.style.textAlign = 'center';
            saveButtonParagraph.innerHTML = txt;

            //saveButtonParagraph.style.zIndex = '1001';
            saveJsonButton.appendChild(saveButtonParagraph);





            /*var a = JSON.stringify(this.positionable[0]); // cannot convert circular structure to json
            console.log(a);*/

            //TODO: tu teraz rozkminić jakies budowanie JSONA z positionables,
            // wyekstrachować te dane co potrzebne i jakoś zbudować z nich objekt a potem ten objekt zestringifiesować
            // no i ghdzie dziada wstrzyknąć - wydaje mi się że po kazdej edycji punktu powinien się wywołać lub po kliknieciu buttona'a: "save"


            //TODO: każdy patch image ma swój parent, kazdy point ma swój image, na podtsawie tych dwóch danych zrobić drzewo

            // potrzebne dane: patch: id:"", size:{}, points:[], points.textInit, children:[], pos(tylko jeśli jest childrenem):{}, parent:{}

            // a może wymazać tylko te dane, które powodują "circle" tj(w patch.image): parent, patch,
            // a w point DOM i image, absolute poistion (zostawić point.point i point.absolutePos)
            // ale wtedy przy usuwaniu pointa trzeba też usuwac jego dane z image

            // jeszcze sie zastanowić czy dodawać dane kazdego nowego pointa do image i przy usuwaniu pointa je usuwać czy raczej budować drzewo tylko na podstawie positionables
        };

        exported.updateJsonContent = function () {

            //var viewer = this.viewer;

            document.body.addEventListener('click',this.updateJson /*function (event) {    // event dla camery/obrazków

             var clickedElement = event.target; // to jest tylko element - zaraz znajdziemy dla niego Patch'a/Pointa

             if (clickedElement.className === "point"){

             var clickedElementPoint; // tu będzie Patch, który zawiera clickedPicture(img)

             viewer.positionable.forEach(
             function (element) {

             if (element.DOM === clickedElement) {

             clickedElementPoint = element;
             }
             }
             );
             };

             if (clickedElementPoint) {

             if (clickedElement.hasChildNodes()) {

             //debugger;

             if (clickedElement.childNodes[0].style.display !== "none") {
             clickedElement.childNodes[0].style.display = "none";
             }
             else {
             clickedElement.childNodes[0].style.display = "block";
             }

             }

             else {

             console.log(clickedElementPoint.originalTextValue);

             var inDiv = document.createElement('div');

             clickedElement.appendChild(inDiv);
             inDiv.innerHTML = clickedElementPoint.originalTextValue;
             inDiv.style.position = 'relative';
             inDiv.style.left = '10px';
             inDiv.style.top = '10px';
             inDiv.style.color="red";
             inDiv.style.textAlign = 'center';
             // inDiv.style.background = ""

             inDiv.style.height = '22px';// to ręcznie dodałem do PointEventListener.countPointCoordinate żeby póxniej przy dodawaniu ładnie wyglądało
             inDiv.style.width = '120px';
             inDiv.style.border = '3px solid rgba(255, 255, 255, .8)';
             inDiv.style.borderRadius = '5px';
             inDiv.style.zIndex = '1001';


             }

             }


             }*/);
        };

        exported.updateJson = function(event){

            var clickedElement = event.target; // to jest tylko element - zaraz znajdziemy dla niego Patch'a/Pointa
            var clickedElementPoint; // tu będzie Patch, który zawiera clickedPicture(img)

            if (clickedElement.className === "saveJsonButton") {

//TODO: tutaj 1. stworzyć z positionables objekt na wzór Jsona 2. zrobić z niego Jsona 3. zapisać tego Jsona do pliku w miejsce starego Jsona

                viewer.positionable.forEach(
                    function (element) {

                        if (element.DOM === clickedElement) {

                            clickedElementPoint = element;
                        }
                    }
                );
            };
        };


        return exported;

        return exported;
    }
);

