/**
 * Created by marek on 01.02.16.
 */
define(["./Camera"], function (Camera) {

        var exported = {};


        exported.buildJSON = function(){

            var viewer = this.viewer;
            console.log(viewer.positionable);

            console.log("test");


            this.addSaveButton();
            this.updateJsonContent();


            /*var a = JSON.stringify(this.positionable[0]); // cannot convert circular structure to json
            console.log(a);*/

            //TODO: tu teraz rozkminić jakies budowanie JSONA z positionables,
            // wyekstrachować te dane co potrzebne i jakoś zbudować z nich objekt a potem ten objekt zestringifiesować
            // no i ghdzie dziada wstrzyknąć - wydaje mi się że po kazdej edycji punktu powinien się wywołać lub po kliknieciu buttona'a: "save"


            //TODO: każdy patch image ma swój parent, kazdy point ma swój image, na podtsawie tych dwóch danych zrobić drzewo

            //TODO: dalej rozkminiam jak zrobic najlepiej ten objekt;

            // potrzebne dane: patch: originalParent:"", id:"", size:{}, points:[], points.textInit, children:[], pos(tylko jeśli jest childrenem):{}, parent:{}

            // a może wymazać tylko te dane, które powodują "circle" tj(w patch.image): parent, patch,
            // a w point DOM i image, absolute poistion (zostawić point.point i point.absolutePos)
            // ale wtedy przy usuwaniu pointa trzeba też usuwac jego dane z image

            // jeszcze sie zastanowić czy dodawać dane kazdego nowego pointa do image i przy usuwaniu pointa je usuwać czy raczej budować drzewo tylko na podstawie positionables
        };

        exported.addSaveButton = function(){ var saveJsonButton = document.createElement('div');
            // document.body.appendChild(saveJsonButton);
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

            // var saveButtonParagraph = document.createElement('p');
            // debugger;
            var txt = "SAVE";
            saveJsonButton.style.color = 'white';
            saveJsonButton.style.fontSize = '22px';
            saveJsonButton.style.textAlign = 'center';
            saveJsonButton.innerHTML = txt;

            document.body.appendChild(saveJsonButton);

            //saveButtonParagraph.style.zIndex = '1001';
            //saveJsonButton.appendChild(saveButtonParagraph);

        };

        exported.updateJsonContent = function () {

            //debugger;

            document.body.addEventListener('click',this.updateJson );
        };

        exported.updateJson = function(event){

           // debugger;

            var viewer = exported.viewer; // tu nie mogłem dać "this.viewer" bo this tutaj to "body"

            var clickedElement = event.target; // to jest tylko element - zaraz znajdziemy dla niego Patch'a/Pointa
            var clickedElementPoint; // tu będzie Patch, który zawiera clickedPicture(img)

           // debugger;

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
    }
);

